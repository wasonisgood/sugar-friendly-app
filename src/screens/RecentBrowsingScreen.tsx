import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function RecentBrowsingScreen() {
  const navigation = useNavigation();

  const [browsingHistory, setBrowsingHistory] = useState([
    {
      id: '1',
      type: 'restaurant',
      name: '健康素食館',
      category: '素食料理',
      rating: 4.5,
      sugarFriendlyScore: 85,
      address: '台北市大安區',
      visitTime: '2024-01-15 14:30',
      image: null,
    },
    {
      id: '2',
      type: 'menu',
      name: '蒸蛋豆腐',
      restaurant: '養生餐廳',
      price: 120,
      sugarContent: 'low',
      category: '主菜',
      visitTime: '2024-01-15 12:15',
      image: null,
    },
    {
      id: '3',
      type: 'restaurant',
      name: '糖友好餐廳',
      category: '健康料理',
      rating: 4.8,
      sugarFriendlyScore: 92,
      address: '台北市信義區',
      visitTime: '2024-01-14 19:45',
      image: null,
    },
    {
      id: '4',
      type: 'menu',
      name: '低糖燕麥粥',
      restaurant: '健康早餐店',
      price: 80,
      sugarContent: 'low',
      category: '早餐',
      visitTime: '2024-01-14 08:30',
      image: null,
    },
    {
      id: '5',
      type: 'restaurant',
      name: '輕食咖啡廳',
      category: '咖啡廳',
      rating: 4.2,
      sugarFriendlyScore: 78,
      address: '台北市中山區',
      visitTime: '2024-01-13 16:20',
      image: null,
    },
  ]);

  const [activeTab, setActiveTab] = useState('all');

  const filteredHistory = browsingHistory.filter(item => {
    if (activeTab === 'all') return true;
    if (activeTab === 'restaurants') return item.type === 'restaurant';
    if (activeTab === 'menus') return item.type === 'menu';
    return true;
  });

  const clearHistory = () => {
    Alert.alert(
      '清除歷史記錄',
      '確定要清除所有瀏覽記錄嗎？',
      [
        { text: '取消', style: 'cancel' },
        {
          text: '清除',
          style: 'destructive',
          onPress: () => setBrowsingHistory([])
        }
      ]
    );
  };

  const removeItem = (id: string) => {
    setBrowsingHistory(browsingHistory.filter(item => item.id !== id));
  };

  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return '剛剛';
    if (diffHours < 24) return `${diffHours}小時前`;
    if (diffDays === 1) return '昨天';
    if (diffDays < 7) return `${diffDays}天前`;
    return date.toLocaleDateString('zh-TW');
  };

  const getSugarColor = (content: string) => {
    switch (content) {
      case 'low': return '#4CAF50';
      case 'medium': return '#FF9800';
      case 'high': return '#F44336';
      default: return '#666';
    }
  };

  const getSugarText = (content: string) => {
    switch (content) {
      case 'low': return '低糖';
      case 'medium': return '中糖';
      case 'high': return '高糖';
      default: return '';
    }
  };

  const RestaurantHistoryCard = ({ item }: any) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.imageContainer}>
          {item.image ? (
            <Image source={{ uri: item.image }} style={styles.cardImage} />
          ) : (
            <View style={styles.placeholderImage}>
              <Ionicons name="restaurant" size={30} color="#ccc" />
            </View>
          )}
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardCategory}>{item.category}</Text>
          <Text style={styles.cardAddress}>{item.address}</Text>
          <View style={styles.cardMeta}>
            <View style={styles.rating}>
              <Ionicons name="star" size={14} color="#FFD700" />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
            <View style={styles.sugarScore}>
              <Text style={styles.sugarScoreText}>糖友善: {item.sugarFriendlyScore}%</Text>
            </View>
          </View>
        </View>
        <View style={styles.cardRight}>
          <Text style={styles.timeText}>{formatTime(item.visitTime)}</Text>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => removeItem(item.id)}
          >
            <Ionicons name="close" size={20} color="#999" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const MenuHistoryCard = ({ item }: any) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.imageContainer}>
          {item.image ? (
            <Image source={{ uri: item.image }} style={styles.cardImage} />
          ) : (
            <View style={styles.placeholderImage}>
              <Ionicons name="restaurant" size={30} color="#ccc" />
            </View>
          )}
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardRestaurant}>{item.restaurant}</Text>
          <Text style={styles.cardCategory}>{item.category}</Text>
          <View style={styles.cardMeta}>
            <Text style={styles.priceText}>NT$ {item.price}</Text>
            <View style={[styles.sugarTag, { backgroundColor: getSugarColor(item.sugarContent) }]}>
              <Text style={styles.sugarTagText}>{getSugarText(item.sugarContent)}</Text>
            </View>
          </View>
        </View>
        <View style={styles.cardRight}>
          <Text style={styles.timeText}>{formatTime(item.visitTime)}</Text>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => removeItem(item.id)}
          >
            <Ionicons name="close" size={20} color="#999" />
          </TouchableOpacity>
        </View>
      </View>
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
        <Text style={styles.headerTitle}>最近瀏覽</Text>
        <TouchableOpacity
          style={styles.clearButton}
          onPress={clearHistory}
        >
          <Text style={styles.clearButtonText}>清除</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'all' && styles.activeTab]}
          onPress={() => setActiveTab('all')}
        >
          <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>
            全部 ({browsingHistory.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'restaurants' && styles.activeTab]}
          onPress={() => setActiveTab('restaurants')}
        >
          <Text style={[styles.tabText, activeTab === 'restaurants' && styles.activeTabText]}>
            餐廳 ({browsingHistory.filter(item => item.type === 'restaurant').length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'menus' && styles.activeTab]}
          onPress={() => setActiveTab('menus')}
        >
          <Text style={[styles.tabText, activeTab === 'menus' && styles.activeTabText]}>
            菜單 ({browsingHistory.filter(item => item.type === 'menu').length})
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {filteredHistory.length > 0 ? (
          filteredHistory.map((item) => (
            <View key={item.id}>
              {item.type === 'restaurant' ? (
                <RestaurantHistoryCard item={item} />
              ) : (
                <MenuHistoryCard item={item} />
              )}
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="time-outline" size={60} color="#ccc" />
            <Text style={styles.emptyText}>還沒有瀏覽記錄</Text>
            <Text style={styles.emptySubtext}>開始探索糖友善餐廳和菜單吧！</Text>
          </View>
        )}
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
  clearButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
  },
  clearButtonText: {
    color: '#666',
    fontSize: 14,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 20,
    marginHorizontal: 5,
  },
  activeTab: {
    backgroundColor: '#4CAF50',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    padding: 15,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  cardCategory: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  cardAddress: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  cardRestaurant: {
    fontSize: 14,
    color: '#4CAF50',
    marginBottom: 4,
  },
  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  sugarScore: {
    backgroundColor: '#e8f5e8',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  sugarScoreText: {
    fontSize: 10,
    color: '#4CAF50',
    fontWeight: '500',
  },
  priceText: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
  sugarTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  sugarTagText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
  cardRight: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  timeText: {
    fontSize: 12,
    color: '#999',
    marginBottom: 10,
  },
  removeButton: {
    padding: 5,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginTop: 20,
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
  },
});