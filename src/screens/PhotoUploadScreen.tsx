import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import * as ImagePicker from 'expo-image-picker';

type PhotoUploadNavigationProp = StackNavigationProp<RootStackParamList, 'PhotoUpload'>;

interface Props {
  navigation: PhotoUploadNavigationProp;
}

interface PhotoItem {
  id: string;
  uri: string;
  category: 'restaurant' | 'menu' | 'interior' | 'exterior';
  description?: string;
  uploadDate: Date;
}

const mockPhotos: PhotoItem[] = [
  {
    id: '1',
    uri: 'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=Restaurant+Front',
    category: 'exterior',
    description: '餐廳外觀',
    uploadDate: new Date(),
  },
  {
    id: '2',
    uri: 'https://via.placeholder.com/300x200/FF9800/FFFFFF?text=Interior+View',
    category: 'interior',
    description: '用餐環境',
    uploadDate: new Date(),
  },
  {
    id: '3',
    uri: 'https://via.placeholder.com/300x200/2196F3/FFFFFF?text=Menu+Item',
    category: 'menu',
    description: '低糖豆腐定食',
    uploadDate: new Date(),
  },
];

export default function PhotoUploadScreen({ navigation }: Props) {
  const [photos, setPhotos] = useState<PhotoItem[]>(mockPhotos);
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);

  const categories = [
    { key: '全部', label: '全部照片', icon: 'images-outline' },
    { key: 'restaurant', label: '餐廳標誌', icon: 'storefront-outline' },
    { key: 'exterior', label: '外觀照片', icon: 'business-outline' },
    { key: 'interior', label: '內部環境', icon: 'home-outline' },
    { key: 'menu', label: '菜品照片', icon: 'restaurant-outline' },
  ];

  const uploadCategories = [
    { key: 'restaurant', label: '餐廳標誌', icon: 'storefront-outline' },
    { key: 'exterior', label: '外觀照片', icon: 'business-outline' },
    { key: 'interior', label: '內部環境', icon: 'home-outline' },
    { key: 'menu', label: '菜品照片', icon: 'restaurant-outline' },
  ];

  const filteredPhotos = selectedCategory === '全部'
    ? photos
    : photos.filter(photo => photo.category === selectedCategory);

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('權限需求', '需要訪問相冊權限來上傳照片');
      return false;
    }
    return true;
  };

  const pickImage = async (category: string) => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const newPhoto: PhotoItem = {
          id: Date.now().toString(),
          uri: result.assets[0].uri,
          category: category as any,
          description: getCategoryLabel(category),
          uploadDate: new Date(),
        };

        setPhotos(prev => [newPhoto, ...prev]);
        Alert.alert('成功', '照片上傳成功');
      }
    } catch (error) {
      Alert.alert('錯誤', '照片上傳失敗，請重試');
    }
  };

  const takePhoto = async (category: string) => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const newPhoto: PhotoItem = {
          id: Date.now().toString(),
          uri: result.assets[0].uri,
          category: category as any,
          description: getCategoryLabel(category),
          uploadDate: new Date(),
        };

        setPhotos(prev => [newPhoto, ...prev]);
        Alert.alert('成功', '照片拍攝成功');
      }
    } catch (error) {
      Alert.alert('錯誤', '拍照失敗，請重試');
    }
  };

  const getCategoryLabel = (category: string) => {
    const cat = uploadCategories.find(c => c.key === category);
    return cat ? cat.label : category;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      restaurant: '#4CAF50',
      exterior: '#2196F3',
      interior: '#FF9800',
      menu: '#9C27B0',
    };
    return colors[category as keyof typeof colors] || '#666';
  };

  const showUploadOptions = (category: string) => {
    Alert.alert(
      '選擇照片來源',
      '請選擇您要如何添加照片',
      [
        { text: '取消', style: 'cancel' },
        { text: '從相冊選擇', onPress: () => pickImage(category) },
        { text: '拍照', onPress: () => takePhoto(category) },
      ]
    );
  };

  const deletePhoto = (photoId: string) => {
    Alert.alert(
      '確認刪除',
      '確定要刪除這張照片嗎？',
      [
        { text: '取消', style: 'cancel' },
        {
          text: '刪除',
          style: 'destructive',
          onPress: () => {
            setPhotos(prev => prev.filter(p => p.id !== photoId));
            setIsModalVisible(false);
            Alert.alert('成功', '照片已刪除');
          }
        }
      ]
    );
  };

  const renderUploadCard = (category: typeof uploadCategories[0]) => (
    <TouchableOpacity
      key={category.key}
      style={styles.uploadCard}
      onPress={() => showUploadOptions(category.key)}
    >
      <View style={[styles.uploadIcon, { backgroundColor: getCategoryColor(category.key) + '20' }]}>
        <Ionicons name={category.icon as any} size={32} color={getCategoryColor(category.key)} />
      </View>
      <Text style={styles.uploadTitle}>{category.label}</Text>
      <Text style={styles.uploadSubtitle}>點擊上傳照片</Text>
      <View style={styles.addIcon}>
        <Ionicons name="add-circle" size={24} color={getCategoryColor(category.key)} />
      </View>
    </TouchableOpacity>
  );

  const renderPhotoItem = ({ item }: { item: PhotoItem }) => (
    <TouchableOpacity
      style={styles.photoItem}
      onPress={() => {
        setSelectedPhoto(item);
        setIsModalVisible(true);
      }}
    >
      <Image source={{ uri: item.uri }} style={styles.photoImage} />
      <View style={styles.photoOverlay}>
        <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(item.category) }]}>
          <Text style={styles.categoryBadgeText}>{getCategoryLabel(item.category)}</Text>
        </View>
      </View>
      {item.description && (
        <Text style={styles.photoDescription} numberOfLines={1}>
          {item.description}
        </Text>
      )}
    </TouchableOpacity>
  );

  const renderCategoryFilter = () => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
      {categories.map((category) => (
        <TouchableOpacity
          key={category.key}
          style={[
            styles.categoryButton,
            selectedCategory === category.key && styles.selectedCategory
          ]}
          onPress={() => setSelectedCategory(category.key)}
        >
          <Ionicons
            name={category.icon as any}
            size={16}
            color={selectedCategory === category.key ? '#fff' : '#666'}
          />
          <Text style={[
            styles.categoryText,
            selectedCategory === category.key && styles.selectedCategoryText
          ]}>
            {category.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderPhotoModal = () => (
    <Modal
      visible={isModalVisible}
      animationType="fade"
      transparent={true}
      onRequestClose={() => setIsModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setIsModalVisible(false)}
          >
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>

          {selectedPhoto && (
            <>
              <Image source={{ uri: selectedPhoto.uri }} style={styles.fullImage} />
              <View style={styles.photoInfo}>
                <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(selectedPhoto.category) }]}>
                  <Text style={styles.categoryBadgeText}>
                    {getCategoryLabel(selectedPhoto.category)}
                  </Text>
                </View>
                <Text style={styles.photoTitle}>{selectedPhoto.description}</Text>
                <Text style={styles.photoDate}>
                  上傳時間：{selectedPhoto.uploadDate.toLocaleDateString()}
                </Text>
              </View>

              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={styles.deletePhotoButton}
                  onPress={() => deletePhoto(selectedPhoto.id)}
                >
                  <Ionicons name="trash-outline" size={20} color="#F44336" />
                  <Text style={styles.deletePhotoButtonText}>刪除照片</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>照片管理</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.uploadSection}>
          <Text style={styles.sectionTitle}>上傳新照片</Text>
          <Text style={styles.sectionSubtitle}>為您的餐廳添加精美照片，吸引更多顧客</Text>
          <View style={styles.uploadGrid}>
            {uploadCategories.map(renderUploadCard)}
          </View>
        </View>

        <View style={styles.gallerySection}>
          <View style={styles.galleryHeader}>
            <Text style={styles.sectionTitle}>照片庫</Text>
            <Text style={styles.photoCount}>共 {filteredPhotos.length} 張照片</Text>
          </View>

          {renderCategoryFilter()}

          <FlatList
            data={filteredPhotos}
            renderItem={renderPhotoItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.photoRow}
            contentContainerStyle={styles.photoGrid}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>

      {renderPhotoModal()}
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
  uploadSection: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  uploadGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  uploadCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#eee',
    borderStyle: 'dashed',
  },
  uploadIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  uploadTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
    textAlign: 'center',
  },
  uploadSubtitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  addIcon: {
    marginTop: 5,
  },
  gallerySection: {
    backgroundColor: '#fff',
    padding: 20,
  },
  galleryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  photoCount: {
    fontSize: 14,
    color: '#666',
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  selectedCategory: {
    backgroundColor: '#4CAF50',
  },
  categoryText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 6,
  },
  selectedCategoryText: {
    color: '#fff',
    fontWeight: '500',
  },
  photoGrid: {
    gap: 15,
  },
  photoRow: {
    justifyContent: 'space-between',
  },
  photoItem: {
    flex: 1,
    marginHorizontal: 7.5,
    marginBottom: 15,
  },
  photoImage: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
  },
  photoOverlay: {
    position: 'absolute',
    top: 8,
    left: 8,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff',
  },
  photoDescription: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    margin: 20,
    maxWidth: '90%',
    maxHeight: '80%',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 5,
    marginBottom: 10,
  },
  fullImage: {
    width: 300,
    height: 200,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  photoInfo: {
    marginTop: 15,
    alignItems: 'center',
  },
  photoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    textAlign: 'center',
  },
  photoDate: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  modalActions: {
    marginTop: 20,
    alignItems: 'center',
  },
  deletePhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffebee',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  deletePhotoButtonText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#F44336',
    fontWeight: '500',
  },
});