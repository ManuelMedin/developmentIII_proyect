# auth_login/services/saga_orchestrator.py

from .user_service import UserService
from .notification_service import NotificationService
from .audit_service import AuditService

class SagaOrchestrator:
    def __init__(self):
        self.user_service = UserService()
        self.notification_service = NotificationService()
        self.audit_service = AuditService()

    def register_user(self, username, password, email):
        # Paso 1: Crear el usuario
        user = self.user_service.create_user(username, password, email)
        if not user:
            return {"error": "Failed to create user"}, False

        # Paso 2: Enviar notificación de registro
        notification_sent = self.notification_service.send_registration_email(email)
        if not notification_sent:
            self.user_service.rollback_user(username)  # Deshacer registro de usuario
            return {"error": "Failed to send notification"}, False

        # Paso 3: Registrar evento de auditoría
        audit_logged = self.audit_service.log_registration_event(username)
        if not audit_logged:
            self.notification_service.rollback_email(email)
            self.user_service.rollback_user(username)
            return {"error": "Failed to log audit event"}, False

        return {"message": "User registered successfully"}, True
