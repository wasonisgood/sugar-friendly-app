import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

export default function ScannerScreen() {
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('權限需要', '需要相機權限才能選擇照片');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('權限需要', '需要相機權限才能拍照');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const analyzeFood = () => {
    if (!selectedImage) {
      Alert.alert('提示', '請先選擇或拍攝食物照片');
      return;
    }

    setIsAnalyzing(true);
    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      Alert.alert(
        '分析結果',
        '這道菜看起來是糖友善的！\n\n估計含糖量: 低\n建議指數: 8/10\n\n注意: 這個功能仍在開發中，請參考專業建議。'
      );
    }, 2000);
  };

  const handleAdvancedScanner = () => {
    navigation.navigate('AdvancedScanner' as never);
  };

  const handleScanHistory = () => {
    navigation.navigate('ScanHistory' as never);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>食物掃描</Text>
        <Text style={styles.subtitle}>拍照分析食物糖友善程度</Text>

        <TouchableOpacity
          style={styles.advancedButton}
          onPress={handleAdvancedScanner}
        >
          <Text style={styles.advancedButtonText}>AI 智能掃描</Text>
          <Ionicons name="sparkles" size={16} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {selectedImage ? (
          <View style={styles.imageContainer}>
            <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => setSelectedImage(null)}
            >
              <Ionicons name="close-circle" size={30} color="#FF5722" />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.placeholder}>
            <Ionicons name="camera-outline" size={80} color="#ccc" />
            <Text style={styles.placeholderText}>請選擇或拍攝食物照片</Text>
          </View>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={takePhoto}>
            <Ionicons name="camera" size={24} color="#fff" />
            <Text style={styles.buttonText}>拍照</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={pickImage}>
            <Ionicons name="images" size={24} color="#fff" />
            <Text style={styles.buttonText}>選擇照片</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.historyButton} onPress={handleScanHistory}>
            <Ionicons name="time" size={24} color="#4CAF50" />
            <Text style={styles.historyButtonText}>掃描歷史</Text>
          </TouchableOpacity>
        </View>

        {selectedImage && (
          <TouchableOpacity
            style={[styles.analyzeButton, isAnalyzing && styles.analyzingButton]}
            onPress={analyzeFood}
            disabled={isAnalyzing}
          >
            <Ionicons 
              name={isAnalyzing ? "hourglass" : "analytics"} 
              size={24} 
              color="#fff" 
            />
            <Text style={styles.analyzeButtonText}>
              {isAnalyzing ? '分析中...' : '分析食物'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.notice}>
        <Ionicons name="information-circle" size={20} color="#FF9800" />
        <Text style={styles.noticeText}>
          此功能為預覽版本，分析結果僅供參考，請諮詢專業醫師建議。
        </Text>
      </View>
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
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 30,
  },
  selectedImage: {
    width: 300,
    height: 300,
    borderRadius: 15,
  },
  removeButton: {
    position: 'absolute',
    top: -10,
    right: -10,
  },
  placeholder: {
    width: 300,
    height: 300,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  placeholderText: {
    marginTop: 15,
    fontSize: 16,
    color: '#999',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 30,
  },
  actionButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    minWidth: 120,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  analyzeButton: {
    backgroundColor: '#2196F3',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    justifyContent: 'center',
  },
  analyzingButton: {
    backgroundColor: '#999',
  },
  analyzeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  advancedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  advancedButtonText: {
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: '600',
    marginRight: 5,
  },
  historyButton: {
    backgroundColor: '#f8f9fa',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#4CAF50',
    minWidth: 120,
    justifyContent: 'center',
  },
  historyButtonText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  notice: {
    flexDirection: 'row',
    backgroundColor: '#fff3cd',
    padding: 15,
    margin: 20,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  noticeText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 12,
    color: '#856404',
    lineHeight: 18,
  },
});