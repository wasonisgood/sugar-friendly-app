import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function OrderManagementScreen() {
  const navigation = useNavigation();

  const [activeTab, setActiveTab] = useState('new');
  const [orders, setOrders] = useState([
    {
      id: 'ORD001',
      customerName: '王小明',
      items: [
        { name: '低糖燕麥粥', quantity: 2, price: 80 },
        { name: '蒸蛋豆腐', quantity: 1, price: 120 },
      ],
      totalAmount: 280,
      orderTime: '2024-01-15 12:30',
      status: 'new',
      paymentMethod: '信用卡',
      customerPhone: '0912-345-678',
      note: '請少糖，謝謝',
    },
    {
      id: 'ORD002',
      customerName: '李小華',
      items: [
        { name: '糖友善沙拉', quantity: 1, price: 150 },
        { name: '無糖飲料', quantity: 2, price: 45 },
      ],
      totalAmount: 240,
      orderTime: '2024-01-15 11:45',
      status: 'preparing',
      paymentMethod: '現金',
      customerPhone: '0987-654-321',
      note: '',
    },
    {
      id: 'ORD003',
      customerName: '張小美',
      items: [
        { name: '健康套餐', quantity: 1, price: 200 },
      ],
      totalAmount: 200,
      orderTime: '2024-01-15 11:00',
      status: 'ready',
      paymentMethod: '行動支付',
      customerPhone: '0956-789-123',
      note: '打包帶走',
    },
    {
      id: 'ORD004',
      customerName: '陳小強',
      items: [
        { name: '低糖湯品', quantity: 2, price: 90 },
        { name: '蔬菜拼盤', quantity: 1, price: 110 },
      ],
      totalAmount: 290,
      orderTime: '2024-01-15 10:30',
      status: 'completed',
      paymentMethod: '信用卡',
      customerPhone: '0923-456-789',
      note: '',
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return '#FF9800';
      case 'preparing': return '#2196F3';
      case 'ready': return '#4CAF50';
      case 'completed': return '#9E9E9E';
      case 'cancelled': return '#F44336';
      default: return '#666';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new': return '新訂單';
      case 'preparing': return '準備中';
      case 'ready': return '已完成';
      case 'completed': return '已取餐';
      case 'cancelled': return '已取消';
      default: return '未知';
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const handleStatusUpdate = (order: any) => {
    const statusFlow = {
      'new': 'preparing',
      'preparing': 'ready',
      'ready': 'completed',
    };

    const nextStatus = statusFlow[order.status as keyof typeof statusFlow];
    if (nextStatus) {
      updateOrderStatus(order.id, nextStatus);
      Alert.alert('狀態已更新', `訂單 ${order.id} 狀態已更新為「${getStatusText(nextStatus)}」`);
    }
  };

  const handleCancelOrder = (orderId: string) => {
    Alert.alert(
      '取消訂單',
      '確定要取消此訂單嗎？',
      [
        { text: '取消', style: 'cancel' },
        {
          text: '確定',
          style: 'destructive',
          onPress: () => {
            updateOrderStatus(orderId, 'cancelled');
            Alert.alert('訂單已取消', '訂單已成功取消');
          }
        }
      ]
    );
  };

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'all') return true;
    if (activeTab === 'new') return order.status === 'new';
    if (activeTab === 'processing') return ['preparing', 'ready'].includes(order.status);
    if (activeTab === 'completed') return ['completed', 'cancelled'].includes(order.status);
    return true;
  });

  const getOrderCounts = () => {
    return {
      all: orders.length,
      new: orders.filter(o => o.status === 'new').length,
      processing: orders.filter(o => ['preparing', 'ready'].includes(o.status)).length,
      completed: orders.filter(o => ['completed', 'cancelled'].includes(o.status)).length,
    };
  };

  const counts = getOrderCounts();

  const OrderCard = ({ order }: any) => (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <View style={styles.orderInfo}>
          <Text style={styles.orderId}>#{order.id}</Text>
          <Text style={styles.customerName}>{order.customerName}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
          <Text style={styles.statusText}>{getStatusText(order.status)}</Text>
        </View>
      </View>

      <View style={styles.orderDetails}>
        <Text style={styles.orderTime}>下單時間: {order.orderTime}</Text>
        <Text style={styles.customerPhone}>聯絡電話: {order.customerPhone}</Text>
        {order.note && <Text style={styles.orderNote}>備註: {order.note}</Text>}
      </View>

      <View style={styles.orderItems}>
        {order.items.map((item: any, index: number) => (
          <View key={index} style={styles.orderItem}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemQuantity}>x{item.quantity}</Text>
            <Text style={styles.itemPrice}>NT$ {item.price}</Text>
          </View>
        ))}
      </View>

      <View style={styles.orderFooter}>
        <View style={styles.orderTotal}>
          <Text style={styles.paymentMethod}>{order.paymentMethod}</Text>
          <Text style={styles.totalAmount}>總計: NT$ {order.totalAmount}</Text>
        </View>

        {order.status !== 'completed' && order.status !== 'cancelled' && (
          <View style={styles.orderActions}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => handleCancelOrder(order.id)}
            >
              <Text style={styles.cancelButtonText}>取消</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.updateButton}
              onPress={() => handleStatusUpdate(order)}
            >
              <Text style={styles.updateButtonText}>
                {order.status === 'new' ? '接單' :
                 order.status === 'preparing' ? '完成' : '出餐'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
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
        <Text style={styles.headerTitle}>訂單管理</Text>
        <TouchableOpacity style={styles.refreshButton}>
          <Ionicons name="refresh" size={24} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'new' && styles.activeTab]}
          onPress={() => setActiveTab('new')}
        >
          <Text style={[styles.tabText, activeTab === 'new' && styles.activeTabText]}>
            新訂單 ({counts.new})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'processing' && styles.activeTab]}
          onPress={() => setActiveTab('processing')}
        >
          <Text style={[styles.tabText, activeTab === 'processing' && styles.activeTabText]}>
            處理中 ({counts.processing})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
          onPress={() => setActiveTab('completed')}
        >
          <Text style={[styles.tabText, activeTab === 'completed' && styles.activeTabText]}>
            已完成 ({counts.completed})
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
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="receipt-outline" size={60} color="#ccc" />
            <Text style={styles.emptyText}>目前沒有訂單</Text>
            <Text style={styles.emptySubtext}>等待客戶下單中...</Text>
          </View>
        )}
      </ScrollView>
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
  refreshButton: {
    padding: 5,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 20,
    marginHorizontal: 2,
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
  orderCard: {
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
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  orderInfo: {
    flex: 1,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  customerName: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 15,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  orderDetails: {
    marginBottom: 15,
  },
  orderTime: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  customerPhone: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  orderNote: {
    fontSize: 12,
    color: '#FF9800',
    fontStyle: 'italic',
  },
  orderItems: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 10,
    marginBottom: 15,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  itemName: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  itemQuantity: {
    fontSize: 14,
    color: '#666',
    marginHorizontal: 10,
  },
  itemPrice: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  orderFooter: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 10,
  },
  orderTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  paymentMethod: {
    fontSize: 12,
    color: '#666',
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  orderActions: {
    flexDirection: 'row',
    gap: 10,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  updateButton: {
    flex: 2,
    paddingVertical: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    alignItems: 'center',
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginTop: 20,
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
  },
});