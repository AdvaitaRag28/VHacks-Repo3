from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    firstName = models.CharField(max_length=100)
    lastName = models.CharField(max_length=100)
    age = models.IntegerField()
    gender = models.CharField(max_length=50)
    
    # Medical Conditions
    hypertension = models.BooleanField(default=False)
    diabetes = models.BooleanField(default=False)
    asthma = models.BooleanField(default=False)
    heartDisease = models.BooleanField(default=False)
    arthritis = models.BooleanField(default=False)
    cancer = models.BooleanField(default=False)
    depression = models.BooleanField(default=False)
    anxiety = models.BooleanField(default=False)
    highCholesterol = models.BooleanField(default=False)
    other = models.BooleanField(default=False)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.firstName} {self.lastName}'s Profile"

class Medication(models.Model):
    profile = models.ForeignKey(UserProfile, related_name='medications', on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    dosage = models.CharField(max_length=100)
    frequency = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.dosage}" 