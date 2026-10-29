import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Linking,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';

type HelpCenterScreenNavigationProp = StackNavigationProp<RootStackParamList>;

export default function HelpCenterScreen() {
  const navigation = useNavigation<HelpCenterScreenNavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const helpCategories = [
    {
      id: '1',
      icon: 'help-circle',
      title: '常見問題',
      subtitle: '查看最常見的問題和解答',
      onPress: () => navigation.navigate('FAQ'),
    },
    {
      id: '2',
      icon: 'medical',
      title: '健康功能說明',
      subtitle: '了解糖尿病管理功能',
      onPress: () => navigation.navigate('HealthFeatures'),
    },
    {
      id: '3',
      icon: 'restaurant',
      title: '餐廳功能指南',
      subtitle: '如何尋找和評價餐廳',
      onPress: () => navigation.navigate('RestaurantGuide'),
    },
    {
      id: '4',
      icon: 'storefront',
      title: '店家功能說明',
      subtitle: '店家管理功能介紹',
      onPress: () => navigation.navigate('MerchantHelp'),
    },
    {
      id: '5',
      icon: 'shield',
      title: '隱私與安全',
      subtitle: '了解我們如何保護您的資料',
      onPress: () => navigation.navigate('PrivacyPolicy'),
    },
    {
      id: '6',
      icon: 'document-text',
      title: '使用條款',
      subtitle: '服務條款和使用協議',
      onPress: () => navigation.navigate('TermsOfService'),
    },
    {
      id: '7',
      icon: 'diamond',
      title: '會員方案',
      subtitle: '查看會員服務和定價',
      onPress: () => navigation.navigate('Pricing'),
    },
    {
      id: '8',
      icon: 'camera',
      title: 'AI掃描教學',
      subtitle: '學習如何使用AI食物掃描和QR碼功能',
      onPress: () => navigation.navigate('AIScanGuide'),
    },
  ];

  const faqData = [
    {
      id: '1',
      question: '如何設定我的健康資料？',
      answer: '您可以在「個人」→「健康設定」中設定您的糖尿病類型、血糖目標範圍等健康資料。這些資料將幫助我們為您推薦更適合的餐廳和菜單。',
    },
    {
      id: '2',
      question: '如何設定血糖目標範圍？',
      answer: '在「健康設定」中點擊「血糖目標」，可以選擇預設的目標範圍（如ADA標準、嚴格控制等），或根據醫師建議自訂個人化目標。',
    },
    {
      id: '3',
      question: 'AI食物掃描如何使用？',
      answer: '在掃描頁面點擊「AI掃描食物」，對準食物拍照或從相冊選擇照片。AI會分析營養成分並提供糖友善建議。詳細教學請參考「AI掃描教學」頁面。',
    },
    {
      id: '4',
      question: 'QR碼掃描支援哪些功能？',
      answer: '可以掃描餐廳菜單QR碼、食物資訊QR碼、條碼等。系統會自動識別並提供相應的糖友善建議和營養分析。',
    },
    {
      id: '5',
      question: '糖友善等級是什麼意思？',
      answer: '糖友善等級是我們根據菜單的糖分含量、營養成分等因素評估的指標。分為低糖、中糖、高糖三個等級，幫助糖尿病患者選擇適合的食物。',
    },
    {
      id: '6',
      question: '如何收藏餐廳或菜單？',
      answer: '在餐廳詳情頁面或菜單項目旁點擊愛心圖示即可收藏。您可以在「個人」→「我的最愛」中查看所有收藏的項目。',
    },
    {
      id: '7',
      question: '如何成為店家用戶？',
      answer: '在個人資料頁面點擊「店家管理」，完成店家認證流程即可。店家用戶可以管理菜單、回覆評價、查看營收分析等。',
    },
    {
      id: '8',
      question: '會員方案有什麼差別？',
      answer: '我們提供基礎（免費）、進階（NT$ 199/月）、專業（NT$ 499/月）三種方案。付費會員享有無限掃描、專業分析、營養師諮詢等功能。',
    },
    {
      id: '9',
      question: '如何聯繫客服？',
      answer: '可以使用AI客服功能獲得即時幫助，或透過電話、郵件聯繫人工客服。AI客服24小時可用，人工客服服務時間為週一至週五9:00-18:00。',
    },
    {
      id: '10',
      question: '資料安全性如何保障？',
      answer: '我們採用業界標準的加密技術保護您的個人資料，不會與第三方分享您的健康資訊，除非您明確授權。詳情請查看隱私政策。',
    },
    {
      id: '11',
      question: '如何搜尋附近的糖友善餐廳？',
      answer: '使用地圖功能可以查看附近的糖友善餐廳，也可以設定篩選條件如距離、評分、價格等。詳細教學請參考「餐廳功能指南」。',
    },
    {
      id: '12',
      question: 'AI掃描的準確度如何？',
      answer: 'AI掃描基於大量食物資料庫訓練，準確度約85-90%。建議搭配個人血糖監測來驗證，並在光線充足、食物清晰的環境下拍攝以提高準確度。',
    },
    {
      id: '13',
      question: '可以離線使用掃描功能嗎？',
      answer: '基礎的條碼掃描功能支援離線使用，但AI食物分析需要網路連線。我們建議在有網路的環境下使用以獲得最完整的分析結果。',
    },
  ];

  const contactOptions = [
    {
      id: '1',
      icon: 'chatbot',
      title: 'AI客服',
      subtitle: '24小時智能助手服務',
      onPress: () => navigation.navigate('CustomerService'),
    },
    {
      id: '2',
      icon: 'mail',
      title: '電子郵件',
      subtitle: 'support@sugarfriendly.com',
      onPress: () => Linking.openURL('mailto:support@sugarfriendly.com'),
    },
    {
      id: '3',
      icon: 'call',
      title: '客服電話',
      subtitle: '02-1234-5678',
      onPress: () => Linking.openURL('tel:021234567'),
    },
    {
      id: '4',
      icon: 'chatbubble',
      title: '線上客服',
      subtitle: '週一至週五 9:00-18:00',
      onPress: () => navigation.navigate('CustomerService'),
    },
    {
      id: '5',
      icon: 'logo-facebook',
      title: 'Facebook',
      subtitle: '糖友善官方粉絲頁',
      onPress: () => Linking.openURL('https://facebook.com/sugarfriendly'),
    },
  ];

  const filteredFAQs = faqData.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  const ContactCard = ({ item }: any) => (
    <TouchableOpacity style={styles.contactCard} onPress={item.onPress}>
      <View style={styles.contactLeft}>
        <View style={styles.contactIcon}>
          <Ionicons name={item.icon} size={24} color="#4CAF50" />
        </View>
        <View style={styles.contactText}>
          <Text style={styles.contactTitle}>{item.title}</Text>
          <Text style={styles.contactSubtitle}>{item.subtitle}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#ccc" />
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
        <Text style={styles.headerTitle}>幫助中心</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={20} color="#666" />
            <TextInput
              style={styles.searchInput}
              placeholder="搜尋幫助內容..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>幫助分類</Text>
          {helpCategories.map((category) => (
            <CategoryCard key={category.id} item={category} />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>常見問題</Text>
          {filteredFAQs.map((faq) => (
            <FAQItem key={faq.id} item={faq} />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>聯絡我們</Text>
          {contactOptions.map((contact) => (
            <ContactCard key={contact.id} item={contact} />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>應用程式資訊</Text>
          <View style={styles.appInfo}>
            <Text style={styles.appInfoText}>版本: 1.0.0</Text>
            <Text style={styles.appInfoText}>最後更新: 2024年1月</Text>
            <TouchableOpacity style={styles.feedbackButton}>
              <Text style={styles.feedbackButtonText}>提供意見回饋</Text>
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
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  section: {
    backgroundColor: '#fff',
    marginVertical: 10,
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
    width: 50,
    height: 50,
    borderRadius: 25,
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
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  contactLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  contactIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e8f5e8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactText: {
    marginLeft: 15,
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  contactSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  appInfo: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
  },
  appInfoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  feedbackButton: {
    marginTop: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 20,
  },
  feedbackButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});