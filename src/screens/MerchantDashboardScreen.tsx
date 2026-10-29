import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { useAuth } from '../context/AuthContext';

type MerchantDashboardNavigationProp = StackNavigationProp<RootStackParamList, 'MerchantDashboard'>;

interface Props {
  navigation: MerchantDashboardNavigationProp;
}

const mockMerchantData = {
  restaurantName: '健康素食館',
  ownerName: '張老闆',
  rating: 4.5,
  sugarFriendlyScore: 9.2,
  totalOrders: 156,
  monthlyRevenue: 45600,
  menuItemsCount: 15,
  reviewsCount: 23,
};

export default function MerchantDashboardScreen({ navigation }: Props) {
  const [restaurantStatus, setRestaurantStatus] = useState<'open' | 'closed'>('open');
  const { logout } = useAuth();

  const handleStatusToggle = () => {
    const newStatus = restaurantStatus === 'open' ? 'closed' : 'open';
    setRestaurantStatus(newStatus);
    Alert.alert(
      '營業狀態已更新',
      `餐廳已設為${newStatus === 'open' ? '營業中' : '休息中'}`
    );
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

  const menuItems = [
    {
      title: '餐廳資訊管理',
      subtitle: '編輯餐廳基本資訊、營業時間',
      icon: 'storefront-outline' as const,
      onPress: () => navigation.navigate('RestaurantDetail', {
        restaurantId: '1',
        restaurantName: mockMerchantData.restaurantName
      }),
      color: '#4CAF50',
    },
    {
      title: '菜單管理',
      subtitle: '新增、編輯、刪除菜單項目',
      icon: 'restaurant-outline' as const,
      onPress: () => navigation.navigate('MenuManagement'),
      color: '#FF9800',
    },
    {
      title: '照片上傳',
      subtitle: '上傳餐廳和菜品照片',
      icon: 'camera-outline' as const,
      onPress: () => navigation.navigate('PhotoUpload'),
      color: '#2196F3',
    },
    {
      title: '訂單管理',
      subtitle: '查看和處理客戶訂單',
      icon: 'receipt-outline' as const,
      onPress: () => navigation.navigate('OrderManagement'),
      color: '#9C27B0',
    },
    {
      title: '評價回覆',
      subtitle: '回覆客戶評價和建議',
      icon: 'chatbubble-outline' as const,
      onPress: () => navigation.navigate('ReviewReply'),
      color: '#607D8B',
    },
    {
      title: '營收分析',
      subtitle: '查看銷售數據和趨勢',
      icon: 'analytics-outline' as const,
      onPress: () => navigation.navigate('RevenueAnalytics'),
      color: '#795548',
    },
  ];

  const renderStatsCard = (title: string, value: string | number, icon: keyof typeof Ionicons.glyphMap, color: string) => (
    <View style={[styles.statsCard, { borderLeftColor: color }]}>
      <View style={styles.statsContent}>
        <Ionicons name={icon} size={24} color={color} />
        <View style={styles.statsText}>
          <Text style={styles.statsValue}>{value}</Text>
          <Text style={styles.statsTitle}>{title}</Text>
        </View>
      </View>
    </View>
  );

  const renderMenuItem = (item: typeof menuItems[0], index: number) => (
    <TouchableOpacity
      key={index}
      style={styles.menuItem}
      onPress={item.onPress}
    >
      <View style={[styles.menuIcon, { backgroundColor: item.color + '20' }]}>
        <Ionicons name={item.icon} size={24} color={item.color} />
      </View>
      <View style={styles.menuContent}>
        <Text style={styles.menuTitle}>{item.title}</Text>
        <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#ccc" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.greeting}>您好，{mockMerchantData.ownerName}</Text>
          <Text style={styles.restaurantName}>{mockMerchantData.restaurantName}</Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.statusSection}>
          <View style={styles.statusHeader}>
            <Text style={styles.statusTitle}>營業狀態</Text>
            <TouchableOpacity
              style={[
                styles.statusToggle,
                { backgroundColor: restaurantStatus === 'open' ? '#4CAF50' : '#F44336' }
              ]}
              onPress={handleStatusToggle}
            >
              <Text style={styles.statusText}>
                {restaurantStatus === 'open' ? '營業中' : '休息中'}
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.statusSubtitle}>
            點擊右側按鈕可切換營業狀態
          </Text>
        </View>

        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>今日概況</Text>
          <View style={styles.statsGrid}>
            {renderStatsCard('總評分', mockMerchantData.rating, 'star', '#FFD700')}
            {renderStatsCard('糖友善度', mockMerchantData.sugarFriendlyScore, 'leaf', '#4CAF50')}
            {renderStatsCard('本月訂單', mockMerchantData.totalOrders, 'receipt', '#2196F3')}
            {renderStatsCard('月營收', `$${mockMerchantData.monthlyRevenue.toLocaleString()}`, 'trending-up', '#FF9800')}
          </View>
        </View>

        <View style={styles.quickStats}>
          <View style={styles.quickStatItem}>
            <Text style={styles.quickStatNumber}>{mockMerchantData.menuItemsCount}</Text>
            <Text style={styles.quickStatLabel}>菜單項目</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.quickStatItem}>
            <Text style={styles.quickStatNumber}>{mockMerchantData.reviewsCount}</Text>
            <Text style={styles.quickStatLabel}>客戶評價</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.quickStatItem}>
            <Text style={styles.quickStatNumber}>24</Text>
            <Text style={styles.quickStatLabel}>今日瀏覽</Text>
          </View>
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>管理功能</Text>
          <View style={styles.menuGrid}>
            {menuItems.map((item, index) => renderMenuItem(item, index))}
          </View>
        </View>

        <View style={styles.helpSection}>
          <TouchableOpacity style={styles.helpItem} onPress={() => navigation.navigate('MerchantHelp')}>
            <Ionicons name="help-circle-outline" size={24} color="#4CAF50" />
            <View style={styles.helpContent}>
              <Text style={styles.helpTitle}>需要幫助？</Text>
              <Text style={styles.helpSubtitle}>查看使用指南或聯繫客服</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    fontSize: 14,
    color: '#666',
  },
  restaurantName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 2,
  },
  logoutButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  statusSection: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statusToggle: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statusText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  statusSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  statsSection: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  statsGrid: {
    gap: 15,
  },
  statsCard: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 12,
    borderLeftWidth: 4,
  },
  statsContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statsText: {
    marginLeft: 12,
  },
  statsValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  statsTitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  quickStats: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 10,
  },
  quickStatItem: {
    flex: 1,
    alignItems: 'center',
  },
  quickStatNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  quickStatLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  divider: {
    width: 1,
    height: 30,
    backgroundColor: '#eee',
  },
  menuSection: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
  },
  menuGrid: {
    gap: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  helpSection: {
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  helpItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  helpContent: {
    flex: 1,
    marginLeft: 15,
  },
  helpTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  helpSubtitle: {
    fontSize: 12,
    color: '#666',
  },
});