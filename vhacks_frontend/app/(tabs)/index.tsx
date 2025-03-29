import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { Link } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function HomeScreen() {
  const handleSignOut = async () => {
    // TODO: Implement sign out logic
    // Clear stored token
    // await AsyncStorage.removeItem('userToken');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header Section */}
        <View style={styles.header}>
          <ThemedText style={styles.welcomeText}>Welcome Back!</ThemedText>
          <Link href="/(auth)/sign-in" asChild>
            <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
              <ThemedText style={styles.signOutText}>Sign Out</ThemedText>
            </TouchableOpacity>
          </Link>
        </View>

        {/* Main Content */}
        <ThemedView style={styles.content}>
          {/* Quick Actions */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Quick Actions</ThemedText>
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.actionButton}>
                <ThemedText style={styles.actionButtonText}>Profile</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <ThemedText style={styles.actionButtonText}>Settings</ThemedText>
              </TouchableOpacity>
            </View>
          </View>

          {/* Recent Activity */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Recent Activity</ThemedText>
            <View style={styles.activityCard}>
              <ThemedText style={styles.activityText}>No recent activity</ThemedText>
            </View>
          </View>

          {/* Stats Section */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Your Stats</ThemedText>
            <View style={styles.statsContainer}>
              <View style={styles.statCard}>
                <ThemedText style={styles.statNumber}>0</ThemedText>
                <ThemedText style={styles.statLabel}>Tasks</ThemedText>
              </View>
              <View style={styles.statCard}>
                <ThemedText style={styles.statNumber}>0</ThemedText>
                <ThemedText style={styles.statLabel}>Goals</ThemedText>
              </View>
              <View style={styles.statCard}>
                <ThemedText style={styles.statNumber}>0</ThemedText>
                <ThemedText style={styles.statLabel}>Progress</ThemedText>
              </View>
            </View>
          </View>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  signOutButton: {
    padding: 10,
  },
  signOutText: {
    color: '#007AFF',
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  activityCard: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  activityText: {
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statLabel: {
    color: '#666',
  },
});
