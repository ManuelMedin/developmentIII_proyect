from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .saga_orchestrator import SagaOrchestrator


class RegisterView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        email = request.data.get("email")

        saga = SagaOrchestrator()
        response, success = saga.register_user(username, password, email)

        if not success:
            return Response(response, status=status.HTTP_400_BAD_REQUEST)
        return Response(response, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        from django.contrib.auth.models import User
        user = User.objects.filter(username=username).first()
        if user and user.check_password(password):
            from rest_framework.authtoken.models import Token
            token, _ = Token.objects.get_or_create(user=user)
            return Response({"token": token.key}, status=status.HTTP_200_OK)

        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
