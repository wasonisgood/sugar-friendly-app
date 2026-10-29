import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ReviewReplyScreen() {
  const navigation = useNavigation();

  const [activeTab, setActiveTab] = useState('new');
  const [replyModalVisible, setReplyModalVisible] = useState(false);
  const [selectedReview, setSelectedReview] = useState<any>(null);
  const [replyText, setReplyText] = useState('');

  const [reviews, setReviews] = useState([
    {
      id: 'REV001',
      customerName: '王小明',
      rating: 5,
      comment: '餐點很適合糖尿病患者，口味清淡但很好吃！服務也很親切，會再來的。',
      reviewDate: '2024-01-15 14:30',
      hasReply: false,
      reply: '',
      replyDate: '',
      orderItems: ['低糖燕麥粥', '蒸蛋豆腐'],
    },
    {
      id: 'REV002',
      customerName: '李小華',
      rating: 4,
      comment: '整體不錯，但希望能增加更多低糖選項。環境很舒適，適合糖友聚餐。',
      reviewDate: '2024-01-14 19:20',
      hasReply: false,
      reply: '',
      replyDate: '',
      orderItems: ['糖友善沙拉'],
    },
    {
      id: 'REV003',
      customerName: '張小美',
      rating: 5,
      comment: '非常推薦給糖尿病朋友！老闆很用心，每道菜都會說明糖分含量。',
      reviewDate: '2024-01-14 12:15',
      hasReply: true,
      reply: '謝謝您的支持與肯定！我們會持續努力提供更好的糖友善餐點，歡迎常來用餐。',
      replyDate: '2024-01-14 15:30',
      orderItems: ['健康套餐'],
    },
    {
      id: 'REV004',
      customerName: '陳小強',
      rating: 3,
      comment: '餐點還可以，但等待時間有點長。希望能改善出餐速度。',
      reviewDate: '2024-01-13 20:45',
      hasReply: true,
      reply: '感謝您的建議，我們已經調整廚房流程，會加快出餐速度。也歡迎您再次光臨體驗我們的改善。',
      replyDate: '2024-01-14 09:00',
      orderItems: ['低糖湯品', '蔬菜拼盤'],
    },
    {
      id: 'REV005',
      customerName: '劉小芳',
      rating: 2,
      comment: '菜品味道偏淡，份量也不夠。價格偏高，CP值不太好。',
      reviewDate: '2024-01-13 13:00',
      hasReply: false,
      reply: '',
      replyDate: '',
      orderItems: ['輕食套餐'],
    },
  ]);

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Ionicons
        key={index}
        name={index < rating ? 'star' : 'star-outline'}
        size={16}
        color={index < rating ? '#FFD700' : '#ccc'}
      />
    ));
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return '#4CAF50';
    if (rating >= 3) return '#FF9800';
    return '#F44336';
  };

  const openReplyModal = (review: any) => {
    setSelectedReview(review);
    setReplyText(review.reply || '');
    setReplyModalVisible(true);
  };

  const handleReply = () => {
    if (!replyText.trim()) {
      Alert.alert('錯誤', '請輸入回覆內容');
      return;
    }

    setReviews(prevReviews =>
      prevReviews.map(review =>
        review.id === selectedReview.id
          ? {
              ...review,
              hasReply: true,
              reply: replyText,
              replyDate: new Date().toLocaleString('zh-TW'),
            }
          : review
      )
    );

    setReplyModalVisible(false);
    setReplyText('');
    setSelectedReview(null);
    Alert.alert('成功', '回覆已發送');
  };

  const filteredReviews = reviews.filter(review => {
    if (activeTab === 'all') return true;
    if (activeTab === 'new') return !review.hasReply;
    if (activeTab === 'replied') return review.hasReply;
    if (activeTab === 'positive') return review.rating >= 4;
    if (activeTab === 'negative') return review.rating <= 3;
    return true;
  });

  const getReviewCounts = () => {
    return {
      all: reviews.length,
      new: reviews.filter(r => !r.hasReply).length,
      replied: reviews.filter(r => r.hasReply).length,
      positive: reviews.filter(r => r.rating >= 4).length,
      negative: reviews.filter(r => r.rating <= 3).length,
    };
  };

  const counts = getReviewCounts();

  const ReviewCard = ({ review }: any) => (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <View style={styles.customerInfo}>
          <Text style={styles.customerName}>{review.customerName}</Text>
          <View style={styles.ratingContainer}>
            {getRatingStars(review.rating)}
            <Text style={[styles.ratingText, { color: getRatingColor(review.rating) }]}>
              {review.rating}.0
            </Text>
          </View>
        </View>
        <Text style={styles.reviewDate}>{review.reviewDate}</Text>
      </View>

      <View style={styles.orderInfo}>
        <Text style={styles.orderLabel}>購買項目:</Text>
        <Text style={styles.orderItems}>{review.orderItems.join(', ')}</Text>
      </View>

      <Text style={styles.reviewComment}>{review.comment}</Text>

      {review.hasReply && (
        <View style={styles.replyContainer}>
          <View style={styles.replyHeader}>
            <Ionicons name="chatbubble" size={16} color="#4CAF50" />
            <Text style={styles.replyLabel}>店家回覆</Text>
            <Text style={styles.replyDate}>{review.replyDate}</Text>
          </View>
          <Text style={styles.replyText}>{review.reply}</Text>
        </View>
      )}

      <View style={styles.reviewActions}>
        <TouchableOpacity
          style={[
            styles.replyButton,
            review.hasReply && styles.editReplyButton
          ]}
          onPress={() => openReplyModal(review)}
        >
          <Ionicons
            name={review.hasReply ? 'create' : 'chatbubble-outline'}
            size={16}
            color="#fff"
          />
          <Text style={styles.replyButtonText}>
            {review.hasReply ? '編輯回覆' : '回覆評價'}
          </Text>
        </TouchableOpacity>
      </View>
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
        <Text style={styles.headerTitle}>評價回覆</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{reviews.length}</Text>
          <Text style={styles.statLabel}>總評價</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: '#FF9800' }]}>{counts.new}</Text>
          <Text style={styles.statLabel}>待回覆</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: '#4CAF50' }]}>{counts.positive}</Text>
          <Text style={styles.statLabel}>好評</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: '#F44336' }]}>{counts.negative}</Text>
          <Text style={styles.statLabel}>負評</Text>
        </View>
      </View>

      <View style={styles.tabContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'new' && styles.activeTab]}
            onPress={() => setActiveTab('new')}
          >
            <Text style={[styles.tabText, activeTab === 'new' && styles.activeTabText]}>
              待回覆 ({counts.new})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'positive' && styles.activeTab]}
            onPress={() => setActiveTab('positive')}
          >
            <Text style={[styles.tabText, activeTab === 'positive' && styles.activeTabText]}>
              好評 ({counts.positive})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'negative' && styles.activeTab]}
            onPress={() => setActiveTab('negative')}
          >
            <Text style={[styles.tabText, activeTab === 'negative' && styles.activeTabText]}>
              負評 ({counts.negative})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'replied' && styles.activeTab]}
            onPress={() => setActiveTab('replied')}
          >
            <Text style={[styles.tabText, activeTab === 'replied' && styles.activeTabText]}>
              已回覆 ({counts.replied})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'all' && styles.activeTab]}
            onPress={() => setActiveTab('all')}
          >
            <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>
              全部 ({counts.all})
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="chatbubble-outline" size={60} color="#ccc" />
            <Text style={styles.emptyText}>沒有符合條件的評價</Text>
          </View>
        )}
      </ScrollView>

      <Modal
        visible={replyModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setReplyModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {selectedReview?.hasReply ? '編輯回覆' : '回覆評價'}
              </Text>
              <TouchableOpacity onPress={() => setReplyModalVisible(false)}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            {selectedReview && (
              <View style={styles.originalReview}>
                <View style={styles.reviewMeta}>
                  <Text style={styles.reviewCustomer}>{selectedReview.customerName}</Text>
                  <View style={styles.reviewRating}>
                    {getRatingStars(selectedReview.rating)}
                  </View>
                </View>
                <Text style={styles.reviewText}>{selectedReview.comment}</Text>
              </View>
            )}

            <TextInput
              style={styles.replyInput}
              placeholder="輸入您的回覆..."
              multiline={true}
              value={replyText}
              onChangeText={setReplyText}
              maxLength={500}
            />

            <Text style={styles.charCount}>{replyText.length}/500</Text>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelModalButton}
                onPress={() => setReplyModalVisible(false)}
              >
                <Text style={styles.cancelModalButtonText}>取消</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.sendReplyButton}
                onPress={handleReply}
              >
                <Text style={styles.sendReplyButtonText}>發送回覆</Text>
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
  placeholder: {
    width: 30,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 20,
    marginBottom: 10,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#eee',
  },
  tabContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#f0f0f0',
  },
  activeTab: {
    backgroundColor: '#4CAF50',
  },
  tabText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  reviewCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
    padding: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  reviewDate: {
    fontSize: 12,
    color: '#999',
  },
  orderInfo: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  orderLabel: {
    fontSize: 12,
    color: '#666',
    marginRight: 5,
  },
  orderItems: {
    fontSize: 12,
    color: '#4CAF50',
    flex: 1,
  },
  reviewComment: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 15,
  },
  replyContainer: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  replyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  replyLabel: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginLeft: 5,
    flex: 1,
  },
  replyDate: {
    fontSize: 10,
    color: '#999',
  },
  replyText: {
    fontSize: 13,
    color: '#555',
    lineHeight: 18,
  },
  reviewActions: {
    flexDirection: 'row',
  },
  replyButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 8,
  },
  editReplyButton: {
    backgroundColor: '#FF9800',
  },
  replyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
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
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  originalReview: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  reviewMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  reviewCustomer: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  reviewRating: {
    flexDirection: 'row',
  },
  reviewText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  replyInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    height: 120,
    textAlignVertical: 'top',
    fontSize: 14,
    color: '#333',
  },
  charCount: {
    textAlign: 'right',
    fontSize: 12,
    color: '#999',
    marginTop: 5,
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 15,
  },
  cancelModalButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelModalButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
  sendReplyButton: {
    flex: 2,
    paddingVertical: 12,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    alignItems: 'center',
  },
  sendReplyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});