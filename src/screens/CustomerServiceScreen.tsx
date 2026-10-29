import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { customerServiceAI, CustomerServiceResponse } from '../services/customerServiceAI';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

export default function CustomerServiceScreen() {
  const navigation = useNavigation();
  const scrollViewRef = useRef<ScrollView>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState(process.env.EXPO_PUBLIC_OPENAI_API_KEY || '');

  useEffect(() => {
    // 初始歡迎訊息
    const welcomeMessage: Message = {
      id: 'welcome',
      type: 'ai',
      content: '您好！我是糖友善的AI客服助手 🤖\n\n我可以協助您：\n• 解決使用問題\n• 功能介紹說明\n• 一般飲食建議\n• 帳戶相關問題\n\n請告訴我您需要什麼協助？',
      timestamp: new Date(),
      suggestions: ['功能介紹', 'AI掃描教學', '血糖記錄', '帳戶問題']
    };
    setMessages([welcomeMessage]);
  }, []);

  useEffect(() => {
    // 滾動到底部
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  const sendMessage = async (text?: string) => {
    const messageText = text || inputText.trim();
    if (!messageText || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // 設定API Key（如果有的話）
      if (apiKey) {
        customerServiceAI.setApiKey(apiKey);
      }

      const response = await customerServiceAI.sendMessage(messageText);

      if ('code' in response) {
        // 處理錯誤
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: `抱歉，${response.message}\n\n您可以：\n• 檢查網路連線\n• 稍後再試\n• 聯繫人工客服：support@sugarfriendly.com`,
          timestamp: new Date(),
          suggestions: ['重試', '聯繫客服', '查看幫助']
        };
        setMessages(prev => [...prev, errorMessage]);
      } else {
        // 成功回應
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: response.response,
          timestamp: new Date(),
          suggestions: response.suggestions
        };
        setMessages(prev => [...prev, aiMessage]);
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: '抱歉，系統發生錯誤。請稍後再試或聯繫客服。',
        timestamp: new Date(),
        suggestions: ['重試', '聯繫客服']
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionPress = (suggestion: string) => {
    sendMessage(suggestion);
  };

  const clearConversation = () => {
    Alert.alert(
      '清除對話',
      '確定要清除所有對話記錄嗎？',
      [
        { text: '取消', style: 'cancel' },
        {
          text: '清除',
          style: 'destructive',
          onPress: () => {
            customerServiceAI.clearConversation();
            setMessages([{
              id: 'restart',
              type: 'ai',
              content: '對話已清除。有什麼可以幫助您的嗎？',
              timestamp: new Date(),
              suggestions: ['功能介紹', 'AI掃描教學', '血糖記錄', '帳戶問題']
            }]);
          }
        }
      ]
    );
  };

  const ContactHumanSupport = () => (
    <View style={styles.humanSupportCard}>
      <View style={styles.humanSupportHeader}>
        <Ionicons name="person" size={20} color="#4CAF50" />
        <Text style={styles.humanSupportTitle}>需要人工協助？</Text>
      </View>
      <Text style={styles.humanSupportText}>
        如果AI客服無法解決您的問題，歡迎聯繫我們的專業團隊
      </Text>
      <View style={styles.humanSupportButtons}>
        <TouchableOpacity
          style={styles.contactButton}
          onPress={() => Alert.alert('客服信箱', 'support@sugarfriendly.com')}
        >
          <Ionicons name="mail" size={16} color="#fff" />
          <Text style={styles.contactButtonText}>發送郵件</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.contactButton, styles.phoneButton]}
          onPress={() => Alert.alert('客服電話', '+886-2-1234-5678\n服務時間：週一至週五 9:00-18:00')}
        >
          <Ionicons name="call" size={16} color="#4CAF50" />
          <Text style={[styles.contactButtonText, styles.phoneButtonText]}>電話客服</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const MessageBubble = ({ message }: { message: Message }) => (
    <View style={[
      styles.messageBubble,
      message.type === 'user' ? styles.userMessage : styles.aiMessage
    ]}>
      <Text style={[
        styles.messageText,
        message.type === 'user' ? styles.userMessageText : styles.aiMessageText
      ]}>
        {message.content}
      </Text>
      <Text style={[
        styles.messageTime,
        message.type === 'user' ? styles.userMessageTime : styles.aiMessageTime
      ]}>
        {message.timestamp.toLocaleTimeString('zh-TW', {
          hour: '2-digit',
          minute: '2-digit'
        })}
      </Text>
      {message.suggestions && message.suggestions.length > 0 && (
        <View style={styles.suggestionsContainer}>
          {message.suggestions.map((suggestion, index) => (
            <TouchableOpacity
              key={index}
              style={styles.suggestionButton}
              onPress={() => handleSuggestionPress(suggestion)}
            >
              <Text style={styles.suggestionText}>{suggestion}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
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
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>AI客服</Text>
          <Text style={styles.headerSubtitle}>智能助手為您服務</Text>
        </View>
        <TouchableOpacity
          style={styles.clearButton}
          onPress={clearConversation}
        >
          <Ionicons name="refresh" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.messagesContent}
        >
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}

          {isLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#4CAF50" />
              <Text style={styles.loadingText}>AI正在思考...</Text>
            </View>
          )}
        </ScrollView>

        <ContactHumanSupport />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="輸入您的問題..."
            multiline
            maxLength={500}
            onSubmitEditing={() => sendMessage()}
          />
          <TouchableOpacity
            style={[styles.sendButton, (!inputText.trim() || isLoading) && styles.sendButtonDisabled]}
            onPress={() => sendMessage()}
            disabled={!inputText.trim() || isLoading}
          >
            <Ionicons
              name="send"
              size={20}
              color={(!inputText.trim() || isLoading) ? "#ccc" : "#fff"}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#4CAF50',
    marginTop: 2,
  },
  clearButton: {
    padding: 5,
  },
  content: {
    flex: 1,
  },
  messagesList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  messagesContent: {
    paddingVertical: 20,
  },
  messageBubble: {
    marginBottom: 15,
    borderRadius: 16,
    padding: 16,
    maxWidth: '85%',
  },
  userMessage: {
    backgroundColor: '#4CAF50',
    alignSelf: 'flex-end',
  },
  aiMessage: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userMessageText: {
    color: '#fff',
  },
  aiMessageText: {
    color: '#333',
  },
  messageTime: {
    fontSize: 12,
    marginTop: 8,
  },
  userMessageTime: {
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'right',
  },
  aiMessageTime: {
    color: '#999',
  },
  suggestionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
    gap: 8,
  },
  suggestionButton: {
    backgroundColor: '#f0f8f0',
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  suggestionText: {
    fontSize: 14,
    color: '#4CAF50',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  loadingText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  humanSupportCard: {
    backgroundColor: '#fff',
    margin: 20,
    marginBottom: 10,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  humanSupportHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  humanSupportTitle: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  humanSupportText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  humanSupportButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  contactButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 10,
    gap: 6,
  },
  phoneButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  phoneButtonText: {
    color: '#4CAF50',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    maxHeight: 100,
    marginRight: 12,
  },
  sendButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#e0e0e0',
  },
});