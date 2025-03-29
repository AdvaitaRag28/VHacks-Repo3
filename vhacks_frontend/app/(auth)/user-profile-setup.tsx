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
  highCholesterol: boolean;
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
      highCholesterol: false,
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
      // First validate required fields
      if (!formData.firstName || !formData.lastName || !formData.age || !formData.gender) {
        Alert.alert('Error', 'Please fill in all required fields');
        return;
      }

      // Validate age is a number
      if (isNaN(Number(formData.age))) {
        Alert.alert('Error', 'Age must be a number');
        return;
      }

      const response = await axios.post('http://localhost:8000/api/user/profile/', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        Alert.alert(
          'Success',
          'Profile saved successfully!',
          [
            {
              text: 'OK',
              onPress: () => router.replace('/(tabs)')
            }
          ]
        );
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          Alert.alert('Error', error.response.data.message || 'Failed to save profile. Please try again.');
        } else if (error.request) {
          // The request was made but no response was received
          Alert.alert('Error', 'No response from server. Please check your connection.');
        } else {
          // Something happened in setting up the request that triggered an Error
          Alert.alert('Error', 'An error occurred. Please try again.');
        }
      } else {
        Alert.alert('Error', 'An unexpected error occurred. Please try again.');
      }
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
    backgroundColor: '#E6F3FF',
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
    color: '#1A365D',
    marginBottom: 30,
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    color: '#2C5282',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#2C5282',
  },
  input: {
    backgroundColor: '#F7FAFC',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    color: '#1A365D',
    borderWidth: 1,
    borderColor: '#BEE3F8',
  },
  conditionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  conditionText: {
    fontSize: 16,
    color: '#2C5282',
    flex: 1,
    marginRight: 10,
  },
  medicationGroup: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#F7FAFC',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#BEE3F8',
  },
  medicationTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#2C5282',
  },
  addButton: {
    backgroundColor: '#3182CE',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#F6AD55',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
}); 