from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.shortcuts import get_object_or_404
from .models import UserProfile, Medication
from django.contrib.auth.models import User

@api_view(['POST'])
@permission_classes([AllowAny])
def create_user_profile(request):
    try:
        # Create or get user
        user, created = User.objects.get_or_create(
            username=request.data.get('email'),
            email=request.data.get('email')
        )
        
        # Create profile
        profile_data = {
            'user': user,
            'firstName': request.data.get('firstName'),
            'lastName': request.data.get('lastName'),
            'age': request.data.get('age'),
            'gender': request.data.get('gender'),
            'hypertension': request.data.get('medicalConditions', {}).get('hypertension', False),
            'diabetes': request.data.get('medicalConditions', {}).get('diabetes', False),
            'asthma': request.data.get('medicalConditions', {}).get('asthma', False),
            'heartDisease': request.data.get('medicalConditions', {}).get('heartDisease', False),
            'arthritis': request.data.get('medicalConditions', {}).get('arthritis', False),
            'cancer': request.data.get('medicalConditions', {}).get('cancer', False),
            'depression': request.data.get('medicalConditions', {}).get('depression', False),
            'anxiety': request.data.get('medicalConditions', {}).get('anxiety', False),
            'highCholesterol': request.data.get('medicalConditions', {}).get('highCholesterol', False),
            'other': request.data.get('medicalConditions', {}).get('other', False),
        }
        
        profile = UserProfile.objects.create(**profile_data)
        
        # Create medications
        medications_data = request.data.get('medications', [])
        for med_data in medications_data:
            Medication.objects.create(
                profile=profile,
                name=med_data.get('name'),
                dosage=med_data.get('dosage'),
                frequency=med_data.get('frequency')
            )
        
        return Response({
            'message': 'Profile created successfully',
            'profile_id': profile.id
        }, status=status.HTTP_201_CREATED)
        
    except Exception as e:
        return Response({
            'message': str(e)
        }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_user_profile(request, profile_id):
    try:
        profile = get_object_or_404(UserProfile, id=profile_id)
        medications = Medication.objects.filter(profile=profile)
        
        data = {
            'firstName': profile.firstName,
            'lastName': profile.lastName,
            'age': profile.age,
            'gender': profile.gender,
            'medicalConditions': {
                'hypertension': profile.hypertension,
                'diabetes': profile.diabetes,
                'asthma': profile.asthma,
                'heartDisease': profile.heartDisease,
                'arthritis': profile.arthritis,
                'cancer': profile.cancer,
                'depression': profile.depression,
                'anxiety': profile.anxiety,
                'highCholesterol': profile.highCholesterol,
                'other': profile.other,
            },
            'medications': [
                {
                    'name': med.name,
                    'dosage': med.dosage,
                    'frequency': med.frequency
                }
                for med in medications
            ]
        }
        
        return Response(data)
        
    except Exception as e:
        return Response({
            'message': str(e)
        }, status=status.HTTP_400_BAD_REQUEST) 