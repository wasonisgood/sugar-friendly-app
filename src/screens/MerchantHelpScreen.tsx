import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function MerchantHelpScreen() {
  const navigation = useNavigation();
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const helpCategories = [
    {
      id: '1',
      icon: 'storefront',
      title: '餐廳設定',
      subtitle: '基本資訊、營業時間設定',
      onPress: () => {},
    },
    {
      id: '2',
      icon: 'restaurant',
      title: '菜單管理',
      subtitle: '新增菜品、編輯價格、設定糖友善標籤',
      onPress: () => {},
    },
    {
      id: '3',
      icon: 'receipt',
      title: '訂單處理',
      subtitle: '接單流程、狀態更新、取消訂單',
      onPress: () => {},
    },
    {
      id: '4',
      icon: 'chatbubble',
      title: '評價管理',
      subtitle: '回覆客戶評價、處理負評',
      onPress: () => {},
    },
    {
      id: '5',
      icon: 'analytics',
      title: '數據分析',
      subtitle: '營收報表、銷售趨勢分析',
      onPress: () => {},
    },
    {
      id: '6',
      icon: 'card',
      title: '收款設定',
      subtitle: '付款方式、帳戶綁定',
      onPress: () => {},
    },
  ];

  const merchantFAQs = [
    {
      id: '1',
      question: '如何設定我的餐廳為糖友善？',
      answer: '在餐廳設定中，您可以標註餐廳的糖友善等級。建議提供詳細的營養資訊、使用低糖食材，並在菜單中明確標示糖分含量。我們的審核團隊會根據您提供的資訊給予糖友善認證。',
    },
    {
      id: '2',
      question: '如何提高餐廳的糖友善評分？',
      answer: '提供準確的營養資訊、使用天然代糖、增加蔬菜類菜品、標明低糖選項、保持食材新鮮度，並積極回應客戶關於健康飲食的需求。定期更新菜單資訊也很重要。',
    },
    {
      id: '3',
      question: '訂單處理的標準流程是什麼？',
      answer: '1. 收到新訂單後應在5分鐘內確認接單\n2. 開始製作時更新狀態為「準備中」\n3. 完成製作後更新為「已完成」\n4. 客戶取餐後標記為「已取餐」\n如需取消訂單，請及時通知客戶並說明原因。',
    },
    {
      id: '4',
      question: '如何回覆負面評價？',
      answer: '1. 保持專業和禮貌的態度\n2. 誠懇道歉並感謝客戶的反饋\n3. 具體說明改善措施\n4. 邀請客戶再次光臨體驗改善\n5. 避免與客戶爭辯或推卸責任\n及時回覆能展現您對客戶體驗的重視。',
    },
    {
      id: '5',
      question: '營收款項何時會撥付？',
      answer: '每週二會將上週的營收撥付到您綁定的銀行帳戶，扣除平台服務費後的淨額會在1-3個工作天內到帳。您可以在「營收分析」中查看詳細的費用明細。',
    },
    {
      id: '6',
      question: '如何上傳菜品照片？',
      answer: '在「菜單管理」中選擇要編輯的菜品，點擊「上傳照片」，選擇清晰的實拍照片。建議照片解析度至少800x800像素，檔案大小不超過5MB。好的照片能大幅提升訂單量。',
    },
  ];

  const quickActions = [
    {
      id: '1',
      icon: 'call',
      title: '客服專線',
      subtitle: '02-1234-5678',
      onPress: () => Linking.openURL('tel:0212345678'),
    },
    {
      id: '2',
      icon: 'chatbubble',
      title: '線上客服',
      subtitle: '週一至週五 9:00-18:00',
      onPress: () => Alert.alert('線上客服', '線上客服功能即將推出'),
    },
    {
      id: '3',
      icon: 'mail',
      title: '商家信箱',
      subtitle: 'merchant@sugarfriendly.com',
      onPress: () => Linking.openURL('mailto:merchant@sugarfriendly.com'),
    },
    {
      id: '4',
      icon: 'document-text',
      title: '商家手冊',
      subtitle: '完整操作指南下載',
      onPress: () => Alert.alert('下載手冊', '商家手冊下載功能開發中'),
    },
  ];

  const businessTips = [
    {
      icon: 'bulb',
      title: '增加曝光度',
      tip: '完善餐廳資訊，上傳高品質照片，保持菜單更新',
    },
    {
      icon: 'trending-up',
      title: '提升評分',
      tip: '快速回覆評價，持續改善服務品質，主動收集客戶意見',
    },
    {
      icon: 'heart',
      title: '建立忠實客群',
      tip: '提供個人化服務，記住常客喜好，定期推出優惠活動',
    },
    {
      icon: 'leaf',
      title: '強化糖友善特色',
      tip: '提供詳細營養標示，開發更多低糖選項，培訓員工健康知識',
    },
  ];

  const CategoryCard = ({ item }: any) => (
    <TouchableOpacity style={styles.categoryCard} onPress={item.onPress}>
      <View style={styles.categoryLeft}>
        <View style={styles.categoryIcon}>
          <Ionicons name={item.icon} size={24} color="#4CAF50" />
        </View>
        <View style={styles.categoryText}>
          <Text style={styles.categoryTitle}>{item.title}</Text>
          <Text style={styles.categorySubtitle}>{item.subtitle}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#ccc" />
    </TouchableOpacity>
  );

  const FAQItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.faqItem}
      onPress={() => setExpandedFAQ(expandedFAQ === item.id ? null : item.id)}
    >
      <View style={styles.faqHeader}>
        <Text style={styles.faqQuestion}>{item.question}</Text>
        <Ionicons
          name={expandedFAQ === item.id ? 'chevron-up' : 'chevron-down'}
          size={20}
          color="#666"
        />
      </View>
      {expandedFAQ === item.id && (
        <Text style={styles.faqAnswer}>{item.answer}</Text>
      )}
    </TouchableOpacity>
  );

  const QuickActionCard = ({ item }: any) => (
    <TouchableOpacity style={styles.quickActionCard} onPress={item.onPress}>
      <View style={styles.quickActionIcon}>
        <Ionicons name={item.icon} size={24} color="#4CAF50" />
      </View>
      <Text style={styles.quickActionTitle}>{item.title}</Text>
      <Text style={styles.quickActionSubtitle}>{item.subtitle}</Text>
    </TouchableOpacity>
  );

  const BusinessTip = ({ item }: any) => (
    <View style={styles.tipItem}>
      <View style={styles.tipIcon}>
        <Ionicons name={item.icon} size={20} color="#FF9800" />
      </View>
      <View style={styles.tipContent}>
        <Text style={styles.tipTitle}>{item.title}</Text>
        <Text style={styles.tipText}>{item.tip}</Text>
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
        <Text style={styles.headerTitle}>商家幫助中心</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.welcomeSection}>
          <View style={styles.welcomeIcon}>
            <Ionicons name="storefront" size={40} color="#4CAF50" />
          </View>
          <Text style={styles.welcomeTitle}>歡迎使用糖友善商家平台</Text>
          <Text style={styles.welcomeText}>
            我們致力於幫助您經營糖友善餐廳，為糖尿病患者提供更好的用餐選擇
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>快速聯繫</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action) => (
              <QuickActionCard key={action.id} item={action} />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>功能指南</Text>
          {helpCategories.map((category) => (
            <CategoryCard key={category.id} item={category} />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>常見問題</Text>
          {merchantFAQs.map((faq) => (
            <FAQItem key={faq.id} item={faq} />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>經營小貼士</Text>
          <View style={styles.tipsContainer}>
            {businessTips.map((tip, index) => (
              <BusinessTip key={index} item={tip} />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>平台政策</Text>
          <View style={styles.policyContainer}>
            <TouchableOpacity style={styles.policyItem}>
              <Ionicons name="document-text" size={20} color="#666" />
              <Text style={styles.policyText}>商家服務條款</Text>
              <Ionicons name="chevron-forward" size={16} color="#ccc" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.policyItem}>
              <Ionicons name="shield" size={20} color="#666" />
              <Text style={styles.policyText}>隱私政策</Text>
              <Ionicons name="chevron-forward" size={16} color="#ccc" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.policyItem}>
              <Ionicons name="card" size={20} color="#666" />
              <Text style={styles.policyText}>費用說明</Text>
              <Ionicons name="chevron-forward" size={16} color="#ccc" />
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
    width: 30,
  },
  content: {
    flex: 1,
  },
  welcomeSection: {
    backgroundColor: '#fff',
    padding: 30,
    alignItems: 'center',
    marginBottom: 10,
  },
  welcomeIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e8f5e8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  section: {
    backgroundColor: '#fff',
    marginVertical: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    gap: 15,
  },
  quickActionCard: {
    width: '47%',
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  quickActionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e8f5e8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  quickActionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  quickActionSubtitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e8f5e8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    marginLeft: 15,
    flex: 1,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  categorySubtitle: {
    fontSize: 12,
    color: '#666',
  },
  faqItem: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#666',
    marginTop: 15,
    lineHeight: 20,
  },
  tipsContainer: {
    padding: 20,
    gap: 15,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tipIcon: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: '#fff3e0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  tipText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  policyContainer: {
    paddingHorizontal: 20,
  },
  policyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  policyText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    marginLeft: 15,
  },
});