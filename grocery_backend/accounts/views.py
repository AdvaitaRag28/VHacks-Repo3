from django.shortcuts import render

from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import AuthenticationForm
from .forms import CustomUserCreationForm, LoginForm
from django.contrib.auth.decorators import login_required

# Registration view
def register(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('profile')
    else:
        form = CustomUserCreationForm()
    return render(request, 'accounts/register.html', {'form': form})

# Login view
def user_login(request):
    if request.method == 'POST':
        form = LoginForm(data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect('profile')
    else:
        form = LoginForm()
    return render(request, 'accounts/login.html', {'form': form})

# Profile view (protected)
@login_required
def profile(request):
    return render(request, 'accounts/profile.html', {'user': request.user})

from .models import CustomUser

def user_has_high_cholesterol(user_id):
    try:
        # Retrieve the user by ID
        user = CustomUser.objects.get(id=user_id)
        
        # Check if the user has high cholesterol in their health conditions
        if 'high cholesterol' in user.health_conditions.lower():
            return True  # User has high cholesterol
        return False  # User does not have high cholesterol
    except CustomUser.DoesNotExist:
        return False  # If the user doesn't exist, return False
