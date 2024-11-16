def send_message(service_name, message):
    # Implementar lógica para enviar mensajes a los microservicios
    print(f"Mensaje enviado a {service_name}: {message}")

def receive_response(transaction_id):
    # Implementar lógica para recibir respuestas de los microservicios
    print(f"Esperando respuesta para transacción {transaction_id}")
    return {'status': 'SUCCESS'}  # Simulación de respuesta exitosa
