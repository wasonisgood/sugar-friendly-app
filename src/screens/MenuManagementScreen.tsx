import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, MenuItem } from '../types/navigation';

type MenuManagementNavigationProp = StackNavigationProp<RootStackParamList, 'MenuManagement'>;

interface Props {
  navigation: MenuManagementNavigationProp;
}

const initialMenuItems: MenuItem[] = [
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
];

export default function MenuManagementScreen({ navigation }: Props) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '主餐',
    sugarContent: 'low' as 'low' | 'medium' | 'high',
    ingredients: '',
    calories: '',
    carbs: '',
    sugar: '',
    fiber: '',
  });

  const categories = ['全部', '主餐', '沙拉', '湯品', '飲品', '甜點'];
  const sugarLevels = [
    { value: 'low', label: '低糖', color: '#4CAF50' },
    { value: 'medium', label: '中糖', color: '#FF9800' },
    { value: 'high', label: '高糖', color: '#F44336' },
  ];

  const filteredMenuItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === '全部' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '主餐',
      sugarContent: 'low',
      ingredients: '',
      calories: '',
      carbs: '',
      sugar: '',
      fiber: '',
    });
    setEditingItem(null);
  };

  const openAddModal = () => {
    resetForm();
    setIsModalVisible(true);
  };

  const openEditModal = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      category: item.category,
      sugarContent: item.sugarContent,
      ingredients: item.ingredients?.join(', ') || '',
      calories: item.nutritionInfo?.calories.toString() || '',
      carbs: item.nutritionInfo?.carbs.toString() || '',
      sugar: item.nutritionInfo?.sugar.toString() || '',
      fiber: item.nutritionInfo?.fiber.toString() || '',
    });
    setIsModalVisible(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.description || !formData.price) {
      Alert.alert('錯誤', '請填寫所有必填欄位');
      return;
    }

    const newItem: MenuItem = {
      id: editingItem ? editingItem.id : Date.now().toString(),
      name: formData.name,
      description: formData.description,
      price: parseInt(formData.price),
      category: formData.category,
      sugarContent: formData.sugarContent,
      ingredients: formData.ingredients ? formData.ingredients.split(',').map(s => s.trim()) : [],
      nutritionInfo: {
        calories: parseInt(formData.calories) || 0,
        carbs: parseInt(formData.carbs) || 0,
        sugar: parseInt(formData.sugar) || 0,
        fiber: parseInt(formData.fiber) || 0,
      },
    };

    if (editingItem) {
      setMenuItems(items => items.map(item => item.id === editingItem.id ? newItem : item));
      Alert.alert('成功', '菜單項目已更新');
    } else {
      setMenuItems(items => [...items, newItem]);
      Alert.alert('成功', '新菜單項目已添加');
    }

    setIsModalVisible(false);
    resetForm();
  };

  const handleDelete = (item: MenuItem) => {
    Alert.alert(
      '確認刪除',
      `確定要刪除「${item.name}」嗎？`,
      [
        { text: '取消', style: 'cancel' },
        {
          text: '刪除',
          style: 'destructive',
          onPress: () => {
            setMenuItems(items => items.filter(i => i.id !== item.id));
            Alert.alert('成功', '菜單項目已刪除');
          }
        }
      ]
    );
  };

  const getSugarLevelInfo = (level: string) => {
    return sugarLevels.find(s => s.value === level) || sugarLevels[0];
  };

  const renderMenuItem = ({ item }: { item: MenuItem }) => {
    const sugarInfo = getSugarLevelInfo(item.sugarContent);

    return (
      <View style={styles.menuItemCard}>
        <View style={styles.menuItemHeader}>
          <View style={styles.menuItemInfo}>
            <Text style={styles.menuItemName}>{item.name}</Text>
            <Text style={styles.menuItemDescription}>{item.description}</Text>
            <Text style={styles.menuItemPrice}>NT$ {item.price}</Text>
          </View>
          <View style={styles.menuItemTags}>
            <View style={[styles.categoryTag, { backgroundColor: '#f0f8f0' }]}>
              <Text style={[styles.categoryTagText, { color: '#4CAF50' }]}>
                {item.category}
              </Text>
            </View>
            <View style={[styles.sugarTag, { backgroundColor: sugarInfo.color + '20' }]}>
              <Text style={[styles.sugarTagText, { color: sugarInfo.color }]}>
                {sugarInfo.label}
              </Text>
            </View>
          </View>
        </View>

        {item.nutritionInfo && (
          <View style={styles.nutritionSummary}>
            <Text style={styles.nutritionText}>
              熱量: {item.nutritionInfo.calories} kcal •
              糖份: {item.nutritionInfo.sugar}g •
              纖維: {item.nutritionInfo.fiber}g
            </Text>
          </View>
        )}

        <View style={styles.menuItemActions}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => openEditModal(item)}
          >
            <Ionicons name="create-outline" size={16} color="#4CAF50" />
            <Text style={styles.editButtonText}>編輯</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDelete(item)}
          >
            <Ionicons name="trash-outline" size={16} color="#F44336" />
            <Text style={styles.deleteButtonText}>刪除</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

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

  const renderFormModal = () => (
    <Modal
      visible={isModalVisible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={() => setIsModalVisible(false)}>
            <Text style={styles.cancelButton}>取消</Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>
            {editingItem ? '編輯菜單項目' : '新增菜單項目'}
          </Text>
          <TouchableOpacity onPress={handleSave}>
            <Text style={styles.saveButton}>保存</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalContent}>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>菜品名稱 *</Text>
            <TextInput
              style={styles.formInput}
              value={formData.name}
              onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
              placeholder="請輸入菜品名稱"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>菜品描述 *</Text>
            <TextInput
              style={[styles.formInput, styles.textArea]}
              value={formData.description}
              onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
              placeholder="請輸入菜品描述"
              multiline
              numberOfLines={3}
            />
          </View>

          <View style={styles.formRow}>
            <View style={[styles.formGroup, styles.halfWidth]}>
              <Text style={styles.formLabel}>價格 *</Text>
              <TextInput
                style={styles.formInput}
                value={formData.price}
                onChangeText={(text) => setFormData(prev => ({ ...prev, price: text }))}
                placeholder="價格"
                keyboardType="numeric"
              />
            </View>

            <View style={[styles.formGroup, styles.halfWidth]}>
              <Text style={styles.formLabel}>分類</Text>
              <View style={styles.pickerContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {categories.slice(1).map((category) => (
                    <TouchableOpacity
                      key={category}
                      style={[
                        styles.pickerOption,
                        formData.category === category && styles.selectedPickerOption
                      ]}
                      onPress={() => setFormData(prev => ({ ...prev, category }))}
                    >
                      <Text style={[
                        styles.pickerOptionText,
                        formData.category === category && styles.selectedPickerOptionText
                      ]}>
                        {category}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>糖份含量</Text>
            <View style={styles.sugarLevelContainer}>
              {sugarLevels.map((level) => (
                <TouchableOpacity
                  key={level.value}
                  style={[
                    styles.sugarLevelOption,
                    formData.sugarContent === level.value && { backgroundColor: level.color + '20' }
                  ]}
                  onPress={() => setFormData(prev => ({ ...prev, sugarContent: level.value as any }))}
                >
                  <Text style={[
                    styles.sugarLevelText,
                    formData.sugarContent === level.value && { color: level.color }
                  ]}>
                    {level.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>主要成分</Text>
            <TextInput
              style={styles.formInput}
              value={formData.ingredients}
              onChangeText={(text) => setFormData(prev => ({ ...prev, ingredients: text }))}
              placeholder="請輸入主要成分，用逗號分隔"
            />
          </View>

          <Text style={styles.sectionTitle}>營養資訊</Text>

          <View style={styles.formRow}>
            <View style={[styles.formGroup, styles.halfWidth]}>
              <Text style={styles.formLabel}>熱量 (kcal)</Text>
              <TextInput
                style={styles.formInput}
                value={formData.calories}
                onChangeText={(text) => setFormData(prev => ({ ...prev, calories: text }))}
                placeholder="熱量"
                keyboardType="numeric"
              />
            </View>

            <View style={[styles.formGroup, styles.halfWidth]}>
              <Text style={styles.formLabel}>碳水化合物 (g)</Text>
              <TextInput
                style={styles.formInput}
                value={formData.carbs}
                onChangeText={(text) => setFormData(prev => ({ ...prev, carbs: text }))}
                placeholder="碳水"
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.formRow}>
            <View style={[styles.formGroup, styles.halfWidth]}>
              <Text style={styles.formLabel}>糖份 (g)</Text>
              <TextInput
                style={styles.formInput}
                value={formData.sugar}
                onChangeText={(text) => setFormData(prev => ({ ...prev, sugar: text }))}
                placeholder="糖份"
                keyboardType="numeric"
              />
            </View>

            <View style={[styles.formGroup, styles.halfWidth]}>
              <Text style={styles.formLabel}>纖維 (g)</Text>
              <TextInput
                style={styles.formInput}
                value={formData.fiber}
                onChangeText={(text) => setFormData(prev => ({ ...prev, fiber: text }))}
                placeholder="纖維"
                keyboardType="numeric"
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>菜單管理</Text>
        <TouchableOpacity onPress={openAddModal} style={styles.addButton}>
          <Ionicons name="add" size={24} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="搜尋菜品..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {renderCategoryFilter()}

      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>
          共 {filteredMenuItems.length} 項菜品
        </Text>
      </View>

      <FlatList
        data={filteredMenuItems}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.menuList}
        showsVerticalScrollIndicator={false}
      />

      {renderFormModal()}
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
  addButton: {
    padding: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    paddingVertical: 12,
  },
  categoryContainer: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
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
  statsContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
  },
  statsText: {
    fontSize: 14,
    color: '#666',
  },
  menuList: {
    padding: 15,
  },
  menuItemCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
    gap: 5,
  },
  categoryTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  categoryTagText: {
    fontSize: 12,
    fontWeight: 'bold',
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
  nutritionSummary: {
    marginBottom: 10,
  },
  nutritionText: {
    fontSize: 12,
    color: '#666',
  },
  menuItemActions: {
    flexDirection: 'row',
    gap: 10,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f8f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  editButtonText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffebee',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  deleteButtonText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#F44336',
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  cancelButton: {
    fontSize: 16,
    color: '#666',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  saveButton: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  formInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  formRow: {
    flexDirection: 'row',
    gap: 15,
  },
  halfWidth: {
    flex: 1,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  pickerOption: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginRight: 5,
  },
  selectedPickerOption: {
    backgroundColor: '#4CAF50',
    borderRadius: 6,
    margin: 2,
  },
  pickerOptionText: {
    fontSize: 14,
    color: '#666',
  },
  selectedPickerOptionText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sugarLevelContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  sugarLevelOption: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  sugarLevelText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    marginTop: 10,
  },
});