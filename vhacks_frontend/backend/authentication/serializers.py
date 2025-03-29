from rest_framework import serializers
from .models import UserProfile, MedicalCondition, Medication

class MedicalConditionSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalCondition
        fields = ['condition_name', 'is_active']

class MedicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medication
        fields = ['name', 'dosage', 'frequency']

class UserProfileSerializer(serializers.ModelSerializer):
    medical_conditions = MedicalConditionSerializer(many=True, required=False)
    medications = MedicationSerializer(many=True, required=False)

    class Meta:
        model = UserProfile
        fields = ['first_name', 'last_name', 'age', 'gender', 'medical_conditions', 'medications']

    def create(self, validated_data):
        medical_conditions_data = validated_data.pop('medical_conditions', [])
        medications_data = validated_data.pop('medications', [])
        
        user_profile = UserProfile.objects.create(**validated_data)
        
        for condition_data in medical_conditions_data:
            MedicalCondition.objects.create(user_profile=user_profile, **condition_data)
            
        for medication_data in medications_data:
            Medication.objects.create(user_profile=user_profile, **medication_data)
            
        return user_profile 