import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function NotificationSettingsScreen() {
  const navigation = useNavigation();

  const [notifications, setNotifications] = useState({
    pushNotifications: true,
    emailNotifications: false,
    smsNotifications: false,
    healthReminders: {
      medication: true,
      bloodSugar: true,
      meal: true,
      exercise: false,
    },
    restaurantUpdates: {
      newRestaurants: true,
      menuUpdates: false,
      specialOffers: true,
      nearbyRestaurants: true,
    },
    socialFeatures: {
      reviewResponses: true,
      friendActivity: false,
      recommendations: true,
    },
    systemNotifications: {
      appUpdates: true,
      maintenance: true,
      security: true,
    },
  });

  const [quietHours, setQuietHours] = useState({
    enabled: true,
    startTime: '22:00',
    endTime: '08:00',
  });

  const updateNotification = (category: string, key: string, value: boolean) => {
    setNotifications(prev => {
      const categoryData = prev[category as keyof typeof prev] as any;
      return {
        ...prev,
        [category]: {
          ...categoryData,
          [key]: value,
        },
      };
    });
  };

  const SettingSection = ({ title, children }: any) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );

  const SettingItem = ({
    icon,
    title,
    subtitle,
    value,
    onValueChange,
    type = 'switch'
  }: any) => (
    <View style={styles.settingItem}>
      <View style={styles.settingLeft}>
        <Ionicons name={icon} size={24} color="#4CAF50" />
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      <View style={styles.settingRight}>
        {type === 'switch' ? (
          <Switch
            value={value}
            onValueChange={onValueChange}
            trackColor={{ false: '#767577', true: '#4CAF50' }}
          />
        ) : (
          <TouchableOpacity onPress={onValueChange}>
            <Text style={styles.settingValue}>{value}</Text>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const handleQuietHoursTime = () => {
    Alert.alert('勿擾時間設定', '時間選擇功能開發中');
  };

  const handleTestNotification = () => {
    Alert.alert('測試通知', '通知測試已發送！');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>通知設定</Text>
        <TouchableOpacity
          style={styles.testButton}
          onPress={handleTestNotification}
        >
          <Text style={styles.testButtonText}>測試</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <SettingSection title="通知方式">
          <SettingItem
            icon="notifications"
            title="推送通知"
            subtitle="接收應用程式推送通知"
            value={notifications.pushNotifications}
            onValueChange={(value: boolean) => setNotifications({...notifications, pushNotifications: value})}
          />
          <SettingItem
            icon="mail"
            title="電子郵件通知"
            subtitle="接收重要訊息的電子郵件"
            value={notifications.emailNotifications}
            onValueChange={(value: boolean) => setNotifications({...notifications, emailNotifications: value})}
          />
          <SettingItem
            icon="chatbubble"
            title="簡訊通知"
            subtitle="接收緊急提醒簡訊"
            value={notifications.smsNotifications}
            onValueChange={(value: boolean) => setNotifications({...notifications, smsNotifications: value})}
          />
        </SettingSection>

        <SettingSection title="健康提醒">
          <SettingItem
            icon="medical"
            title="用藥提醒"
            subtitle="提醒您按時服藥"
            value={notifications.healthReminders.medication}
            onValueChange={(value: boolean) => updateNotification('healthReminders', 'medication', value)}
          />
          <SettingItem
            icon="water"
            title="血糖檢測提醒"
            subtitle="定時提醒檢測血糖"
            value={notifications.healthReminders.bloodSugar}
            onValueChange={(value: boolean) => updateNotification('healthReminders', 'bloodSugar', value)}
          />
          <SettingItem
            icon="restaurant"
            title="用餐提醒"
            subtitle="提醒您按時用餐"
            value={notifications.healthReminders.meal}
            onValueChange={(value: boolean) => updateNotification('healthReminders', 'meal', value)}
          />
          <SettingItem
            icon="walk"
            title="運動提醒"
            subtitle="提醒您進行適量運動"
            value={notifications.healthReminders.exercise}
            onValueChange={(value: boolean) => updateNotification('healthReminders', 'exercise', value)}
          />
        </SettingSection>

        <SettingSection title="餐廳資訊">
          <SettingItem
            icon="storefront"
            title="新餐廳通知"
            subtitle="附近有新的糖友善餐廳"
            value={notifications.restaurantUpdates.newRestaurants}
            onValueChange={(value: boolean) => updateNotification('restaurantUpdates', 'newRestaurants', value)}
          />
          <SettingItem
            icon="menu"
            title="菜單更新"
            subtitle="收藏餐廳的菜單更新"
            value={notifications.restaurantUpdates.menuUpdates}
            onValueChange={(value: boolean) => updateNotification('restaurantUpdates', 'menuUpdates', value)}
          />
          <SettingItem
            icon="pricetag"
            title="特惠資訊"
            subtitle="餐廳優惠活動通知"
            value={notifications.restaurantUpdates.specialOffers}
            onValueChange={(value: boolean) => updateNotification('restaurantUpdates', 'specialOffers', value)}
          />
          <SettingItem
            icon="location"
            title="附近餐廳"
            subtitle="根據位置推薦附近餐廳"
            value={notifications.restaurantUpdates.nearbyRestaurants}
            onValueChange={(value: boolean) => updateNotification('restaurantUpdates', 'nearbyRestaurants', value)}
          />
        </SettingSection>

        <SettingSection title="社交功能">
          <SettingItem
            icon="chatbubbles"
            title="評價回覆"
            subtitle="餐廳回覆您的評價時通知"
            value={notifications.socialFeatures.reviewResponses}
            onValueChange={(value: boolean) => updateNotification('socialFeatures', 'reviewResponses', value)}
          />
          <SettingItem
            icon="people"
            title="朋友動態"
            subtitle="朋友的餐廳評價和收藏"
            value={notifications.socialFeatures.friendActivity}
            onValueChange={(value: boolean) => updateNotification('socialFeatures', 'friendActivity', value)}
          />
          <SettingItem
            icon="bulb"
            title="個人化推薦"
            subtitle="根據您的喜好推薦餐廳"
            value={notifications.socialFeatures.recommendations}
            onValueChange={(value: boolean) => updateNotification('socialFeatures', 'recommendations', value)}
          />
        </SettingSection>

        <SettingSection title="系統通知">
          <SettingItem
            icon="download"
            title="應用程式更新"
            subtitle="新版本發布通知"
            value={notifications.systemNotifications.appUpdates}
            onValueChange={(value: boolean) => updateNotification('systemNotifications', 'appUpdates', value)}
          />
          <SettingItem
            icon="construct"
            title="系統維護"
            subtitle="系統維護時間通知"
            value={notifications.systemNotifications.maintenance}
            onValueChange={(value: boolean) => updateNotification('systemNotifications', 'maintenance', value)}
          />
          <SettingItem
            icon="shield"
            title="安全提醒"
            subtitle="帳戶安全相關通知"
            value={notifications.systemNotifications.security}
            onValueChange={(value: boolean) => updateNotification('systemNotifications', 'security', value)}
          />
        </SettingSection>

        <SettingSection title="勿擾時間">
          <SettingItem
            icon="moon"
            title="啟用勿擾時間"
            subtitle="在指定時間內關閉通知"
            value={quietHours.enabled}
            onValueChange={(value: boolean) => setQuietHours({...quietHours, enabled: value})}
          />
          {quietHours.enabled && (
            <>
              <SettingItem
                icon="time"
                title="開始時間"
                value={quietHours.startTime}
                onValueChange={handleQuietHoursTime}
                type="arrow"
              />
              <SettingItem
                icon="time"
                title="結束時間"
                value={quietHours.endTime}
                onValueChange={handleQuietHoursTime}
                type="arrow"
              />
            </>
          )}
        </SettingSection>

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>保存設定</Text>
        </TouchableOpacity>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  testButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#4CAF50',
    borderRadius: 20,
  },
  testButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  section: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 15,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    padding: 20,
    paddingBottom: 10,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    marginLeft: 15,
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  settingSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValue: {
    fontSize: 14,
    color: '#666',
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    marginHorizontal: 20,
    marginVertical: 20,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});