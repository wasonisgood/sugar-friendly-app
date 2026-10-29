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

export default function AIScanGuideScreen() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('food');
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null);

  const scanTypes = [
    {
      id: 'food',
      title: 'AI食物掃描',
      icon: 'camera',
      description: '拍照分析食物營養成分和糖友善建議',
    },
    {
      id: 'qr',
      title: 'QR碼掃描',
      icon: 'qr-code',
      description: '掃描菜單和食品包裝上的營養資訊',
    },
    {
      id: 'barcode',
      title: '條碼掃描',
      icon: 'barcode',
      description: '快速獲取包裝食品的詳細營養資料',
    },
  ];

  const foodScanSteps = [
    {
      step: 1,
      title: '開啟掃描功能',
      content: '點擊底部導航的「掃描」按鈕，選擇「AI食物掃描」',
      tips: '確保您已授權相機權限',
    },
    {
      step: 2,
      title: '拍攝食物照片',
      content: '將食物置於鏡頭中央，確保光線充足、食物清晰可見',
      tips: '建議從上方45度角拍攝，避免陰影遮擋',
    },
    {
      step: 3,
      title: 'AI分析處理',
      content: 'AI會自動識別食物類型並分析營養成分',
      tips: '分析過程約需3-5秒，請耐心等待',
    },
    {
      step: 4,
      title: '查看分析結果',
      content: '獲得詳細的營養資訊和糖友善建議',
      tips: '可點擊不同區塊查看更詳細說明',
    },
  ];

  const scanFeatures = [
    {
      id: '1',
      icon: 'analytics',
      title: '營養成分分析',
      summary: '詳細的營養資訊和熱量計算',
      details: [
        '• 熱量：精確計算每份食物的熱量含量',
        '• 碳水化合物：總碳水、纖維、糖分詳細分析',
        '• 蛋白質和脂肪：完整的宏量營養素資訊',
        '• 維生素礦物質：關鍵微量營養素含量',
        '• GI值估算：預測食物的升糖指數',
        '• 份量建議：根據您的健康狀況推薦適當份量',
      ],
    },
    {
      id: '2',
      icon: 'medical',
      title: '糖友善評估',
      summary: '專為糖尿病患者設計的健康建議',
      details: [
        '• 血糖影響評估：預測食物對血糖的影響程度',
        '• 食用建議：何時食用、搭配什麼最適合',
        '• 風險提醒：高糖高GI食物的特別提醒',
        '• 替代建議：推薦更健康的替代選擇',
        '• 個人化建議：基於您的健康檔案客製化建議',
        '• 醫師見解：整合專業醫療意見',
      ],
    },
    {
      id: '3',
      icon: 'time',
      title: '用餐時機建議',
      summary: '最佳用餐時間和搭配建議',
      details: [
        '• 最佳時段：建議食用的時間段',
        '• 運動建議：搭配適當的運動時機',
        '• 藥物提醒：是否需要調整藥物劑量',
        '• 血糖監測：建議的測量時機',
        '• 搭配食物：推薦的健康搭配組合',
        '• 注意事項：特殊情況下的注意事項',
      ],
    },
    {
      id: '4',
      icon: 'bookmark',
      title: '掃描記錄管理',
      summary: '完整的掃描歷史和趨勢分析',
      details: [
        '• 掃描歷史：查看所有掃描過的食物記錄',
        '• 營養趨勢：分析您的飲食模式變化',
        '• 收藏功能：儲存常吃的食物快速查詢',
        '• 分享功能：與醫師或營養師分享記錄',
        '• 數據導出：匯出詳細的營養分析報告',
        '• 提醒設定：設定定期掃描提醒',
      ],
    },
  ];

  const qrFeatures = [
    {
      title: '餐廳菜單掃描',
      description: '掃描餐廳提供的QR碼菜單，即時獲得糖友善分析',
      icon: 'restaurant',
    },
    {
      title: '營養標示掃描',
      description: '掃描食品包裝上的營養標示QR碼',
      icon: 'nutrition',
    },
    {
      title: '食譜分享掃描',
      description: '掃描食譜QR碼，獲得完整的製作指南和營養分析',
      icon: 'book',
    },
  ];

  const tips = [
    {
      icon: 'sunny',
      title: '光線條件',
      content: '在自然光下拍攝效果最佳，避免強烈陰影或反光',
    },
    {
      icon: 'resize',
      title: '拍攝角度',
      content: '建議從上方45度角拍攝，讓食物的立體感更明顯',
    },
    {
      icon: 'layers',
      title: '食物分離',
      content: '如果盤子裡有多種食物，儘量分開拍攝以提高識別準確度',
    },
    {
      icon: 'hand-left',
      title: '穩定拍攝',
      content: '保持手機穩定，避免模糊，可使用三腳架或手機支架',
    },
    {
      icon: 'wifi',
      title: '網路環境',
      content: '確保網路連線穩定，以獲得最快的AI分析速度',
    },
  ];

  const TabButton = ({ tab, title, icon }: any) => (
    <TouchableOpacity
      style={[styles.tabButton, activeTab === tab && styles.activeTab]}
      onPress={() => setActiveTab(tab)}
    >
      <Ionicons
        name={icon}
        size={20}
        color={activeTab === tab ? '#4CAF50' : '#666'}
      />
      <Text
        style={[
          styles.tabText,
          activeTab === tab && styles.activeTabText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );

  const StepCard = ({ step }: any) => (
    <View style={styles.stepCard}>
      <View style={styles.stepNumber}>
        <Text style={styles.stepNumberText}>{step.step}</Text>
      </View>
      <View style={styles.stepContent}>
        <Text style={styles.stepTitle}>{step.title}</Text>
        <Text style={styles.stepDescription}>{step.content}</Text>
        <View style={styles.tipContainer}>
          <Ionicons name="bulb" size={14} color="#ff9800" />
          <Text style={styles.tipText}>{step.tips}</Text>
        </View>
      </View>
    </View>
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
          <View>
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
          {feature.details.map((detail: string, index: number) => (
            <Text key={index} style={styles.featureDetailText}>
              {detail}
            </Text>
          ))}
        </View>
      )}
    </TouchableOpacity>
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
        <Text style={styles.headerTitle}>AI掃描教學</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.tabContainer}>
        {scanTypes.map((type) => (
          <TabButton
            key={type.id}
            tab={type.id}
            title={type.title}
            icon={type.icon}
          />
        ))}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'food' && (
          <>
            <View style={styles.introSection}>
              <View style={styles.introIcon}>
                <Ionicons name="camera" size={32} color="#4CAF50" />
              </View>
              <Text style={styles.introTitle}>AI食物掃描</Text>
              <Text style={styles.introDescription}>
                使用先進的AI技術，即時分析食物營養成分，為您提供專業的糖友善建議
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>使用步驟</Text>
              {foodScanSteps.map((step) => (
                <StepCard key={step.step} step={step} />
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>功能特色</Text>
              {scanFeatures.map((feature) => (
                <FeatureCard key={feature.id} feature={feature} />
              ))}
            </View>
          </>
        )}

        {activeTab === 'qr' && (
          <>
            <View style={styles.introSection}>
              <View style={styles.introIcon}>
                <Ionicons name="qr-code" size={32} color="#4CAF50" />
              </View>
              <Text style={styles.introTitle}>QR碼掃描</Text>
              <Text style={styles.introDescription}>
                快速掃描各種QR碼，獲取食物和菜單的詳細營養資訊
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>支援類型</Text>
              {qrFeatures.map((feature, index) => (
                <View key={index} style={styles.qrFeatureCard}>
                  <View style={styles.qrFeatureIcon}>
                    <Ionicons name={feature.icon} size={24} color="#4CAF50" />
                  </View>
                  <View style={styles.qrFeatureContent}>
                    <Text style={styles.qrFeatureTitle}>{feature.title}</Text>
                    <Text style={styles.qrFeatureDescription}>{feature.description}</Text>
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>掃描指南</Text>
              <View style={styles.guideCard}>
                <Text style={styles.guideStep}>1. 開啟QR掃描功能</Text>
                <Text style={styles.guideContent}>
                  在掃描頁面選擇「QR碼掃描」模式
                </Text>

                <Text style={styles.guideStep}>2. 對準QR碼</Text>
                <Text style={styles.guideContent}>
                  將QR碼置於畫面中央的掃描框內
                </Text>

                <Text style={styles.guideStep}>3. 自動識別</Text>
                <Text style={styles.guideContent}>
                  系統會自動識別並跳轉到相應的內容頁面
                </Text>
              </View>
            </View>
          </>
        )}

        {activeTab === 'barcode' && (
          <>
            <View style={styles.introSection}>
              <View style={styles.introIcon}>
                <Ionicons name="barcode" size={32} color="#4CAF50" />
              </View>
              <Text style={styles.introTitle}>條碼掃描</Text>
              <Text style={styles.introDescription}>
                掃描商品條碼，即時獲取包裝食品的營養資訊和糖友善評價
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>功能介紹</Text>
              <View style={styles.barcodeFeatures}>
                <View style={styles.barcodeFeature}>
                  <Ionicons name="search" size={20} color="#4CAF50" />
                  <Text style={styles.barcodeFeatureText}>商品資料庫查詢</Text>
                </View>
                <View style={styles.barcodeFeature}>
                  <Ionicons name="nutrition" size={20} color="#4CAF50" />
                  <Text style={styles.barcodeFeatureText}>營養標示解析</Text>
                </View>
                <View style={styles.barcodeFeature}>
                  <Ionicons name="warning" size={20} color="#4CAF50" />
                  <Text style={styles.barcodeFeatureText}>過敏原提醒</Text>
                </View>
                <View style={styles.barcodeFeature}>
                  <Ionicons name="star" size={20} color="#4CAF50" />
                  <Text style={styles.barcodeFeatureText}>糖友善評分</Text>
                </View>
              </View>
            </View>
          </>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>拍攝技巧</Text>
          {tips.map((tip, index) => (
            <View key={index} style={styles.tipCard}>
              <View style={styles.tipIcon}>
                <Ionicons name={tip.icon} size={20} color="#4CAF50" />
              </View>
              <View style={styles.tipContent}>
                <Text style={styles.tipTitle}>{tip.title}</Text>
                <Text style={styles.tipDescription}>{tip.content}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.actionSection}>
          <TouchableOpacity style={styles.tryButton}>
            <Ionicons name="camera" size={20} color="#fff" />
            <Text style={styles.tryButtonText}>立即體驗掃描</Text>
          </TouchableOpacity>
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  activeTab: {
    backgroundColor: '#e8f5e8',
  },
  tabText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 5,
    fontWeight: '500',
  },
  activeTabText: {
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
  section: {
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
  stepCard: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  stepNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  stepNumberText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  stepDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  tipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tipText: {
    fontSize: 12,
    color: '#ff9800',
    fontStyle: 'italic',
    marginLeft: 5,
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
  featureDetailText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
    marginBottom: 6,
  },
  qrFeatureCard: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
  },
  qrFeatureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e8f5e8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  qrFeatureContent: {
    flex: 1,
  },
  qrFeatureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  qrFeatureDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  guideCard: {
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
  },
  guideStep: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginTop: 15,
    marginBottom: 6,
  },
  guideContent: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 10,
  },
  barcodeFeatures: {
    paddingHorizontal: 20,
  },
  barcodeFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  barcodeFeatureText: {
    fontSize: 15,
    color: '#333',
    marginLeft: 12,
    fontWeight: '500',
  },
  tipCard: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  tipIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e8f5e8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  tipDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  actionSection: {
    backgroundColor: '#fff',
    marginTop: 10,
    padding: 20,
    alignItems: 'center',
  },
  tryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  tryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});