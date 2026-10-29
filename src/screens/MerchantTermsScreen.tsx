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

export default function MerchantTermsScreen() {
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
        <Text style={styles.headerTitle}>商家服務條款</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.lastUpdated}>最後更新日期：2024年1月15日</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. 服務概述</Text>
          <Text style={styles.sectionContent}>
            糖友善商家平台為餐廳、食品業者提供專業的糖尿病友善服務展示平台。我們致力於：{'\n\n'}
            • 協助商家展示糖友善菜單和服務{'\n'}
            • 提供專業的營養資訊管理工具{'\n'}
            • 連接商家與糖尿病患者社群{'\n'}
            • 提升商家在健康飲食市場的競爭力{'\n'}
            • 建立可信賴的糖友善認證體系
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. 商家資格與認證</Text>
          <Text style={styles.sectionContent}>
            申請成為糖友善認證商家需符合以下條件：{'\n\n'}
            • 持有有效的營業登記證{'\n'}
            • 通過食品安全相關認證{'\n'}
            • 提供完整的菜單營養資訊{'\n'}
            • 配合糖友善評分系統{'\n'}
            • 員工接受糖尿病飲食知識培訓{'\n'}
            • 定期更新菜單和營養資訊
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. 平台使用規範</Text>
          <Text style={styles.sectionContent}>
            商家使用平台時必須遵守：{'\n\n'}
            • 提供真實、準確的商家資訊{'\n'}
            • 確保營養標示的正確性{'\n'}
            • 及時回應顧客評價和意見{'\n'}
            • 不得發布虛假或誤導性資訊{'\n'}
            • 尊重顧客隱私和個人資料{'\n'}
            • 遵守食品標示相關法規
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. 營養資訊責任</Text>
          <Text style={styles.importantNotice}>
            重要：商家對提供的營養資訊負完全責任
          </Text>
          <Text style={styles.sectionContent}>
            • 營養標示必須基於實際檢測或可靠計算{'\n'}
            • 定期驗證和更新營養數據{'\n'}
            • 對特殊飲食需求提供準確建議{'\n'}
            • 配合第三方營養認證檢查{'\n'}
            • 承擔營養資訊錯誤的相關責任
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. 費用與付款</Text>
          <Text style={styles.sectionContent}>
            平台服務採用多層級收費制度：{'\n\n'}
            基礎方案（免費）：{'\n'}
            • 基本商家資料展示{'\n'}
            • 最多10道菜品資訊{'\n'}
            • 基礎客戶評價功能{'\n\n'}

            進階方案（月費 NT$ 2,999）：{'\n'}
            • 無限菜品展示{'\n'}
            • 進階營養分析工具{'\n'}
            • 客戶數據分析報告{'\n'}
            • 優先搜尋排序{'\n\n'}

            專業方案（月費 NT$ 5,999）：{'\n'}
            • 包含進階方案所有功能{'\n'}
            • 專屬營養師諮詢服務{'\n'}
            • 客製化行銷支援{'\n'}
            • 活動推廣優先權
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. 評分與評價系統</Text>
          <Text style={styles.sectionContent}>
            我們的評分系統包含多個維度：{'\n\n'}
            • 糖友善度評分（0-10分）{'\n'}
            • 營養資訊完整度{'\n'}
            • 服務品質評價{'\n'}
            • 顧客滿意度調查{'\n'}
            • 專業營養師評鑑{'\n\n'}

            商家有權利：{'\n'}
            • 回應顧客評價{'\n'}
            • 申請重新評鑑{'\n'}
            • 對不當評價提出申訴
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7. 行銷與推廣</Text>
          <Text style={styles.sectionContent}>
            平台提供多種行銷支援：{'\n\n'}
            • 社群媒體推廣{'\n'}
            • 主題活動參與機會{'\n'}
            • 新聞稿發布服務{'\n'}
            • 健康飲食講座合作{'\n'}
            • 醫療機構合作推薦{'\n\n'}

            商家需配合：{'\n'}
            • 提供高品質商品圖片{'\n'}
            • 參與平台活動{'\n'}
            • 協助內容創作
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>8. 資料保護與隱私</Text>
          <Text style={styles.sectionContent}>
            我們重視商家資料安全：{'\n\n'}
            • 商業機密資料加密保護{'\n'}
            • 嚴格的員工資料存取權限{'\n'}
            • 定期資安檢查和更新{'\n'}
            • 遵守個資法相關規定{'\n'}
            • 提供資料下載和刪除選項
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>9. 違約與終止</Text>
          <Text style={styles.sectionContent}>
            以下情況可能導致合作終止：{'\n\n'}
            • 提供虛假資訊或營養標示{'\n'}
            • 嚴重違反食品安全規定{'\n'}
            • 惡意操作評分系統{'\n'}
            • 長期未回應客戶問題{'\n'}
            • 拖欠平台服務費用{'\n\n'}

            終止程序：{'\n'}
            • 書面通知30天前告知{'\n'}
            • 提供申訴和改善機會{'\n'}
            • 協助資料轉移和備份
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>10. 技術支援與培訓</Text>
          <Text style={styles.sectionContent}>
            我們提供全方位支援服務：{'\n\n'}
            技術支援：{'\n'}
            • 24/7線上客服系統{'\n'}
            • 平台操作教學影片{'\n'}
            • 定期功能更新說明{'\n\n'}

            專業培訓：{'\n'}
            • 糖尿病飲食知識研習{'\n'}
            • 營養標示實務課程{'\n'}
            • 客戶服務技巧訓練{'\n'}
            • 數位行銷策略指導
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>11. 責任與免責</Text>
          <Text style={styles.sectionContent}>
            平台責任範圍：{'\n'}
            • 提供穩定的技術服務{'\n'}
            • 保護商家資料安全{'\n'}
            • 公正的評分機制{'\n\n'}

            商家自負責任：{'\n'}
            • 食品安全和品質{'\n'}
            • 營養資訊準確性{'\n'}
            • 客戶服務品質{'\n'}
            • 法規遵循義務
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>12. 聯繫與申訴</Text>
          <Text style={styles.sectionContent}>
            商家服務專線：{'\n\n'}
            營運時間：週一至週五 9:00-18:00{'\n'}
            客服專線：+886-2-1234-5678{'\n'}
            商家信箱：merchant@sugarfriendly.com{'\n'}
            技術支援：tech@sugarfriendly.com{'\n'}
            申訴專線：+886-2-1234-5679{'\n\n'}

            緊急聯絡：24小時客服熱線{'\n'}
            +886-800-123-456（免付費）
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            感謝您選擇糖友善商家平台！{'\n'}
            讓我們攜手為糖尿病友創造更好的飲食環境
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
  importantNotice: {
    fontSize: 16,
    color: '#F44336',
    fontWeight: 'bold',
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#ffebee',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#F44336',
  },
  footer: {
    backgroundColor: '#4CAF50',
    marginTop: 15,
    marginBottom: 30,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 24,
  },
});