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

export default function FavoritesScreen() {
  const navigation = useNavigation();

  const [favorites, setFavorites] = useState([
    {
      id: '1',
      type: 'restaurant',
      name: '健康素食館',
      category: '素食料理',
      rating: 4.5,
      sugarFriendlyScore: 85,
      address: '台北市大安區',
      image: null,
    },
    {
      id: '2',
      type: 'restaurant',
      name: '糖友好餐廳',
      category: '健康料理',
      rating: 4.8,
      sugarFriendlyScore: 92,
      address: '台北市信義區',
      image: null,
    },
    {
      id: '3',
      type: 'menu',
      name: '低糖燕麥粥',
      restaurant: '健康早餐店',
      price: 80,
      sugarContent: 'low',
      category: '早餐',
      image: null,
    },
    {
      id: '4',
      type: 'menu',
      name: '蒸蛋豆腐',
      restaurant: '養生餐廳',
      price: 120,
      sugarContent: 'low',
      category: '主菜',
      image: null,
    },
  ]);

  const [activeTab, setActiveTab] = useState('all');

  const filteredFavorites = favorites.filter(item => {
    if (activeTab === 'all') return true;
    if (activeTab === 'restaurants') return item.type === 'restaurant';
    if (activeTab === 'menus') return item.type === 'menu';
    return true;
  });

  const removeFavorite = (id: string) => {
    Alert.alert(
      '移除收藏',
      '確定要移除此項目嗎？',
      [
        { text: '取消', style: 'cancel' },
        {
          text: '移除',
          style: 'destructive',
          onPress: () => setFavorites(favorites.filter(item => item.id !== id))
        }
      ]
    );
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

  const RestaurantCard = ({ item }: any) => (
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
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => removeFavorite(item.id)}
        >
          <Ionicons name="heart" size={24} color="#F44336" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const MenuCard = ({ item }: any) => (
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
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => removeFavorite(item.id)}
        >
          <Ionicons name="heart" size={24} color="#F44336" />
        </TouchableOpacity>
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
        <Text style={styles.headerTitle}>我的最愛</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'all' && styles.activeTab]}
          onPress={() => setActiveTab('all')}
        >
          <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>
            全部 ({favorites.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'restaurants' && styles.activeTab]}
          onPress={() => setActiveTab('restaurants')}
        >
          <Text style={[styles.tabText, activeTab === 'restaurants' && styles.activeTabText]}>
            餐廳 ({favorites.filter(item => item.type === 'restaurant').length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'menus' && styles.activeTab]}
          onPress={() => setActiveTab('menus')}
        >
          <Text style={[styles.tabText, activeTab === 'menus' && styles.activeTabText]}>
            菜單 ({favorites.filter(item => item.type === 'menu').length})
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {filteredFavorites.length > 0 ? (
          filteredFavorites.map((item) => (
            <View key={item.id}>
              {item.type === 'restaurant' ? (
                <RestaurantCard item={item} />
              ) : (
                <MenuCard item={item} />
              )}
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="heart-outline" size={60} color="#ccc" />
            <Text style={styles.emptyText}>還沒有收藏任何項目</Text>
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
  placeholder: {
    width: 30,
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