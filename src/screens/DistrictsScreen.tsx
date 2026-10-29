import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const mockDistricts = [
  {
    id: '1',
    name: '信義商圈',
    restaurantCount: 24,
    averageScore: 8.5,
    area: '信義區',
  },
  {
    id: '2',
    name: '東區商圈',
    restaurantCount: 18,
    averageScore: 8.2,
    area: '大安區',
  },
  {
    id: '3',
    name: '西門商圈',
    restaurantCount: 32,
    averageScore: 7.8,
    area: '萬華區',
  },
  {
    id: '4',
    name: '士林夜市',
    restaurantCount: 45,
    averageScore: 7.5,
    area: '士林區',
  },
];

export default function DistrictsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation<NavigationProp>();

  const renderDistrictItem = ({ item }: { item: typeof mockDistricts[0] }) => (
    <TouchableOpacity
      style={styles.districtCard}
      onPress={() => navigation.navigate('DistrictDetail', {
        districtId: item.id,
        districtName: item.name
      })}
    >
      <View style={styles.districtHeader}>
        <Text style={styles.districtName}>{item.name}</Text>
        <View style={styles.scoreContainer}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.score}>{item.averageScore}</Text>
        </View>
      </View>
      <Text style={styles.area}>{item.area}</Text>
      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Ionicons name="restaurant" size={16} color="#4CAF50" />
          <Text style={styles.statText}>{item.restaurantCount} 家餐廳</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>商圈列表</Text>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="搜尋商圈..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <FlatList
        data={mockDistricts}
        renderItem={renderDistrictItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    paddingVertical: 12,
  },
  listContent: {
    padding: 15,
  },
  districtCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  districtHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  districtName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff9e6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 15,
  },
  score: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF8C00',
  },
  area: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  statsContainer: {
    flexDirection: 'row',
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
  },
});