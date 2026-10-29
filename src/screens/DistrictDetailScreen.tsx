import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Restaurant } from '../types/navigation';

type DistrictDetailRouteProp = RouteProp<RootStackParamList, 'DistrictDetail'>;
type DistrictDetailNavigationProp = StackNavigationProp<RootStackParamList, 'DistrictDetail'>;

interface Props {
  route: DistrictDetailRouteProp;
  navigation: DistrictDetailNavigationProp;
}

const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: '健康素食館',
    category: '素食料理',
    rating: 4.5,
    address: '台北市信義區信義路五段7號',
    phone: '02-2345-6789',
    description: '提供各種低糖素食選擇，使用天然食材',
    openHours: '11:00-21:00',
    specialties: ['低糖豆腐', '蒸蔬菜', '五穀飯'],
    sugarFriendlyScore: 9.2,
    image: undefined,
  },
  {
    id: '2',
    name: '輕食咖啡廳',
    category: '咖啡輕食',
    rating: 4.2,
    address: '台北市信義區松仁路28號',
    phone: '02-2765-4321',
    description: '專門提供糖友善的輕食和飲品',
    openHours: '08:00-20:00',
    specialties: ['無糖咖啡', '全麥三明治', '蔬菜沙拉'],
    sugarFriendlyScore: 8.8,
    image: undefined,
  },
  {
    id: '3',
    name: '日式定食屋',
    category: '日式料理',
    rating: 4.3,
    address: '台北市信義區市府路45號',
    phone: '02-2234-5678',
    description: '傳統日式料理，提供糖份標示',
    openHours: '12:00-22:00',
    specialties: ['烤魚定食', '味噌湯', '糙米飯'],
    sugarFriendlyScore: 8.5,
    image: undefined,
  },
];

export default function DistrictDetailScreen({ route, navigation }: Props) {
  const { districtId, districtName } = route.params;
  const [selectedCategory, setSelectedCategory] = useState('全部');

  const categories = ['全部', '素食料理', '咖啡輕食', '日式料理', '中式料理'];

  const filteredRestaurants = selectedCategory === '全部'
    ? mockRestaurants
    : mockRestaurants.filter(restaurant => restaurant.category === selectedCategory);

  const renderRestaurantCard = ({ item }: { item: Restaurant }) => (
    <TouchableOpacity
      style={styles.restaurantCard}
      onPress={() => navigation.navigate('RestaurantDetail', {
        restaurantId: item.id,
        restaurantName: item.name
      })}
    >
      <View style={styles.restaurantHeader}>
        <View style={styles.restaurantInfo}>
          <Text style={styles.restaurantName}>{item.name}</Text>
          <Text style={styles.category}>{item.category}</Text>
          <Text style={styles.address}>{item.address}</Text>
        </View>
        <View style={styles.ratingContainer}>
          <View style={styles.rating}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
          <View style={styles.sugarScore}>
            <Text style={styles.sugarScoreLabel}>糖友善度</Text>
            <Text style={styles.sugarScoreValue}>{item.sugarFriendlyScore}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.description}>{item.description}</Text>

      <View style={styles.specialtiesContainer}>
        <Text style={styles.specialtiesLabel}>推薦餐點：</Text>
        <View style={styles.specialties}>
          {item.specialties?.map((specialty, index) => (
            <View key={index} style={styles.specialtyTag}>
              <Text style={styles.specialtyText}>{specialty}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.restaurantFooter}>
        <View style={styles.hours}>
          <Ionicons name="time-outline" size={16} color="#666" />
          <Text style={styles.hoursText}>{item.openHours}</Text>
        </View>
        <TouchableOpacity style={styles.phoneButton}>
          <Ionicons name="call-outline" size={16} color="#4CAF50" />
          <Text style={styles.phoneText}>致電</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderCategoryFilter = () => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
      {categories.map((category) => (
        <TouchableOpacity
          key={category}
          style={[
            styles.categoryButton,
            selectedCategory === category && styles.selectedCategory
          ]}
          onPress={() => setSelectedCategory(category)}
        >
          <Text style={[
            styles.categoryText,
            selectedCategory === category && styles.selectedCategoryText
          ]}>
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>{districtName}</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.districtInfo}>
          <Text style={styles.districtDescription}>
            {districtName}擁有多家糖友善餐廳，提供健康美味的餐點選擇。
            我們精心挑選每一家餐廳，確保提供準確的營養資訊。
          </Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Ionicons name="restaurant" size={20} color="#4CAF50" />
              <Text style={styles.statNumber}>{mockRestaurants.length}</Text>
              <Text style={styles.statLabel}>家餐廳</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="star" size={20} color="#FFD700" />
              <Text style={styles.statNumber}>4.3</Text>
              <Text style={styles.statLabel}>平均評分</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="leaf" size={20} color="#4CAF50" />
              <Text style={styles.statNumber}>8.8</Text>
              <Text style={styles.statLabel}>糖友善度</Text>
            </View>
          </View>
        </View>

        {renderCategoryFilter()}

        <FlatList
          data={filteredRestaurants}
          renderItem={renderRestaurantCard}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={styles.restaurantsList}
        />
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
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholder: {
    width: 34,
  },
  content: {
    flex: 1,
  },
  districtInfo: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
  },
  districtDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  categoryContainer: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  selectedCategory: {
    backgroundColor: '#4CAF50',
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
  },
  selectedCategoryText: {
    color: '#fff',
    fontWeight: '500',
  },
  restaurantsList: {
    padding: 15,
  },
  restaurantCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  restaurantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  restaurantInfo: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
    color: '#4CAF50',
    marginBottom: 4,
  },
  address: {
    fontSize: 12,
    color: '#666',
  },
  ratingContainer: {
    alignItems: 'flex-end',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  sugarScore: {
    alignItems: 'center',
    backgroundColor: '#e8f5e8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  sugarScoreLabel: {
    fontSize: 10,
    color: '#4CAF50',
  },
  sugarScoreValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
    marginBottom: 12,
  },
  specialtiesContainer: {
    marginBottom: 15,
  },
  specialtiesLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  specialties: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  specialtyTag: {
    backgroundColor: '#f0f8f0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  specialtyText: {
    fontSize: 12,
    color: '#4CAF50',
  },
  restaurantFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hours: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hoursText: {
    marginLeft: 5,
    fontSize: 12,
    color: '#666',
  },
  phoneButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f8f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  phoneText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
  },
});