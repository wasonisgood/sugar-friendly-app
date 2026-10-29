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

export default function HealthFeaturesScreen() {
  const navigation = useNavigation();
  const [activeCategory, setActiveCategory] = useState('overview');
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null);

  const categories = [
    {
      id: 'overview',
      title: '功能總覽',
      icon: 'grid',
    },
    {
      id: 'monitoring',
      title: '血糖監測',
      icon: 'analytics',
    },
    {
      id: 'diet',
      title: '飲食管理',
      icon: 'restaurant',
    },
    {
      id: 'lifestyle',
      title: '生活方式',
      icon: 'fitness',
    },
  ];

  const overviewFeatures = [
    {
      id: '1',
      icon: 'medical',
      title: '個人健康檔案',
      summary: '完整的糖尿病管理檔案系統',
      description: '建立和管理您的完整健康檔案，包括糖尿病類型、診斷時間、目前用藥、醫師資訊等。系統會根據您的健康狀況提供個人化的建議和提醒。',
      features: [
        '• 糖尿病類型設定（1型、2型、妊娠糖尿病等）',
        '• 診斷日期和病史記錄',
        '• 目前用藥清單和劑量',
        '• 醫療團隊聯絡資訊',
        '• 過敏史和注意事項',
        '• 家族病史記錄',
      ],
    },
    {
      id: '2',
      icon: 'target',
      title: '血糖目標設定',
      summary: '個人化的血糖控制目標',
      description: '根據您的年齡、糖尿病類型、併發症風險等因素，設定個人化的血糖控制目標。可選擇標準目標或自訂目標範圍。',
      features: [
        '• ADA標準目標範圍',
        '• 嚴格控制目標（年輕患者）',
        '• 寬鬆控制目標（高齡患者）',
        '• 自訂目標範圍',
        '• 餐前餐後不同目標',
        '• 特殊情況調整（生病、運動等）',
      ],
    },
    {
      id: '3',
      icon: 'notifications',
      title: '智能提醒系統',
      summary: '個人化的健康提醒和警示',
      description: '基於您的作息習慣和健康需求，提供智能化的提醒服務，幫助您建立良好的自我管理習慣。',
      features: [
        '• 血糖測量提醒',
        '• 用藥時間提醒',
        '• 用餐時間提醒',
        '• 運動提醒',
        '• 醫師回診提醒',
        '• 健康數據分析報告通知',
      ],
    },
  ];

  const monitoringFeatures = [
    {
      id: '4',
      icon: 'pulse',
      title: '血糖記錄與追蹤',
      summary: '便捷的血糖數據記錄和分析',
      description: '快速記錄血糖數據，自動分析趨勢變化，幫助您和醫師掌握血糖控制狀況。',
      features: [
        '• 快速血糖值輸入',
        '• 測量時間自動記錄',
        '• 餐前餐後標記',
        '• 血糖趨勢圖表',
        '• 異常值警示',
        '• 月報季報生成',
      ],
    },
    {
      id: '5',
      icon: 'stats-chart',
      title: '數據分析與報告',
      summary: '專業的血糖數據分析和報告',
      description: '深度分析您的血糖數據，生成專業報告，協助醫師調整治療方案。',
      features: [
        '• 平均血糖計算',
        '• 血糖變異度分析',
        '• 時間段血糖分佈',
        '• 高低血糖頻率統計',
        '• HbA1c估算',
        '• PDF報告匯出',
      ],
    },
    {
      id: '6',
      icon: 'warning',
      title: '血糖異常警示',
      summary: '即時的血糖異常檢測和處理建議',
      description: '當血糖值超出目標範圍時，立即提供警示和處理建議，預防急性併發症。',
      features: [
        '• 高血糖警示（>250mg/dL）',
        '• 低血糖警示（<70mg/dL）',
        '• 緊急處理指南',
        '• 緊急聯絡人通知',
        '• 就醫建議',
        '• 症狀記錄功能',
      ],
    },
  ];

  const dietFeatures = [
    {
      id: '7',
      icon: 'nutrition',
      title: '營養成分分析',
      summary: '詳細的食物營養分析和建議',
      description: '分析食物的營養成分，計算對血糖的影響，提供個人化的飲食建議。',
      features: [
        '• 碳水化合物計算',
        '• GI值和GL值評估',
        '• 熱量計算',
        '• 營養素分析',
        '• 份量建議',
        '• 血糖影響預測',
      ],
    },
    {
      id: '8',
      title: '餐後血糖預測',
      icon: 'trending-up',
      summary: 'AI預測餐後血糖變化',
      description: '基於食物成分和個人歷史數據，預測餐後血糖變化曲線。',
      features: [
        '• 餐後2小時血糖預測',
        '• 血糖峰值時間預測',
        '• 個人化修正係數',
        '• 運動影響計算',
        '• 藥物影響評估',
        '• 預測準確度學習',
      ],
    },
    {
      id: '9',
      icon: 'calendar',
      title: '飲食計劃制定',
      summary: '個人化的每日飲食計劃',
      description: '根據您的健康目標和喜好，制定個人化的飲食計劃。',
      features: [
        '• 一週飲食計劃',
        '• 熱量分配建議',
        '• 營養平衡檢查',
        '• 食材採購清單',
        '• 備餐時間安排',
        '• 計劃執行追蹤',
      ],
    },
  ];

  const lifestyleFeatures = [
    {
      id: '10',
      icon: 'walk',
      title: '運動管理',
      summary: '安全有效的運動指導',
      description: '提供適合糖尿病患者的運動建議，幫助改善血糖控制。',
      features: [
        '• 運動類型推薦',
        '• 運動強度指導',
        '• 運動前後血糖監測',
        '• 運動時間建議',
        '• 安全注意事項',
        '• 運動效果追蹤',
      ],
    },
    {
      id: '11',
      icon: 'moon',
      title: '睡眠品質追蹤',
      summary: '睡眠對血糖影響的分析',
      description: '記錄和分析睡眠品質對血糖控制的影響。',
      features: [
        '• 睡眠時間記錄',
        '• 睡眠品質評估',
        '• 夜間血糖監測',
        '• 睡眠與血糖相關性分析',
        '• 睡眠改善建議',
        '• 作息調整提醒',
      ],
    },
    {
      id: '12',
      icon: 'happy',
      title: '壓力管理',
      summary: '壓力對血糖的影響管理',
      description: '幫助管理壓力對血糖的影響，提供舒壓技巧。',
      features: [
        '• 壓力等級記錄',
        '• 壓力來源分析',
        '• 放鬆技巧指導',
        '• 冥想練習',
        '• 壓力與血糖關聯分析',
        '• 心理健康評估',
      ],
    },
  ];

  const getCurrentFeatures = () => {
    switch (activeCategory) {
      case 'overview':
        return overviewFeatures;
      case 'monitoring':
        return monitoringFeatures;
      case 'diet':
        return dietFeatures;
      case 'lifestyle':
        return lifestyleFeatures;
      default:
        return overviewFeatures;
    }
  };

  const CategoryTab = ({ category }: any) => (
    <TouchableOpacity
      style={[
        styles.categoryTab,
        activeCategory === category.id && styles.activeCategoryTab,
      ]}
      onPress={() => setActiveCategory(category.id)}
    >
      <Ionicons
        name={category.icon}
        size={18}
        color={activeCategory === category.id ? '#4CAF50' : '#666'}
      />
      <Text
        style={[
          styles.categoryTabText,
          activeCategory === category.id && styles.activeCategoryTabText,
        ]}
      >
        {category.title}
      </Text>
    </TouchableOpacity>
  );

  const FeatureCard = ({ feature }: any) => (
    <TouchableOpacity
      style={styles.featureCard}
      onPress={() =>
        setExpandedFeature(expandedFeature === feature.id ? null : feature.id)
      }
    >
      <View style={styles.featureHeader}>
        <View style={styles.featureLeft}>
          <View style={styles.featureIcon}>
            <Ionicons name={feature.icon} size={24} color="#4CAF50" />
          </View>
          <View style={styles.featureInfo}>
            <Text style={styles.featureTitle}>{feature.title}</Text>
            <Text style={styles.featureSummary}>{feature.summary}</Text>
          </View>
        </View>
        <Ionicons
          name={expandedFeature === feature.id ? 'chevron-up' : 'chevron-down'}
          size={20}
          color="#666"
        />
      </View>

      {expandedFeature === feature.id && (
        <View style={styles.featureDetails}>
          <Text style={styles.featureDescription}>{feature.description}</Text>
          <View style={styles.featureList}>
            <Text style={styles.featureListTitle}>功能特色：</Text>
            {feature.features.map((item: string, index: number) => (
              <Text key={index} style={styles.featureListItem}>
                {item}
              </Text>
            ))}
          </View>
        </View>
      )}
    </TouchableOpacity>
  );

  const getCategoryDescription = () => {
    switch (activeCategory) {
      case 'overview':
        return '糖友善提供全方位的健康管理功能，幫助您更好地控制糖尿病';
      case 'monitoring':
        return '智能血糖監測系統，讓血糖管理變得簡單有效';
      case 'diet':
        return '科學的飲食管理工具，享受美食的同時控制血糖';
      case 'lifestyle':
        return '全面的生活方式管理，從運動到睡眠的完整照護';
      default:
        return '';
    }
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
        <Text style={styles.headerTitle}>健康功能說明</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.categoryContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
        >
          {categories.map((category) => (
            <CategoryTab key={category.id} category={category} />
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.introSection}>
          <View style={styles.introIcon}>
            <Ionicons name="medical" size={32} color="#4CAF50" />
          </View>
          <Text style={styles.introTitle}>
            {categories.find(c => c.id === activeCategory)?.title}
          </Text>
          <Text style={styles.introDescription}>
            {getCategoryDescription()}
          </Text>
        </View>

        <View style={styles.featuresSection}>
          {getCurrentFeatures().map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </View>

        {activeCategory === 'overview' && (
          <View style={styles.quickAccessSection}>
            <Text style={styles.sectionTitle}>快速開始</Text>
            <TouchableOpacity style={styles.quickAccessCard}>
              <View style={styles.quickAccessIcon}>
                <Ionicons name="rocket" size={24} color="#4CAF50" />
              </View>
              <View style={styles.quickAccessContent}>
                <Text style={styles.quickAccessTitle}>設定健康檔案</Text>
                <Text style={styles.quickAccessDescription}>
                  完成基本健康資料設定，開始您的健康管理之旅
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickAccessCard}>
              <View style={styles.quickAccessIcon}>
                <Ionicons name="target" size={24} color="#4CAF50" />
              </View>
              <View style={styles.quickAccessContent}>
                <Text style={styles.quickAccessTitle}>設定血糖目標</Text>
                <Text style={styles.quickAccessDescription}>
                  根據醫師建議設定個人化的血糖控制目標
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.supportSection}>
          <View style={styles.supportCard}>
            <Ionicons name="people" size={24} color="#4CAF50" />
            <Text style={styles.supportTitle}>需要協助？</Text>
            <Text style={styles.supportDescription}>
              我們的客服團隊隨時為您提供專業支援
            </Text>
            <TouchableOpacity style={styles.supportButton}>
              <Text style={styles.supportButtonText}>聯絡客服</Text>
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
  placeholder: {
    width: 34,
  },
  categoryContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  categoryScroll: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  categoryTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  activeCategoryTab: {
    backgroundColor: '#e8f5e8',
  },
  categoryTabText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
    fontWeight: '500',
  },
  activeCategoryTabText: {
    color: '#4CAF50',
  },
  content: {
    flex: 1,
  },
  introSection: {
    backgroundColor: '#fff',
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  introIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#e8f5e8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  introTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  introDescription: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  featuresSection: {
    backgroundColor: '#fff',
    marginTop: 10,
    paddingVertical: 20,
  },
  featureCard: {
    marginHorizontal: 20,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  featureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  featureLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e8f5e8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  featureInfo: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  featureSummary: {
    fontSize: 13,
    color: '#666',
  },
  featureDetails: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  featureDescription: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
    marginBottom: 12,
  },
  featureList: {
    marginTop: 8,
  },
  featureListTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  featureListItem: {
    fontSize: 13,
    color: '#555',
    lineHeight: 20,
    marginBottom: 4,
  },
  quickAccessSection: {
    backgroundColor: '#fff',
    marginTop: 10,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  quickAccessCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  quickAccessIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e8f5e8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  quickAccessContent: {
    flex: 1,
  },
  quickAccessTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  quickAccessDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  supportSection: {
    backgroundColor: '#fff',
    marginTop: 10,
    padding: 20,
  },
  supportCard: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
  },
  supportTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 10,
    marginBottom: 8,
  },
  supportDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 15,
  },
  supportButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  supportButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});