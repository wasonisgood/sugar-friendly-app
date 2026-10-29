import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';

type HealthSettingsScreenNavigationProp = StackNavigationProp<RootStackParamList>;

export default function HealthSettingsScreen() {
  const navigation = useNavigation<HealthSettingsScreenNavigationProp>();

  const [healthSettings, setHealthSettings] = useState({
    healthGoal: '一般健康',
    diabetesType: '第2型糖尿病',
    bloodSugarTarget: { min: 70, max: 140 },
    medicationReminder: true,
    mealReminder: true,
    exerciseReminder: true,
    bloodSugarReminder: false,
    emergencyAlerts: false,
    shareWithDoctor: false,
    healthyEatingLevel: '中等',
    weightGoal: '維持體重',
    activityLevel: '中等活動',
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

  const handleHealthGoalPress = () => {
    Alert.alert(
      '健康目標',
      '請選擇您的主要健康目標',
      [
        { text: '一般健康', onPress: () => handleHealthGoalChange('一般健康') },
        { text: '糖尿病管理', onPress: () => handleHealthGoalChange('糖尿病管理') },
        { text: '減重', onPress: () => handleHealthGoalChange('減重') },
        { text: '血糖控制', onPress: () => handleHealthGoalChange('血糖控制') },
        { text: '心血管健康', onPress: () => handleHealthGoalChange('心血管健康') },
        { text: '取消', style: 'cancel' },
      ]
    );
  };

  const handleHealthGoalChange = (goal: string) => {
    const newSettings = { ...healthSettings, healthGoal: goal };

    // Adjust default settings based on health goal
    if (goal === '糖尿病管理' || goal === '血糖控制') {
      newSettings.bloodSugarReminder = true;
      newSettings.emergencyAlerts = true;
    } else {
      newSettings.bloodSugarReminder = false;
      newSettings.emergencyAlerts = false;
    }

    setHealthSettings(newSettings);
  };

  const handleDiabetesTypePress = () => {
    Alert.alert(
      '糖尿病類型',
      '請選擇您的糖尿病類型',
      [
        { text: '第1型糖尿病', onPress: () => setHealthSettings({...healthSettings, diabetesType: '第1型糖尿病'}) },
        { text: '第2型糖尿病', onPress: () => setHealthSettings({...healthSettings, diabetesType: '第2型糖尿病'}) },
        { text: '妊娠糖尿病', onPress: () => setHealthSettings({...healthSettings, diabetesType: '妊娠糖尿病'}) },
        { text: '前期糖尿病', onPress: () => setHealthSettings({...healthSettings, diabetesType: '前期糖尿病'}) },
        { text: '取消', style: 'cancel' },
      ]
    );
  };

  const handleHealthyEatingLevelPress = () => {
    Alert.alert(
      '健康飲食等級',
      '請選擇您的健康飲食控制等級',
      [
        { text: '嚴格', onPress: () => setHealthSettings({...healthSettings, healthyEatingLevel: '嚴格'}) },
        { text: '中等', onPress: () => setHealthSettings({...healthSettings, healthyEatingLevel: '中等'}) },
        { text: '輕鬆', onPress: () => setHealthSettings({...healthSettings, healthyEatingLevel: '輕鬆'}) },
        { text: '取消', style: 'cancel' },
      ]
    );
  };

  const handleWeightGoalPress = () => {
    Alert.alert(
      '體重目標',
      '請選擇您的體重管理目標',
      [
        { text: '減重', onPress: () => setHealthSettings({...healthSettings, weightGoal: '減重'}) },
        { text: '維持體重', onPress: () => setHealthSettings({...healthSettings, weightGoal: '維持體重'}) },
        { text: '增重', onPress: () => setHealthSettings({...healthSettings, weightGoal: '增重'}) },
        { text: '取消', style: 'cancel' },
      ]
    );
  };

  const handleActivityLevelPress = () => {
    Alert.alert(
      '活動水平',
      '請選擇您的日常活動水平',
      [
        { text: '低活動', onPress: () => setHealthSettings({...healthSettings, activityLevel: '低活動'}) },
        { text: '中等活動', onPress: () => setHealthSettings({...healthSettings, activityLevel: '中等活動'}) },
        { text: '高活動', onPress: () => setHealthSettings({...healthSettings, activityLevel: '高活動'}) },
        { text: '取消', style: 'cancel' },
      ]
    );
  };

  const handleBloodSugarTarget = () => {
    navigation.navigate('BloodSugarTarget');
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
          <Text style={styles.sectionTitle}>健康目標</Text>
          <SettingItem
            icon="heart"
            title="主要健康目標"
            subtitle="選擇您最關注的健康領域"
            value={healthSettings.healthGoal}
            onPress={handleHealthGoalPress}
          />
          <SettingItem
            icon="fitness"
            title="健康飲食等級"
            subtitle="控制飲食建議的嚴格程度"
            value={healthSettings.healthyEatingLevel}
            onPress={handleHealthyEatingLevelPress}
          />
          <SettingItem
            icon="scale"
            title="體重目標"
            subtitle="您的體重管理目標"
            value={healthSettings.weightGoal}
            onPress={handleWeightGoalPress}
          />
          <SettingItem
            icon="walk"
            title="活動水平"
            subtitle="您的日常活動強度"
            value={healthSettings.activityLevel}
            onPress={handleActivityLevelPress}
          />
        </View>

        {(healthSettings.healthGoal === '糖尿病管理' || healthSettings.healthGoal === '血糖控制') && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>糖尿病專項設定</Text>
            <SettingItem
              icon="medical"
              title="糖尿病類型"
              value={healthSettings.diabetesType}
              onPress={handleDiabetesTypePress}
            />
            <SettingItem
              icon="analytics"
              title="血糖目標範圍"
              subtitle={`${healthSettings.bloodSugarTarget.min}-${healthSettings.bloodSugarTarget.max} mg/dL`}
              onPress={handleBloodSugarTarget}
            />
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>提醒設定</Text>
          {(healthSettings.healthGoal === '糖尿病管理' || healthSettings.healthGoal === '血糖控制') && (
            <SettingItem
              icon="alarm"
              title="用藥提醒"
              subtitle="按時提醒您服用藥物"
              value={healthSettings.medicationReminder}
              onPress={(value: boolean) => setHealthSettings({...healthSettings, medicationReminder: value})}
              type="switch"
            />
          )}
          <SettingItem
            icon="restaurant"
            title="用餐提醒"
            subtitle="提醒您按時用餐"
            value={healthSettings.mealReminder}
            onPress={(value: boolean) => setHealthSettings({...healthSettings, mealReminder: value})}
            type="switch"
          />
          <SettingItem
            icon="fitness"
            title="運動提醒"
            subtitle="提醒您進行適量運動"
            value={healthSettings.exerciseReminder}
            onPress={(value: boolean) => setHealthSettings({...healthSettings, exerciseReminder: value})}
            type="switch"
          />
          {(healthSettings.healthGoal === '糖尿病管理' || healthSettings.healthGoal === '血糖控制') && (
            <SettingItem
              icon="water"
              title="血糖檢測提醒"
              subtitle="定時提醒檢測血糖"
              value={healthSettings.bloodSugarReminder}
              onPress={(value: boolean) => setHealthSettings({...healthSettings, bloodSugarReminder: value})}
              type="switch"
            />
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>安全與隱私</Text>
          {(healthSettings.healthGoal === '糖尿病管理' || healthSettings.healthGoal === '血糖控制') && (
            <SettingItem
              icon="warning"
              title="緊急警報"
              subtitle="血糖異常時發送警報"
              value={healthSettings.emergencyAlerts}
              onPress={(value: boolean) => setHealthSettings({...healthSettings, emergencyAlerts: value})}
              type="switch"
            />
          )}
          <SettingItem
            icon="share"
            title="與醫療專業人士分享數據"
            subtitle="允許醫生或營養師查看您的健康數據"
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