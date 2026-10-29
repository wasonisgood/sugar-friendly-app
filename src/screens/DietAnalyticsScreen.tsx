import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

interface AnalyticsData {
  period: 'week' | 'month' | 'quarter';
  totalRecords: number;
  avgCalories: number;
  avgCarbs: number;
  avgSugar: number;
  avgBloodSugar: number;
  mealDistribution: {
    breakfast: number;
    lunch: number;
    dinner: number;
    snack: number;
  };
  sugarLevelDistribution: {
    low: number;
    medium: number;
    high: number;
  };
  topFoods: Array<{
    name: string;
    frequency: number;
    avgRating: number;
  }>;
  trends: {
    calories: number; // percentage change
    bloodSugar: number;
    lowSugarMeals: number;
  };
}

export default function DietAnalyticsScreen() {
  const navigation = useNavigation();
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'quarter'>('week');
  const [activeChart, setActiveChart] = useState<'nutrition' | 'bloodsugar' | 'trends'>('nutrition');

  const mockAnalytics: { [key: string]: AnalyticsData } = {
    week: {
      period: 'week',
      totalRecords: 28,
      avgCalories: 1750,
      avgCarbs: 185,
      avgSugar: 32,
      avgBloodSugar: 125,
      mealDistribution: {
        breakfast: 7,
        lunch: 7,
        dinner: 7,
        snack: 7,
      },
      sugarLevelDistribution: {
        low: 15,
        medium: 10,
        high: 3,
      },
      topFoods: [
        { name: '燕麥粥', frequency: 5, avgRating: 4.5 },
        { name: '糙米便當', frequency: 4, avgRating: 4.2 },
        { name: '蘋果', frequency: 6, avgRating: 4.8 },
      ],
      trends: {
        calories: -5.2,
        bloodSugar: -8.1,
        lowSugarMeals: 12.5,
      },
    },
    month: {
      period: 'month',
      totalRecords: 120,
      avgCalories: 1680,
      avgCarbs: 175,
      avgSugar: 28,
      avgBloodSugar: 122,
      mealDistribution: {
        breakfast: 30,
        lunch: 30,
        dinner: 30,
        snack: 30,
      },
      sugarLevelDistribution: {
        low: 68,
        medium: 42,
        high: 10,
      },
      topFoods: [
        { name: '燕麥粥', frequency: 20, avgRating: 4.6 },
        { name: '沙拉', frequency: 18, avgRating: 4.4 },
        { name: '蒸蛋', frequency: 15, avgRating: 4.3 },
      ],
      trends: {
        calories: -12.3,
        bloodSugar: -15.2,
        lowSugarMeals: 25.8,
      },
    },
  };

  const periods = [
    { key: 'week', label: '本週', icon: 'calendar' },
    { key: 'month', label: '本月', icon: 'calendar' },
    { key: 'quarter', label: '季度', icon: 'calendar' },
  ];

  const getCurrentData = (): AnalyticsData => {
    return mockAnalytics[selectedPeriod] || mockAnalytics.week;
  };

  const PeriodSelector = () => (
    <View style={styles.periodSelector}>
      {periods.map((period) => (
        <TouchableOpacity
          key={period.key}
          style={[
            styles.periodButton,
            selectedPeriod === period.key && styles.activePeriodButton,
          ]}
          onPress={() => setSelectedPeriod(period.key as any)}
        >
          <Ionicons
            name={period.icon as any}
            size={16}
            color={selectedPeriod === period.key ? '#4CAF50' : '#666'}
          />
          <Text
            style={[
              styles.periodText,
              selectedPeriod === period.key && styles.activePeriodText,
            ]}
          >
            {period.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const SummaryCards = ({ data }: { data: AnalyticsData }) => (
    <View style={styles.summaryCards}>
      <View style={styles.summaryRow}>
        <View style={styles.summaryCard}>
          <View style={styles.summaryIcon}>
            <Ionicons name="restaurant" size={20} color="#4CAF50" />
          </View>
          <Text style={styles.summaryValue}>{data.totalRecords}</Text>
          <Text style={styles.summaryLabel}>飲食記錄</Text>
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.summaryIcon}>
            <Ionicons name="flame" size={20} color="#ff5722" />
          </View>
          <Text style={styles.summaryValue}>{data.avgCalories}</Text>
          <Text style={styles.summaryLabel}>平均熱量</Text>
        </View>
      </View>

      <View style={styles.summaryRow}>
        <View style={styles.summaryCard}>
          <View style={styles.summaryIcon}>
            <Ionicons name="medical" size={20} color="#2196f3" />
          </View>
          <Text style={styles.summaryValue}>{data.avgBloodSugar}</Text>
          <Text style={styles.summaryLabel}>平均血糖</Text>
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.summaryIcon}>
            <Ionicons name="warning" size={20} color="#ff9800" />
          </View>
          <Text style={styles.summaryValue}>{data.sugarLevelDistribution.high}</Text>
          <Text style={styles.summaryLabel}>高糖餐數</Text>
        </View>
      </View>
    </View>
  );

  const TrendIndicator = ({ value, label }: { value: number; label: string }) => (
    <View style={styles.trendItem}>
      <View style={styles.trendHeader}>
        <Text style={styles.trendLabel}>{label}</Text>
        <View style={[styles.trendBadge, { backgroundColor: value >= 0 ? '#4CAF50' : '#f44336' }]}>
          <Ionicons
            name={value >= 0 ? 'trending-up' : 'trending-down'}
            size={12}
            color="#fff"
          />
          <Text style={styles.trendValue}>{Math.abs(value).toFixed(1)}%</Text>
        </View>
      </View>
      <Text style={styles.trendDescription}>
        {value >= 0 ? '比上期增加' : '比上期減少'}
      </Text>
    </View>
  );

  const ChartToggle = () => (
    <View style={styles.chartToggle}>
      {[
        { key: 'nutrition', label: '營養分析', icon: 'nutrition' },
        { key: 'bloodsugar', label: '血糖趨勢', icon: 'medical' },
        { key: 'trends', label: '變化趨勢', icon: 'trending-up' },
      ].map((chart) => (
        <TouchableOpacity
          key={chart.key}
          style={[
            styles.chartToggleButton,
            activeChart === chart.key && styles.activeChartToggleButton,
          ]}
          onPress={() => setActiveChart(chart.key as any)}
        >
          <Ionicons
            name={chart.icon as any}
            size={16}
            color={activeChart === chart.key ? '#4CAF50' : '#666'}
          />
          <Text
            style={[
              styles.chartToggleText,
              activeChart === chart.key && styles.activeChartToggleText,
            ]}
          >
            {chart.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const NutritionChart = ({ data }: { data: AnalyticsData }) => (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>營養攝取分析</Text>

      <View style={styles.nutritionBars}>
        {[
          { label: '熱量', value: data.avgCalories, max: 2000, unit: 'kcal', color: '#ff5722' },
          { label: '碳水', value: data.avgCarbs, max: 250, unit: 'g', color: '#2196f3' },
          { label: '糖分', value: data.avgSugar, max: 50, unit: 'g', color: '#f44336' },
        ].map((item) => (
          <View key={item.label} style={styles.nutritionBar}>
            <View style={styles.nutritionBarHeader}>
              <Text style={styles.nutritionBarLabel}>{item.label}</Text>
              <Text style={styles.nutritionBarValue}>{item.value} {item.unit}</Text>
            </View>
            <View style={styles.progressBarContainer}>
              <View
                style={[
                  styles.progressBarFill,
                  {
                    width: `${Math.min((item.value / item.max) * 100, 100)}%`,
                    backgroundColor: item.color,
                  },
                ]}
              />
            </View>
            <Text style={styles.progressBarPercentage}>
              {Math.round((item.value / item.max) * 100)}% 建議量
            </Text>
          </View>
        ))}
      </View>
    </View>
  );

  const BloodSugarChart = ({ data }: { data: AnalyticsData }) => (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>血糖控制狀況</Text>

      <View style={styles.bloodSugarStats}>
        <View style={styles.bloodSugarStat}>
          <Text style={styles.bloodSugarValue}>{data.avgBloodSugar}</Text>
          <Text style={styles.bloodSugarLabel}>平均血糖</Text>
          <Text style={styles.bloodSugarUnit}>mg/dL</Text>
        </View>

        <View style={styles.bloodSugarRange}>
          <Text style={styles.rangeTitle}>目標範圍</Text>
          <View style={styles.rangeBar}>
            <View style={styles.rangeIndicator} />
            <Text style={styles.rangeText}>80-130</Text>
          </View>
        </View>
      </View>

      <View style={styles.bloodSugarTrend}>
        <Text style={styles.trendTitle}>本期表現</Text>
        <View style={styles.trendStats}>
          <View style={styles.trendStat}>
            <Text style={styles.trendStatValue}>78%</Text>
            <Text style={styles.trendStatLabel}>在目標範圍</Text>
          </View>
          <View style={styles.trendStat}>
            <Text style={styles.trendStatValue}>5</Text>
            <Text style={styles.trendStatLabel}>超標次數</Text>
          </View>
          <View style={styles.trendStat}>
            <Text style={styles.trendStatValue}>2</Text>
            <Text style={styles.trendStatLabel}>偏低次數</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const TrendsChart = ({ data }: { data: AnalyticsData }) => (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>健康趨勢</Text>

      <View style={styles.trendsContainer}>
        <TrendIndicator value={data.trends.calories} label="熱量控制" />
        <TrendIndicator value={data.trends.bloodSugar} label="血糖控制" />
        <TrendIndicator value={data.trends.lowSugarMeals} label="低糖餐比例" />
      </View>

      <View style={styles.achievementsContainer}>
        <Text style={styles.achievementsTitle}>本期成就</Text>
        <View style={styles.achievements}>
          <View style={styles.achievement}>
            <Ionicons name="trophy" size={20} color="#ffc107" />
            <Text style={styles.achievementText}>連續7天記錄飲食</Text>
          </View>
          <View style={styles.achievement}>
            <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
            <Text style={styles.achievementText}>血糖控制良好</Text>
          </View>
          <View style={styles.achievement}>
            <Ionicons name="star" size={20} color="#ff9800" />
            <Text style={styles.achievementText}>低糖餐比例提升</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const TopFoodsSection = ({ data }: { data: AnalyticsData }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>常吃食物</Text>
      {data.topFoods.map((food, index) => (
        <View key={index} style={styles.foodItem}>
          <View style={styles.foodRank}>
            <Text style={styles.rankNumber}>{index + 1}</Text>
          </View>
          <View style={styles.foodInfo}>
            <Text style={styles.foodName}>{food.name}</Text>
            <Text style={styles.foodFrequency}>食用 {food.frequency} 次</Text>
          </View>
          <View style={styles.foodRating}>
            <Ionicons name="star" size={16} color="#ffc107" />
            <Text style={styles.ratingText}>{food.avgRating}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  const MealDistributionSection = ({ data }: { data: AnalyticsData }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>餐別分佈</Text>
      <View style={styles.mealDistribution}>
        {[
          { key: 'breakfast', label: '早餐', icon: 'sunny', color: '#ff9800' },
          { key: 'lunch', label: '午餐', icon: 'sunny', color: '#ffc107' },
          { key: 'dinner', label: '晚餐', icon: 'moon', color: '#3f51b5' },
          { key: 'snack', label: '點心', icon: 'cafe', color: '#9c27b0' },
        ].map((meal) => (
          <View key={meal.key} style={styles.mealDistributionItem}>
            <View style={[styles.mealIcon, { backgroundColor: `${meal.color}20` }]}>
              <Ionicons name={meal.icon as any} size={16} color={meal.color} />
            </View>
            <Text style={styles.mealLabel}>{meal.label}</Text>
            <Text style={styles.mealCount}>
              {(data.mealDistribution as any)[meal.key]} 次
            </Text>
          </View>
        ))}
      </View>
    </View>
  );

  const currentData = getCurrentData();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>飲食分析</Text>
        <TouchableOpacity style={styles.exportButton}>
          <Ionicons name="download" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <PeriodSelector />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <SummaryCards data={currentData} />

        <ChartToggle />

        {activeChart === 'nutrition' && <NutritionChart data={currentData} />}
        {activeChart === 'bloodsugar' && <BloodSugarChart data={currentData} />}
        {activeChart === 'trends' && <TrendsChart data={currentData} />}

        <TopFoodsSection data={currentData} />

        <MealDistributionSection data={currentData} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>建議改進</Text>
          <View style={styles.suggestions}>
            <View style={styles.suggestion}>
              <Ionicons name="bulb" size={16} color="#ff9800" />
              <Text style={styles.suggestionText}>
                可以增加更多低糖水果作為點心選擇
              </Text>
            </View>
            <View style={styles.suggestion}>
              <Ionicons name="nutrition" size={16} color="#4CAF50" />
              <Text style={styles.suggestionText}>
                蛋白質攝取量略低，建議增加豆類食品
              </Text>
            </View>
            <View style={styles.suggestion}>
              <Ionicons name="time" size={16} color="#2196f3" />
              <Text style={styles.suggestionText}>
                保持規律的用餐時間有助於血糖穩定
              </Text>
            </View>
          </View>
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
  exportButton: {
    padding: 5,
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  periodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 10,
    borderRadius: 16,
    backgroundColor: '#f5f5f5',
  },
  activePeriodButton: {
    backgroundColor: '#e8f5e8',
  },
  periodText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
    fontWeight: '500',
  },
  activePeriodText: {
    color: '#4CAF50',
  },
  content: {
    flex: 1,
  },
  summaryCards: {
    padding: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginRight: 10,
    alignItems: 'center',
  },
  summaryIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#666',
  },
  chartToggle: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  chartToggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 10,
    borderRadius: 16,
    backgroundColor: '#f5f5f5',
  },
  activeChartToggleButton: {
    backgroundColor: '#e8f5e8',
  },
  chartToggleText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
    fontWeight: '500',
  },
  activeChartToggleText: {
    color: '#4CAF50',
  },
  chartContainer: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 12,
    padding: 20,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  nutritionBars: {
    marginTop: 10,
  },
  nutritionBar: {
    marginBottom: 20,
  },
  nutritionBarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  nutritionBarLabel: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  nutritionBarValue: {
    fontSize: 14,
    color: '#666',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    marginBottom: 4,
  },
  progressBarFill: {
    height: 8,
    borderRadius: 4,
  },
  progressBarPercentage: {
    fontSize: 12,
    color: '#999',
  },
  bloodSugarStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  bloodSugarStat: {
    alignItems: 'center',
    marginRight: 30,
  },
  bloodSugarValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  bloodSugarLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  bloodSugarUnit: {
    fontSize: 10,
    color: '#999',
  },
  bloodSugarRange: {
    flex: 1,
  },
  rangeTitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  rangeBar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rangeIndicator: {
    width: 60,
    height: 6,
    backgroundColor: '#4CAF50',
    borderRadius: 3,
    marginRight: 8,
  },
  rangeText: {
    fontSize: 12,
    color: '#333',
  },
  bloodSugarTrend: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  trendTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 10,
  },
  trendStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  trendStat: {
    alignItems: 'center',
  },
  trendStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  trendStatLabel: {
    fontSize: 10,
    color: '#666',
    marginTop: 4,
  },
  trendsContainer: {
    marginTop: 10,
  },
  trendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  trendHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendLabel: {
    fontSize: 14,
    color: '#333',
    marginRight: 10,
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  trendValue: {
    fontSize: 12,
    color: '#fff',
    marginLeft: 4,
    fontWeight: '500',
  },
  trendDescription: {
    fontSize: 12,
    color: '#666',
  },
  achievementsContainer: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  achievementsTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 10,
  },
  achievements: {
    flexDirection: 'column',
  },
  achievement: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  achievementText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 8,
  },
  section: {
    backgroundColor: '#fff',
    margin: 20,
    marginTop: 0,
    borderRadius: 12,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  foodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  foodRank: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rankNumber: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
  foodInfo: {
    flex: 1,
  },
  foodName: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  foodFrequency: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  foodRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: '#333',
    marginLeft: 4,
  },
  mealDistribution: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  mealDistributionItem: {
    width: (width - 80) / 2,
    alignItems: 'center',
    marginBottom: 15,
  },
  mealIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  mealLabel: {
    fontSize: 12,
    color: '#333',
    marginBottom: 4,
  },
  mealCount: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  suggestions: {
    marginTop: 10,
  },
  suggestion: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  suggestionText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 8,
    flex: 1,
    lineHeight: 18,
  },
});