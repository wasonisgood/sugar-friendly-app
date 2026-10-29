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

export default function TermsOfServiceScreen() {
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
        <Text style={styles.headerTitle}>服務條款</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.lastUpdated}>最後更新日期：2024年1月15日</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. 服務條款接受</Text>
          <Text style={styles.sectionContent}>
            歡迎使用糖友善（Sugar Friendly）應用程式。透過存取或使用我們的服務，您同意受這些服務條款約束。如果您不同意這些條款，請勿使用我們的服務。
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. 服務描述</Text>
          <Text style={styles.sectionContent}>
            糖友善是一個專為糖尿病患者和關注血糖健康的用戶設計的應用程式，提供：{'\n\n'}
            • 餐廳和食物的糖友善度評分{'\n'}
            • 個人化飲食建議{'\n'}
            • 血糖記錄和追蹤功能{'\n'}
            • AI食物掃描和營養分析{'\n'}
            • 社群功能和經驗分享
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. 用戶帳戶</Text>
          <Text style={styles.sectionContent}>
            使用某些功能需要建立帳戶。您有責任：{'\n\n'}
            • 提供準確和完整的註冊資訊{'\n'}
            • 維護帳戶安全和保密性{'\n'}
            • 及時更新帳戶資訊{'\n'}
            • 對帳戶活動承擔責任{'\n'}
            • 立即通知我們任何未授權使用
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. 使用規則</Text>
          <Text style={styles.sectionContent}>
            使用我們的服務時，您同意：{'\n\n'}
            • 遵守所有適用的法律和法規{'\n'}
            • 不上傳有害、非法或冒犯性內容{'\n'}
            • 不干擾或破壞服務運作{'\n'}
            • 不嘗試未授權存取系統{'\n'}
            • 不將服務用於商業目的（除非獲得授權）{'\n'}
            • 尊重其他用戶的權利和隱私
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. 醫療免責聲明</Text>
          <Text style={styles.importantNotice}>
            重要提醒：本應用程式提供的資訊僅供參考，不構成醫療建議。
          </Text>
          <Text style={styles.sectionContent}>
            • 我們的建議不能替代專業醫療意見{'\n'}
            • 請務必諮詢醫療專業人員{'\n'}
            • 不要僅基於應用程式資訊做出醫療決定{'\n'}
            • 緊急情況請立即就醫{'\n'}
            • 定期監測血糖並遵循醫師指示
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. 內容和知識產權</Text>
          <Text style={styles.sectionContent}>
            我們的服務包含受知識產權法保護的內容：{'\n\n'}
            • 應用程式、商標、標誌為我們所有{'\n'}
            • 用戶生成內容的所有權歸用戶{'\n'}
            • 用戶授予我們使用其內容的許可{'\n'}
            • 禁止未授權複製或分發我們的內容
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7. 付費服務</Text>
          <Text style={styles.sectionContent}>
            某些高級功能可能需要付費：{'\n\n'}
            • 明確標示付費功能和價格{'\n'}
            • 透過應用程式商店處理付款{'\n'}
            • 退款政策遵循應用程式商店規定{'\n'}
            • 可隨時取消訂閱{'\n'}
            • 價格可能因地區而異
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>8. 服務可用性</Text>
          <Text style={styles.sectionContent}>
            我們努力確保服務的可用性，但不保證：{'\n\n'}
            • 服務會不間斷運行{'\n'}
            • 所有功能會持續可用{'\n'}
            • 服務不會出現錯誤或故障{'\n'}
            • 我們可能會暫停服務進行維護
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>9. 責任限制</Text>
          <Text style={styles.sectionContent}>
            在法律允許的最大範圍內：{'\n\n'}
            • 我們不對間接損失承擔責任{'\n'}
            • 責任限於您支付的服務費用{'\n'}
            • 不保證服務滿足您的特定需求{'\n'}
            • 用戶自行承擔使用風險
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>10. 服務終止</Text>
          <Text style={styles.sectionContent}>
            我們保留隨時終止或暫停服務的權利：{'\n\n'}
            • 違反服務條款時{'\n'}
            • 長期不活躍的帳戶{'\n'}
            • 法律要求或安全考慮{'\n'}
            • 終止後您可能失去存取權限和資料
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>11. 條款修改</Text>
          <Text style={styles.sectionContent}>
            我們可能會不時修改這些條款。重大變更將透過應用程式或電子郵件通知。繼續使用服務即表示接受修改後的條款。
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>12. 適用法律</Text>
          <Text style={styles.sectionContent}>
            這些條款受中華民國法律管轄。任何爭議將由台灣法院管轄。
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>13. 聯絡資訊</Text>
          <Text style={styles.sectionContent}>
            如有任何疑問，請聯絡我們：{'\n\n'}
            電子郵件：support@sugarfriendly.com{'\n'}
            客服電話：+886-2-1234-5678{'\n'}
            營業時間：週一至週五 9:00-18:00{'\n'}
            地址：台北市信義區信義路五段7號
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            感謝您選擇糖友善，讓我們一起創造更健康的生活方式！
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
  },
});