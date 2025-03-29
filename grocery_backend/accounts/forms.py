from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import CustomUser

class CustomUserCreationForm(UserCreationForm):
    age = forms.IntegerField()
    gender = forms.CharField(max_length=10)
    health_conditions = forms.CharField(widget=forms.Textarea)
    medications = forms.CharField(widget=forms.Textarea)

    class Meta:
        model = CustomUser
        fields = ['username', 'password1', 'password2', 'age', 'gender', 'health_conditions', 'medications']

from django.contrib.auth.forms import AuthenticationForm

class LoginForm(AuthenticationForm):
    pass

