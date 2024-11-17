from django.db import models

# Create your models here.
class User(models.Model):
    USER_TYPES = [
        ('paciente', 'Paciente'),
        ('doctor', 'Doctor'),
    ]
    
    id = models.AutoField(primary_key=True)
    cc_user = models.IntegerField(default=0)
    user_type = models.CharField(max_length=15, choices=USER_TYPES)
    name = models.CharField(max_length=40)
    date_of_birth = models.DateField(null=True, blank=True)
    professional_id = models.CharField(max_length=50, unique=True, null=True, blank=True)
    #specialty = models.CharField(max_length=100, null=True, blank=True)
    password = models.CharField(max_length=30)
    email = models.EmailField(max_length=255, unique=True, null=True, blank=True)
    phone = models.CharField(max_length=15, null=True, blank=True)    
    #created_at = models.DateTimeField(auto_now_add=True)
    #updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name
    