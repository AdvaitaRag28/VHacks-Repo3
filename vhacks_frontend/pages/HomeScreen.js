import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import '../app.css';

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleSignOut = async () => {
    // TODO: Implement sign out logic
    // Clear stored token
    // await AsyncStorage.removeItem('userToken');
    navigation.replace('SignIn');
  };

  return (
    <SafeAreaView className="homeContainer">
      <ScrollView className="homeScrollView">
        {/* Header Section */}
        <View className="homeHeader">
          <Text className="homeWelcomeText">Welcome Back!</Text>
          <TouchableOpacity className="homeSignOutButton" onPress={handleSignOut}>
            <Text className="homeSignOutText">Sign Out</Text>
          </TouchableOpacity>
        </View>

        {/* Main Content */}
        <View className="homeContent">
          {/* Quick Actions */}
          <View className="homeSection">
            <Text className="homeSectionTitle">Quick Actions</Text>
            <View className="homeActionButtons">
              <TouchableOpacity className="homeActionButton">
                <Text className="homeActionButtonText">Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity className="homeActionButton">
                <Text className="homeActionButtonText">Settings</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Recent Activity */}
          <View className="homeSection">
            <Text className="homeSectionTitle">Recent Activity</Text>
            <View className="homeActivityCard">
              <Text className="homeActivityText">No recent activity</Text>
            </View>
          </View>

          {/* Stats Section */}
          <View className="homeSection">
            <Text className="homeSectionTitle">Your Stats</Text>
            <View className="homeStatsContainer">
              <View className="homeStatCard">
                <Text className="homeStatNumber">0</Text>
                <Text className="homeStatLabel">Tasks</Text>
              </View>
              <View className="homeStatCard">
                <Text className="homeStatNumber">0</Text>
                <Text className="homeStatLabel">Goals</Text>
              </View>
              <View className="homeStatCard">
                <Text className="homeStatNumber">0</Text>
                <Text className="homeStatLabel">Progress</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen; 