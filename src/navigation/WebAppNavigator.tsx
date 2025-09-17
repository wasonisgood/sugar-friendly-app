import React, { useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import WebNavigation from '../components/WebNavigation';
import WebHomeScreen from '../screens/WebHomeScreen';
import MapScreen from '../screens/MapScreen';
import DistrictsScreen from '../screens/DistrictsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import WebModal from '../components/WebModal';

export default function WebAppNavigator() {
  const [currentRoute, setCurrentRoute] = useState('home');
  const [merchantModalConfig, setMerchantModalConfig] = useState({
    visible: false,
    title: '',
    message: '',
    buttons: [] as Array<{text: string; onPress: () => void; style?: 'default' | 'cancel' | 'destructive'}>
  });

  if (Platform.OS !== 'web') {
    return null;
  }

  const showMerchantOptionsModal = () => {
    setMerchantModalConfig({
      visible: true,
      title: '商家管理',
      message: '請選擇您要進行的操作：\n\n🏢 餐廳登錄 - 加入糖友善認證餐廳\n📊 商家管理 - 管理餐廳資訊與菜單',
      buttons: [
        { text: '取消', style: 'cancel', onPress: () => setMerchantModalConfig(prev => ({ ...prev, visible: false })) },
        { text: '餐廳登錄', onPress: () => {
          setMerchantModalConfig(prev => ({ ...prev, visible: false }));
          // 導航到餐廳登錄頁面
        }},
        { text: '商家管理', onPress: () => {
          setMerchantModalConfig(prev => ({ ...prev, visible: false }));
          // 導航到商家管理頁面
        }}
      ]
    });
  };

  const renderScreen = () => {
    switch (currentRoute) {
      case 'home':
        return <WebHomeScreen />;
      case 'search':
        return <MapScreen />;
      case 'districts':
        return <DistrictsScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <WebHomeScreen />;
    }
  };

  return (
    <View style={styles.container}>
      <WebNavigation
        currentRoute={currentRoute}
        onNavigate={setCurrentRoute}
        onMerchantAction={showMerchantOptionsModal}
      />
      <View style={styles.content}>
        {renderScreen()}
      </View>

      <WebModal
        visible={merchantModalConfig.visible}
        title={merchantModalConfig.title}
        message={merchantModalConfig.message}
        buttons={merchantModalConfig.buttons}
        onClose={() => setMerchantModalConfig(prev => ({ ...prev, visible: false }))}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
  },
});