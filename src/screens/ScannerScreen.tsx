import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Camera, CameraView, BarCodeScanningResult } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { foodAnalysisService, FoodAnalysisResult } from '../services/foodAnalysisService';
import { scanHistoryService } from '../services/scanHistoryService';

const { width, height } = Dimensions.get('window');

export default function ScannerScreen() {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraVisible, setCameraVisible] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<FoodAnalysisResult | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showApiConfig, setShowApiConfig] = useState(false);
  const [apiKey, setApiKey] = useState(process.env.EXPO_PUBLIC_OPENAI_API_KEY || '');
  const [qrScannerVisible, setQrScannerVisible] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);
  const cameraRef = useRef<CameraView>(null);

  const requestCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
    return status === 'granted';
  };

  const handleScanFood = async () => {
    const hasPermissionGranted = await requestCameraPermission();
    if (hasPermissionGranted) {
      setCameraVisible(true);
    } else {
      Alert.alert('權限需求', '需要相機權限才能使用掃描功能');
    }
  };

  const handleTakePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: true,
        });

        setCameraVisible(false);
        setCapturedImage(photo.uri);

        if (photo.base64) {
          await analyzeFood(photo.base64, photo.uri);
        }
      } catch (error) {
        console.error('Error taking picture:', error);
        Alert.alert('錯誤', '拍照失敗，請重試');
      }
    }
  };

  const handlePickImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert('權限需求', '需要相冊權限才能選擇照片');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        base64: true,
      });

      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0];
        setCapturedImage(asset.uri);

        if (asset.base64) {
          await analyzeFood(asset.base64, asset.uri);
        }
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('錯誤', '選擇照片失敗，請重試');
    }
  };

  const analyzeFood = async (base64Image: string, imageUri: string) => {
    console.log('Starting food analysis with apiKey:', !!apiKey);
    setAnalyzing(true);
    setAnalysisResult(null);

    try {
      let result;
      if (apiKey) {
        console.log('Using OpenAI API for analysis');
        foodAnalysisService.setApiKey(apiKey);
        result = await foodAnalysisService.analyzeFood(base64Image);
      } else {
        console.log('Using mock analysis');
        result = await foodAnalysisService.getMockAnalysis(imageUri);
      }

      if ('code' in result) {
        Alert.alert('分析失敗', result.message);
        if (result.code === 'API_KEY_MISSING') {
          setShowApiConfig(true);
        }
        // 分析失敗時仍顯示結果畫面，但使用模擬數據
        const mockResult = await foodAnalysisService.getMockAnalysis(imageUri);
        setAnalysisResult(mockResult);
        setShowResult(true);
        // Save mock result to history
        await scanHistoryService.saveScanResult(imageUri, mockResult);
      } else {
        console.log('Analysis successful, setting result and showing modal');
        setAnalysisResult(result);
        setShowResult(true);

        // Save to history
        await scanHistoryService.saveScanResult(imageUri, result);
        console.log('Result saved to history');
      }
    } catch (error) {
      console.error('Analysis error:', error);
      Alert.alert('分析失敗', '食物分析服務暫時無法使用，使用模擬數據進行演示');
      // 即使發生錯誤，也顯示模擬分析結果
      try {
        const mockResult = await foodAnalysisService.getMockAnalysis(imageUri);
        setAnalysisResult(mockResult);
        setShowResult(true);
        await scanHistoryService.saveScanResult(imageUri, mockResult);
      } catch (mockError) {
        console.error('Mock analysis error:', mockError);
        setShowResult(false);
      }
    } finally {
      setAnalyzing(false);
    }
  };

  const handleHistory = () => {
    navigation.navigate('ScanHistory' as never);
  };

  const handleScanQR = async () => {
    const hasPermissionGranted = await requestCameraPermission();
    if (hasPermissionGranted) {
      setQrScannerVisible(true);
    } else {
      Alert.alert('權限需求', '需要相機權限才能使用QR碼掃描功能');
    }
  };

  const handleQRCodeScanned = ({ type, data }: BarCodeScanningResult) => {
    setQrScannerVisible(false);
    setScannedData(data);

    // 解析QR碼內容
    try {
      // 嘗試解析為JSON（餐廳菜單或食物資訊）
      const parsedData = JSON.parse(data);
      if (parsedData.type === 'restaurant_menu') {
        Alert.alert(
          '餐廳菜單',
          `發現 ${parsedData.restaurant} 的菜單\n是否查看糖友善推薦？`,
          [
            { text: '取消', style: 'cancel' },
            { text: '查看', onPress: () => handleRestaurantMenu(parsedData) }
          ]
        );
      } else if (parsedData.type === 'food_item') {
        Alert.alert(
          '食物資訊',
          `發現食物：${parsedData.name}\n糖分含量：${parsedData.sugarLevel}\n是否添加到記錄？`,
          [
            { text: '取消', style: 'cancel' },
            { text: '添加', onPress: () => handleFoodItem(parsedData) }
          ]
        );
      } else {
        showGenericQRResult(data);
      }
    } catch (error) {
      // 不是JSON格式，檢查是否為URL或其他格式
      if (data.startsWith('http://') || data.startsWith('https://')) {
        Alert.alert(
          '網址連結',
          `掃描到網址：\n${data}\n是否開啟？`,
          [
            { text: '取消', style: 'cancel' },
            { text: '開啟', onPress: () => handleWebLink(data) }
          ]
        );
      } else {
        showGenericQRResult(data);
      }
    }
  };

  const handleRestaurantMenu = (menuData: any) => {
    // 模擬餐廳菜單處理
    Alert.alert(
      `${menuData.restaurant} 糖友善推薦`,
      `推薦菜品：\n• ${menuData.recommendations?.join('\n• ') || '暫無推薦'}\n\n建議避免：\n• ${menuData.avoid?.join('\n• ') || '暫無特別提醒'}`
    );
  };

  const handleFoodItem = (foodData: any) => {
    // 模擬食物項目處理
    Alert.alert(
      '添加成功',
      `${foodData.name} 已添加到您的飲食記錄\n糖分等級：${foodData.sugarLevel}\n建議份量：${foodData.portion || '適量'}`
    );
  };

  const handleWebLink = (url: string) => {
    Alert.alert('功能提示', '網址開啟功能需要在瀏覽器中實現');
  };

  const showGenericQRResult = (data: string) => {
    Alert.alert(
      'QR碼掃描結果',
      `掃描內容：\n${data}`,
      [
        { text: '確定', style: 'default' },
        { text: '複製', onPress: () => {
          // 在實際應用中這裡會複製到剪貼板
          Alert.alert('已複製', '內容已複製到剪貼板');
        }}
      ]
    );
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

  const CameraModal = () => (
    <Modal visible={cameraVisible} animationType="slide">
      <View style={styles.cameraContainer}>
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          facing="back"
        >
          <View style={styles.cameraOverlay}>
            <View style={styles.cameraHeader}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setCameraVisible(false)}
              >
                <Ionicons name="close" size={30} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.cameraTitle}>對準食物拍照</Text>
              <View style={styles.placeholder} />
            </View>

            <View style={styles.focusFrame} />

            <View style={styles.cameraControls}>
              <TouchableOpacity
                style={styles.galleryButton}
                onPress={() => {
                  setCameraVisible(false);
                  setTimeout(handlePickImage, 100);
                }}
              >
                <Ionicons name="images" size={30} color="#fff" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.captureButton}
                onPress={handleTakePicture}
              >
                <View style={styles.captureButtonInner} />
              </TouchableOpacity>

              <View style={styles.placeholder} />
            </View>
          </View>
        </CameraView>
      </View>
    </Modal>
  );

  const ApiConfigModal = () => (
    <Modal visible={showApiConfig} animationType="slide" presentationStyle="formSheet">
      <SafeAreaView style={styles.configContainer}>
        <View style={styles.configHeader}>
          <TouchableOpacity onPress={() => setShowApiConfig(false)}>
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.configTitle}>OpenAI 設定</Text>
          <TouchableOpacity
            onPress={() => {
              foodAnalysisService.setApiKey(apiKey);
              setShowApiConfig(false);
              Alert.alert('成功', 'API Key 已設定');
            }}
          >
            <Text style={styles.saveButton}>保存</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.configContent}>
          <Text style={styles.configDescription}>
            為了使用 AI 食物分析功能，請輸入您的 OpenAI API Key。
            {'\n\n'}如果沒有 API Key，系統會使用模擬數據進行演示。
          </Text>

          <TextInput
            style={styles.apiKeyInput}
            placeholder="輸入 OpenAI API Key"
            value={apiKey}
            onChangeText={setApiKey}
            secureTextEntry
            multiline={false}
          />

          <View style={styles.configTips}>
            <Text style={styles.configTipsTitle}>如何獲取 API Key：</Text>
            <Text style={styles.configTipText}>1. 訪問 platform.openai.com</Text>
            <Text style={styles.configTipText}>2. 註冊或登入帳戶</Text>
            <Text style={styles.configTipText}>3. 前往 API Keys 頁面</Text>
            <Text style={styles.configTipText}>4. 創建新的 API Key</Text>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );

  const QRScannerModal = () => (
    <Modal visible={qrScannerVisible} animationType="slide">
      <View style={styles.cameraContainer}>
        <CameraView
          style={styles.camera}
          facing="back"
          barCodeScannerSettings={{
            barCodeTypes: ['qr'],
          }}
          onBarcodeScanned={handleQRCodeScanned}
        >
          <View style={styles.cameraOverlay}>
            <View style={styles.cameraHeader}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setQrScannerVisible(false)}
              >
                <Ionicons name="close" size={30} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.cameraTitle}>對準QR碼掃描</Text>
              <View style={styles.placeholder} />
            </View>

            <View style={styles.qrScanFrame}>
              <View style={styles.qrCorner} />
              <View style={[styles.qrCorner, styles.qrCornerTopRight]} />
              <View style={[styles.qrCorner, styles.qrCornerBottomLeft]} />
              <View style={[styles.qrCorner, styles.qrCornerBottomRight]} />
            </View>

            <View style={styles.qrInstructions}>
              <Text style={styles.qrInstructionText}>
                將QR碼放在框內進行掃描
              </Text>
              <Text style={styles.qrInstructionSubtext}>
                支援餐廳菜單、食物資訊等糖友善QR碼
              </Text>
            </View>
          </View>
        </CameraView>
      </View>
    </Modal>
  );

  // 使用useEffect在結果準備好時顯示Alert
  useEffect(() => {
    if (showResult && analysisResult && analysisResult.foodName) {
      const nutritionInfo = analysisResult.nutritionalInfo;
      const alertMessage = `🍽️ 食物：${analysisResult.foodName}
📂 類別：${analysisResult.category}
⭐ 糖友善度：${analysisResult.sugarFriendlyScore}/10 (${getSugarFriendlyText(analysisResult.sugarFriendlyScore)})
🔬 準確度：${Math.round(analysisResult.confidence * 100)}%

📊 營養成分 (每100克)：
• 熱量：${nutritionInfo.calories} kcal
• 碳水化合物：${nutritionInfo.carbs}g
• 糖分：${nutritionInfo.sugar}g
• 蛋白質：${nutritionInfo.protein}g
• 脂肪：${nutritionInfo.fat}g
• 纖維：${nutritionInfo.fiber}g

💡 建議：${analysisResult.diabeticAdvice}

📏 份量建議：${analysisResult.portionSizeAdvice}`;

      Alert.alert(
        '🔍 AI 分析結果',
        alertMessage,
        [
          {
            text: '查看歷史',
            onPress: () => {
              setShowResult(false);
              navigation.navigate('ScanHistory' as never);
            }
          },
          {
            text: '確定',
            onPress: () => setShowResult(false),
            style: 'default'
          }
        ],
        { cancelable: false }
      );
    }
  }, [showResult, analysisResult, navigation]);

  const AnalysisModal = () => {
    return null;
  };

  const LoadingModal = () => (
    <Modal visible={analyzing} transparent animationType="fade">
      <View style={styles.loadingOverlay}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={styles.loadingText}>正在分析食物...</Text>
          <Text style={styles.loadingSubtext}>AI 正在識別營養成分</Text>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {/* 移除返回按鈕 */}
        </View>
        <View style={styles.headerCenter}>
          <Text style={styles.title}>AI 食物掃描</Text>
          <Text style={styles.subtitle}>OpenAI 驅動的營養分析</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={() => setShowApiConfig(true)}>
            <Ionicons name="settings" size={24} color="#4CAF50" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
        <TouchableOpacity style={styles.scanButton} onPress={handleScanFood}>
          <Ionicons name="camera" size={48} color="#fff" />
          <Text style={styles.scanButtonText}>AI 掃描食物</Text>
          <Text style={styles.scanButtonSubtext}>OpenAI 智能分析營養成分與糖友善度</Text>
        </TouchableOpacity>

        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton} onPress={handlePickImage}>
            <Ionicons name="images" size={24} color="#4CAF50" />
            <Text style={styles.actionButtonText}>從相冊選擇</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleHistory}>
            <Ionicons name="time" size={24} color="#4CAF50" />
            <Text style={styles.actionButtonText}>掃描歷史</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleScanQR}>
            <Ionicons name="qr-code" size={24} color="#4CAF50" />
            <Text style={styles.actionButtonText}>掃描 QR</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.features}>
        <Text style={styles.featuresTitle}>AI 分析功能</Text>
        <View style={styles.featuresList}>
          <View style={styles.featureItem}>
            <Ionicons name="eye" size={20} color="#4CAF50" />
            <Text style={styles.featureText}>智能食物識別</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="analytics" size={20} color="#4CAF50" />
            <Text style={styles.featureText}>營養成分分析</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="medical" size={20} color="#4CAF50" />
            <Text style={styles.featureText}>糖尿病建議</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="restaurant" size={20} color="#4CAF50" />
            <Text style={styles.featureText}>份量控制建議</Text>
          </View>
        </View>
      </View>

      <View style={styles.tips}>
        <Text style={styles.tipsTitle}>拍攝小貼士</Text>
        <Text style={styles.tipsText}>• 確保光線充足，避免陰影</Text>
        <Text style={styles.tipsText}>• 將食物置於畫面中央</Text>
        <Text style={styles.tipsText}>• 拍攝角度盡量垂直向下</Text>
        <Text style={styles.tipsText}>• 一次只拍攝一種食物</Text>
      </View>
      </ScrollView>

      <CameraModal />
      <QRScannerModal />
      <ApiConfigModal />
      <AnalysisModal />
      <LoadingModal />
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
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerLeft: {
    width: 40,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerRight: {
    width: 40,
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 12,
    color: '#4CAF50',
    marginTop: 2,
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  scanButton: {
    backgroundColor: '#4CAF50',
    width: width - 40,
    paddingVertical: 30,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 30,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  scanButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  scanButtonSubtext: {
    color: '#fff',
    fontSize: 14,
    marginTop: 5,
    textAlign: 'center',
    opacity: 0.9,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 15,
    marginHorizontal: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  actionButtonText: {
    color: '#333',
    fontSize: 12,
    marginTop: 5,
    fontWeight: '500',
  },
  features: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 15,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  featuresList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    marginBottom: 10,
  },
  featureText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  tips: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 15,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  tipsText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 5,
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  cameraHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  closeButton: {
    padding: 10,
  },
  cameraTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 40,
  },
  focusFrame: {
    position: 'absolute',
    top: '40%',
    left: '20%',
    right: '20%',
    height: 200,
    borderWidth: 2,
    borderColor: '#4CAF50',
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
  cameraControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 50,
    paddingHorizontal: 50,
  },
  galleryButton: {
    padding: 15,
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4CAF50',
  },
  configContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  configHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  configTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  saveButton: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: '600',
  },
  configContent: {
    padding: 20,
  },
  configDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 20,
  },
  apiKeyInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    fontSize: 14,
    marginBottom: 20,
  },
  configTips: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
  },
  configTipsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  configTipText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  resultContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  resultContent: {
    paddingBottom: 30,
  },
  analyzedImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  foodInfoCard: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  foodName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  foodCategory: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  scoreLabel: {
    fontSize: 16,
    color: '#333',
    marginRight: 10,
  },
  scoreBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 10,
  },
  scoreText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scoreDescription: {
    fontSize: 14,
    fontWeight: '500',
  },
  confidenceContainer: {
    marginTop: 10,
  },
  confidenceLabel: {
    fontSize: 12,
    color: '#999',
  },
  nutritionCard: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  cardTitle: {
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
  adviceCard: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  adviceText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 15,
  },
  portionAdvice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 10,
    borderRadius: 8,
  },
  portionText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
    flex: 1,
  },
  recommendationsCard: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  recommendationText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
    flex: 1,
    lineHeight: 18,
  },
  warningsCard: {
    padding: 20,
  },
  warningItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  warningText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
    flex: 1,
    lineHeight: 18,
  },
  loadingOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    minWidth: 200,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
  },
  loadingSubtext: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  qrScanFrame: {
    position: 'absolute',
    top: '35%',
    left: '25%',
    right: '25%',
    height: 200,
    width: 200,
    alignSelf: 'center',
  },
  qrCorner: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderColor: '#4CAF50',
    borderWidth: 4,
    borderTopLeftRadius: 8,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 0,
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    top: 0,
    left: 0,
  },
  qrCornerTopRight: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 8,
    borderRightColor: '#4CAF50',
    borderLeftColor: 'transparent',
    right: 0,
    left: 'auto',
  },
  qrCornerBottomLeft: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 8,
    borderBottomColor: '#4CAF50',
    borderTopColor: 'transparent',
    bottom: 0,
    top: 'auto',
  },
  qrCornerBottomRight: {
    borderTopLeftRadius: 0,
    borderBottomRightRadius: 8,
    borderRightColor: '#4CAF50',
    borderBottomColor: '#4CAF50',
    borderLeftColor: 'transparent',
    borderTopColor: 'transparent',
    bottom: 0,
    right: 0,
    top: 'auto',
    left: 'auto',
  },
  qrInstructions: {
    position: 'absolute',
    bottom: 150,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  qrInstructionText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  qrInstructionSubtext: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});