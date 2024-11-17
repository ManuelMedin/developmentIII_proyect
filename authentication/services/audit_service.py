class AuditService:
    def log_registration_event(self, username):
        # Simula el registro de auditoría
        print(f"Audit log: User {username} registered.")
        return True  # Cambiar a False para simular fallo
