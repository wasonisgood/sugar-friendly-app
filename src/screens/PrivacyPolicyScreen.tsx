import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function PrivacyPolicyScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>隱私政策</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.lastUpdated}>最後更新日期：2024年12月15日</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. 資料收集與處理法律依據</Text>
          <Text style={styles.sectionContent}>
            根據GDPR第6條，我們基於以下法律依據處理您的個人資料：{'\n\n'}
            • 履行合約義務：提供核心應用服務{'\n'}
            • 合法利益：改善服務品質、安全防護、商業分析{'\n'}
            • 您的同意：行銷推廣、個人化推薦、第三方服務整合{'\n'}
            • 法律義務：遵守適用法律法規{'\n\n'}
            我們收集的資料類型包括：{'\n\n'}
            • 身份資料：姓名、電子郵件、電話、身份證明{'\n'}
            • 健康資料：血糖記錄、醫療病史、用藥資訊、身體狀況{'\n'}
            • 行為資料：應用使用模式、瀏覽歷史、互動記錄{'\n'}
            • 位置資料：即時位置、常去地點、移動軌跡{'\n'}
            • 設備資料：設備識別碼、網路資訊、系統設定{'\n'}
            • 生物識別資料：指紋、聲紋、面部特徵（如啟用）{'\n'}
            • 財務資料：付款資訊、消費記錄、信用評估{'\n'}
            • 社交資料：聯絡人清單、社群媒體連結、通訊記錄
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. 資料使用與目的</Text>
          <Text style={styles.sectionContent}>
            我們基於合法利益和您的同意使用資料來：{'\n\n'}
            • 服務提供：個人化飲食建議、健康監測、緊急醫療支援{'\n'}
            • 商業開發：市場研究、產品開發、商業智能分析{'\n'}
            • 行銷推廣：精準廣告投放、促銷活動、第三方產品推薦{'\n'}
            • 風險管控：欺詐偵測、信用評估、合規監控{'\n'}
            • 學術研究：匿名化研究、醫學統計、流行病學調查{'\n'}
            • 人工智能：機器學習模型訓練、預測分析、自動化決策{'\n'}
            • 服務整合：與第三方平台、醫療機構、保險公司資料交換
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. 資料分享與第三方合作</Text>
          <Text style={styles.sectionContent}>
            基於合法利益和您的同意，我們與以下類型的第三方分享資料：{'\n\n'}
            • 服務供應商：雲端儲存、數據分析、技術支援公司{'\n'}
            • 商業夥伴：餐廳、健身房、醫療機構、保險公司{'\n'}
            • 行銷合作夥伴：廣告網路、市場調研公司{'\n'}
            • 學術機構：大學、研究所、醫學中心{'\n'}
            • 政府機關：衛生部門、統計局、監管機構{'\n'}
            • 關聯企業：母公司、子公司、合資企業{'\n'}
            • 收購方：如發生企業併購或重組{'\n\n'}
            分享資料可能包括：{'\n'}
            • 個人識別資訊：姓名、聯絡方式、身份資料{'\n'}
            • 健康數據：血糖記錄、飲食習慣、運動資料{'\n'}
            • 行為分析：應用使用模式、偏好設定{'\n'}
            • 位置資訊：地理位置、活動軌跡{'\n'}
            • 去識別化或聚合資料用於商業分析
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. 健康資料保護</Text>
          <Text style={styles.sectionContent}>
            我們特別重視您的健康資料安全：{'\n\n'}
            • 使用端到端加密技術{'\n'}
            • 定期進行安全審查{'\n'}
            • 僅授權人員可存取{'\n'}
            • 遵守醫療資料保護法規{'\n'}
            • 提供資料匯出和刪除選項
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Cookie 和追蹤技術</Text>
          <Text style={styles.sectionContent}>
            我們使用Cookie和類似技術來：{'\n\n'}
            • 記住您的偏好設定{'\n'}
            • 分析應用程式使用情況{'\n'}
            • 提供個人化內容{'\n'}
            • 改善用戶體驗
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. 同意管理與撤回</Text>
          <Text style={styles.sectionContent}>
            當我們基於您的同意處理資料時，您可以：{'\n\n'}
            • 隨時撤回同意，但不影響撤回前的合法處理{'\n'}
            • 選擇性同意特定用途（如行銷、研究、第三方分享）{'\n'}
            • 透過應用設定管理同意偏好{'\n'}
            • 針對不同第三方合作夥伴設定個別同意{'\n\n'}
            請注意：撤回某些同意可能影響服務功能，但不會影響基於其他法律依據的資料處理。
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7. GDPR權利行使</Text>
          <Text style={styles.sectionContent}>
            根據GDPR，您擁有以下權利：{'\n\n'}
            • 存取權：取得我們持有的您的個人資料副本{'\n'}
            • 更正權：要求更正不準確或不完整的資料{'\n'}
            • 刪除權：在特定情況下要求刪除個人資料{'\n'}
            • 限制處理權：在特定情況下限制我們處理您的資料{'\n'}
            • 資料可攜性權：以結構化格式接收您的資料{'\n'}
            • 反對權：反對基於合法利益的處理{'\n'}
            • 不受自動化決策影響的權利{'\n\n'}
            權利行使可能受到以下限制：{'\n'}
            • 影響他人權利和自由{'\n'}
            • 妨礙法律義務履行{'\n'}
            • 損害商業機密或合法商業利益{'\n'}
            • 影響正在進行的研究或統計分析
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>8. 國際數據傳輸與適當保護</Text>
          <Text style={styles.sectionContent}>
            您的資料將被傳輸到全球各地的第三方合作夥伴，包括：{'\n\n'}
            • 美國：基於適當性決定或標準合約條款{'\n'}
            • 英國：基於適當性決定{'\n'}
            • 亞太地區：基於標準合約條款或約束性企業規則{'\n'}
            • 其他國家：基於適當的保護措施{'\n\n'}
            保護措施包括：{'\n'}
            • 歐盟委員會標準合約條款{'\n'}
            • 約束性企業規則（BCR）{'\n'}
            • 適當性認證{'\n'}
            • 特定情況下的必要性或明確同意{'\n\n'}
            您可要求查看相關保護措施的副本。
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>9. 兒童資料處理</Text>
          <Text style={styles.sectionContent}>
            我們可能處理16歲以下兒童的資料，須符合以下條件：{'\n\n'}
            • 13-15歲：須取得父母或監護人同意{'\n'}
            • 16歲以上：可自行提供同意{'\n'}
            • 兒童健康資料需要特別保護措施{'\n'}
            • 定期審查兒童同意的有效性{'\n'}
            • 提供年齡適當的隱私通知
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>10. 資料保留與刪除</Text>
          <Text style={styles.sectionContent}>
            我們的資料保留政策：{'\n\n'}
            • 帳戶資料：帳戶關閉後保留7年{'\n'}
            • 健康資料：基於合法利益保留10年{'\n'}
            • 行銷資料：撤回同意後保留3年{'\n'}
            • 研究資料：匿名化後永久保留{'\n'}
            • 備份資料：最長保留2年{'\n'}
            • 法律要求：依法律規定保留{'\n\n'}
            延長保留的正當理由：{'\n'}
            • 法律訴訟或調查{'\n'}
            • 監管要求{'\n'}
            • 合法商業需求{'\n'}
            • 公共利益研究
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>11. 自動化決策與分析</Text>
          <Text style={styles.sectionContent}>
            我們可能使用自動化決策，包括：{'\n\n'}
            • 個人化內容推薦{'\n'}
            • 風險評估和欺詐偵測{'\n'}
            • 信用評分和資格評估{'\n'}
            • 醫療建議和警示{'\n'}
            • 價格調整和促銷{'\n\n'}
            您有權：{'\n'}
            • 要求人工審查自動化決定{'\n'}
            • 表達您的觀點{'\n'}
            • 質疑決定的準確性{'\n'}
            • 要求解釋決策邏輯
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>12. 政策更新與通知</Text>
          <Text style={styles.sectionContent}>
            我們可能會定期更新此隱私政策：{'\n\n'}
            • 重大變更：30天前透過電子郵件或應用內通知{'\n'}
            • 一般更新：透過網站和應用程式公告{'\n'}
            • 法律變更：立即生效並通知{'\n'}
            • 新合作夥伴：透過同意機制告知{'\n\n'}
            繼續使用服務即表示接受更新後的政策。如不同意變更，您可隨時停止使用服務。
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>13. 聯絡我們與資料保護官</Text>
          <Text style={styles.sectionContent}>
            如有隱私相關問題，請聯絡：{'\n\n'}
            資料保護官：{'\n'}
            電子郵件：dpo@sugarfriendly.com{'\n'}
            電話：+886-2-1234-5678{'\n'}
            地址：台北市信義區信義路五段7號{'\n\n'}
            一般查詢：privacy@sugarfriendly.com{'\n'}
            權利行使：rights@sugarfriendly.com{'\n'}
            投訴舉報：complaints@sugarfriendly.com{'\n\n'}
            您也可向當地資料保護監管機構投訴。
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            本隱私政策受中華民國法律管轄
          </Text>
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
    paddingHorizontal: 20,
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 15,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lastUpdated: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  sectionContent: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  footer: {
    backgroundColor: '#fff',
    marginTop: 15,
    marginBottom: 30,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
});