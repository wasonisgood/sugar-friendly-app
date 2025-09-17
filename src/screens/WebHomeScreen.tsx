import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { mockDistricts } from '../data/districts';
import WebModal from '../components/WebModal';

const { width } = Dimensions.get('window');

const mockRestaurants = [
  {
    id: '1',
    name: '健康蔬食餐廳',
    address: '台北市信義區信義路五段7號',
    sugarFriendlyScore: 9,
    category: '素食',
    image: '🥗',
  },
  {
    id: '2',
    name: '低糖咖啡廳',
    address: '台北市大安區敦化南路二段216號',
    sugarFriendlyScore: 8,
    category: '咖啡廳',
    image: '☕',
  },
  {
    id: '3',
    name: '糖友便當店',
    address: '台北市松山區南京東路四段133號',
    sugarFriendlyScore: 9,
    category: '便當',
    image: '🍱',
  },
  {
    id: '4',
    name: '無糖烘焙坊',
    address: '台北市中山區中山北路二段45號',
    sugarFriendlyScore: 10,
    category: '烘焙',
    image: '🍞',
  },
  {
    id: '5',
    name: '健康沙拉吧',
    address: '台北市內湖區內湖路一段120號',
    sugarFriendlyScore: 9,
    category: '輕食',
    image: '🥙',
  },
  {
    id: '6',
    name: '糖友火鍋店',
    address: '台北市士林區中正路234號',
    sugarFriendlyScore: 8,
    category: '火鍋',
    image: '🍲',
  },
];

const categories = [
  { id: 'all', name: '全部', icon: '🍽️' },
  { id: '素食', name: '素食', icon: '🥗' },
  { id: '咖啡廳', name: '咖啡廳', icon: '☕' },
  { id: '便當', name: '便當', icon: '🍱' },
  { id: '烘焙', name: '烘焙', icon: '🍞' },
  { id: '輕食', name: '輕食', icon: '🥙' },
  { id: '火鍋', name: '火鍋', icon: '🍲' },
];

export default function WebHomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [showRestaurantDetails, setShowRestaurantDetails] = useState<any>(null);
  const [restaurantModalConfig, setRestaurantModalConfig] = useState({
    visible: false,
    title: '',
    message: '',
    buttons: [] as Array<{text: string; onPress: () => void; style?: 'default' | 'cancel' | 'destructive'}>
  });

  const filteredRestaurants = mockRestaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         restaurant.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || restaurant.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderRestaurantCard = (restaurant: typeof mockRestaurants[0]) => (
    <TouchableOpacity
      key={restaurant.id}
      style={styles.restaurantCard}
      onPress={() => showRestaurantDetailsModal(restaurant)}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.restaurantEmoji}>{restaurant.image}</Text>
        <View style={styles.cardContent}>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          <Text style={styles.restaurantCategory}>{restaurant.category}</Text>
        </View>
        <View style={styles.scoreContainer}>
          <Ionicons name="leaf" size={16} color="#4CAF50" />
          <Text style={styles.score}>{restaurant.sugarFriendlyScore}/10</Text>
        </View>
      </View>
      <Text style={styles.restaurantAddress}>{restaurant.address}</Text>
      <View style={styles.cardActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="call" size={16} color="#4CAF50" />
          <Text style={styles.actionText}>聯絡</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="location" size={16} color="#4CAF50" />
          <Text style={styles.actionText}>導航</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="heart-outline" size={16} color="#4CAF50" />
          <Text style={styles.actionText}>收藏</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderDistrictCard = (district: any) => (
    <TouchableOpacity
      key={district.id}
      style={styles.districtCard}
      onPress={() => setSelectedDistrict(district.id)}
    >
      <View style={styles.districtHeader}>
        <Text style={styles.districtName}>{district.name}</Text>
        <Text style={styles.districtArea}>{district.area}</Text>
      </View>
      <Text style={styles.districtDescription}>{district.description}</Text>
      <View style={styles.districtStats}>
        <View style={styles.districtStat}>
          <Ionicons name="restaurant" size={14} color="#4CAF50" />
          <Text style={styles.districtStatText}>{district.restaurantCount}家餐廳</Text>
        </View>
        <View style={styles.districtStat}>
          <Ionicons name="star" size={14} color="#FF9800" />
          <Text style={styles.districtStatText}>{district.averageScore}分</Text>
        </View>
      </View>
      <View style={styles.districtTags}>
        {district.tags.slice(0, 3).map((tag: string, index: number) => (
          <Text key={index} style={styles.districtTag}>{tag}</Text>
        ))}
      </View>
    </TouchableOpacity>
  );

  const showRestaurantDetailsModal = (restaurant: typeof mockRestaurants[0]) => {
    const restaurantInfo = `地址: ${restaurant.address}\n\n營業時間: 週一至週日 11:00-21:00\n\n聯絡方式: 電話: 02-1234-5678\n\n糖友善特色:\n• 提供低糖餐點選擇\n• 明確標示營養成分\n• 專業營養師諮詢\n• 糖友優惠方案`;

    setRestaurantModalConfig({
      visible: true,
      title: `${restaurant.image} ${restaurant.name}`,
      message: restaurantInfo,
      buttons: [
        { text: '取消', style: 'cancel', onPress: () => setRestaurantModalConfig(prev => ({ ...prev, visible: false })) },
        { text: '撥打電話', onPress: () => {
          setRestaurantModalConfig(prev => ({ ...prev, visible: false }));
          // 實際撥打電話邏輯
        }},
        { text: '開始導航', onPress: () => {
          setRestaurantModalConfig(prev => ({ ...prev, visible: false }));
          // 實際導航邏輯
        }}
      ]
    });
  };


  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={true}>

        {/* Hero 區域 */}
        <View style={styles.heroSection}>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>找到最適合的糖友善餐廳</Text>
            <Text style={styles.heroSubtitle}>
              我們為糖尿病友精心篩選健康美食，讓您安心享受每一餐
            </Text>
            <View style={styles.heroSearchContainer}>
              <Ionicons name="search" size={24} color="#666" />
              <TextInput
                style={styles.heroSearchInput}
                placeholder="搜尋餐廳、商圈或料理類型..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              <TouchableOpacity style={styles.searchButton}>
                <Text style={styles.searchButtonText}>搜尋</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* 統計數據 */}
        <View style={styles.statsWrapper}>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>200+</Text>
              <Text style={styles.statLabel}>合作餐廳</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>熱門商圈</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>4.8</Text>
              <Text style={styles.statLabel}>平均評分</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>5000+</Text>
              <Text style={styles.statLabel}>用戶評價</Text>
            </View>
          </View>
        </View>

        {/* 分類篩選 */}
        <View style={styles.categorySection}>
          <Text style={styles.sectionTitle}>依料理類型搜尋</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesContainer}
          >
            {categories.map(category => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryChip,
                  selectedCategory === category.id && styles.selectedCategoryChip
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Text style={styles.categoryEmoji}>{category.icon}</Text>
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category.id && styles.selectedCategoryText
                ]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* 熱門商圈 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>熱門商圈</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>查看全部</Text>
              <Ionicons name="chevron-forward" size={16} color="#4CAF50" />
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.districtsContainer}
          >
            {mockDistricts.slice(0, 6).map(renderDistrictCard)}
          </ScrollView>
        </View>

        {/* 推薦餐廳 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              推薦餐廳 ({filteredRestaurants.length})
            </Text>
          </View>
          <View style={styles.restaurantsGrid}>
            {filteredRestaurants.map(renderRestaurantCard)}
          </View>
        </View>

        {/* 特色功能 */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>為什麼選擇糖友善？</Text>
          <View style={styles.featuresGrid}>
            <View style={styles.featureCard}>
              <Ionicons name="shield-checkmark" size={40} color="#4CAF50" />
              <Text style={styles.featureTitle}>專業認證</Text>
              <Text style={styles.featureDescription}>
                營養師嚴格把關，每家餐廳都經過糖友善認證
              </Text>
            </View>
            <View style={styles.featureCard}>
              <Ionicons name="location" size={40} color="#2196F3" />
              <Text style={styles.featureTitle}>便捷定位</Text>
              <Text style={styles.featureDescription}>
                智能推薦附近餐廳，導航功能一鍵到達
              </Text>
            </View>
            <View style={styles.featureCard}>
              <Ionicons name="people" size={40} color="#FF9800" />
              <Text style={styles.featureTitle}>社群評價</Text>
              <Text style={styles.featureDescription}>
                真實用戶分享，幫助您做出最佳選擇
              </Text>
            </View>
          </View>
        </View>

        {/* 頁尾 */}
        <View style={styles.footer}>
          <View style={styles.footerContent}>
            <View style={styles.footerSection}>
              <Text style={styles.footerTitle}>糖友善</Text>
              <Text style={styles.footerText}>
                致力於為糖尿病友提供最好的餐廳資訊服務
              </Text>
            </View>
            <View style={styles.footerSection}>
              <Text style={styles.footerTitle}>快速連結</Text>
              <Text style={styles.footerLink}>關於我們</Text>
              <Text style={styles.footerLink}>服務條款</Text>
              <Text style={styles.footerLink}>隱私政策</Text>
            </View>
            <View style={styles.footerSection}>
              <Text style={styles.footerTitle}>聯絡我們</Text>
              <Text style={styles.footerLink}>客服電話: 02-1234-5678</Text>
              <Text style={styles.footerLink}>客服信箱: service@sugarfriendly.com</Text>
            </View>
          </View>
          <View style={styles.footerBottom}>
            <Text style={styles.footerCopyright}>
              © 2024 糖友善. 版權所有.
            </Text>
          </View>
        </View>
      </ScrollView>

      <WebModal
        visible={restaurantModalConfig.visible}
        title={restaurantModalConfig.title}
        message={restaurantModalConfig.message}
        buttons={restaurantModalConfig.buttons}
        onClose={() => setRestaurantModalConfig(prev => ({ ...prev, visible: false }))}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    flex: 1,
  },
  // Hero 區域樣式
  heroSection: {
    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    paddingVertical: 80,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  heroContent: {
    maxWidth: 800,
    alignItems: 'center',
    width: '100%',
  },
  heroTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 20,
    color: '#f8f9fa',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 28,
  },
  heroSearchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 16,
    width: '100%',
    maxWidth: 600,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  heroSearchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#495057',
  },
  searchButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    marginLeft: 12,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  // 統計數據樣式
  statsWrapper: {
    backgroundColor: '#fff',
    paddingVertical: 40,
    marginTop: -40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxWidth: 1000,
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
  },
  // 區塊樣式
  section: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  categorySection: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
    backgroundColor: '#f8f9fa',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  seeAllText: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '500',
  },
  // 分類樣式
  categoriesContainer: {
    marginTop: 16,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginRight: 16,
    borderWidth: 2,
    borderColor: '#e9ecef',
  },
  selectedCategoryChip: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  categoryEmoji: {
    fontSize: 18,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 16,
    color: '#6c757d',
    fontWeight: '600',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  // 商圈樣式
  districtsContainer: {
    paddingVertical: 10,
  },
  districtCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginRight: 16,
    width: 280,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  districtHeader: {
    marginBottom: 12,
  },
  districtName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  districtArea: {
    fontSize: 14,
    color: '#6c757d',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  districtDescription: {
    fontSize: 14,
    color: '#6c757d',
    lineHeight: 20,
    marginBottom: 16,
  },
  districtStats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  districtStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  districtStatText: {
    fontSize: 12,
    color: '#6c757d',
  },
  districtTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  districtTag: {
    fontSize: 10,
    color: '#4CAF50',
    backgroundColor: '#e8f5e8',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  // 餐廳樣式
  restaurantsGrid: {
    gap: 20,
  },
  restaurantCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  restaurantEmoji: {
    fontSize: 32,
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 6,
  },
  restaurantCategory: {
    fontSize: 12,
    color: '#6c757d',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f5e8',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  score: {
    marginLeft: 6,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  restaurantAddress: {
    fontSize: 14,
    color: '#6c757d',
    lineHeight: 20,
    marginBottom: 16,
  },
  cardActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  actionText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
  },
  // 特色功能樣式
  featuresSection: {
    backgroundColor: '#f8f9fa',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
    justifyContent: 'space-between',
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  featureCard: {
    backgroundColor: '#fff',
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    flex: 1,
    minWidth: 300,
    maxWidth: 380,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 16,
    marginBottom: 12,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    lineHeight: 24,
  },
  // 頁尾樣式
  footer: {
    backgroundColor: '#2c3e50',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  footerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
    marginBottom: 40,
  },
  footerSection: {
    flex: 1,
    marginRight: 40,
  },
  footerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  footerText: {
    fontSize: 14,
    color: '#bdc3c7',
    lineHeight: 20,
  },
  footerLink: {
    fontSize: 14,
    color: '#bdc3c7',
    marginBottom: 8,
    lineHeight: 20,
  },
  footerBottom: {
    borderTopWidth: 1,
    borderTopColor: '#34495e',
    paddingTop: 20,
    alignItems: 'center',
  },
  footerCopyright: {
    fontSize: 12,
    color: '#95a5a6',
  },
});