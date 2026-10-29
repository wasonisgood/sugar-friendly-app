import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Modal,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
    priceRange: 2, // 1: $, 2: $$, 3: $$$, 4: $$$$
    cuisine: '素食'
  },
  {
    id: '2',
    name: '低糖咖啡廳',
    address: '台北市大安區敦化南路二段216號',
    latitude: 25.0266,
    longitude: 121.5516,
    sugarFriendlyScore: 8,
    category: '咖啡廳',
    priceRange: 1,
    cuisine: '咖啡廳'
  },
  {
    id: '3',
    name: '糖友便當店',
    address: '台北市松山區南京東路四段133號',
    latitude: 25.0518,
    longitude: 121.5510,
    sugarFriendlyScore: 9,
    category: '便當',
    priceRange: 2,
    cuisine: '中式'
  },
  {
    id: '4',
    name: '日式健康料理',
    address: '台北市中山區南京東路二段123號',
    latitude: 25.0525,
    longitude: 121.5320,
    sugarFriendlyScore: 8,
    category: '日式',
    priceRange: 3,
    cuisine: '日式'
  },
  {
    id: '5',
    name: '義式輕食餐廳',
    address: '台北市大安區忠孝東路四段156號',
    latitude: 25.0417,
    longitude: 121.5439,
    sugarFriendlyScore: 7,
    category: '義式',
    priceRange: 3,
    cuisine: '義式'
  },
  {
    id: '6',
    name: '泰式健康料理',
    address: '台北市信義區市府路45號',
    latitude: 25.0397,
    longitude: 121.5645,
    sugarFriendlyScore: 8,
    category: '泰式',
    priceRange: 2,
    cuisine: '泰式'
  },
  {
    id: '7',
    name: '韓式烤肉專門店',
    address: '台北市松山區八德路四段123號',
    latitude: 25.0489,
    longitude: 121.5578,
    sugarFriendlyScore: 6,
    category: '韓式',
    priceRange: 4,
    cuisine: '韓式'
  }
];

const cuisineOptions = ['全部', '中式', '日式', '義式', '泰式', '韓式', '素食', '咖啡廳'];
const priceRangeLabels = ['全部', '$', '$$', '$$$', '$$$$'];

export default function MapScreen() {
  const [region, setRegion] = useState<Region>({
    latitude: 25.0330,
    longitude: 121.5654,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [showList, setShowList] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCuisine, setSelectedCuisine] = useState('全部');
  const [selectedPriceRange, setSelectedPriceRange] = useState(0); // 0 means all
  const [priceSliderValue, setPriceSliderValue] = useState([1, 4]); // Range from $ to $$$$
  const [filteredRestaurants, setFilteredRestaurants] = useState(mockRestaurants);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchQuery, selectedCuisine, selectedPriceRange, priceSliderValue]);

  const applyFilters = () => {
    let filtered = mockRestaurants;

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(restaurant =>
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by cuisine
    if (selectedCuisine !== '全部') {
      filtered = filtered.filter(restaurant => restaurant.cuisine === selectedCuisine);
    }

    // Filter by price range (using slider if no specific price is selected)
    if (selectedPriceRange > 0) {
      filtered = filtered.filter(restaurant => restaurant.priceRange === selectedPriceRange);
    } else {
      // Use price slider range
      filtered = filtered.filter(restaurant =>
        restaurant.priceRange >= priceSliderValue[0] &&
        restaurant.priceRange <= priceSliderValue[1]
      );
    }

    setFilteredRestaurants(filtered);
  };

  const resetFilters = () => {
    setSelectedCuisine('全部');
    setSelectedPriceRange(0);
    setPriceSliderValue([1, 4]);
    setSearchQuery('');
  };

  const getPriceRangeString = (priceRange: number) => {
    return '$'.repeat(priceRange);
  };

  const getPriceRangeLabel = (min: number, max: number) => {
    if (min === 1 && max === 4) return '全價位';
    return `${getPriceRangeString(min)} - ${getPriceRangeString(max)}`;
  };

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
      <View style={styles.restaurantInfo}>
        <Text style={styles.restaurantCategory}>{item.cuisine}</Text>
        <Text style={styles.priceRange}>{getPriceRangeString(item.priceRange)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="搜尋健康餐廳..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters(true)}
        >
          <Ionicons name="filter" size={24} color="#4CAF50" />
          {(selectedCuisine !== '全部' || selectedPriceRange > 0 || priceSliderValue[0] !== 1 || priceSliderValue[1] !== 4) && (
            <View style={styles.filterIndicator} />
          )}
        </TouchableOpacity>
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

      {/* Quick Filter Bar */}
      <View style={styles.quickFilterBar}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.quickFilterContent}
        >
          <TouchableOpacity
            style={[
              styles.quickFilterChip,
              selectedCuisine === '全部' && selectedPriceRange === 0 && priceSliderValue[0] === 1 && priceSliderValue[1] === 4 && styles.activeQuickFilter
            ]}
            onPress={resetFilters}
          >
            <Text style={[
              styles.quickFilterText,
              selectedCuisine === '全部' && selectedPriceRange === 0 && priceSliderValue[0] === 1 && priceSliderValue[1] === 4 && styles.activeQuickFilterText
            ]}>
              全部
            </Text>
          </TouchableOpacity>

          {cuisineOptions.slice(1).map((cuisine) => (
            <TouchableOpacity
              key={cuisine}
              style={[
                styles.quickFilterChip,
                selectedCuisine === cuisine && styles.activeQuickFilter
              ]}
              onPress={() => setSelectedCuisine(cuisine)}
            >
              <Text style={[
                styles.quickFilterText,
                selectedCuisine === cuisine && styles.activeQuickFilterText
              ]}>
                {cuisine}
              </Text>
            </TouchableOpacity>
          ))}

          <View style={styles.filterSeparator} />

          {priceRangeLabels.slice(1).map((label, index) => (
            <TouchableOpacity
              key={index + 1}
              style={[
                styles.quickFilterChip,
                selectedPriceRange === index + 1 && styles.activeQuickFilter
              ]}
              onPress={() => setSelectedPriceRange(index + 1)}
            >
              <Text style={[
                styles.quickFilterText,
                selectedPriceRange === index + 1 && styles.activeQuickFilterText
              ]}>
                {label}
              </Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={styles.moreFiltersButton}
            onPress={() => setShowFilters(true)}
          >
            <Ionicons name="options" size={16} color="#4CAF50" />
            <Text style={styles.moreFiltersText}>更多篩選</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {!showList ? (
        <MapView
          style={styles.map}
          region={region}
          onRegionChangeComplete={setRegion}
          showsUserLocation
          showsMyLocationButton
        >
          {filteredRestaurants.map((restaurant) => (
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
          data={filteredRestaurants}
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

      {/* Filter Modal */}
      <Modal visible={showFilters} animationType="slide" transparent>
        <View style={styles.filterModalOverlay}>
          <View style={styles.filterModalContainer}>
            <View style={styles.filterHeader}>
              <Text style={styles.filterTitle}>篩選條件</Text>
              <View style={styles.filterHeaderRight}>
                <Text style={styles.resultsCount}>
                  {filteredRestaurants.length} 個結果
                </Text>
                <TouchableOpacity onPress={() => setShowFilters(false)}>
                  <Ionicons name="close" size={24} color="#333" />
                </TouchableOpacity>
              </View>
            </View>

            <ScrollView style={styles.filterContent}>
              {/* Cuisine Filter */}
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>菜系類型</Text>
                <View style={styles.filterGrid}>
                  {cuisineOptions.map((cuisine) => (
                    <TouchableOpacity
                      key={cuisine}
                      style={[
                        styles.filterGridOption,
                        selectedCuisine === cuisine && styles.selectedFilterOption
                      ]}
                      onPress={() => setSelectedCuisine(cuisine)}
                    >
                      <Text style={[
                        styles.filterOptionText,
                        selectedCuisine === cuisine && styles.selectedFilterOptionText
                      ]}>
                        {cuisine}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Price Range Filter with Slider */}
              <View style={styles.filterSection}>
                <View style={styles.priceSliderHeader}>
                  <Text style={styles.filterSectionTitle}>價格範圍</Text>
                  <Text style={styles.priceRangeDisplay}>
                    {getPriceRangeLabel(priceSliderValue[0], priceSliderValue[1])}
                  </Text>
                </View>

                <View style={styles.priceSliderContainer}>
                  <View style={styles.priceLabels}>
                    <Text style={styles.priceLabel}>$</Text>
                    <Text style={styles.priceLabel}>$$</Text>
                    <Text style={styles.priceLabel}>$$$</Text>
                    <Text style={styles.priceLabel}>$$$$</Text>
                  </View>

                  {/* Custom Price Range Selector */}
                  <View style={styles.priceSlider}>
                    <View style={styles.sliderTrack}>
                      {[1, 2, 3, 4].map((price, index) => (
                        <TouchableOpacity
                          key={price}
                          style={[
                            styles.sliderStep,
                            price >= priceSliderValue[0] && price <= priceSliderValue[1] && styles.activeSliderStep,
                            index === 0 && styles.firstStep,
                            index === 3 && styles.lastStep,
                          ]}
                          onPress={() => {
                            if (price < priceSliderValue[0]) {
                              setPriceSliderValue([price, priceSliderValue[1]]);
                            } else if (price > priceSliderValue[1]) {
                              setPriceSliderValue([priceSliderValue[0], price]);
                            } else {
                              // Toggle off if clicking within range
                              if (priceSliderValue[0] === priceSliderValue[1]) {
                                setPriceSliderValue([1, 4]);
                              } else if (price === priceSliderValue[0]) {
                                setPriceSliderValue([price + 1, priceSliderValue[1]]);
                              } else if (price === priceSliderValue[1]) {
                                setPriceSliderValue([priceSliderValue[0], price - 1]);
                              }
                            }
                          }}
                        >
                          <Text style={[
                            styles.sliderStepText,
                            price >= priceSliderValue[0] && price <= priceSliderValue[1] && styles.activeSliderStepText
                          ]}>
                            {'$'.repeat(price)}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>

                  {/* Quick price preset buttons */}
                  <View style={styles.pricePresets}>
                    <TouchableOpacity
                      style={[
                        styles.pricePresetButton,
                        priceSliderValue[0] === 1 && priceSliderValue[1] === 2 && styles.activePreset
                      ]}
                      onPress={() => setPriceSliderValue([1, 2])}
                    >
                      <Text style={[
                        styles.pricePresetText,
                        priceSliderValue[0] === 1 && priceSliderValue[1] === 2 && styles.activePresetText
                      ]}>
                        平價 ($-$$)
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.pricePresetButton,
                        priceSliderValue[0] === 2 && priceSliderValue[1] === 3 && styles.activePreset
                      ]}
                      onPress={() => setPriceSliderValue([2, 3])}
                    >
                      <Text style={[
                        styles.pricePresetText,
                        priceSliderValue[0] === 2 && priceSliderValue[1] === 3 && styles.activePresetText
                      ]}>
                        中價 ($$-$$$)
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.pricePresetButton,
                        priceSliderValue[0] === 3 && priceSliderValue[1] === 4 && styles.activePreset
                      ]}
                      onPress={() => setPriceSliderValue([3, 4])}
                    >
                      <Text style={[
                        styles.pricePresetText,
                        priceSliderValue[0] === 3 && priceSliderValue[1] === 4 && styles.activePresetText
                      ]}>
                        高價 ($$$-$$$$)
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {/* Health Score Filter */}
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>健康指數</Text>
                <View style={styles.filterGrid}>
                  <TouchableOpacity style={styles.filterGridOption}>
                    <Text style={styles.filterOptionText}>8分以上</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.filterGridOption}>
                    <Text style={styles.filterOptionText}>6-8分</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.filterGridOption}>
                    <Text style={styles.filterOptionText}>6分以下</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Distance Filter */}
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>距離範圍</Text>
                <View style={styles.filterGrid}>
                  <TouchableOpacity style={styles.filterGridOption}>
                    <Text style={styles.filterOptionText}>1公里內</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.filterGridOption}>
                    <Text style={styles.filterOptionText}>3公里內</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.filterGridOption}>
                    <Text style={styles.filterOptionText}>5公里內</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.filterGridOption}>
                    <Text style={styles.filterOptionText}>不限</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>

            <View style={styles.filterActions}>
              <TouchableOpacity
                style={styles.resetButton}
                onPress={resetFilters}
              >
                <Text style={styles.resetButtonText}>重置</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.applyButton}
                onPress={() => setShowFilters(false)}
              >
                <Text style={styles.applyButtonText}>應用篩選</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  filterButton: {
    padding: 10,
    marginRight: 5,
    position: 'relative',
  },
  filterIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF5722',
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
  restaurantInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  restaurantCategory: {
    fontSize: 12,
    color: '#999',
  },
  priceRange: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF9800',
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
  // Filter Modal Styles
  filterModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  filterModalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
  },
  // Quick Filter Bar Styles
  quickFilterBar: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  quickFilterContent: {
    paddingHorizontal: 15,
  },
  quickFilterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    backgroundColor: '#f5f5f5',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  activeQuickFilter: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  quickFilterText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  activeQuickFilterText: {
    color: '#fff',
  },
  filterSeparator: {
    width: 1,
    height: 20,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 10,
  },
  moreFiltersButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  moreFiltersText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
    marginLeft: 4,
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  filterHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultsCount: {
    fontSize: 14,
    color: '#666',
    marginRight: 15,
    fontWeight: '500',
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  filterContent: {
    flex: 1,
    padding: 20,
  },
  filterSection: {
    marginBottom: 25,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  filterGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  filterGridOption: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    minWidth: 80,
    alignItems: 'center',
  },
  filterOptionsScroll: {
    flexDirection: 'row',
  },
  filterOption: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selectedFilterOption: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  filterOptionText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  selectedFilterOptionText: {
    color: '#fff',
  },
  filterActions: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  resetButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    marginRight: 10,
  },
  applyButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  applyButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  // Price Slider Styles
  priceSliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  priceRangeDisplay: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
  },
  priceSliderContainer: {
    paddingHorizontal: 10,
  },
  priceLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  priceLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  priceSlider: {
    width: '100%',
    marginBottom: 15,
  },
  sliderTrack: {
    flexDirection: 'row',
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    overflow: 'hidden',
  },
  sliderStep: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRightWidth: 1,
    borderRightColor: '#e0e0e0',
  },
  activeSliderStep: {
    backgroundColor: '#4CAF50',
  },
  firstStep: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  lastStep: {
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderRightWidth: 0,
  },
  sliderStepText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
  },
  activeSliderStepText: {
    color: '#fff',
  },
  pricePresets: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  pricePresetButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 15,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
  },
  activePreset: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  pricePresetText: {
    fontSize: 11,
    color: '#666',
    fontWeight: '500',
    textAlign: 'center',
  },
  activePresetText: {
    color: '#fff',
  },
});