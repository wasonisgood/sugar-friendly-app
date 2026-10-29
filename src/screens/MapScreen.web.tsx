import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const mockRestaurants = [
  {
    id: '1',
    name: '健康蔬食餐廳',
    address: '台北市信義區信義路五段7號',
    latitude: 25.0330,
    longitude: 121.5654,
    sugarFriendlyScore: 9,
    category: '素食',
  },
  {
    id: '2',
    name: '低糖咖啡廳',
    address: '台北市大安區敦化南路二段216號',
    latitude: 25.0266,
    longitude: 121.5516,
    sugarFriendlyScore: 8,
    category: '咖啡廳',
  },
  {
    id: '3',
    name: '糖友便當店',
    address: '台北市松山區南京東路四段133號',
    latitude: 25.0518,
    longitude: 121.5510,
    sugarFriendlyScore: 9,
    category: '便當',
  },
];

export default function MapScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRestaurants, setFilteredRestaurants] = useState(mockRestaurants);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredRestaurants(mockRestaurants);
    } else {
      const filtered = mockRestaurants.filter(restaurant =>
        restaurant.name.toLowerCase().includes(query.toLowerCase()) ||
        restaurant.address.toLowerCase().includes(query.toLowerCase()) ||
        restaurant.category.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredRestaurants(filtered);
    }
  };

  const openInGoogleMaps = (restaurant: typeof mockRestaurants[0]) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${restaurant.latitude},${restaurant.longitude}`;
    window.open(url, '_blank');
  };

  const renderRestaurantItem = ({ item }: { item: typeof mockRestaurants[0] }) => (
    <TouchableOpacity
      style={styles.restaurantCard}
      onPress={() => openInGoogleMaps(item)}
    >
      <View style={styles.restaurantHeader}>
        <Text style={styles.restaurantName}>{item.name}</Text>
        <View style={styles.scoreContainer}>
          <Ionicons name="leaf" size={16} color="#4CAF50" />
          <Text style={styles.score}>{item.sugarFriendlyScore}/10</Text>
        </View>
      </View>
      <Text style={styles.restaurantAddress}>{item.address}</Text>
      <View style={styles.restaurantFooter}>
        <Text style={styles.restaurantCategory}>{item.category}</Text>
        <TouchableOpacity
          style={styles.mapButton}
          onPress={() => openInGoogleMaps(item)}
        >
          <Ionicons name="map" size={16} color="#2196F3" />
          <Text style={styles.mapButtonText}>在地圖中查看</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#666" />
            <TextInput
              style={styles.searchInput}
              placeholder="搜尋糖友善餐廳..."
              value={searchQuery}
              onChangeText={handleSearch}
            />
          </View>
          <View style={styles.webNotice}>
            <Ionicons name="information-circle" size={16} color="#2196F3" />
            <Text style={styles.webNoticeText}>
              網頁版本 - 點擊餐廳卡片在Google地圖中查看位置
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.resultsHeaderContainer}>
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsCount}>
            找到 {filteredRestaurants.length} 間糖友善餐廳
          </Text>
        </View>
      </View>

      <View style={styles.listContainer}>
        <FlatList
          data={filteredRestaurants}
          renderItem={renderRestaurantItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    paddingVertical: 20,
  },
  headerContent: {
    paddingHorizontal: 20,
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#495057',
  },
  webNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e3f2fd',
    padding: 12,
    borderRadius: 8,
  },
  webNoticeText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#1976d2',
    flex: 1,
  },
  resultsHeaderContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  resultsHeader: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  resultsCount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#495057',
  },
  listContainer: {
    flex: 1,
    alignItems: 'center',
  },
  list: {
    flex: 1,
    width: '100%',
    maxWidth: 1200,
  },
  listContent: {
    padding: 20,
  },
  restaurantCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  restaurantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    flex: 1,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f5e8',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 15,
  },
  score: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  restaurantAddress: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 12,
    lineHeight: 20,
  },
  restaurantFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  restaurantCategory: {
    fontSize: 12,
    color: '#6c757d',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  mapButtonText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#2196F3',
    fontWeight: '500',
  },
});