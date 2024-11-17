from django.contrib.auth.models import User

class UserService:
    def create_user(self, username, password, email):
        if User.objects.filter(username=username).exists():
            return None
        user = User.objects.create_user(username=username, password=password, email=email)
        return user

    def rollback_user(self, username):
        User.objects.filter(username=username).delete()
