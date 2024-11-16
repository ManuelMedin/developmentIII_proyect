from django.http import JsonResponse
from .orchestrator_logic import orchestrate_appointment

def create_appointment(request):
    patient_id = request.GET.get('patient_id')
    doctor_id = request.GET.get('doctor_id')
    date_time = request.GET.get('date_time')
    orchestrate_appointment(patient_id, doctor_id, date_time)
    return JsonResponse({"message": "Proceso completado"})

