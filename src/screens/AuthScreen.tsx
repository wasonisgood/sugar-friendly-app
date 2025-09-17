import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import WebModal from '../components/WebModal';

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: '',
    message: '',
    buttons: [] as Array<{text: string; onPress: () => void; style?: 'default' | 'cancel' | 'destructive'}>
  });

  const { login, register, skipAuth } = useAuth();

  // 網頁端自動填入測試帳號
  useEffect(() => {
    if (Platform.OS === 'web') {
      setEmail('test@demo.com');
      setPassword('123456');
    }
  }, []);

  const showAlert = (title: string, message: string, buttons?: Array<{text: string; onPress: () => void; style?: 'default' | 'cancel' | 'destructive'}>) => {
    if (Platform.OS === 'web') {
      setModalConfig({ title, message, buttons: buttons || [] });
      setModalVisible(true);
    } else {
      Alert.alert(title, message, buttons);
    }
  };

  const handleAuth = async () => {
    if (!email || !password) {
      showAlert('錯誤', '請填寫電子郵件和密碼');
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      showAlert('錯誤', '密碼確認不匹配');
      return;
    }

    setLoading(true);

    try {
      let success = false;

      if (isLogin) {
        success = await login(email, password);
      } else {
        success = await register({ email, password, name: email.split('@')[0] });
      }

      if (!success) {
        showAlert('錯誤', isLogin ? '登入失敗，請檢查電子郵件和密碼' : '註冊失敗，請稍後重試');
      }
    } catch (error) {
      showAlert('錯誤', '操作失敗，請稍後重試');
    } finally {
      setLoading(false);
    }
  };

  const handleSkipAuth = () => {
    showAlert(
      '跳過認證',
      '您可以先體驗應用功能，稍後再註冊帳號',
      [
        { text: '取消', style: 'cancel', onPress: () => setModalVisible(false) },
        { text: '繼續體驗', onPress: skipAuth }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.authContainer}>
          <View style={styles.header}>
            <Ionicons name="leaf" size={60} color="#4CAF50" />
            <Text style={styles.title}>糖友善</Text>
            <Text style={styles.subtitle}>Sugar Friendly</Text>
            <Text style={styles.description}>
              {isLogin ? '歡迎回來！' : '加入我們，開始健康飲食之旅'}
            </Text>
          </View>

          <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color="#666" />
            <TextInput
              style={styles.input}
              placeholder="電子郵件"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#666" />
            <TextInput
              style={styles.input}
              placeholder="密碼"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          {!isLogin && (
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color="#666" />
              <TextInput
                style={styles.input}
                placeholder="確認密碼"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            </View>
          )}

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleAuth}
            disabled={loading}
          >
            <Text style={styles.primaryButtonText}>
              {loading ? '處理中...' : (isLogin ? '登入' : '註冊')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => setIsLogin(!isLogin)}
          >
            <Text style={styles.secondaryButtonText}>
              {isLogin ? '還沒有帳號？註冊' : '已有帳號？登入'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.skipButton}
            onPress={handleSkipAuth}
          >
            <Text style={styles.skipButtonText}>
              跳過認證，先體驗功能
            </Text>
          </TouchableOpacity>

          {Platform.OS === 'web' && (
            <View style={styles.webTestInfo}>
              <Ionicons name="information-circle" size={16} color="#2196F3" />
              <Text style={styles.webTestInfoText}>
                網頁版測試：已自動填入測試帳號 (test@demo.com / 123456)
              </Text>
            </View>
          )}
          </View>
        </View>
      </KeyboardAvoidingView>

      <WebModal
        visible={modalVisible}
        title={modalConfig.title}
        message={modalConfig.message}
        buttons={modalConfig.buttons}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Platform.OS === 'web' ? '#f8f9fa' : '#fff',
  },
  keyboardView: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  authContainer: {
    maxWidth: Platform.OS === 'web' ? 450 : '100%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: Platform.OS === 'web' ? 16 : 0,
    padding: Platform.OS === 'web' ? 40 : 20,
    shadowColor: Platform.OS === 'web' ? '#000' : 'transparent',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: Platform.OS === 'web' ? 0.1 : 0,
    shadowRadius: Platform.OS === 'web' ? 12 : 0,
    elevation: Platform.OS === 'web' ? 8 : 0,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  description: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 10,
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  primaryButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    alignItems: 'center',
    marginTop: 20,
  },
  secondaryButtonText: {
    color: '#4CAF50',
    fontSize: 14,
  },
  skipButton: {
    alignItems: 'center',
    marginTop: 15,
    padding: 10,
  },
  skipButtonText: {
    color: '#999',
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  webTestInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e3f2fd',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  webTestInfoText: {
    marginLeft: 8,
    fontSize: 12,
    color: '#1976d2',
    flex: 1,
    lineHeight: 16,
  },
});