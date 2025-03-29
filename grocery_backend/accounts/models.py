from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models

class CustomUser(AbstractUser):
    age = models.IntegerField()
    gender = models.CharField(max_length=10)
    health_conditions = models.TextField()
    medications = models.TextField()

    # Override the groups and user_permissions fields with related_name
    groups = models.ManyToManyField(
        Group,
        related_name='customuser_set',  # Custom reverse relation name for groups
        blank=True
    )
    
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='customuser_permissions_set',  # Custom reverse relation name for permissions
        blank=True
    )

    def __str__(self):
        return self.username

 