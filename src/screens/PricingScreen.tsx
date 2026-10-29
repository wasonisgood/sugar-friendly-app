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

export default function PricingScreen() {
  const navigation = useNavigation();

  const PricingCard = ({
    title,
    price,
    period,
    features,
    isPopular = false,
    buttonText = "選擇方案"
  }: {
    title: string;
    price: string;
    period?: string;
    features: string[];
    isPopular?: boolean;
    buttonText?: string;
  }) => (
    <View style={[styles.pricingCard, isPopular && styles.popularCard]}>
      {isPopular && (
        <View style={styles.popularBadge}>
          <Text style={styles.popularBadgeText}>最受歡迎</Text>
        </View>
      )}
      <Text style={styles.planTitle}>{title}</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>{price}</Text>
        {period && <Text style={styles.period}>/{period}</Text>}
      </View>
      <View style={styles.featuresContainer}>
        {features.map((feature, index) => (
          <View key={index} style={styles.featureItem}>
            <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity style={[styles.selectButton, isPopular && styles.popularButton]}>
        <Text style={[styles.selectButtonText, isPopular && styles.popularButtonText]}>
          {buttonText}
        </Text>
      </TouchableOpacity>
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
        <Text style={styles.headerTitle}>會員方案</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Ionicons name="diamond" size={60} color="#4CAF50" />
          <Text style={styles.heroTitle}>選擇最適合您的方案</Text>
          <Text style={styles.heroSubtitle}>
            升級會員享受更多專業功能{'\n'}讓糖友善生活更簡單
          </Text>
        </View>

        <View style={styles.pricingGrid}>
          <PricingCard
            title="基礎會員"
            price="免費"
            features={[
              "基礎食物掃描功能",
              "基本營養資訊查看",
              "每日最多10次掃描",
              "基礎血糖記錄",
              "社群基本功能"
            ]}
            buttonText="免費使用"
          />

          <PricingCard
            title="進階會員"
            price="NT$ 199"
            period="月"
            isPopular={true}
            features={[
              "無限次食物掃描",
              "詳細營養成分分析",
              "個人化飲食建議",
              "血糖趨勢分析",
              "專屬客服支援",
              "去除廣告",
              "雲端備份同步",
              "進階搜尋功能"
            ]}
          />

          <PricingCard
            title="專業會員"
            price="NT$ 499"
            period="月"
            features={[
              "包含進階會員所有功能",
              "專業營養師諮詢",
              "客製化飲食計劃",
              "血糖預測分析",
              "家庭帳戶管理",
              "優先新功能體驗",
              "專業報告下載",
              "24小時客服支援"
            ]}
          />
        </View>

        <View style={styles.annualSection}>
          <Text style={styles.annualTitle}>年付方案 享特別優惠</Text>
          <View style={styles.annualCards}>
            <View style={styles.annualCard}>
              <Text style={styles.annualPlan}>進階會員 年付</Text>
              <View style={styles.annualPricing}>
                <Text style={styles.originalPrice}>NT$ 2,388</Text>
                <Text style={styles.annualPrice}>NT$ 1,990</Text>
                <Text style={styles.savings}>省 NT$ 398</Text>
              </View>
            </View>
            <View style={styles.annualCard}>
              <Text style={styles.annualPlan}>專業會員 年付</Text>
              <View style={styles.annualPricing}>
                <Text style={styles.originalPrice}>NT$ 5,988</Text>
                <Text style={styles.annualPrice}>NT$ 4,990</Text>
                <Text style={styles.savings}>省 NT$ 998</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.faqSection}>
          <Text style={styles.faqTitle}>常見問題</Text>

          <View style={styles.faqItem}>
            <Text style={styles.question}>Q: 可以隨時取消訂閱嗎？</Text>
            <Text style={styles.answer}>
              A: 是的，您可以隨時在設定中取消訂閱。取消後仍可使用至當前付費週期結束。
            </Text>
          </View>

          <View style={styles.faqItem}>
            <Text style={styles.question}>Q: 升級後舊資料會保留嗎？</Text>
            <Text style={styles.answer}>
              A: 會的，所有歷史記錄和設定都會完整保留，升級後立即享受新功能。
            </Text>
          </View>

          <View style={styles.faqItem}>
            <Text style={styles.question}>Q: 支援哪些付款方式？</Text>
            <Text style={styles.answer}>
              A: 支援信用卡、Apple Pay、Google Pay 以及超商代碼付款。
            </Text>
          </View>

          <View style={styles.faqItem}>
            <Text style={styles.question}>Q: 專業營養師諮詢如何進行？</Text>
            <Text style={styles.answer}>
              A: 專業會員可透過App內建聊天功能，與認證營養師進行一對一諮詢。
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            所有付費方案都包含30天免費試用期{'\n'}
            不滿意可全額退費
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
  },
  hero: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  pricingGrid: {
    paddingHorizontal: 20,
  },
  pricingCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    position: 'relative',
  },
  popularCard: {
    borderColor: '#4CAF50',
    transform: [{ scale: 1.02 }],
  },
  popularBadge: {
    position: 'absolute',
    top: -10,
    alignSelf: 'center',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  popularBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  planTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    marginBottom: 24,
  },
  price: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  period: {
    fontSize: 18,
    color: '#666',
    marginLeft: 4,
  },
  featuresContainer: {
    marginBottom: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    fontSize: 16,
    color: '#555',
    marginLeft: 12,
    flex: 1,
  },
  selectButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  popularButton: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  selectButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
  },
  popularButtonText: {
    color: '#fff',
  },
  annualSection: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
  },
  annualTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  annualCards: {
    gap: 16,
  },
  annualCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  annualPlan: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  annualPricing: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  originalPrice: {
    fontSize: 16,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  annualPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  savings: {
    fontSize: 14,
    color: '#FF9800',
    fontWeight: 'bold',
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  faqSection: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
  },
  faqTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  faqItem: {
    marginBottom: 20,
  },
  question: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  answer: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },
  footer: {
    backgroundColor: '#4CAF50',
    margin: 20,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 40,
  },
  footerText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 24,
  },
});