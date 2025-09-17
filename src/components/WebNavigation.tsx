import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

interface WebNavigationProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  onMerchantAction?: () => void;
}

export default function WebNavigation({ currentRoute, onNavigate, onMerchantAction }: WebNavigationProps) {
  const { user, logout } = useAuth();

  if (Platform.OS !== 'web') {
    return null;
  }

  const navItems = [
    { key: 'home', label: '首頁', icon: 'home' },
    { key: 'search', label: '搜尋餐廳', icon: 'search' },
    { key: 'districts', label: '商圈', icon: 'location' },
    { key: 'profile', label: '個人資料', icon: 'person' },
  ];

  return (
    <View style={styles.navbar}>
      <View style={styles.container}>
        {/* Logo and Brand */}
        <View style={styles.brand}>
          <Ionicons name="leaf" size={32} color="#4CAF50" />
          <Text style={styles.brandText}>糖友善</Text>
        </View>

        {/* Navigation Items */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.navItems}
          contentContainerStyle={styles.navItemsContent}
        >
          {navItems.map((item) => (
            <TouchableOpacity
              key={item.key}
              style={[
                styles.navItem,
                currentRoute === item.key && styles.activeNavItem
              ]}
              onPress={() => onNavigate(item.key)}
            >
              <Ionicons
                name={item.icon as any}
                size={20}
                color={currentRoute === item.key ? '#4CAF50' : '#6c757d'}
              />
              <Text style={[
                styles.navText,
                currentRoute === item.key && styles.activeNavText
              ]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* User Menu */}
        <View style={styles.userMenu}>
          {onMerchantAction && (
            <TouchableOpacity
              style={styles.merchantButton}
              onPress={onMerchantAction}
            >
              <Text style={styles.merchantButtonText}>商家登入</Text>
            </TouchableOpacity>
          )}
          {user && (
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.name || user.email}</Text>
              <TouchableOpacity onPress={logout} style={styles.logoutButton}>
                <Ionicons name="log-out-outline" size={20} color="#6c757d" />
                <Text style={styles.logoutText}>登出</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 1000,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 40,
  },
  brandText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginLeft: 8,
  },
  navItems: {
    flex: 1,
  },
  navItemsContent: {
    alignItems: 'center',
    gap: 8,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  activeNavItem: {
    backgroundColor: '#e8f5e8',
  },
  navText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6c757d',
    marginLeft: 6,
  },
  activeNavText: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  userMenu: {
    marginLeft: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  userName: {
    fontSize: 14,
    color: '#495057',
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  logoutText: {
    fontSize: 12,
    color: '#6c757d',
    marginLeft: 4,
  },
  merchantButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginRight: 20,
  },
  merchantButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});