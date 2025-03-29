import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Switch,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import '../app.css';

const UserProfileSetup = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    medicalConditions: {
      hypertension: false,
      diabetes: false,
      asthma: false,
      heartDisease: false,
      arthritis: false,
      cancer: false,
      depression: false,
      anxiety: false,
      other: false,
    },
    medications: [{ name: '', dosage: '', frequency: '' }],
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleConditionToggle = (condition) => {
    setFormData(prev => ({
      ...prev,
      medicalConditions: {
        ...prev.medicalConditions,
        [condition]: !prev.medicalConditions[condition]
      }
    }));
  };

  const addMedication = () => {
    setFormData(prev => ({
      ...prev,
      medications: [...prev.medications, { name: '', dosage: '', frequency: '' }]
    }));
  };

  const updateMedication = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      medications: prev.medications.map((med, i) => 
        i === index ? { ...med, [field]: value } : med
      )
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://your-django-backend/api/user/profile/', formData);
      if (response.status === 201) {
        navigation.replace('Home');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to save profile. Please try again.');
    }
  };

  return (
    <SafeAreaView className="profileContainer">
      <ScrollView className="profileScrollView">
        <View className="profileContent">
          <Text className="profileTitle">Complete Your Profile</Text>

          {/* Personal Information */}
          <View className="profileSection">
            <Text className="profileSectionTitle">Personal Information</Text>
            <View className="profileInputGroup">
              <Text className="profileLabel">First Name</Text>
              <TextInput
                className="profileInput"
                value={formData.firstName}
                onChangeText={(value) => handleInputChange('firstName', value)}
                placeholder="Enter your first name"
              />
            </View>

            <View className="profileInputGroup">
              <Text className="profileLabel">Last Name</Text>
              <TextInput
                className="profileInput"
                value={formData.lastName}
                onChangeText={(value) => handleInputChange('lastName', value)}
                placeholder="Enter your last name"
              />
            </View>

            <View className="profileInputGroup">
              <Text className="profileLabel">Age</Text>
              <TextInput
                className="profileInput"
                value={formData.age}
                onChangeText={(value) => handleInputChange('age', value)}
                placeholder="Enter your age"
                keyboardType="numeric"
              />
            </View>

            <View className="profileInputGroup">
              <Text className="profileLabel">Gender</Text>
              <TextInput
                className="profileInput"
                value={formData.gender}
                onChangeText={(value) => handleInputChange('gender', value)}
                placeholder="Enter your gender"
              />
            </View>
          </View>

          {/* Medical Conditions */}
          <View className="profileSection">
            <Text className="profileSectionTitle">Medical Conditions</Text>
            {Object.entries(formData.medicalConditions).map(([condition, value]) => (
              <View key={condition} className="profileConditionRow">
                <Text className="profileConditionText">
                  {condition.charAt(0).toUpperCase() + condition.slice(1).replace(/([A-Z])/g, ' $1')}
                </Text>
                <Switch
                  value={value}
                  onValueChange={() => handleConditionToggle(condition)}
                  trackColor={{ false: '#767577', true: '#81b0ff' }}
                  thumbColor={value ? '#007AFF' : '#f4f3f4'}
                />
              </View>
            ))}
          </View>

          {/* Medications */}
          <View className="profileSection">
            <Text className="profileSectionTitle">Medications</Text>
            {formData.medications.map((medication, index) => (
              <View key={index} className="profileMedicationGroup">
                <Text className="profileMedicationTitle">Medication {index + 1}</Text>
                <View className="profileInputGroup">
                  <Text className="profileLabel">Name</Text>
                  <TextInput
                    className="profileInput"
                    value={medication.name}
                    onChangeText={(value) => updateMedication(index, 'name', value)}
                    placeholder="Enter medication name"
                  />
                </View>
                <View className="profileInputGroup">
                  <Text className="profileLabel">Dosage</Text>
                  <TextInput
                    className="profileInput"
                    value={medication.dosage}
                    onChangeText={(value) => updateMedication(index, 'dosage', value)}
                    placeholder="Enter dosage"
                  />
                </View>
                <View className="profileInputGroup">
                  <Text className="profileLabel">Frequency (times per day)</Text>
                  <TextInput
                    className="profileInput"
                    value={medication.frequency}
                    onChangeText={(value) => updateMedication(index, 'frequency', value)}
                    placeholder="Enter frequency"
                    keyboardType="numeric"
                  />
                </View>
              </View>
            ))}
            <TouchableOpacity className="profileAddButton" onPress={addMedication}>
              <Text className="profileAddButtonText">Add Another Medication</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity className="profileSubmitButton" onPress={handleSubmit}>
            <Text className="profileSubmitButtonText">Save Profile</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserProfileSetup; 