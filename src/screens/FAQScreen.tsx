import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function FAQScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const categories = [
    { id: 'all', title: '全部', icon: 'apps' },
    { id: 'basic', title: '基本使用', icon: 'help-circle' },
    { id: 'health', title: '健康功能', icon: 'medical' },
    { id: 'food', title: '飲食掃描', icon: 'camera' },
    { id: 'restaurant', title: '餐廳功能', icon: 'restaurant' },
    { id: 'account', title: '帳戶設定', icon: 'person' },
    { id: 'technical', title: '技術問題', icon: 'settings' },
  ];

  const faqData = [
    // 基本使用
    {
      id: '1',
      category: 'basic',
      question: '如何開始使用糖友善？',
      answer: '首先下載並安裝糖友善APP，創建帳戶後完成健康檔案設定。建議先設定您的糖尿病類型、血糖目標範圍等基本資訊，這樣系統就能為您提供個人化的建議。',
      tags: ['註冊', '開始', '設定'],
    },
    {
      id: '2',
      category: 'basic',
      question: '如何更新個人資料？',
      answer: '進入「個人」頁面，點擊「個人資料」即可修改姓名、電話、電子郵件等基本資訊。健康相關資料請到「健康設定」中進行修改。',
      tags: ['個人資料', '修改', '更新'],
    },
    {
      id: '3',
      category: 'basic',
      question: '忘記密碼該怎麼辦？',
      answer: '在登入頁面點擊「忘記密碼」，輸入註冊時的電子郵件地址，系統會發送重設密碼的連結到您的信箱。請檢查垃圾郵件資料夾。',
      tags: ['密碼', '重設', '登入'],
    },
    {
      id: '4',
      category: 'basic',
      question: '可以在多個裝置上使用同一個帳戶嗎？',
      answer: '可以。您可以在手機、平板、電腦上使用同一個帳戶登入，所有資料會自動同步。建議在每次使用後正常登出以確保資料安全。',
      tags: ['多裝置', '同步', '帳戶'],
    },

    // 健康功能
    {
      id: '5',
      category: 'health',
      question: '如何設定血糖目標範圍？',
      answer: '進入「健康設定」→「血糖目標」，可以選擇ADA標準、嚴格控制、寬鬆控制等預設選項，或根據醫師建議自訂目標範圍。建議諮詢您的醫師後再進行設定。',
      tags: ['血糖', '目標', '設定'],
    },
    {
      id: '6',
      category: 'health',
      question: '血糖記錄如何輸入？',
      answer: '點擊「+」按鈕或在首頁快速記錄區域輸入血糖值。系統會自動記錄時間，您也可以手動調整時間並添加備註（如餐前、餐後、運動後等）。',
      tags: ['血糖記錄', '輸入', '測量'],
    },
    {
      id: '7',
      category: 'health',
      question: '如何查看血糖趨勢圖？',
      answer: '在「健康」頁面點擊「血糖趨勢」，可以查看日、週、月的血糖變化圖表。圖表會顯示平均值、目標範圍，以及高低血糖事件。',
      tags: ['趨勢圖', '圖表', '分析'],
    },
    {
      id: '8',
      category: 'health',
      question: '異常血糖值會有提醒嗎？',
      answer: '會的。當輸入的血糖值過高（>250mg/dL）或過低（<70mg/dL）時，系統會立即顯示警示並提供處理建議。您也可以設定其他提醒閾值。',
      tags: ['警示', '異常', '提醒'],
    },

    // 飲食掃描
    {
      id: '9',
      category: 'food',
      question: 'AI食物掃描的準確度如何？',
      answer: 'AI食物識別的準確度約85-90%，會受到光線、角度、食物類型等因素影響。建議在光線充足的環境下拍攝，並將食物置於畫面中央以提高識別準確度。',
      tags: ['AI掃描', '準確度', '拍照'],
    },
    {
      id: '10',
      category: 'food',
      question: '掃描後的營養資訊可以修改嗎？',
      answer: '可以。掃描結果僅供參考，您可以點擊「編輯」修改食物名稱、份量、營養成分等資訊。修改後的資料會保存到您的個人資料庫中。',
      tags: ['修改', '營養資訊', '編輯'],
    },
    {
      id: '11',
      category: 'food',
      question: '無法識別的食物怎麼辦？',
      answer: '如果AI無法識別食物，可以手動搜尋食物資料庫，或使用「自訂食物」功能手動輸入營養資訊。您也可以拍照備份，我們會持續更新資料庫。',
      tags: ['無法識別', '手動', '資料庫'],
    },
    {
      id: '12',
      category: 'food',
      question: '可以掃描包裝食品的條碼嗎？',
      answer: '可以。選擇「條碼掃描」功能，對準包裝上的條碼即可獲取詳細的營養標示資訊。目前支援大部分台灣市售包裝食品。',
      tags: ['條碼', '包裝食品', '營養標示'],
    },

    // 餐廳功能
    {
      id: '13',
      category: 'restaurant',
      question: '如何搜尋附近的糖友善餐廳？',
      answer: '點擊「地圖」或「商圈」功能，系統會顯示附近的餐廳並標示糖友善等級。可以使用篩選功能設定距離、評分、價格等條件來縮小搜尋範圍。',
      tags: ['搜尋餐廳', '地圖', '附近'],
    },
    {
      id: '14',
      category: 'restaurant',
      question: '糖友善等級是怎麼評定的？',
      answer: '糖友善等級綜合考慮菜單的糖分含量、GI值、烹飪方式、份量等因素，結合營養師專業建議和用戶評價。分為低糖（綠色）、中糖（黃色）、高糖（紅色）三個等級。',
      tags: ['糖友善等級', '評定', '標準'],
    },
    {
      id: '15',
      category: 'restaurant',
      question: '可以預訂餐廳嗎？',
      answer: '部分合作餐廳支援線上預訂功能。在餐廳詳情頁面如果看到「立即預訂」按鈕，就可以選擇時間和人數進行預訂。預訂時請註明糖尿病飲食需求。',
      tags: ['預訂', '餐廳', '線上'],
    },

    // 帳戶設定
    {
      id: '16',
      category: 'account',
      question: '如何升級到付費會員？',
      answer: '進入「個人」→「會員方案」查看不同方案的功能差異。選擇適合的方案後，可以使用信用卡、Apple Pay等方式付款。付費功能會立即生效。',
      tags: ['付費會員', '升級', '方案'],
    },
    {
      id: '17',
      category: 'account',
      question: '會員方案有什麼差別？',
      answer: '基礎版（免費）提供基本功能；進階版（NT$199/月）包含無限掃描、專業分析；專業版（NT$499/月）另有營養師諮詢、客製化飲食計劃等功能。',
      tags: ['會員方案', '差別', '功能'],
    },
    {
      id: '18',
      category: 'account',
      question: '如何取消訂閱？',
      answer: 'iOS用戶請到「設定」→「Apple ID」→「訂閱」中取消；Android用戶請到Google Play商店的「我的應用程式」→「訂閱」中取消。取消後會員功能會在期限到期後停止。',
      tags: ['取消訂閱', '退費', '會員'],
    },

    // 技術問題
    {
      id: '19',
      category: 'technical',
      question: 'APP閃退或無法開啟怎麼辦？',
      answer: '請先確認APP版本是否為最新版本，並重新啟動裝置。如果問題持續，請清除APP快取或重新安裝。若仍無法解決，請聯絡客服並提供裝置型號和系統版本。',
      tags: ['閃退', '無法開啟', '故障'],
    },
    {
      id: '20',
      category: 'technical',
      question: '資料同步有問題怎麼辦？',
      answer: '請確認網路連線正常，並檢查是否已登入同一個帳戶。在「設定」中點擊「同步資料」可以手動同步。如果特定資料遺失，請聯絡客服協助復原。',
      tags: ['同步', '資料', '網路'],
    },
    {
      id: '21',
      category: 'technical',
      question: '相機權限無法開啟？',
      answer: '請到手機「設定」→「應用程式」→「糖友善」→「權限」中開啟相機權限。iOS用戶請到「設定」→「隱私」→「相機」中找到糖友善並開啟權限。',
      tags: ['權限', '相機', '設定'],
    },
    {
      id: '22',
      category: 'technical',
      question: '定位功能無法使用？',
      answer: '請確認已開啟定位權限，並選擇「使用APP時」或「永遠」允許定位。如果仍無法使用，請檢查手機的定位服務是否已開啟。',
      tags: ['定位', 'GPS', '權限'],
    },

    // 其他常見問題
    {
      id: '23',
      category: 'basic',
      question: '如何聯絡客服？',
      answer: '可以透過以下方式聯絡我們：1. APP內AI客服（24小時）；2. 人工客服電話02-1234-5678（週一至週五9:00-18:00）；3. 電子郵件support@sugarfriendly.com；4. 線上客服功能。',
      tags: ['客服', '聯絡', '支援'],
    },
    {
      id: '24',
      category: 'health',
      question: '可以匯出健康報告嗎？',
      answer: '可以。在「健康」頁面點擊「匯出報告」，可以生成PDF格式的詳細健康報告，包含血糖趨勢、飲食分析等資訊，方便與醫師分享。',
      tags: ['匯出', '報告', 'PDF'],
    },
    {
      id: '25',
      category: 'food',
      question: '食物資料庫會更新嗎？',
      answer: '我們會定期更新食物資料庫，新增台灣本土食物和最新的包裝食品資訊。用戶也可以透過「建議新增食物」功能協助我們完善資料庫。',
      tags: ['資料庫', '更新', '新增'],
    },
  ];

  const filteredFAQs = faqData.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = searchQuery === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

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
        size={16}
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

  const FAQItem = ({ faq }: any) => (
    <TouchableOpacity
      style={styles.faqItem}
      onPress={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
    >
      <View style={styles.faqHeader}>
        <View style={styles.faqLeft}>
          <View style={styles.faqIcon}>
            <Ionicons
              name={expandedFAQ === faq.id ? 'remove-circle' : 'add-circle'}
              size={20}
              color="#4CAF50"
            />
          </View>
          <Text style={styles.faqQuestion}>{faq.question}</Text>
        </View>
        <Ionicons
          name={expandedFAQ === faq.id ? 'chevron-up' : 'chevron-down'}
          size={16}
          color="#666"
        />
      </View>

      {expandedFAQ === faq.id && (
        <View style={styles.faqAnswer}>
          <Text style={styles.faqAnswerText}>{faq.answer}</Text>
          <View style={styles.faqTags}>
            {faq.tags.map((tag: string, index: number) => (
              <View key={index} style={styles.faqTag}>
                <Text style={styles.faqTagText}>{tag}</Text>
              </View>
            ))}
          </View>
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
        <Text style={styles.headerTitle}>常見問題</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="搜尋問題或關鍵字..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery !== '' && (
            <TouchableOpacity
              onPress={() => setSearchQuery('')}
              style={styles.clearButton}
            >
              <Ionicons name="close-circle" size={20} color="#ccc" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryContainer}
        contentContainerStyle={styles.categoryScroll}
      >
        {categories.map((category) => (
          <CategoryTab key={category.id} category={category} />
        ))}
      </ScrollView>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>
            找到 {filteredFAQs.length} 個相關問題
          </Text>
        </View>

        <View style={styles.faqContainer}>
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq) => (
              <FAQItem key={faq.id} faq={faq} />
            ))
          ) : (
            <View style={styles.noResultsContainer}>
              <Ionicons name="search" size={48} color="#ccc" />
              <Text style={styles.noResultsTitle}>找不到相關問題</Text>
              <Text style={styles.noResultsText}>
                請嘗試其他關鍵字或聯絡客服獲得協助
              </Text>
              <TouchableOpacity style={styles.contactButton}>
                <Ionicons name="chatbubble" size={18} color="#fff" />
                <Text style={styles.contactButtonText}>聯絡客服</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.helpSection}>
          <Text style={styles.helpTitle}>還有其他問題？</Text>
          <Text style={styles.helpDescription}>
            如果以上內容無法解答您的疑問，歡迎透過以下方式聯絡我們
          </Text>

          <View style={styles.contactOptions}>
            <TouchableOpacity style={styles.contactOption}>
              <View style={styles.contactIcon}>
                <Ionicons name="chatbot" size={24} color="#4CAF50" />
              </View>
              <Text style={styles.contactOptionText}>AI智能客服</Text>
              <Text style={styles.contactOptionSubtext}>24小時即時協助</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.contactOption}>
              <View style={styles.contactIcon}>
                <Ionicons name="call" size={24} color="#4CAF50" />
              </View>
              <Text style={styles.contactOptionText}>客服專線</Text>
              <Text style={styles.contactOptionSubtext}>02-1234-5678</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.contactOption}>
              <View style={styles.contactIcon}>
                <Ionicons name="mail" size={24} color="#4CAF50" />
              </View>
              <Text style={styles.contactOptionText}>電子郵件</Text>
              <Text style={styles.contactOptionSubtext}>support@sugarfriendly.com</Text>
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
  searchContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
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
  clearButton: {
    marginLeft: 10,
  },
  categoryContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  categoryScroll: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  categoryTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    borderRadius: 16,
    backgroundColor: '#f5f5f5',
  },
  activeCategoryTab: {
    backgroundColor: '#e8f5e8',
  },
  categoryTabText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
    fontWeight: '500',
  },
  activeCategoryTabText: {
    color: '#4CAF50',
  },
  content: {
    flex: 1,
  },
  statsContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  statsText: {
    fontSize: 14,
    color: '#666',
  },
  faqContainer: {
    backgroundColor: '#fff',
    marginTop: 1,
  },
  faqItem: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  faqLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    marginRight: 10,
  },
  faqIcon: {
    marginRight: 10,
    marginTop: 2,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    flex: 1,
    lineHeight: 22,
  },
  faqAnswer: {
    marginTop: 15,
    marginLeft: 30,
  },
  faqAnswerText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
    marginBottom: 12,
  },
  faqTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  faqTag: {
    backgroundColor: '#e8f5e8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 6,
  },
  faqTagText: {
    fontSize: 11,
    color: '#4CAF50',
    fontWeight: '500',
  },
  noResultsContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  noResultsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 15,
    marginBottom: 8,
  },
  noResultsText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
  },
  helpSection: {
    backgroundColor: '#fff',
    marginTop: 20,
    paddingVertical: 25,
    paddingHorizontal: 20,
  },
  helpTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  helpDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 25,
  },
  contactOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  contactOption: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 5,
  },
  contactIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#e8f5e8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactOptionText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
    textAlign: 'center',
  },
  contactOptionSubtext: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
  },
});