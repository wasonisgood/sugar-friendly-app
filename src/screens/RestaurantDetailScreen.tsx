import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, MenuItem } from '../types/navigation';

type RestaurantDetailRouteProp = RouteProp<RootStackParamList, 'RestaurantDetail'>;
type RestaurantDetailNavigationProp = StackNavigationProp<RootStackParamList, 'RestaurantDetail'>;

interface Props {
  route: RestaurantDetailRouteProp;
  navigation: RestaurantDetailNavigationProp;
}

const mockMenuItems: MenuItem[] = [
  {
    id: '1',
    name: '低糖豆腐定食',
    description: '嫩豆腐配蒸蔬菜，少油少鹽調味',
    price: 280,
    category: '主餐',
    sugarContent: 'low',
    ingredients: ['豆腐', '青菜', '糙米', '味噌湯'],
    nutritionInfo: {
      calories: 320,
      carbs: 35,
      sugar: 8,
      fiber: 6,
    },
  },
  {
    id: '2',
    name: '蔬菜沙拉',
    description: '新鮮蔬菜配橄欖油醋汁',
    price: 150,
    category: '沙拉',
    sugarContent: 'low',
    ingredients: ['生菜', '番茄', '小黃瓜', '橄欖油'],
    nutritionInfo: {
      calories: 120,
      carbs: 12,
      sugar: 6,
      fiber: 4,
    },
  },
  {
    id: '3',
    name: '烤雞胸肉',
    description: '香料烤雞胸配時蔬',
    price: 320,
    category: '主餐',
    sugarContent: 'low',
    ingredients: ['雞胸肉', '迷迭香', '檸檬', '蔬菜'],
    nutritionInfo: {
      calories: 280,
      carbs: 8,
      sugar: 4,
      fiber: 3,
    },
  },
];

const mockRestaurant = {
  id: '1',
  name: '健康素食館',
  category: '素食料理',
  rating: 4.5,
  address: '台北市信義區信義路五段7號',
  phone: '02-2345-6789',
  description: '提供各種低糖素食選擇，使用天然食材，致力於為糖尿病友提供美味健康的餐點。我們的廚師團隊具有營養學背景，每道菜品都經過精心設計。',
  openHours: '11:00-21:00',
  specialties: ['低糖豆腐', '蒸蔬菜', '五穀飯'],
  sugarFriendlyScore: 9.2,
  image: undefined,
};

export default function RestaurantDetailScreen({ route, navigation }: Props) {
  const { restaurantId, restaurantName } = route.params;
  const [selectedCategory, setSelectedCategory] = useState('全部');

  const categories = ['全部', '主餐', '沙拉', '湯品', '飲品'];

  const filteredMenuItems = selectedCategory === '全部'
    ? mockMenuItems
    : mockMenuItems.filter(item => item.category === selectedCategory);

  const getSugarLevelColor = (level: string) => {
    switch (level) {
      case 'low': return '#4CAF50';
      case 'medium': return '#FF9800';
      case 'high': return '#F44336';
      default: return '#666';
    }
  };

  const getSugarLevelText = (level: string) => {
    switch (level) {
      case 'low': return '低糖';
      case 'medium': return '中糖';
      case 'high': return '高糖';
      default: return '未知';
    }
  };

  const handleCall = () => {
    Linking.openURL(`tel:${mockRestaurant.phone}`);
  };

  const renderMenuItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.menuItem}>
      <View style={styles.menuItemHeader}>
        <View style={styles.menuItemInfo}>
          <Text style={styles.menuItemName}>{item.name}</Text>
          <Text style={styles.menuItemDescription}>{item.description}</Text>
          <Text style={styles.menuItemPrice}>NT$ {item.price}</Text>
        </View>
        <View style={styles.menuItemTags}>
          <View style={[styles.sugarTag, { backgroundColor: getSugarLevelColor(item.sugarContent) + '20' }]}>
            <Text style={[styles.sugarTagText, { color: getSugarLevelColor(item.sugarContent) }]}>
              {getSugarLevelText(item.sugarContent)}
            </Text>
          </View>
        </View>
      </View>

      {item.nutritionInfo && (
        <View style={styles.nutritionInfo}>
          <Text style={styles.nutritionTitle}>營養資訊 (每份)</Text>
          <View style={styles.nutritionRow}>
            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionLabel}>熱量</Text>
              <Text style={styles.nutritionValue}>{item.nutritionInfo.calories} kcal</Text>
            </View>
            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionLabel}>碳水</Text>
              <Text style={styles.nutritionValue}>{item.nutritionInfo.carbs}g</Text>
            </View>
            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionLabel}>糖份</Text>
              <Text style={styles.nutritionValue}>{item.nutritionInfo.sugar}g</Text>
            </View>
            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionLabel}>纖維</Text>
              <Text style={styles.nutritionValue}>{item.nutritionInfo.fiber}g</Text>
            </View>
          </View>
        </View>
      )}

      {item.ingredients && (
        <View style={styles.ingredients}>
          <Text style={styles.ingredientsTitle}>主要成分：</Text>
          <Text style={styles.ingredientsText}>{item.ingredients.join(', ')}</Text>
        </View>
      )}
    </View>
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
        <Text style={styles.title}>{restaurantName}</Text>
        <TouchableOpacity style={styles.favoriteButton}>
          <Ionicons name="heart-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.restaurantInfo}>
          <View style={styles.restaurantHeader}>
            <View style={styles.restaurantBasicInfo}>
              <Text style={styles.restaurantName}>{mockRestaurant.name}</Text>
              <Text style={styles.category}>{mockRestaurant.category}</Text>
              <Text style={styles.address}>{mockRestaurant.address}</Text>
            </View>
            <View style={styles.scores}>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={styles.rating}>{mockRestaurant.rating}</Text>
              </View>
              <View style={styles.sugarScore}>
                <Text style={styles.sugarScoreLabel}>糖友善度</Text>
                <Text style={styles.sugarScoreValue}>{mockRestaurant.sugarFriendlyScore}</Text>
              </View>
            </View>
          </View>

          <Text style={styles.description}>{mockRestaurant.description}</Text>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.callButton} onPress={handleCall}>
              <Ionicons name="call" size={20} color="#fff" />
              <Text style={styles.callButtonText}>致電餐廳</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.directionsButton}>
              <Ionicons name="navigate" size={20} color="#4CAF50" />
              <Text style={styles.directionsButtonText}>路線導航</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Ionicons name="time-outline" size={20} color="#666" />
              <Text style={styles.infoText}>{mockRestaurant.openHours}</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="call-outline" size={20} color="#666" />
              <Text style={styles.infoText}>{mockRestaurant.phone}</Text>
            </View>
          </View>

          <View style={styles.specialtiesContainer}>
            <Text style={styles.specialtiesLabel}>推薦餐點：</Text>
            <View style={styles.specialties}>
              {mockRestaurant.specialties?.map((specialty, index) => (
                <View key={index} style={styles.specialtyTag}>
                  <Text style={styles.specialtyText}>{specialty}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.menuTitle}>菜單</Text>
          {renderCategoryFilter()}
          <FlatList
            data={filteredMenuItems}
            renderItem={renderMenuItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.menuList}
          />
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  favoriteButton: {
    padding: 5,
  },
  content: {
    flex: 1,
  },
  restaurantInfo: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
  },
  restaurantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  restaurantBasicInfo: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 22,
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
    fontSize: 14,
    color: '#666',
  },
  scores: {
    alignItems: 'flex-end',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    marginLeft: 4,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  sugarScore: {
    alignItems: 'center',
    backgroundColor: '#e8f5e8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  sugarScoreLabel: {
    fontSize: 10,
    color: '#4CAF50',
  },
  sugarScoreValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 20,
  },
  callButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 10,
  },
  callButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  directionsButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f8f0',
    paddingVertical: 12,
    borderRadius: 10,
  },
  directionsButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  infoRow: {
    gap: 15,
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#666',
  },
  specialtiesContainer: {
    marginBottom: 10,
  },
  specialtiesLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  specialties: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  specialtyTag: {
    backgroundColor: '#f0f8f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
  },
  specialtyText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
  },
  menuSection: {
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  categoryContainer: {
    paddingVertical: 10,
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
  menuList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  menuItem: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  menuItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  menuItemInfo: {
    flex: 1,
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  menuItemDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  menuItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  menuItemTags: {
    alignItems: 'flex-end',
  },
  sugarTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  sugarTagText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  nutritionInfo: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  nutritionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  nutritionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nutritionItem: {
    alignItems: 'center',
  },
  nutritionLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  nutritionValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  ingredients: {
    marginTop: 5,
  },
  ingredientsTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 4,
  },
  ingredientsText: {
    fontSize: 12,
    color: '#666',
  },
});