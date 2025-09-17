import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Image,
  Modal,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Camera, CameraView } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { foodAnalysisService, FoodAnalysisResult } from '../services/foodAnalysisService';
import { scanHistoryService } from '../services/scanHistoryService';

const { width, height } = Dimensions.get('window');

export default function AdvancedScannerScreen() {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraVisible, setCameraVisible] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<FoodAnalysisResult | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showApiConfig, setShowApiConfig] = useState(false);
  const [apiKey, setApiKey] = useState('');
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
    setAnalyzing(true);
    setAnalysisResult(null);

    try {
      let result;
      if (apiKey) {
        foodAnalysisService.setApiKey(apiKey);
        result = await foodAnalysisService.analyzeFood(base64Image);
      } else {
        result = await foodAnalysisService.getMockAnalysis(imageUri);
      }

      if ('code' in result) {
        Alert.alert('分析失敗', result.message);
        if (result.code === 'API_KEY_MISSING') {
          setShowApiConfig(true);
        }
        // 分析失敗時不顯示結果畫面
        setShowResult(false);
      } else {
        setAnalysisResult(result);
        setShowResult(true); // 修正：分析成功時顯示結果畫面

        // Save to history
        await scanHistoryService.saveScanResult(imageUri, result);
      }
    } catch (error) {
      console.error('Analysis error:', error);
      Alert.alert('分析失敗', '食物分析服務暫時無法使用，請稍後重試');
      setShowResult(false); // 分析失敗時不顯示結果畫面
    } finally {
      setAnalyzing(false);
    }
  };

  const handleHistory = () => {
    navigation.navigate('ScanHistory' as never);
  };

  const handleScanQR = () => {
    Alert.alert('提示', 'QR碼掃描功能開發中');
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

  const AnalysisModal = () => {
    if (!showResult || !analysisResult) return null;
    return (
      <Modal visible={true} animationType="slide" presentationStyle="pageSheet">
        {/* Debug log: */}
        <View style={[styles.resultContainer, { flex: 1 }]}>
          <View style={styles.resultHeader}>
            <TouchableOpacity onPress={() => {
              setShowResult(false);
              setAnalysisResult(null);
            }}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.resultTitle}>分析結果</Text>
            <TouchableOpacity onPress={() => Alert.alert('提示', '分享功能開發中')}>
              <Ionicons name="share" size={24} color="#4CAF50" />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.resultContent} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            {capturedImage && (
              <Image source={{ uri: capturedImage }} style={styles.analyzedImage} />
            )}

            {analysisResult && (
              <>
                <View style={styles.foodInfoCard}>
                  <Text style={styles.foodName}>{analysisResult.foodName}</Text>
                  <Text style={styles.foodCategory}>{analysisResult.category}</Text>

                  <View style={styles.scoreContainer}>
                    <Text style={styles.scoreLabel}>糖友善度</Text>
                    <View style={[
                      styles.scoreBadge,
                      { backgroundColor: getSugarFriendlyColor(analysisResult.sugarFriendlyScore) }
                    ]}>
                      <Text style={styles.scoreText}>
                        {analysisResult.sugarFriendlyScore}/10
                      </Text>
                    </View>
                    <Text style={[
                      styles.scoreDescription,
                      { color: getSugarFriendlyColor(analysisResult.sugarFriendlyScore) }
                    ]}>
                      {getSugarFriendlyText(analysisResult.sugarFriendlyScore)}
                    </Text>
                  </View>

                  <View style={styles.confidenceContainer}>
                    <Text style={styles.confidenceLabel}>
                      識別準確度: {Math.round(analysisResult.confidence * 100)}%
                    </Text>
                  </View>
                </View>

                <View style={styles.nutritionCard}>
                  <Text style={styles.cardTitle}>營養成分 (每100克)</Text>
                  <View style={styles.nutritionGrid}>
                    <View style={styles.nutritionItem}>
                      <Text style={styles.nutritionLabel}>熱量</Text>
                      <Text style={styles.nutritionValue}>{analysisResult.nutritionalInfo.calories} kcal</Text>
                    </View>
                    <View style={styles.nutritionItem}>
                      <Text style={styles.nutritionLabel}>碳水化合物</Text>
                      <Text style={styles.nutritionValue}>{analysisResult.nutritionalInfo.carbs}g</Text>
                    </View>
                    <View style={styles.nutritionItem}>
                      <Text style={styles.nutritionLabel}>糖分</Text>
                      <Text style={[styles.nutritionValue, { color: '#F44336' }]}>
                        {analysisResult.nutritionalInfo.sugar}g
                      </Text>
                    </View>
                    <View style={styles.nutritionItem}>
                      <Text style={styles.nutritionLabel}>蛋白質</Text>
                      <Text style={styles.nutritionValue}>{analysisResult.nutritionalInfo.protein}g</Text>
                    </View>
                    <View style={styles.nutritionItem}>
                      <Text style={styles.nutritionLabel}>脂肪</Text>
                      <Text style={styles.nutritionValue}>{analysisResult.nutritionalInfo.fat}g</Text>
                    </View>
                    <View style={styles.nutritionItem}>
                      <Text style={styles.nutritionLabel}>纖維</Text>
                      <Text style={[styles.nutritionValue, { color: '#4CAF50' }]}>
                        {analysisResult.nutritionalInfo.fiber}g
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.adviceCard}>
                  <Text style={styles.cardTitle}>糖尿病建議</Text>
                  <Text style={styles.adviceText}>{analysisResult.diabeticAdvice}</Text>

                  <View style={styles.portionAdvice}>
                    <Ionicons name="resize" size={20} color="#4CAF50" />
                    <Text style={styles.portionText}>{analysisResult.portionSizeAdvice}</Text>
                  </View>
                </View>

                {analysisResult.recommendations.length > 0 && (
                  <View style={styles.recommendationsCard}>
                    <Text style={styles.cardTitle}>建議</Text>
                    {analysisResult.recommendations.map((rec, index) => (
                      <View key={index} style={styles.recommendationItem}>
                        <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
                        <Text style={styles.recommendationText}>{rec}</Text>
                      </View>
                    ))}
                  </View>
                )}

                {analysisResult.warnings.length > 0 && (
                  <View style={styles.warningsCard}>
                    <Text style={styles.cardTitle}>注意事項</Text>
                    {analysisResult.warnings.map((warning, index) => (
                      <View key={index} style={styles.warningItem}>
                        <Ionicons name="warning" size={16} color="#FF9800" />
                        <Text style={styles.warningText}>{warning}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </>
            )}
          </ScrollView>
        </View>
      </Modal>
    );
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
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
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

      <CameraModal />
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
    paddingBottom: 30, // 可加 padding 讓內容不會被遮住
    // 可加其他樣式如 backgroundColor: '#fff'
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
});