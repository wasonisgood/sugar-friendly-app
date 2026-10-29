import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function RevenueAnalyticsScreen() {
  const navigation = useNavigation();
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const revenueData = {
    today: {
      revenue: 8500,
      orders: 23,
      avgOrderValue: 370,
      growth: 12.5,
    },
    week: {
      revenue: 56000,
      orders: 156,
      avgOrderValue: 359,
      growth: 8.3,
    },
    month: {
      revenue: 245000,
      orders: 678,
      avgOrderValue: 361,
      growth: 15.2,
    },
  };

  const topMenuItems = [
    { name: '低糖燕麥粥', sales: 156, revenue: 12480, percentage: 15.2 },
    { name: '蒸蛋豆腐', sales: 134, revenue: 16080, percentage: 13.8 },
    { name: '糖友善沙拉', sales: 98, revenue: 14700, percentage: 10.1 },
    { name: '健康套餐', sales: 87, revenue: 17400, percentage: 8.9 },
    { name: '無糖飲料', sales: 245, revenue: 11025, percentage: 25.2 },
  ];

  const dailyRevenue = [
    { day: '週一', revenue: 7200 },
    { day: '週二', revenue: 6800 },
    { day: '週三', revenue: 8100 },
    { day: '週四', revenue: 7900 },
    { day: '週五', revenue: 9500 },
    { day: '週六', revenue: 12200 },
    { day: '週日', revenue: 10800 },
  ];

  const peakHours = [
    { time: '11:00-12:00', orders: 45, percentage: 28 },
    { time: '12:00-13:00', orders: 62, percentage: 38 },
    { time: '13:00-14:00', orders: 38, percentage: 23 },
    { time: '17:00-18:00', orders: 32, percentage: 20 },
    { time: '18:00-19:00', orders: 41, percentage: 25 },
    { time: '19:00-20:00', orders: 28, percentage: 17 },
  ];

  const currentData = revenueData[selectedPeriod as keyof typeof revenueData];

  const formatCurrency = (amount: number) => {
    return `NT$ ${amount.toLocaleString()}`;
  };

  const getGrowthColor = (growth: number) => {
    return growth >= 0 ? '#4CAF50' : '#F44336';
  };

  const StatCard = ({ title, value, subtitle, icon, growth }: any) => (
    <View style={styles.statCard}>
      <View style={styles.statHeader}>
        <Ionicons name={icon} size={24} color="#4CAF50" />
        {growth !== undefined && (
          <View style={[styles.growthBadge, { backgroundColor: getGrowthColor(growth) }]}>
            <Text style={styles.growthText}>
              {growth >= 0 ? '+' : ''}{growth.toFixed(1)}%
            </Text>
          </View>
        )}
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
      {subtitle && <Text style={styles.statSubtitle}>{subtitle}</Text>}
    </View>
  );

  const ChartBar = ({ data }: any) => {
    const maxRevenue = Math.max(...dailyRevenue.map(item => item.revenue));

    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>本週營收趨勢</Text>
        <View style={styles.chart}>
          {dailyRevenue.map((item, index) => {
            const height = (item.revenue / maxRevenue) * 120;
            return (
              <View key={index} style={styles.barContainer}>
                <View style={styles.barWrapper}>
                  <View style={[styles.bar, { height }]} />
                </View>
                <Text style={styles.barLabel}>{item.day}</Text>
                <Text style={styles.barValue}>{(item.revenue / 1000).toFixed(1)}k</Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  const TopMenuItem = ({ item, index }: any) => (
    <View style={styles.menuItem}>
      <View style={styles.menuRank}>
        <Text style={styles.rankNumber}>{index + 1}</Text>
      </View>
      <View style={styles.menuInfo}>
        <Text style={styles.menuName}>{item.name}</Text>
        <Text style={styles.menuStats}>
          銷量: {item.sales} | 營收: {formatCurrency(item.revenue)}
        </Text>
      </View>
      <Text style={styles.menuPercentage}>{item.percentage}%</Text>
    </View>
  );

  const PeakHourItem = ({ item }: any) => (
    <View style={styles.peakHourItem}>
      <Text style={styles.peakTime}>{item.time}</Text>
      <View style={styles.peakBar}>
        <View style={[styles.peakProgress, { width: `${item.percentage * 2}%` }]} />
      </View>
      <Text style={styles.peakOrders}>{item.orders}單</Text>
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
        <Text style={styles.headerTitle}>營收分析</Text>
        <TouchableOpacity style={styles.exportButton}>
          <Ionicons name="download" size={24} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      <View style={styles.periodSelector}>
        <TouchableOpacity
          style={[styles.periodButton, selectedPeriod === 'today' && styles.activePeriod]}
          onPress={() => setSelectedPeriod('today')}
        >
          <Text style={[styles.periodText, selectedPeriod === 'today' && styles.activePeriodText]}>
            今日
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.periodButton, selectedPeriod === 'week' && styles.activePeriod]}
          onPress={() => setSelectedPeriod('week')}
        >
          <Text style={[styles.periodText, selectedPeriod === 'week' && styles.activePeriodText]}>
            本週
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.periodButton, selectedPeriod === 'month' && styles.activePeriod]}
          onPress={() => setSelectedPeriod('month')}
        >
          <Text style={[styles.periodText, selectedPeriod === 'month' && styles.activePeriodText]}>
            本月
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.statsGrid}>
          <StatCard
            title="總營收"
            value={formatCurrency(currentData.revenue)}
            icon="trending-up"
            growth={currentData.growth}
          />
          <StatCard
            title="訂單數量"
            value={currentData.orders.toString()}
            subtitle="筆訂單"
            icon="receipt"
          />
          <StatCard
            title="平均客單價"
            value={formatCurrency(currentData.avgOrderValue)}
            icon="card"
          />
          <StatCard
            title="糖友善評分"
            value="4.8"
            subtitle="滿分 5.0"
            icon="leaf"
          />
        </View>

        <ChartBar data={dailyRevenue} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>熱銷商品排行</Text>
          <View style={styles.topMenuList}>
            {topMenuItems.map((item, index) => (
              <TopMenuItem key={index} item={item} index={index} />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>尖峰時段分析</Text>
          <View style={styles.peakHoursList}>
            {peakHours.map((item, index) => (
              <PeakHourItem key={index} item={item} />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>經營洞察</Text>
          <View style={styles.insightContainer}>
            <View style={styles.insightItem}>
              <Ionicons name="bulb" size={20} color="#FF9800" />
              <Text style={styles.insightText}>
                午餐時段(12:00-13:00)訂單量最高，建議增加人手
              </Text>
            </View>
            <View style={styles.insightItem}>
              <Ionicons name="trending-up" size={20} color="#4CAF50" />
              <Text style={styles.insightText}>
                低糖燕麥粥是最受歡迎商品，可考慮推出相關套餐
              </Text>
            </View>
            <View style={styles.insightItem}>
              <Ionicons name="calendar" size={20} color="#2196F3" />
              <Text style={styles.insightText}>
                週末營收較高，可規劃特別活動吸引更多客人
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>快速操作</Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="document-text" size={24} color="#4CAF50" />
              <Text style={styles.actionButtonText}>匯出報表</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="analytics" size={24} color="#2196F3" />
              <Text style={styles.actionButtonText}>詳細分析</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="settings" size={24} color="#FF9800" />
              <Text style={styles.actionButtonText}>設定目標</Text>
            </TouchableOpacity>
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
    padding: 20,
    justifyContent: 'space-around',
  },
  periodButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 20,
    marginHorizontal: 5,
    backgroundColor: '#f0f0f0',
  },
  activePeriod: {
    backgroundColor: '#4CAF50',
  },
  periodText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activePeriodText: {
    color: '#fff',
  },
  content: {
    flex: 1,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    gap: 15,
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    width: (width - 55) / 2,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  growthBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  growthText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  statTitle: {
    fontSize: 12,
    color: '#666',
  },
  statSubtitle: {
    fontSize: 10,
    color: '#999',
    marginTop: 2,
  },
  chartContainer: {
    backgroundColor: '#fff',
    margin: 20,
    marginTop: 0,
    borderRadius: 15,
    padding: 20,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 160,
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
  },
  barWrapper: {
    height: 120,
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  bar: {
    backgroundColor: '#4CAF50',
    width: 20,
    borderRadius: 10,
  },
  barLabel: {
    fontSize: 10,
    color: '#666',
    marginBottom: 2,
  },
  barValue: {
    fontSize: 10,
    color: '#333',
    fontWeight: 'bold',
  },
  section: {
    backgroundColor: '#fff',
    margin: 20,
    marginTop: 0,
    borderRadius: 15,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  topMenuList: {
    gap: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  menuRank: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  rankNumber: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  menuInfo: {
    flex: 1,
  },
  menuName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  menuStats: {
    fontSize: 12,
    color: '#666',
  },
  menuPercentage: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  peakHoursList: {
    gap: 12,
  },
  peakHourItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  peakTime: {
    fontSize: 12,
    color: '#333',
    width: 80,
  },
  peakBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    marginHorizontal: 10,
  },
  peakProgress: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  peakOrders: {
    fontSize: 12,
    color: '#666',
    width: 40,
    textAlign: 'right',
  },
  insightContainer: {
    gap: 15,
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  insightText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 15,
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
  },
  actionButtonText: {
    fontSize: 12,
    color: '#333',
    marginTop: 5,
    fontWeight: '500',
  },
});