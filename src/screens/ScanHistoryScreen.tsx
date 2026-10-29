import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  Modal,
  RefreshControl,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { scanHistoryService, ScanHistoryItem } from '../services/scanHistoryService';

export default function ScanHistoryScreen() {
  const navigation = useNavigation();
  const [history, setHistory] = useState<ScanHistoryItem[]>([]);
  const [filteredHistory, setFilteredHistory] = useState<ScanHistoryItem[]>([]);
  const [selectedFilter, setSelectedFilter] = useState('全部');
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<ScanHistoryItem | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [editingItem, setEditingItem] = useState<ScanHistoryItem | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedFoodName, setEditedFoodName] = useState('');
  const [statistics, setStatistics] = useState({
    totalScans: 0,
    averageScore: 0,
    topCategories: [] as { category: string; count: number }[],
    recentActivity: [] as { date: string; count: number }[],
  });

  const filterOptions = ['全部', '主食', '蛋白質', '蔬菜', '水果', '飲料', '甜點'];

  useFocusEffect(
    React.useCallback(() => {
      loadHistory();
    }, [])
  );

  const loadHistory = async () => {
    try {
      setLoading(true);
      const historyData = await scanHistoryService.getScanHistory();
      const stats = await scanHistoryService.getStatistics();

      setHistory(historyData);
      setFilteredHistory(historyData);
      setStatistics(stats);
    } catch (error) {
      console.error('Error loading history:', error);
      Alert.alert('錯誤', '載入掃描歷史失敗');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    if (filter === '全部') {
      setFilteredHistory(history);
    } else {
      const filtered = history.filter(item =>
        item.analysisResult.category === filter
      );
      setFilteredHistory(filtered);
    }
  };

  const handleDeleteItem = async (id: string) => {
    Alert.alert(
      '刪除確認',
      '確定要刪除這筆掃描記錄嗎？',
      [
        { text: '取消', style: 'cancel' },
        {
          text: '刪除',
          style: 'destructive',
          onPress: async () => {
            try {
              await scanHistoryService.deleteScanItem(id);
              await loadHistory();
            } catch (error) {
              Alert.alert('錯誤', '刪除失敗');
            }
          }
        }
      ]
    );
  };

  const handleClearAll = () => {
    Alert.alert(
      '清除所有記錄',
      '確定要清除所有掃描歷史嗎？此操作無法復原。',
      [
        { text: '取消', style: 'cancel' },
        {
          text: '清除',
          style: 'destructive',
          onPress: async () => {
            try {
              await scanHistoryService.clearHistory();
              await loadHistory();
            } catch (error) {
              Alert.alert('錯誤', '清除失敗');
            }
          }
        }
      ]
    );
  };

  const handleEditFoodName = (item: ScanHistoryItem) => {
    setEditingItem(item);
    setEditedFoodName(item.analysisResult.foodName);
    setShowEditModal(true);
  };

  const handleSaveEditedName = async () => {
    if (!editingItem || !editedFoodName.trim()) {
      Alert.alert('錯誤', '請輸入有效的食物名稱');
      return;
    }

    try {
      await scanHistoryService.updateFoodName(editingItem.id, editedFoodName.trim());
      await loadHistory();
      setShowEditModal(false);
      setEditingItem(null);
      setEditedFoodName('');
    } catch (error) {
      Alert.alert('錯誤', '更新食物名稱失敗');
    }
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
    setEditingItem(null);
    setEditedFoodName('');
  };

  const getSugarFriendlyColor = (score: number) => {
    if (score >= 8) return '#4CAF50';
    if (score >= 6) return '#FF9800';
    return '#F44336';
  };

  const getSugarFriendlyText = (score: number) => {
    if (score >= 8) return '非常適合';
    if (score >= 6) return '適度注意';
    return '需要謹慎';
  };

  const formatDate = (date: Date) => {
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

  const HistoryCard = ({ item }: { item: ScanHistoryItem }) => (
    <TouchableOpacity
      style={styles.historyCard}
      onPress={() => {
        setSelectedItem(item);
        setShowDetail(true);
      }}
    >
      <Image source={{ uri: item.imageUri }} style={styles.foodImage} />

      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.foodName}>{item.analysisResult.foodName}</Text>
          <View style={styles.cardActions}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => handleEditFoodName(item)}
            >
              <Ionicons name="pencil" size={16} color="#4CAF50" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteItem(item.id)}
            >
              <Ionicons name="trash" size={16} color="#999" />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.foodCategory}>{item.analysisResult.category}</Text>

        <View style={styles.scoreRow}>
          <View style={[
            styles.scoreBadge,
            { backgroundColor: getSugarFriendlyColor(item.analysisResult.sugarFriendlyScore) }
          ]}>
            <Text style={styles.scoreText}>
              {item.analysisResult.sugarFriendlyScore}/10
            </Text>
          </View>
          <Text style={styles.timeText}>{formatDate(item.timestamp)}</Text>
        </View>

        <View style={styles.nutritionRow}>
          <Text style={styles.nutritionText}>
            熱量: {item.analysisResult.nutritionalInfo.calories} kcal
          </Text>
          <Text style={styles.nutritionText}>
            糖分: {item.analysisResult.nutritionalInfo.sugar}g
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const StatisticsCard = () => (
    <View style={styles.statsCard}>
      <Text style={styles.statsTitle}>掃描統計</Text>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{statistics.totalScans}</Text>
          <Text style={styles.statLabel}>總掃描數</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{statistics.averageScore}</Text>
          <Text style={styles.statLabel}>平均糖友善度</Text>
        </View>
      </View>

      {statistics.topCategories.length > 0 && (
        <View style={styles.topCategories}>
          <Text style={styles.categoriesTitle}>最常掃描類別</Text>
          {statistics.topCategories.slice(0, 3).map((category, index) => (
            <View key={index} style={styles.categoryItem}>
              <Text style={styles.categoryName}>{category.category}</Text>
              <Text style={styles.categoryCount}>{category.count} 次</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );

  const EditModal = () => (
    <Modal visible={showEditModal} animationType="slide" transparent>
      <View style={styles.editModalOverlay}>
        <View style={styles.editModalContainer}>
          <Text style={styles.editModalTitle}>編輯食物名稱</Text>

          <TextInput
            style={styles.editInput}
            value={editedFoodName}
            onChangeText={setEditedFoodName}
            placeholder="輸入食物名稱"
            autoFocus
            maxLength={50}
          />

          <View style={styles.editModalActions}>
            <TouchableOpacity
              style={[styles.editModalButton, styles.cancelButton]}
              onPress={handleCancelEdit}
            >
              <Text style={styles.cancelButtonText}>取消</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.editModalButton, styles.saveButton]}
              onPress={handleSaveEditedName}
            >
              <Text style={styles.saveButtonText}>保存</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const DetailModal = () => (
    <Modal visible={showDetail} animationType="slide" presentationStyle="pageSheet">
      <SafeAreaView style={styles.detailContainer}>
        <View style={styles.detailHeader}>
          <TouchableOpacity onPress={() => setShowDetail(false)}>
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.detailTitle}>掃描詳情</Text>
          <TouchableOpacity onPress={() => Alert.alert('提示', '分享功能開發中')}>
            <Ionicons name="share" size={24} color="#4CAF50" />
          </TouchableOpacity>
        </View>

        {selectedItem && (
          <ScrollView style={styles.detailContent}>
            <Image source={{ uri: selectedItem.imageUri }} style={styles.detailImage} />

            <View style={styles.detailInfo}>
              <Text style={styles.detailFoodName}>{selectedItem.analysisResult.foodName}</Text>
              <Text style={styles.detailCategory}>{selectedItem.analysisResult.category}</Text>
              <Text style={styles.detailTime}>
                掃描時間: {selectedItem.timestamp.toLocaleString('zh-TW')}
              </Text>

              <View style={styles.detailScore}>
                <Text style={styles.scoreLabel}>糖友善度</Text>
                <View style={[
                  styles.detailScoreBadge,
                  { backgroundColor: getSugarFriendlyColor(selectedItem.analysisResult.sugarFriendlyScore) }
                ]}>
                  <Text style={styles.detailScoreText}>
                    {selectedItem.analysisResult.sugarFriendlyScore}/10
                  </Text>
                </View>
                <Text style={[
                  styles.scoreDescription,
                  { color: getSugarFriendlyColor(selectedItem.analysisResult.sugarFriendlyScore) }
                ]}>
                  {getSugarFriendlyText(selectedItem.analysisResult.sugarFriendlyScore)}
                </Text>
              </View>
            </View>

            <View style={styles.detailNutrition}>
              <Text style={styles.detailSectionTitle}>營養成分 (每100克)</Text>
              <View style={styles.nutritionGrid}>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionLabel}>熱量</Text>
                  <Text style={styles.nutritionValue}>{selectedItem.analysisResult.nutritionalInfo.calories} kcal</Text>
                </View>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionLabel}>碳水化合物</Text>
                  <Text style={styles.nutritionValue}>{selectedItem.analysisResult.nutritionalInfo.carbs}g</Text>
                </View>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionLabel}>糖分</Text>
                  <Text style={[styles.nutritionValue, { color: '#F44336' }]}>
                    {selectedItem.analysisResult.nutritionalInfo.sugar}g
                  </Text>
                </View>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionLabel}>蛋白質</Text>
                  <Text style={styles.nutritionValue}>{selectedItem.analysisResult.nutritionalInfo.protein}g</Text>
                </View>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionLabel}>脂肪</Text>
                  <Text style={styles.nutritionValue}>{selectedItem.analysisResult.nutritionalInfo.fat}g</Text>
                </View>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionLabel}>纖維</Text>
                  <Text style={[styles.nutritionValue, { color: '#4CAF50' }]}>
                    {selectedItem.analysisResult.nutritionalInfo.fiber}g
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.detailAdvice}>
              <Text style={styles.detailSectionTitle}>建議</Text>
              <Text style={styles.adviceText}>{selectedItem.analysisResult.diabeticAdvice}</Text>

              {selectedItem.analysisResult.recommendations.length > 0 && (
                <View style={styles.recommendations}>
                  {selectedItem.analysisResult.recommendations.map((rec, index) => (
                    <View key={index} style={styles.recommendationItem}>
                      <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
                      <Text style={styles.recommendationText}>{rec}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
    </Modal>
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
        <Text style={styles.headerTitle}>掃描歷史</Text>
        <TouchableOpacity
          style={styles.clearButton}
          onPress={handleClearAll}
        >
          <Ionicons name="trash" size={24} color="#F44336" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={loadHistory}
            tintColor="#4CAF50"
          />
        }
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}
          contentContainerStyle={styles.filterContent}
        >
          {filterOptions.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterButton,
                selectedFilter === filter && styles.activeFilterButton
              ]}
              onPress={() => handleFilterChange(filter)}
            >
              <Text style={[
                styles.filterText,
                selectedFilter === filter && styles.activeFilterText
              ]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {statistics.totalScans > 0 && <StatisticsCard />}

        {filteredHistory.length > 0 ? (
          filteredHistory.map((item) => (
            <HistoryCard key={item.id} item={item} />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="camera-outline" size={60} color="#ccc" />
            <Text style={styles.emptyText}>
              {selectedFilter === '全部' ? '還沒有掃描記錄' : `沒有${selectedFilter}類別的掃描記錄`}
            </Text>
            <Text style={styles.emptySubtext}>開始掃描食物來建立您的飲食記錄</Text>
          </View>
        )}
      </ScrollView>

      <EditModal />
      <DetailModal />
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
    padding: 5,
  },
  statsCard: {
    backgroundColor: '#fff',
    marginHorizontal: 0,
    marginBottom: 20,
    padding: 20,
    borderRadius: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  topCategories: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 15,
  },
  categoriesTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  categoryName: {
    fontSize: 13,
    color: '#666',
  },
  categoryCount: {
    fontSize: 13,
    color: '#4CAF50',
    fontWeight: '500',
  },
  filterContainer: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    marginBottom: 10,
    height: 60,
  },
  filterContent: {
    paddingHorizontal: 20,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
    height: 40,
    justifyContent: 'center',
  },
  activeFilterButton: {
    backgroundColor: '#4CAF50',
  },
  filterText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeFilterText: {
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  historyCard: {
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
  foodImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 15,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  foodName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    padding: 5,
    marginRight: 5,
  },
  deleteButton: {
    padding: 5,
  },
  foodCategory: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  scoreBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  scoreText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  timeText: {
    fontSize: 12,
    color: '#999',
  },
  nutritionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nutritionText: {
    fontSize: 12,
    color: '#666',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginTop: 20,
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  detailContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  detailContent: {
    flex: 1,
  },
  detailImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  detailInfo: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  detailFoodName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  detailCategory: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  detailTime: {
    fontSize: 12,
    color: '#999',
    marginBottom: 15,
  },
  detailScore: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreLabel: {
    fontSize: 16,
    color: '#333',
    marginRight: 10,
  },
  detailScoreBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 10,
  },
  detailScoreText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scoreDescription: {
    fontSize: 14,
    fontWeight: '500',
  },
  detailNutrition: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  detailSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  nutritionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  nutritionItem: {
    width: '50%',
    marginBottom: 15,
  },
  nutritionLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  nutritionValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  detailAdvice: {
    padding: 20,
  },
  adviceText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 15,
  },
  recommendations: {
    marginTop: 10,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  recommendationText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
    flex: 1,
    lineHeight: 18,
  },
  editModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editModalContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    width: '80%',
    maxWidth: 300,
  },
  editModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  editInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
  },
  editModalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editModalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  saveButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
});