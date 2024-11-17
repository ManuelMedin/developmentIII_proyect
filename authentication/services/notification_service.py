class NotificationService:
    def send_registration_email(self, email):
        # Simula el envío de un correo electrónico
        print(f"Sending registration email to {email}")
        return True  # Cambiar a False para simular fallo

    def rollback_email(self, email):
        print(f"Rollback: Email to {email} removed from queue")
