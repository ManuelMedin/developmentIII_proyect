# auth_login/urls.py
from django.urls import path
from . import views


urlpatterns = [
    path('', views.index, name='index'),  # Apunta a la vista index
    path('register/', views.RegisterView.as_view(), name='register'),
    path('login/', views.LoginView.as_view(), name='login'),
    # Otras URLs según sea necesario
]
