import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';

// Mock data for restaurants
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
  const [region, setRegion] = useState<Region>({
    latitude: 25.0330,
    longitude: 121.5654,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Location permission denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    } catch (error) {
      console.log('Error getting location:', error);
    }
  };

  const renderRestaurantItem = ({ item }: { item: typeof mockRestaurants[0] }) => (
    <TouchableOpacity style={styles.restaurantCard}>
      <View style={styles.restaurantHeader}>
        <Text style={styles.restaurantName}>{item.name}</Text>
        <View style={styles.scoreContainer}>
          <Ionicons name="leaf" size={16} color="#4CAF50" />
          <Text style={styles.score}>{item.sugarFriendlyScore}/10</Text>
        </View>
      </View>
      <Text style={styles.restaurantAddress}>{item.address}</Text>
      <Text style={styles.restaurantCategory}>{item.category}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="搜尋糖友善餐廳..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity
          style={styles.viewToggle}
          onPress={() => setShowList(!showList)}
        >
          <Ionicons
            name={showList ? 'map' : 'list'}
            size={24}
            color="#4CAF50"
          />
        </TouchableOpacity>
      </View>

      {!showList ? (
        <MapView
          style={styles.map}
          region={region}
          onRegionChangeComplete={setRegion}
          showsUserLocation
          showsMyLocationButton
        >
          {mockRestaurants.map((restaurant) => (
            <Marker
              key={restaurant.id}
              coordinate={{
                latitude: restaurant.latitude,
                longitude: restaurant.longitude,
              }}
              title={restaurant.name}
              description={`糖友善度: ${restaurant.sugarFriendlyScore}/10`}
            >
              <View style={styles.markerContainer}>
                <Ionicons name="leaf" size={30} color="#4CAF50" />
              </View>
            </Marker>
          ))}
        </MapView>
      ) : (
        <FlatList
          data={mockRestaurants}
          renderItem={renderRestaurantItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
          contentContainerStyle={styles.listContent}
        />
      )}

      <TouchableOpacity
        style={styles.locationButton}
        onPress={getCurrentLocation}
      >
        <Ionicons name="locate" size={24} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    paddingVertical: 12,
  },
  viewToggle: {
    padding: 10,
  },
  map: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: 15,
  },
  restaurantCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  restaurantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f5e8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 15,
  },
  score: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  restaurantAddress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  restaurantCategory: {
    fontSize: 12,
    color: '#999',
  },
  markerContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  locationButton: {
    position: 'absolute',
    right: 20,
    bottom: 100,
    backgroundColor: '#4CAF50',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});