import uuid
from .models import Transaction
from .messaging import send_message, receive_response
from .models import Appointment, Patient, Doctor

def orchestrate_appointment(patient_id, doctor_id, date_time):
    transaction_id = uuid.uuid4()
    transaction_record = Transaction.objects.create(
        transaction_id=transaction_id,
        status='PENDING'
    )
    try:
        # Paso 1: Crear la cita en el modelo local
        patient = Patient.objects.get(id=patient_id)
        doctor = Doctor.objects.get(id=doctor_id)

        appointment = Appointment.objects.create(
            patient=patient,
            doctor=doctor,
            date_time=date_time,
            status='PENDING'
        )

        # Simular respuesta exitosa del microservicio
        response = {'status': 'SUCCESS'}
        if response['status'] != 'SUCCESS':
            raise Exception("Error al crear la cita médica")

        # Paso 2: Registrar en el historial
        send_message('history_service', {
            'transaction_id': str(transaction_id),
            'patient_id': patient_id,
            'action': 'appointment_created',
            'date_time': date_time
        })
        response = receive_response(transaction_id)
        if response['status'] != 'SUCCESS':
            raise Exception("Error en el microservicio de historial")

        # Paso 3: Notificar al paciente y médico
        send_message('notification_service', {
            'transaction_id': str(transaction_id),
            'patient_id': patient_id,
            'doctor_id': doctor_id,
            'message': 'Nueva cita creada',
            'date_time': date_time
        })
        response = receive_response(transaction_id)
        if response['status'] != 'SUCCESS':
            raise Exception("Error en el microservicio de notificaciones")

        # Actualizar estado de la cita y de la transacción
        appointment.status = 'CONFIRMED'
        appointment.save()

        transaction_record.status = 'SUCCESS'
        transaction_record.save()
    except Exception as e:
        transaction_record.status = 'FAILED'
        transaction_record.save()
        compensate_appointment(transaction_id)
        print(f"Transacción fallida: {e}")

def orchestrate_appointment(patient_id, doctor_id, date_time):
    transaction_id = uuid.uuid4()
    transaction_record = Transaction.objects.create(
        transaction_id=transaction_id,
        status='PENDING'
    )
    try:
        # Paso 1: Crear cita
        send_message('appointment_service', {
            'transaction_id': str(transaction_id),
            'patient_id': patient_id,
            'doctor_id': doctor_id,
            'date_time': date_time
        })
        response = receive_response(transaction_id)
        if response['status'] != 'SUCCESS':
            raise Exception("Error en el microservicio de citas")

        # Paso 2: Actualizar historial
        send_message('history_service', {
            'transaction_id': str(transaction_id),
            'patient_id': patient_id,
            'action': 'appointment_created',
            'date_time': date_time
        })
        response = receive_response(transaction_id)
        if response['status'] != 'SUCCESS':
            raise Exception("Error en el microservicio de historial")

        # Paso 3: Notificar
        send_message('notification_service', {
            'transaction_id': str(transaction_id),
            'patient_id': patient_id,
            'doctor_id': doctor_id,
            'message': 'Nueva cita creada',
            'date_time': date_time
        })
        response = receive_response(transaction_id)
        if response['status'] != 'SUCCESS':
            raise Exception("Error en el microservicio de notificaciones")

        # Actualizar estado de la transacción
        transaction_record.status = 'SUCCESS'
        transaction_record.save()
    except Exception as e:
        transaction_record.status = 'FAILED'
        transaction_record.save()
        compensate_appointment(transaction_id)
        print(f"Transacción fallida: {e}")

def compensate_appointment(transaction_id):
    send_message('appointment_service', {
        'transaction_id': str(transaction_id),
        'action': 'cancel'
    })
    send_message('history_service', {
        'transaction_id': str(transaction_id),
        'action': 'delete_entry'
    })
    send_message('notification_service', {
        'transaction_id': str(transaction_id),
        'action': 'cancel_notification'
    })

def compensate_appointment(transaction_id):
    # Eliminar la cita creada
    appointment = Appointment.objects.filter(transaction_id=transaction_id).first()
    if appointment:
        appointment.delete()

    # Simular las compensaciones en microservicios
    send_message('history_service', {
        'transaction_id': str(transaction_id),
        'action': 'delete_entry'
    })
    send_message('notification_service', {
        'transaction_id': str(transaction_id),
        'action': 'cancel_notification'
    })

