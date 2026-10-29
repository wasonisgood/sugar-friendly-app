import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';

const { width } = Dimensions.get('window');

interface DietRecord {
  id: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  food: string;
  calories: number;
  carbs: number;
  sugar: number;
  time: string;
  bloodSugar?: {
    before?: number;
    after?: number;
  };
  sugarLevel: 'low' | 'medium' | 'high';
  image?: string;
}

interface DayData {
  date: string;
  records: DietRecord[];
  totalCalories: number;
  totalCarbs: number;
  totalSugar: number;
  avgBloodSugar?: number;
}

type DietCalendarScreenNavigationProp = StackNavigationProp<RootStackParamList>;

export default function DietCalendarScreen() {
  const navigation = useNavigation<DietCalendarScreenNavigationProp>();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeView, setActiveView] = useState<'calendar' | 'weekly' | 'monthly'>('calendar');
  const [showBloodSugarModal, setShowBloodSugarModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<DietRecord | null>(null);
  const [bloodSugarValue, setBloodSugarValue] = useState('');
  const [bloodSugarType, setBloodSugarType] = useState<'before' | 'after' | 'random'>('before');

  // 模擬數據
  const mockData: { [key: string]: DayData } = {
    '2024-01-15': {
      date: '2024-01-15',
      totalCalories: 1850,
      totalCarbs: 220,
      totalSugar: 45,
      avgBloodSugar: 125,
      records: [
        {
          id: '1',
          type: 'breakfast',
          food: '燕麥粥配藍莓',
          calories: 320,
          carbs: 58,
          sugar: 12,
          time: '08:30',
          bloodSugar: { before: 110, after: 140 },
          sugarLevel: 'low',
        },
        {
          id: '2',
          type: 'lunch',
          food: '糙米雞胸肉便當',
          calories: 650,
          carbs: 85,
          sugar: 8,
          time: '12:45',
          bloodSugar: { before: 115, after: 165 },
          sugarLevel: 'medium',
        },
        {
          id: '3',
          type: 'snack',
          food: '蘋果',
          calories: 95,
          carbs: 25,
          sugar: 19,
          time: '15:30',
          sugarLevel: 'medium',
        },
        {
          id: '4',
          type: 'dinner',
          food: '鮭魚沙拉',
          calories: 785,
          carbs: 52,
          sugar: 6,
          time: '19:15',
          bloodSugar: { before: 120, after: 145 },
          sugarLevel: 'low',
        },
      ],
    },
    [formatDate(selectedDate)]: {
      date: formatDate(selectedDate),
      totalCalories: 1650,
      totalCarbs: 180,
      totalSugar: 35,
      avgBloodSugar: 118,
      records: [
        {
          id: '5',
          type: 'breakfast',
          food: '全麥吐司配酪梨',
          calories: 280,
          carbs: 32,
          sugar: 4,
          time: '07:45',
          bloodSugar: { before: 105, after: 125 },
          sugarLevel: 'low',
        },
      ],
    },
  };

  function formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  function formatDisplayDate(date: Date): string {
    return date.toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    });
  }

  const getCurrentDayData = (): DayData => {
    const dateKey = formatDate(selectedDate);
    return mockData[dateKey] || {
      date: dateKey,
      records: [],
      totalCalories: 0,
      totalCarbs: 0,
      totalSugar: 0,
    };
  };

  const mealTypes = [
    { key: 'breakfast', label: '早餐', icon: 'sunny', color: '#ff9800' },
    { key: 'lunch', label: '午餐', icon: 'sunny', color: '#ffc107' },
    { key: 'dinner', label: '晚餐', icon: 'moon', color: '#3f51b5' },
    { key: 'snack', label: '點心', icon: 'cafe', color: '#9c27b0' },
  ];

  const quickActions = [
    {
      id: 'scan',
      title: 'AI掃描',
      subtitle: '拍照分析食物',
      icon: 'camera',
      color: '#4CAF50',
      onPress: () => {
        // 跳轉到掃描頁面
        navigation.navigate('Scanner');
      },
    },
    {
      id: 'search',
      title: '搜尋食物',
      subtitle: '從資料庫選擇',
      icon: 'search',
      color: '#2196F3',
      onPress: () => {
        Alert.alert('搜尋食物', '開啟食物資料庫');
      },
    },
    {
      id: 'manual',
      title: '手動輸入',
      subtitle: '自訂營養資訊',
      icon: 'create',
      color: '#FF5722',
      onPress: () => {
        setShowAddModal(true);
      },
    },
    {
      id: 'blood_sugar',
      title: '血糖記錄',
      subtitle: '記錄血糖值',
      icon: 'medical',
      color: '#E91E63',
      onPress: () => {
        setShowBloodSugarModal(true);
      },
    },
  ];

  const getSugarLevelColor = (level: string) => {
    switch (level) {
      case 'low':
        return '#4CAF50';
      case 'medium':
        return '#ff9800';
      case 'high':
        return '#f44336';
      default:
        return '#666';
    }
  };

  const getSugarLevelText = (level: string) => {
    switch (level) {
      case 'low':
        return '低糖';
      case 'medium':
        return '中糖';
      case 'high':
        return '高糖';
      default:
        return '未知';
    }
  };

  const CalendarNavigation = () => (
    <View style={styles.calendarNav}>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => {
          const newDate = new Date(selectedDate);
          newDate.setDate(newDate.getDate() - 1);
          setSelectedDate(newDate);
        }}
      >
        <Ionicons name="chevron-back" size={24} color="#333" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.dateDisplay}>
        <Text style={styles.selectedDateText}>{formatDisplayDate(selectedDate)}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => {
          const newDate = new Date(selectedDate);
          newDate.setDate(newDate.getDate() + 1);
          setSelectedDate(newDate);
        }}
      >
        <Ionicons name="chevron-forward" size={24} color="#333" />
      </TouchableOpacity>
    </View>
  );

  const ViewToggle = () => (
    <View style={styles.viewToggle}>
      {[
        { key: 'calendar', label: '日曆', icon: 'calendar' },
        { key: 'weekly', label: '週檢視', icon: 'list' },
        { key: 'monthly', label: '月檢視', icon: 'stats-chart' },
      ].map((view) => (
        <TouchableOpacity
          key={view.key}
          style={[
            styles.viewToggleButton,
            activeView === view.key && styles.activeViewToggleButton,
          ]}
          onPress={() => setActiveView(view.key as any)}
        >
          <Ionicons
            name={view.icon as any}
            size={16}
            color={activeView === view.key ? '#4CAF50' : '#666'}
          />
          <Text
            style={[
              styles.viewToggleText,
              activeView === view.key && styles.activeViewToggleText,
            ]}
          >
            {view.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const NutritionSummary = ({ data }: { data: DayData }) => (
    <View style={styles.nutritionSummary}>
      <Text style={styles.summaryTitle}>今日營養總覽</Text>
      <View style={styles.summaryRow}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>{data.totalCalories}</Text>
          <Text style={styles.summaryLabel}>熱量 (kcal)</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>{data.totalCarbs}g</Text>
          <Text style={styles.summaryLabel}>碳水化合物</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>{data.totalSugar}g</Text>
          <Text style={styles.summaryLabel}>糖分</Text>
        </View>
        {data.avgBloodSugar && (
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>{data.avgBloodSugar}</Text>
            <Text style={styles.summaryLabel}>平均血糖</Text>
          </View>
        )}
      </View>
    </View>
  );

  const MealSection = ({ mealType, records }: { mealType: any; records: DietRecord[] }) => {
    const mealRecords = records.filter(r => r.type === mealType.key);

    return (
      <View style={styles.mealSection}>
        <View style={styles.mealHeader}>
          <View style={styles.mealHeaderLeft}>
            <View style={[styles.mealIcon, { backgroundColor: `${mealType.color}20` }]}>
              <Ionicons name={mealType.icon} size={20} color={mealType.color} />
            </View>
            <Text style={styles.mealTitle}>{mealType.label}</Text>
          </View>
          <TouchableOpacity
            style={[styles.addButton, { borderColor: mealType.color }]}
            onPress={() => setShowAddModal(true)}
          >
            <Ionicons name="add" size={16} color={mealType.color} />
          </TouchableOpacity>
        </View>

        {mealRecords.length > 0 ? (
          mealRecords.map((record) => (
            <TouchableOpacity
              key={record.id}
              style={styles.foodRecord}
              onPress={() => navigation.navigate('DietRecordDetail', { recordId: record.id })}
            >
              <View style={styles.recordLeft}>
                <Text style={styles.foodName}>{record.food}</Text>
                <Text style={styles.foodDetails}>
                  {record.calories} kcal • {record.carbs}g 碳水 • {record.sugar}g 糖
                </Text>
                <Text style={styles.recordTime}>{record.time}</Text>
              </View>
              <View style={styles.recordRight}>
                <View
                  style={[
                    styles.sugarLevelBadge,
                    { backgroundColor: getSugarLevelColor(record.sugarLevel) },
                  ]}
                >
                  <Text style={styles.sugarLevelText}>
                    {getSugarLevelText(record.sugarLevel)}
                  </Text>
                </View>
                {record.bloodSugar && (
                  <Text style={styles.bloodSugarText}>
                    🩸 {record.bloodSugar.before} → {record.bloodSugar.after}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyMeal}>
            <Text style={styles.emptyMealText}>尚未記錄 {mealType.label}</Text>
          </View>
        )}
      </View>
    );
  };

  const QuickActions = () => (
    <View style={styles.quickActions}>
      <Text style={styles.quickActionsTitle}>快速操作</Text>
      <View style={styles.quickActionsGrid}>
        {quickActions.map((action) => (
          <TouchableOpacity
            key={action.id}
            style={styles.quickActionButton}
            onPress={action.onPress}
          >
            <View style={[styles.quickActionIcon, { backgroundColor: `${action.color}20` }]}>
              <Ionicons name={action.icon as any} size={24} color={action.color} />
            </View>
            <Text style={styles.quickActionTitle}>{action.title}</Text>
            <Text style={styles.quickActionSubtitle}>{action.subtitle}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const BloodSugarModal = () => (
    <Modal
      visible={showBloodSugarModal}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={() => setShowBloodSugarModal(false)}>
            <Text style={styles.modalCancel}>取消</Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>記錄血糖</Text>
          <TouchableOpacity
            onPress={() => {
              if (bloodSugarValue.trim()) {
                Alert.alert('記錄成功', `血糖值 ${bloodSugarValue} mg/dL 已記錄`);
                setBloodSugarValue('');
                setShowBloodSugarModal(false);
              }
            }}
          >
            <Text style={styles.modalSave}>保存</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalContent}>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>測量時機</Text>
            <View style={styles.bloodSugarTypeSelector}>
              {[
                { key: 'before', label: '餐前', color: '#2196f3' },
                { key: 'after', label: '餐後', color: '#ff9800' },
                { key: 'random', label: '隨機', color: '#9c27b0' },
              ].map((type) => (
                <TouchableOpacity
                  key={type.key}
                  style={[
                    styles.bloodSugarTypeOption,
                    bloodSugarType === type.key && styles.activeBloodSugarType,
                    { borderColor: type.color },
                  ]}
                  onPress={() => setBloodSugarType(type.key as any)}
                >
                  <Text
                    style={[
                      styles.bloodSugarTypeText,
                      bloodSugarType === type.key && { color: type.color },
                    ]}
                  >
                    {type.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>血糖值 (mg/dL)</Text>
            <TextInput
              style={styles.bloodSugarInput}
              placeholder="輸入血糖值"
              value={bloodSugarValue}
              onChangeText={setBloodSugarValue}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.bloodSugarGuide}>
            <Text style={styles.guideTitle}>參考範圍</Text>
            <View style={styles.guideItem}>
              <View style={[styles.guideColor, { backgroundColor: '#4CAF50' }]} />
              <Text style={styles.guideText}>正常範圍：70-100 mg/dL (空腹)</Text>
            </View>
            <View style={styles.guideItem}>
              <View style={[styles.guideColor, { backgroundColor: '#ff9800' }]} />
              <Text style={styles.guideText}>邊界值：100-125 mg/dL (空腹)</Text>
            </View>
            <View style={styles.guideItem}>
              <View style={[styles.guideColor, { backgroundColor: '#f44336' }]} />
              <Text style={styles.guideText}>偏高：≥126 mg/dL (空腹)</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );

  const AddModal = () => (
    <Modal
      visible={showAddModal}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={() => setShowAddModal(false)}>
            <Text style={styles.modalCancel}>取消</Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>添加飲食記錄</Text>
          <TouchableOpacity>
            <Text style={styles.modalSave}>保存</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalContent}>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>餐別</Text>
            <View style={styles.mealTypeSelector}>
              {mealTypes.map((meal) => (
                <TouchableOpacity key={meal.key} style={styles.mealTypeOption}>
                  <Text style={styles.mealTypeText}>{meal.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>食物名稱</Text>
            <TextInput
              style={styles.textInput}
              placeholder="輸入食物名稱"
            />
          </View>

          <View style={styles.formRow}>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>熱量 (kcal)</Text>
              <TextInput
                style={styles.textInput}
                placeholder="0"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>碳水 (g)</Text>
              <TextInput
                style={styles.textInput}
                placeholder="0"
                keyboardType="numeric"
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );

  const currentDayData = getCurrentDayData();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>飲食日曆</Text>
        <TouchableOpacity
          style={styles.headerAction}
          onPress={() => navigation.navigate('DietAnalytics')}
        >
          <Ionicons name="analytics" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ViewToggle />
      <CalendarNavigation />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <NutritionSummary data={currentDayData} />

        {mealTypes.map((mealType) => (
          <MealSection
            key={mealType.key}
            mealType={mealType}
            records={currentDayData.records}
          />
        ))}

        <QuickActions />
      </ScrollView>

      <AddModal />
      <BloodSugarModal />
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
  headerAction: {
    padding: 5,
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  viewToggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 10,
    borderRadius: 16,
    backgroundColor: '#f5f5f5',
  },
  activeViewToggleButton: {
    backgroundColor: '#e8f5e8',
  },
  viewToggleText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
    fontWeight: '500',
  },
  activeViewToggleText: {
    color: '#4CAF50',
  },
  calendarNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
  },
  navButton: {
    padding: 8,
  },
  dateDisplay: {
    flex: 1,
    alignItems: 'center',
  },
  selectedDateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  content: {
    flex: 1,
  },
  nutritionSummary: {
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 20,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#666',
  },
  mealSection: {
    backgroundColor: '#fff',
    marginBottom: 10,
    paddingVertical: 15,
  },
  mealHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  mealHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mealIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  mealTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  addButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  foodRecord: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  recordLeft: {
    flex: 1,
  },
  foodName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  foodDetails: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  recordTime: {
    fontSize: 12,
    color: '#999',
  },
  recordRight: {
    alignItems: 'flex-end',
  },
  sugarLevelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 4,
  },
  sugarLevelText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '500',
  },
  bloodSugarText: {
    fontSize: 11,
    color: '#666',
  },
  emptyMeal: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
  },
  emptyMealText: {
    fontSize: 14,
    color: '#999',
  },
  quickActions: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 20,
  },
  quickActionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionButton: {
    width: (width - 60) / 2,
    alignItems: 'center',
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  quickActionSubtitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalCancel: {
    fontSize: 16,
    color: '#666',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  modalSave: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '500',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mealTypeSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  mealTypeOption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    marginRight: 10,
    marginBottom: 10,
  },
  mealTypeText: {
    fontSize: 14,
    color: '#333',
  },
  bloodSugarTypeSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  bloodSugarTypeOption: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 2,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  activeBloodSugarType: {
    backgroundColor: '#fff',
  },
  bloodSugarTypeText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  bloodSugarInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 15,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  bloodSugarGuide: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
  },
  guideTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  guideItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  guideColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  guideText: {
    fontSize: 14,
    color: '#666',
  },
});