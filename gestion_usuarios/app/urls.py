from django.urls import path, include
from rest_framework import routers
from app import views

router = routers.DefaultRouter()
router.register(r'app', views.UserView, 'app')

urlpatterns = [
    path("api/v1/", include(router.urls)),
]