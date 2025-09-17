import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { useAuth } from '../context/AuthContext';

type NavigationProp = StackNavigationProp<RootStackParamList>;

export default function ProfileScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { logout, user } = useAuth();

  const userProfile = {
    name: user?.name || '用戶',
    email: user?.email || 'user@example.com',
    healthCondition: '糖尿病第2型',
    sugarFriendlyLevel: '中等',
    joinDate: '2024年1月',
  };

  const handleLogout = () => {
    Alert.alert(
      '登出確認',
      '您確定要登出嗎？',
      [
        { text: '取消', style: 'cancel' },
        {
          text: '登出',
          style: 'destructive',
          onPress: logout
        }
      ]
    );
  };

  const handleMerchantMode = () => {
    Alert.alert(
      '店家模式',
      '切換到店家管理模式？',
      [
        { text: '取消', style: 'cancel' },
        {
          text: '切換',
          onPress: () => navigation.navigate('MerchantDashboard')
        }
      ]
    );
  };

  const menuItems = [
    { icon: 'person-outline', title: '個人資料', onPress: () => navigation.navigate('PersonalProfile') },
    { icon: 'fitness-outline', title: '健康設定', onPress: () => navigation.navigate('HealthSettings') },
    { icon: 'heart-outline', title: '我的最愛', onPress: () => navigation.navigate('Favorites') },
    { icon: 'time-outline', title: '最近瀏覽', onPress: () => navigation.navigate('RecentBrowsing') },
    { icon: 'storefront-outline', title: '店家管理', onPress: handleMerchantMode },
    { icon: 'notifications-outline', title: '通知設定', onPress: () => navigation.navigate('NotificationSettings') },
    { icon: 'help-circle-outline', title: '幫助中心', onPress: () => navigation.navigate('HelpCenter') },
    { icon: 'log-out-outline', title: '登出', onPress: handleLogout },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person" size={50} color="#4CAF50" />
          </View>
          <Text style={styles.userName}>{userProfile.name}</Text>
          <Text style={styles.userEmail}>{userProfile.email}</Text>
        </View>

        <View style={styles.healthCard}>
          <View style={styles.healthHeader}>
            <Ionicons name="medical" size={24} color="#4CAF50" />
            <Text style={styles.healthTitle}>健康狀態</Text>
          </View>
          <View style={styles.healthInfo}>
            <View style={styles.healthItem}>
              <Text style={styles.healthLabel}>健康狀態</Text>
              <Text style={styles.healthValue}>{userProfile.healthCondition}</Text>
            </View>
            <View style={styles.healthItem}>
              <Text style={styles.healthLabel}>糖友善等級</Text>
              <Text style={styles.healthValue}>{userProfile.sugarFriendlyLevel}</Text>
            </View>
            <View style={styles.healthItem}>
              <Text style={styles.healthLabel}>加入時間</Text>
              <Text style={styles.healthValue}>{userProfile.joinDate}</Text>
            </View>
          </View>
        </View>

        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem} onPress={item.onPress}>
              <View style={styles.menuLeft}>
                <Ionicons name={item.icon as any} size={24} color="#666" />
                <Text style={styles.menuTitle}>{item.title}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#ccc" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingBottom: 30,
    alignItems: 'center',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e8f5e8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  healthCard: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  healthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  healthTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  healthInfo: {
    gap: 10,
  },
  healthItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  healthLabel: {
    fontSize: 14,
    color: '#666',
  },
  healthValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  menuSection: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuTitle: {
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
  },
});