from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import UserProfile, MedicalCondition, Medication
from .serializers import UserProfileSerializer, MedicalConditionSerializer, MedicationSerializer

class UserProfileViewSet(viewsets.ModelViewSet):
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return UserProfile.objects.filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        # Transform the medical conditions data from the frontend format
        medical_conditions_data = []
        for condition, is_active in request.data.get('medicalConditions', {}).items():
            if is_active:
                medical_conditions_data.append({
                    'condition_name': condition,
                    'is_active': is_active
                })

        # Transform the medications data
        medications_data = request.data.get('medications', [])

        # Create the profile data
        profile_data = {
            'first_name': request.data.get('firstName'),
            'last_name': request.data.get('lastName'),
            'age': request.data.get('age'),
            'gender': request.data.get('gender'),
            'medical_conditions': medical_conditions_data,
            'medications': medications_data
        }

        serializer = self.get_serializer(data=profile_data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user) 