import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('window');

interface NutritionInfo {
  calories: number;
  carbs: number;
  sugar: number;
  protein: number;
  fat: number;
  fiber: number;
  sodium: number;
}

interface DietRecordDetail {
  id: string;
  food: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  time: string;
  date: string;
  nutrition: NutritionInfo;
  sugarLevel: 'low' | 'medium' | 'high';
  bloodSugar?: {
    before?: number;
    after?: number;
    twoHour?: number;
  };
  image?: string;
  notes?: string;
  ingredients?: string[];
  aiAnalysis?: {
    confidence: number;
    suggestions: string[];
    warnings: string[];
  };
}

export default function DietRecordDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [activeTab, setActiveTab] = useState<'overview' | 'nutrition' | 'bloodsugar' | 'analysis'>('overview');

  // 模擬詳細記錄數據
  const mockRecord: DietRecordDetail = {
    id: '1',
    food: '糙米雞胸肉便當',
    type: 'lunch',
    time: '12:45',
    date: '2024-01-15',
    nutrition: {
      calories: 650,
      carbs: 85,
      sugar: 8,
      protein: 45,
      fat: 12,
      fiber: 6,
      sodium: 980,
    },
    sugarLevel: 'medium',
    bloodSugar: {
      before: 115,
      after: 165,
      twoHour: 140,
    },
    image: '',
    notes: '今天的便當菜色不錯，但醬汁可能偏鹹',
    ingredients: ['糙米', '雞胸肉', '青菜', '胡蘿蔔', '醬汁'],
    aiAnalysis: {
      confidence: 87,
      suggestions: [
        '建議減少醬汁攝取量',
        '可搭配15分鐘散步幫助血糖控制',
        '下次可選擇蒸蛋取代醬汁',
      ],
      warnings: [
        '鈉含量較高，請注意水分攝取',
        '餐後血糖稍高，建議監測2小時後血糖',
      ],
    },
  };

  const mealTypeInfo = {
    breakfast: { label: '早餐', icon: 'sunny', color: '#ff9800' },
    lunch: { label: '午餐', icon: 'sunny', color: '#ffc107' },
    dinner: { label: '晚餐', icon: 'moon', color: '#3f51b5' },
    snack: { label: '點心', icon: 'cafe', color: '#9c27b0' },
  };

  const getSugarLevelColor = (level: string) => {
    switch (level) {
      case 'low': return '#4CAF50';
      case 'medium': return '#ff9800';
      case 'high': return '#f44336';
      default: return '#666';
    }
  };

  const getSugarLevelText = (level: string) => {
    switch (level) {
      case 'low': return '低糖';
      case 'medium': return '中糖';
      case 'high': return '高糖';
      default: return '未知';
    }
  };

  const TabButton = ({ tabKey, label, icon }: { tabKey: string; label: string; icon: string }) => (
    <TouchableOpacity
      style={[styles.tabButton, activeTab === tabKey && styles.activeTabButton]}
      onPress={() => setActiveTab(tabKey as any)}
    >
      <Ionicons
        name={icon as any}
        size={18}
        color={activeTab === tabKey ? '#4CAF50' : '#666'}
      />
      <Text style={[styles.tabText, activeTab === tabKey && styles.activeTabText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const OverviewTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.foodHeader}>
        <View style={styles.foodImageContainer}>
          <View style={styles.foodImagePlaceholder}>
            <Ionicons name="image" size={32} color="#ccc" />
          </View>
        </View>
        <View style={styles.foodInfo}>
          <Text style={styles.foodName}>{mockRecord.food}</Text>
          <View style={styles.mealTypeContainer}>
            <View style={[styles.mealTypeIcon, { backgroundColor: `${mealTypeInfo[mockRecord.type].color}20` }]}>
              <Ionicons
                name={mealTypeInfo[mockRecord.type].icon as any}
                size={16}
                color={mealTypeInfo[mockRecord.type].color}
              />
            </View>
            <Text style={styles.mealTypeText}>{mealTypeInfo[mockRecord.type].label}</Text>
            <Text style={styles.recordTime}>{mockRecord.time}</Text>
          </View>
          <View style={[styles.sugarLevelBadge, { backgroundColor: getSugarLevelColor(mockRecord.sugarLevel) }]}>
            <Text style={styles.sugarLevelText}>{getSugarLevelText(mockRecord.sugarLevel)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.quickStats}>
        <View style={styles.quickStatItem}>
          <Text style={styles.quickStatValue}>{mockRecord.nutrition.calories}</Text>
          <Text style={styles.quickStatLabel}>熱量</Text>
        </View>
        <View style={styles.quickStatItem}>
          <Text style={styles.quickStatValue}>{mockRecord.nutrition.carbs}g</Text>
          <Text style={styles.quickStatLabel}>碳水</Text>
        </View>
        <View style={styles.quickStatItem}>
          <Text style={styles.quickStatValue}>{mockRecord.nutrition.sugar}g</Text>
          <Text style={styles.quickStatLabel}>糖分</Text>
        </View>
        <View style={styles.quickStatItem}>
          <Text style={styles.quickStatValue}>{mockRecord.nutrition.protein}g</Text>
          <Text style={styles.quickStatLabel}>蛋白質</Text>
        </View>
      </View>

      {mockRecord.ingredients && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>主要成分</Text>
          <View style={styles.ingredientsList}>
            {mockRecord.ingredients.map((ingredient, index) => (
              <View key={index} style={styles.ingredientTag}>
                <Text style={styles.ingredientText}>{ingredient}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {mockRecord.notes && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>備註</Text>
          <Text style={styles.notesText}>{mockRecord.notes}</Text>
        </View>
      )}
    </View>
  );

  const NutritionTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.nutritionChart}>
        <Text style={styles.sectionTitle}>營養成分詳細</Text>

        {Object.entries({
          '熱量': { value: mockRecord.nutrition.calories, unit: 'kcal', color: '#ff5722' },
          '碳水化合物': { value: mockRecord.nutrition.carbs, unit: 'g', color: '#2196f3' },
          '糖分': { value: mockRecord.nutrition.sugar, unit: 'g', color: '#f44336' },
          '蛋白質': { value: mockRecord.nutrition.protein, unit: 'g', color: '#4caf50' },
          '脂肪': { value: mockRecord.nutrition.fat, unit: 'g', color: '#ff9800' },
          '纖維': { value: mockRecord.nutrition.fiber, unit: 'g', color: '#795548' },
          '鈉': { value: mockRecord.nutrition.sodium, unit: 'mg', color: '#9c27b0' },
        }).map(([name, info]) => (
          <View key={name} style={styles.nutritionItem}>
            <View style={styles.nutritionLeft}>
              <View style={[styles.nutritionColor, { backgroundColor: info.color }]} />
              <Text style={styles.nutritionName}>{name}</Text>
            </View>
            <Text style={styles.nutritionValue}>{info.value} {info.unit}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>每日建議攝取比例</Text>
        <View style={styles.progressBar}>
          <View style={styles.progressFill} />
        </View>
        <Text style={styles.progressText}>約佔每日建議攝取量的 35%</Text>
      </View>
    </View>
  );

  const BloodSugarTab = () => (
    <View style={styles.tabContent}>
      {mockRecord.bloodSugar ? (
        <>
          <View style={styles.bloodSugarChart}>
            <Text style={styles.sectionTitle}>血糖變化</Text>
            <View style={styles.bloodSugarTimeline}>
              {[
                { label: '餐前', value: mockRecord.bloodSugar.before, time: '12:30' },
                { label: '餐後1小時', value: mockRecord.bloodSugar.after, time: '13:45' },
                { label: '餐後2小時', value: mockRecord.bloodSugar.twoHour, time: '14:45' },
              ].map((point, index) => (
                <View key={index} style={styles.bloodSugarPoint}>
                  <View style={styles.bloodSugarValue}>
                    <Text style={styles.bloodSugarNumber}>{point.value}</Text>
                    <Text style={styles.bloodSugarUnit}>mg/dL</Text>
                  </View>
                  <Text style={styles.bloodSugarLabel}>{point.label}</Text>
                  <Text style={styles.bloodSugarTime}>{point.time}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>血糖評估</Text>
            <View style={styles.assessmentCard}>
              <View style={styles.assessmentIcon}>
                <Ionicons name="trending-up" size={24} color="#ff9800" />
              </View>
              <View style={styles.assessmentContent}>
                <Text style={styles.assessmentTitle}>血糖反應中等</Text>
                <Text style={styles.assessmentDescription}>
                  餐後血糖上升了50mg/dL，在可接受範圍內。建議餐後散步15分鐘。
                </Text>
              </View>
            </View>
          </View>
        </>
      ) : (
        <View style={styles.emptyState}>
          <Ionicons name="medical" size={48} color="#ccc" />
          <Text style={styles.emptyStateTitle}>尚未記錄血糖</Text>
          <Text style={styles.emptyStateText}>點擊下方按鈕添加血糖記錄</Text>
          <TouchableOpacity style={styles.addBloodSugarButton}>
            <Text style={styles.addBloodSugarText}>添加血糖記錄</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  const AnalysisTab = () => (
    <View style={styles.tabContent}>
      {mockRecord.aiAnalysis && (
        <>
          <View style={styles.section}>
            <View style={styles.aiHeader}>
              <Ionicons name="sparkles" size={20} color="#4CAF50" />
              <Text style={styles.sectionTitle}>AI 分析</Text>
              <View style={styles.confidenceBadge}>
                <Text style={styles.confidenceText}>{mockRecord.aiAnalysis.confidence}% 信心度</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.subsectionTitle}>建議</Text>
            {mockRecord.aiAnalysis.suggestions.map((suggestion, index) => (
              <View key={index} style={styles.suggestionItem}>
                <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
                <Text style={styles.suggestionText}>{suggestion}</Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.subsectionTitle}>注意事項</Text>
            {mockRecord.aiAnalysis.warnings.map((warning, index) => (
              <View key={index} style={styles.warningItem}>
                <Ionicons name="warning" size={16} color="#ff9800" />
                <Text style={styles.warningText}>{warning}</Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.subsectionTitle}>相似食物推薦</Text>
            <View style={styles.similarFoods}>
              {['糙米雞腿便當', '藜麥沙拉', '蒸蛋便當'].map((food, index) => (
                <TouchableOpacity key={index} style={styles.similarFoodItem}>
                  <Text style={styles.similarFoodText}>{food}</Text>
                  <Ionicons name="chevron-forward" size={16} color="#666" />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>飲食詳細</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => Alert.alert('編輯', '開啟編輯模式')}
        >
          <Ionicons name="create" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabScroll}>
          <TabButton tabKey="overview" label="總覽" icon="eye" />
          <TabButton tabKey="nutrition" label="營養" icon="nutrition" />
          <TabButton tabKey="bloodsugar" label="血糖" icon="medical" />
          <TabButton tabKey="analysis" label="分析" icon="analytics" />
        </ScrollView>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'nutrition' && <NutritionTab />}
        {activeTab === 'bloodsugar' && <BloodSugarTab />}
        {activeTab === 'analysis' && <AnalysisTab />}
      </ScrollView>

      <View style={styles.actionBar}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="copy" size={20} color="#4CAF50" />
          <Text style={styles.actionButtonText}>複製記錄</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="share" size={20} color="#4CAF50" />
          <Text style={styles.actionButtonText}>分享</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton}>
          <Ionicons name="trash" size={20} color="#f44336" />
          <Text style={styles.deleteButtonText}>刪除</Text>
        </TouchableOpacity>
      </View>
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
  editButton: {
    padding: 5,
  },
  tabContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tabScroll: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 15,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  activeTabButton: {
    backgroundColor: '#e8f5e8',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
    fontWeight: '500',
  },
  activeTabText: {
    color: '#4CAF50',
  },
  content: {
    flex: 1,
  },
  tabContent: {
    padding: 20,
  },
  foodHeader: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  foodImageContainer: {
    marginRight: 15,
  },
  foodImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  foodInfo: {
    flex: 1,
  },
  foodName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  mealTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  mealTypeIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  mealTypeText: {
    fontSize: 14,
    color: '#666',
    marginRight: 10,
  },
  recordTime: {
    fontSize: 14,
    color: '#999',
  },
  sugarLevelBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  sugarLevelText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  quickStats: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    justifyContent: 'space-around',
  },
  quickStatItem: {
    alignItems: 'center',
  },
  quickStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 4,
  },
  quickStatLabel: {
    fontSize: 12,
    color: '#666',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  subsectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  ingredientsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  ingredientTag: {
    backgroundColor: '#e8f5e8',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  ingredientText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
  },
  notesText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  nutritionChart: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  nutritionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  nutritionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nutritionColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  nutritionName: {
    fontSize: 14,
    color: '#333',
  },
  nutritionValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    marginVertical: 10,
  },
  progressFill: {
    height: 8,
    backgroundColor: '#4CAF50',
    borderRadius: 4,
    width: '35%',
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  bloodSugarChart: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  bloodSugarTimeline: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  bloodSugarPoint: {
    alignItems: 'center',
  },
  bloodSugarValue: {
    alignItems: 'center',
    marginBottom: 8,
  },
  bloodSugarNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  bloodSugarUnit: {
    fontSize: 10,
    color: '#666',
  },
  bloodSugarLabel: {
    fontSize: 12,
    color: '#333',
    marginBottom: 2,
  },
  bloodSugarTime: {
    fontSize: 10,
    color: '#999',
  },
  assessmentCard: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#fff8e1',
    borderRadius: 12,
  },
  assessmentIcon: {
    marginRight: 12,
  },
  assessmentContent: {
    flex: 1,
  },
  assessmentTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  assessmentDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 15,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  addBloodSugarButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  addBloodSugarText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  confidenceBadge: {
    marginLeft: 'auto',
    backgroundColor: '#e8f5e8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  confidenceText: {
    fontSize: 10,
    color: '#4CAF50',
    fontWeight: '500',
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  suggestionText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 8,
    flex: 1,
    lineHeight: 18,
  },
  warningItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  warningText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 8,
    flex: 1,
    lineHeight: 18,
  },
  similarFoods: {
    marginTop: 10,
  },
  similarFoodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 8,
  },
  similarFoodText: {
    fontSize: 14,
    color: '#333',
  },
  actionBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  actionButtonText: {
    fontSize: 12,
    color: '#4CAF50',
    marginLeft: 5,
    fontWeight: '500',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginLeft: 'auto',
    borderRadius: 20,
    backgroundColor: '#ffebee',
  },
  deleteButtonText: {
    fontSize: 12,
    color: '#f44336',
    marginLeft: 5,
    fontWeight: '500',
  },
});