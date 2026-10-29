import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function RestaurantGuideScreen() {
  const navigation = useNavigation();
  const [expandedStep, setExpandedStep] = useState<string | null>(null);

  const guideSteps = [
    {
      id: '1',
      title: '搜尋與篩選餐廳',
      icon: 'search',
      summary: '學習如何快速找到符合糖友需求的餐廳',
      content: [
        '• 使用地圖功能：點擊底部「地圖」標籤，查看附近糖友善餐廳',
        '• 商圈瀏覽：選擇「商圈」查看各區域推薦餐廳',
        '• 搜尋功能：使用關鍵字搜尋特定餐廳或菜系',
        '• 篩選條件：',
        '  - 糖友善等級（低糖、中糖、高糖）',
        '  - 距離範圍（500m、1km、2km、5km）',
        '  - 評分等級（4星以上、3星以上等）',
        '  - 價格範圍（經濟實惠、中等、高檔）',
        '  - 菜系類型（中式、西式、日式、素食等）',
      ],
    },
    {
      id: '2',
      title: '查看餐廳詳細資訊',
      icon: 'restaurant',
      summary: '了解如何閱讀餐廳頁面的關鍵資訊',
      content: [
        '• 糖友善評分：餐廳整體的糖友善程度（1-5顆星）',
        '• 基本資訊：地址、電話、營業時間、交通方式',
        '• 菜單預覽：查看推薦的低糖、適糖菜品',
        '• 營養標示：每道菜的熱量、碳水化合物、糖分含量',
        '• 用戶評價：其他糖友的用餐體驗和建議',
        '• 照片圖集：餐廳環境和菜品實拍照片',
        '• 特色標籤：無糖飲料、低GI選項、營養師推薦等',
      ],
    },
    {
      id: '3',
      title: '理解糖友善評級系統',
      icon: 'medal',
      summary: '掌握我們的評級標準，做出更好的選擇',
      content: [
        '• 低糖等級（綠色）：',
        '  - 糖分含量 < 10g/100g',
        '  - 適合血糖控制良好的糖友',
        '  - 可以放心享用的選擇',
        '• 中糖等級（黃色）：',
        '  - 糖分含量 10-20g/100g',
        '  - 建議適量食用',
        '  - 搭配運動或藥物調整',
        '• 高糖等級（紅色）：',
        '  - 糖分含量 > 20g/100g',
        '  - 建議謹慎食用或避免',
        '  - 可考慮特殊場合少量享用',
        '• 評級考量因素：營養成分、烹飪方式、份量大小、搭配建議',
      ],
    },
    {
      id: '4',
      title: '收藏與分享功能',
      icon: 'heart',
      summary: '管理您的最愛餐廳和與朋友分享',
      content: [
        '• 收藏餐廳：點擊愛心圖示收藏喜歡的餐廳',
        '• 我的最愛：在個人頁面查看所有收藏的餐廳',
        '• 分享功能：',
        '  - 分享餐廳資訊給朋友',
        '  - 生成專屬推薦連結',
        '  - 社群媒體一鍵分享',
        '• 建立清單：',
        '  - 創建主題收藏清單（如「約會餐廳」「家庭聚餐」）',
        '  - 為不同場合分類管理',
        '  - 與家人朋友共享清單',
      ],
    },
    {
      id: '5',
      title: '預訂與評價',
      icon: 'calendar',
      summary: '如何預訂餐廳和分享用餐體驗',
      content: [
        '• 線上預訂：',
        '  - 查看可預訂時段',
        '  - 選擇人數和特殊需求',
        '  - 備註糖尿病飲食需求',
        '• 到店取號：掃描QR碼快速取號',
        '• 撰寫評價：',
        '  - 分享用餐體驗',
        '  - 上傳菜品照片',
        '  - 評估糖友善程度',
        '  - 提供其他糖友參考',
        '• 評價技巧：',
        '  - 具體描述口感和份量',
        '  - 說明對血糖的影響',
        '  - 推薦適合的搭配',
      ],
    },
    {
      id: '6',
      title: '個人化推薦',
      icon: 'person',
      summary: '獲得專屬於您的餐廳推薦',
      content: [
        '• 健康檔案設定：',
        '  - 糖尿病類型（1型、2型、妊娠等）',
        '  - 血糖目標範圍',
        '  - 飲食偏好和禁忌',
        '  - 運動習慣和生活作息',
        '• 智能推薦：',
        '  - 根據您的健康狀況推薦',
        '  - 考慮用餐時間和血糖變化',
        '  - 結合天氣、節慶等因素',
        '• 提醒功能：',
        '  - 用餐時間提醒',
        '  - 血糖監測建議',
        '  - 新餐廳開幕通知',
      ],
    },
  ];

  const tips = [
    {
      icon: 'bulb',
      title: '用餐前準備',
      content: '出發前先查看菜單，預先規劃要點的菜品，避免現場因選擇困難而影響血糖控制。',
    },
    {
      icon: 'time',
      title: '用餐時間規劃',
      content: '避開用餐尖峰時段，選擇較安靜的時間用餐，有助於放鬆心情和穩定血糖。',
    },
    {
      icon: 'medical',
      title: '血糖監測',
      content: '用餐前後測量血糖，記錄不同餐廳和菜品對您血糖的影響，建立個人化的飲食資料庫。',
    },
    {
      icon: 'people',
      title: '與朋友分享',
      content: '邀請家人朋友一起使用糖友善功能，相互分享推薦餐廳，讓健康飲食成為社交樂趣。',
    },
  ];

  const StepCard = ({ step }: any) => (
    <TouchableOpacity
      style={styles.stepCard}
      onPress={() => setExpandedStep(expandedStep === step.id ? null : step.id)}
    >
      <View style={styles.stepHeader}>
        <View style={styles.stepLeft}>
          <View style={styles.stepIcon}>
            <Ionicons name={step.icon} size={24} color="#4CAF50" />
          </View>
          <View style={styles.stepText}>
            <Text style={styles.stepTitle}>{step.title}</Text>
            <Text style={styles.stepSummary}>{step.summary}</Text>
          </View>
        </View>
        <Ionicons
          name={expandedStep === step.id ? 'chevron-up' : 'chevron-down'}
          size={20}
          color="#666"
        />
      </View>
      {expandedStep === step.id && (
        <View style={styles.stepContent}>
          {step.content.map((item: string, index: number) => (
            <Text key={index} style={styles.stepContentText}>
              {item}
            </Text>
          ))}
        </View>
      )}
    </TouchableOpacity>
  );

  const TipCard = ({ tip }: any) => (
    <View style={styles.tipCard}>
      <View style={styles.tipIcon}>
        <Ionicons name={tip.icon} size={20} color="#4CAF50" />
      </View>
      <View style={styles.tipContent}>
        <Text style={styles.tipTitle}>{tip.title}</Text>
        <Text style={styles.tipText}>{tip.content}</Text>
      </View>
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
        <Text style={styles.headerTitle}>餐廳功能指南</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroSection}>
          <View style={styles.heroContent}>
            <Ionicons name="restaurant" size={48} color="#4CAF50" />
            <Text style={styles.heroTitle}>探索糖友善餐廳</Text>
            <Text style={styles.heroSubtitle}>
              輕鬆找到適合糖尿病患者的美味餐廳，享受健康美食無負擔
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>功能指南</Text>
          <Text style={styles.sectionSubtitle}>
            跟著以下步驟，快速掌握餐廳搜尋和評估功能
          </Text>
          {guideSteps.map((step) => (
            <StepCard key={step.id} step={step} />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>實用小技巧</Text>
          <Text style={styles.sectionSubtitle}>
            讓您的用餐體驗更加順利和健康
          </Text>
          {tips.map((tip, index) => (
            <TipCard key={index} tip={tip} />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>常見問題</Text>
          <View style={styles.faqContainer}>
            <View style={styles.faqItem}>
              <Text style={styles.faqQuestion}>Q: 糖友善評分是如何計算的？</Text>
              <Text style={styles.faqAnswer}>
                A: 我們的評分系統綜合考慮菜品的糖分含量、GI值、烹飪方式、份量大小等多個因素，並結合營養師專業建議和用戶真實反饋。
              </Text>
            </View>
            <View style={styles.faqItem}>
              <Text style={styles.faqQuestion}>Q: 可以相信餐廳提供的營養資訊嗎？</Text>
              <Text style={styles.faqAnswer}>
                A: 我們會定期抽查餐廳資訊的準確性，同時鼓勵用戶分享真實體驗。建議您將餐廳資訊作為參考，搭配個人血糖監測來判斷。
              </Text>
            </View>
            <View style={styles.faqItem}>
              <Text style={styles.faqQuestion}>Q: 如何建議新的餐廳加入平台？</Text>
              <Text style={styles.faqAnswer}>
                A: 您可以透過「建議新餐廳」功能提交資訊，我們會聯繫餐廳進行評估。也歡迎直接推薦給餐廳業者，讓他們主動加入我們的平台。
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.actionSection}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="search" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>開始搜尋餐廳</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton}>
            <Ionicons name="help-circle" size={20} color="#4CAF50" />
            <Text style={styles.secondaryButtonText}>查看更多幫助</Text>
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
  content: {
    flex: 1,
  },
  heroSection: {
    backgroundColor: '#fff',
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  heroContent: {
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 10,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  stepCard: {
    marginHorizontal: 20,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  stepIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e8f5e8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  stepText: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  stepSummary: {
    fontSize: 13,
    color: '#666',
  },
  stepContent: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  stepContentText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
    marginBottom: 8,
  },
  tipCard: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
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
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  tipText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
  },
  faqContainer: {
    paddingHorizontal: 20,
  },
  faqItem: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
  },
  faqQuestion: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  actionSection: {
    backgroundColor: '#fff',
    marginTop: 10,
    padding: 20,
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 15,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  secondaryButtonText: {
    color: '#4CAF50',
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 8,
  },
});