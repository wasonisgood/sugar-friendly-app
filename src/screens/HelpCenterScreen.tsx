import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Linking,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function HelpCenterScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const helpCategories = [
    {
      id: '1',
      icon: 'help-circle',
      title: '常見問題',
      subtitle: '查看最常見的問題和解答',
      onPress: () => {},
    },
    {
      id: '2',
      icon: 'medical',
      title: '健康功能說明',
      subtitle: '了解糖尿病管理功能',
      onPress: () => {},
    },
    {
      id: '3',
      icon: 'restaurant',
      title: '餐廳功能指南',
      subtitle: '如何尋找和評價餐廳',
      onPress: () => {},
    },
    {
      id: '4',
      icon: 'storefront',
      title: '店家功能說明',
      subtitle: '店家管理功能介紹',
      onPress: () => {},
    },
    {
      id: '5',
      icon: 'shield',
      title: '隱私與安全',
      subtitle: '了解我們如何保護您的資料',
      onPress: () => {},
    },
    {
      id: '6',
      icon: 'document-text',
      title: '使用條款',
      subtitle: '服務條款和使用協議',
      onPress: () => {},
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
      question: '糖友善等級是什麼意思？',
      answer: '糖友善等級是我們根據菜單的糖分含量、營養成分等因素評估的指標。分為低糖、中糖、高糖三個等級，幫助糖尿病患者選擇適合的食物。',
    },
    {
      id: '3',
      question: '如何收藏餐廳或菜單？',
      answer: '在餐廳詳情頁面或菜單項目旁點擊愛心圖示即可收藏。您可以在「個人」→「我的最愛」中查看所有收藏的項目。',
    },
    {
      id: '4',
      question: '如何成為店家用戶？',
      answer: '在個人資料頁面點擊「店家管理」，完成店家認證流程即可。店家用戶可以管理菜單、回覆評價、查看營收分析等。',
    },
    {
      id: '5',
      question: '如何設定用藥提醒？',
      answer: '在「健康設定」→「提醒設定」中可以開啟用藥提醒功能，設定提醒時間和頻率。',
    },
    {
      id: '6',
      question: '資料安全性如何保障？',
      answer: '我們採用業界標準的加密技術保護您的個人資料，不會與第三方分享您的健康資訊，除非您明確授權。',
    },
  ];

  const contactOptions = [
    {
      id: '1',
      icon: 'mail',
      title: '電子郵件',
      subtitle: 'support@sugarfriendly.com',
      onPress: () => Linking.openURL('mailto:support@sugarfriendly.com'),
    },
    {
      id: '2',
      icon: 'call',
      title: '客服電話',
      subtitle: '02-1234-5678',
      onPress: () => Linking.openURL('tel:021234567'),
    },
    {
      id: '3',
      icon: 'chatbubble',
      title: '線上客服',
      subtitle: '週一至週五 9:00-18:00',
      onPress: () => Alert.alert('線上客服', '線上客服功能即將推出'),
    },
    {
      id: '4',
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