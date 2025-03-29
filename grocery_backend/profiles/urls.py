from django.urls import path
from . import views

urlpatterns = [
    path('api/user/profile/', views.create_user_profile, name='create_user_profile'),
    path('api/user/profile/<int:profile_id>/', views.get_user_profile, name='get_user_profile'),
] 