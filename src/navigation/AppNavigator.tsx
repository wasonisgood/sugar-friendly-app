import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

import { RootStackParamList, MainTabParamList } from '../types/navigation';
import { AuthProvider, useAuth } from '../context/AuthContext';

// Import screens
import AuthScreen from '../screens/AuthScreen';
import MapScreen from '../screens/MapScreen';
import WebHomeScreen from '../screens/WebHomeScreen';
import DistrictsScreen from '../screens/DistrictsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ScannerScreen from '../screens/ScannerScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import HealthProfileScreen from '../screens/HealthProfileScreen';
import DistrictDetailScreen from '../screens/DistrictDetailScreen';
import RestaurantDetailScreen from '../screens/RestaurantDetailScreen';
import MerchantDashboardScreen from '../screens/MerchantDashboardScreen';
import MenuManagementScreen from '../screens/MenuManagementScreen';
import PhotoUploadScreen from '../screens/PhotoUploadScreen';
import PersonalProfileScreen from '../screens/PersonalProfileScreen';
import HealthSettingsScreen from '../screens/HealthSettingsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import RecentBrowsingScreen from '../screens/RecentBrowsingScreen';
import NotificationSettingsScreen from '../screens/NotificationSettingsScreen';
import HelpCenterScreen from '../screens/HelpCenterScreen';
import OrderManagementScreen from '../screens/OrderManagementScreen';
import ReviewReplyScreen from '../screens/ReviewReplyScreen';
import RevenueAnalyticsScreen from '../screens/RevenueAnalyticsScreen';
import MerchantHelpScreen from '../screens/MerchantHelpScreen';
import ScanHistoryScreen from '../screens/ScanHistoryScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
import TermsOfServiceScreen from '../screens/TermsOfServiceScreen';
import CustomerServiceScreen from '../screens/CustomerServiceScreen';
import MerchantTermsScreen from '../screens/MerchantTermsScreen';
import PricingScreen from '../screens/PricingScreen';
import BloodSugarTargetScreen from '../screens/BloodSugarTargetScreen';
import RestaurantGuideScreen from '../screens/RestaurantGuideScreen';
import AIScanGuideScreen from '../screens/AIScanGuideScreen';
import HealthFeaturesScreen from '../screens/HealthFeaturesScreen';
import FAQScreen from '../screens/FAQScreen';
import DietCalendarScreen from '../screens/DietCalendarScreen';
import DietRecordDetailScreen from '../screens/DietRecordDetailScreen';
import DietAnalyticsScreen from '../screens/DietAnalyticsScreen';
import WebAppNavigator from './WebAppNavigator';

const RootStack = createStackNavigator<RootStackParamList>();
const MainTab = createBottomTabNavigator<MainTabParamList>();

function MainTabNavigator() {
  if (Platform.OS === 'web') {
    return (
      <MainTab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap;

            if (route.name === 'Map') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Districts') {
              iconName = focused ? 'list' : 'list-outline';
            } else if (route.name === 'Scanner') {
              iconName = focused ? 'search' : 'search-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            } else {
              iconName = 'help-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#4CAF50',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}
      >
        <MainTab.Screen
          name="Map"
          component={WebHomeScreen}
          options={{ title: '首頁' }}
        />
        <MainTab.Screen
          name="Districts"
          component={DistrictsScreen}
          options={{ title: '商圈' }}
        />
        <MainTab.Screen
          name="Scanner"
          component={MapScreen}
          options={{ title: '搜尋' }}
        />
        <MainTab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: '個人' }}
        />
      </MainTab.Navigator>
    );
  }

  return (
    <MainTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Map') {
            iconName = focused ? 'map' : 'map-outline';
          } else if (route.name === 'Districts') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Scanner') {
            iconName = focused ? 'camera' : 'camera-outline';
          } else if (route.name === 'DietCalendar') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else {
            iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <MainTab.Screen
        name="Map"
        component={MapScreen}
        options={{ title: '地圖' }}
      />
      <MainTab.Screen
        name="Districts"
        component={DistrictsScreen}
        options={{ title: '商圈' }}
      />
      <MainTab.Screen
        name="Scanner"
        component={ScannerScreen}
        options={{ title: '掃描' }}
      />
      <MainTab.Screen
        name="DietCalendar"
        component={DietCalendarScreen}
        options={{ title: '飲食' }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: '個人' }}
      />
    </MainTab.Navigator>
  );
}

function AppNavigatorInner() {
  const { isAuthenticated } = useAuth();

  // 網頁端使用專用導航
  if (Platform.OS === 'web') {
    return (
      <NavigationContainer>
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          {!isAuthenticated ? (
            <RootStack.Screen name="Auth" component={AuthScreen} />
          ) : (
            <RootStack.Screen name="WebMain" component={WebAppNavigator} />
          )}
        </RootStack.Navigator>
      </NavigationContainer>
    );
  }

  // 移動端使用原有導航
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <>
            <RootStack.Screen name="Auth" component={AuthScreen} />
            <RootStack.Screen name="Registration" component={RegistrationScreen} />
            <RootStack.Screen name="HealthProfile" component={HealthProfileScreen} />
          </>
        ) : (
          <>
            <RootStack.Screen name="Main" component={MainTabNavigator} />
            <RootStack.Screen name="DistrictDetail" component={DistrictDetailScreen} />
            <RootStack.Screen name="RestaurantDetail" component={RestaurantDetailScreen} />
            <RootStack.Screen name="MerchantDashboard" component={MerchantDashboardScreen} />
            <RootStack.Screen name="MenuManagement" component={MenuManagementScreen} />
            <RootStack.Screen name="PhotoUpload" component={PhotoUploadScreen} />
            <RootStack.Screen name="PersonalProfile" component={PersonalProfileScreen} />
            <RootStack.Screen name="HealthSettings" component={HealthSettingsScreen} />
            <RootStack.Screen name="Favorites" component={FavoritesScreen} />
            <RootStack.Screen name="RecentBrowsing" component={RecentBrowsingScreen} />
            <RootStack.Screen name="NotificationSettings" component={NotificationSettingsScreen} />
            <RootStack.Screen name="HelpCenter" component={HelpCenterScreen} />
            <RootStack.Screen name="OrderManagement" component={OrderManagementScreen} />
            <RootStack.Screen name="ReviewReply" component={ReviewReplyScreen} />
            <RootStack.Screen name="RevenueAnalytics" component={RevenueAnalyticsScreen} />
            <RootStack.Screen name="MerchantHelp" component={MerchantHelpScreen} />
            <RootStack.Screen name="ScanHistory" component={ScanHistoryScreen} />
            <RootStack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
            <RootStack.Screen name="TermsOfService" component={TermsOfServiceScreen} />
            <RootStack.Screen name="CustomerService" component={CustomerServiceScreen} />
            <RootStack.Screen name="MerchantTerms" component={MerchantTermsScreen} />
            <RootStack.Screen name="Pricing" component={PricingScreen} />
            <RootStack.Screen name="BloodSugarTarget" component={BloodSugarTargetScreen} />
            <RootStack.Screen name="RestaurantGuide" component={RestaurantGuideScreen} />
            <RootStack.Screen name="AIScanGuide" component={AIScanGuideScreen} />
            <RootStack.Screen name="HealthFeatures" component={HealthFeaturesScreen} />
            <RootStack.Screen name="FAQ" component={FAQScreen} />
            <RootStack.Screen name="DietCalendar" component={DietCalendarScreen} />
            <RootStack.Screen name="DietRecordDetail" component={DietRecordDetailScreen} />
            <RootStack.Screen name="DietAnalytics" component={DietAnalyticsScreen} />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default function AppNavigator() {
  return (
    <AuthProvider>
      <AppNavigatorInner />
    </AuthProvider>
  );
}