import React, { useState } from 'react';
import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Switch,
  Alert,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface MedicalConditions {
  hypertension: boolean;
  diabetes: boolean;
  asthma: boolean;
  heartDisease: boolean;
  arthritis: boolean;
  cancer: boolean;
  depression: boolean;
  anxiety: boolean;
  other: boolean;
}

interface Medication {
  name: string;
  dosage: string;
  frequency: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  age: string;
  gender: string;
  medicalConditions: MedicalConditions;
  medications: Medication[];
}

export default function UserProfileSetup() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
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

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleConditionToggle = (condition: keyof MedicalConditions) => {
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

  const updateMedication = (index: number, field: keyof Medication, value: string) => {
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
        router.replace('/(tabs)');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to save profile. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <ThemedView style={styles.content}>
          <ThemedText style={styles.title}>Complete Your Profile</ThemedText>

          {/* Personal Information */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Personal Information</ThemedText>
            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>First Name</ThemedText>
              <TextInput
                style={styles.input}
                value={formData.firstName}
                onChangeText={(value) => handleInputChange('firstName', value)}
                placeholder="Enter your first name"
              />
            </View>

            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>Last Name</ThemedText>
              <TextInput
                style={styles.input}
                value={formData.lastName}
                onChangeText={(value) => handleInputChange('lastName', value)}
                placeholder="Enter your last name"
              />
            </View>

            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>Age</ThemedText>
              <TextInput
                style={styles.input}
                value={formData.age}
                onChangeText={(value) => handleInputChange('age', value)}
                placeholder="Enter your age"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>Gender</ThemedText>
              <TextInput
                style={styles.input}
                value={formData.gender}
                onChangeText={(value) => handleInputChange('gender', value)}
                placeholder="Enter your gender"
              />
            </View>
          </View>

          {/* Medical Conditions */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Medical Conditions</ThemedText>
            {Object.entries(formData.medicalConditions).map(([condition, value]) => (
              <View key={condition} style={styles.conditionRow}>
                <ThemedText style={styles.conditionText}>
                  {condition.charAt(0).toUpperCase() + condition.slice(1).replace(/([A-Z])/g, ' $1')}
                </ThemedText>
                <Switch
                  value={value}
                  onValueChange={() => handleConditionToggle(condition as keyof MedicalConditions)}
                  trackColor={{ false: '#767577', true: '#81b0ff' }}
                  thumbColor={value ? '#007AFF' : '#f4f3f4'}
                />
              </View>
            ))}
          </View>

          {/* Medications */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Medications</ThemedText>
            {formData.medications.map((medication, index) => (
              <View key={index} style={styles.medicationGroup}>
                <ThemedText style={styles.medicationTitle}>Medication {index + 1}</ThemedText>
                <View style={styles.inputGroup}>
                  <ThemedText style={styles.label}>Name</ThemedText>
                  <TextInput
                    style={styles.input}
                    value={medication.name}
                    onChangeText={(value) => updateMedication(index, 'name', value)}
                    placeholder="Enter medication name"
                  />
                </View>
                <View style={styles.inputGroup}>
                  <ThemedText style={styles.label}>Dosage</ThemedText>
                  <TextInput
                    style={styles.input}
                    value={medication.dosage}
                    onChangeText={(value) => updateMedication(index, 'dosage', value)}
                    placeholder="Enter dosage"
                  />
                </View>
                <View style={styles.inputGroup}>
                  <ThemedText style={styles.label}>Frequency (times per day)</ThemedText>
                  <TextInput
                    style={styles.input}
                    value={medication.frequency}
                    onChangeText={(value) => updateMedication(index, 'frequency', value)}
                    placeholder="Enter frequency"
                    keyboardType="numeric"
                  />
                </View>
              </View>
            ))}
            <TouchableOpacity style={styles.addButton} onPress={addMedication}>
              <ThemedText style={styles.addButtonText}>Add Another Medication</ThemedText>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <ThemedText style={styles.submitButtonText}>Save Profile</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
  },
  conditionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  conditionText: {
    fontSize: 16,
  },
  medicationGroup: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  medicationTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 