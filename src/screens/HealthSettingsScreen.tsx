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

export default function HealthSettingsScreen() {
  const navigation = useNavigation();

  const [healthSettings, setHealthSettings] = useState({
    diabetesType: '第2型糖尿病',
    bloodSugarTarget: { min: 70, max: 140 },
    medicationReminder: true,
    mealReminder: true,
    exerciseReminder: true,
    bloodSugarReminder: true,
    emergencyAlerts: true,
    shareWithDoctor: false,
    sugarFriendlyLevel: '中等',
  });

  const SettingItem = ({
    icon,
    title,
    subtitle,
    value,
    onPress,
    type = 'arrow'
  }: any) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
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
            onValueChange={onPress}
            trackColor={{ false: '#767577', true: '#4CAF50' }}
          />
        ) : (
          <>
            {typeof value === 'string' && (
              <Text style={styles.settingValue}>{value}</Text>
            )}
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </>
        )}
      </View>
    </TouchableOpacity>
  );

  const handleDiabetesTypePress = () => {
    Alert.alert(
      '糖尿病類型',
      '請選擇您的糖尿病類型',
      [
        { text: '第1型糖尿病', onPress: () => setHealthSettings({...healthSettings, diabetesType: '第1型糖尿病'}) },
        { text: '第2型糖尿病', onPress: () => setHealthSettings({...healthSettings, diabetesType: '第2型糖尿病'}) },
        { text: '妊娠糖尿病', onPress: () => setHealthSettings({...healthSettings, diabetesType: '妊娠糖尿病'}) },
        { text: '取消', style: 'cancel' },
      ]
    );
  };

  const handleSugarLevelPress = () => {
    Alert.alert(
      '糖友善等級',
      '請選擇您的糖友善飲食等級',
      [
        { text: '嚴格', onPress: () => setHealthSettings({...healthSettings, sugarFriendlyLevel: '嚴格'}) },
        { text: '中等', onPress: () => setHealthSettings({...healthSettings, sugarFriendlyLevel: '中等'}) },
        { text: '輕鬆', onPress: () => setHealthSettings({...healthSettings, sugarFriendlyLevel: '輕鬆'}) },
        { text: '取消', style: 'cancel' },
      ]
    );
  };

  const handleBloodSugarTarget = () => {
    Alert.alert('血糖目標', '血糖目標設定功能開發中');
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
        <Text style={styles.headerTitle}>健康設定</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>基本健康資訊</Text>
          <SettingItem
            icon="medical"
            title="糖尿病類型"
            value={healthSettings.diabetesType}
            onPress={handleDiabetesTypePress}
          />
          <SettingItem
            icon="fitness"
            title="糖友善等級"
            subtitle="控制飲食建議的嚴格程度"
            value={healthSettings.sugarFriendlyLevel}
            onPress={handleSugarLevelPress}
          />
          <SettingItem
            icon="analytics"
            title="血糖目標範圍"
            subtitle={`${healthSettings.bloodSugarTarget.min}-${healthSettings.bloodSugarTarget.max} mg/dL`}
            onPress={handleBloodSugarTarget}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>提醒設定</Text>
          <SettingItem
            icon="alarm"
            title="用藥提醒"
            subtitle="按時提醒您服用藥物"
            value={healthSettings.medicationReminder}
            onPress={(value: boolean) => setHealthSettings({...healthSettings, medicationReminder: value})}
            type="switch"
          />
          <SettingItem
            icon="restaurant"
            title="用餐提醒"
            subtitle="提醒您按時用餐"
            value={healthSettings.mealReminder}
            onPress={(value: boolean) => setHealthSettings({...healthSettings, mealReminder: value})}
            type="switch"
          />
          <SettingItem
            icon="walk"
            title="運動提醒"
            subtitle="提醒您進行適量運動"
            value={healthSettings.exerciseReminder}
            onPress={(value: boolean) => setHealthSettings({...healthSettings, exerciseReminder: value})}
            type="switch"
          />
          <SettingItem
            icon="water"
            title="血糖檢測提醒"
            subtitle="定時提醒檢測血糖"
            value={healthSettings.bloodSugarReminder}
            onPress={(value: boolean) => setHealthSettings({...healthSettings, bloodSugarReminder: value})}
            type="switch"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>安全與隱私</Text>
          <SettingItem
            icon="warning"
            title="緊急警報"
            subtitle="血糖異常時發送警報"
            value={healthSettings.emergencyAlerts}
            onPress={(value: boolean) => setHealthSettings({...healthSettings, emergencyAlerts: value})}
            type="switch"
          />
          <SettingItem
            icon="share"
            title="與醫生分享數據"
            subtitle="允許醫生查看您的健康數據"
            value={healthSettings.shareWithDoctor}
            onPress={(value: boolean) => setHealthSettings({...healthSettings, shareWithDoctor: value})}
            type="switch"
          />
        </View>

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
  placeholder: {
    width: 30,
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