from django.urls import path
from . import views

urlpatterns = [
    # ... existing patterns ...
    path('api/health-data/', views.process_health_data, name='process_health_data'),
] 