import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, ActivityIndicator, Dimensions } from 'react-native';

// Order status constants
enum OrderStatus {
  New = 'New',
  Processing = 'Processing',
  Shipped = 'Shipped',
  Delivered = 'Delivered',
  Cancelled = 'Cancelled',
}

type OrderItem = {
  name: string;
  quantity: number;
  price: number;
};

type Order = {
  id: string;
  customer: string;
  date: string;
  total: number;
  status: OrderStatus;
  items: OrderItem[];
};

const { width } = Dimensions.get('window');
const isTablet = width >= 768;

const VendorReceivedOrder = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  // Simulating API call to fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // In real app, this would be an API call to your backend
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const mockOrders: Order[] = [
          {
            id: 'ORD-78900',
            customer: 'Alice Brown',
            date: '2023-06-14',
            total: 99.99,
            status: OrderStatus.New,
            items: [
              { name: 'Basic White Tee', quantity: 1, price: 19.99 },
              { name: 'Classic Blue Jeans', quantity: 2, price: 40.00 }
            ]
          },
          {
            id: 'ORD-78901',
            customer: 'John Smith',
            date: '2023-06-15',
            total: 124.99,
            status: OrderStatus.Processing,
            items: [
              { name: 'Premium Cotton T-Shirt', quantity: 2, price: 29.99 },
              { name: 'Designer Slim Fit Jeans', quantity: 1, price: 64.99 }
            ]
          },
          {
            id: 'ORD-78902',
            customer: 'Sarah Johnson',
            date: '2023-06-16',
            total: 89.49,
            status: OrderStatus.Shipped,
            items: [
              { name: 'Summer Floral Maxi Dress', quantity: 1, price: 49.99 },
              { name: 'Wide Brim Sun Hat', quantity: 1, price: 39.50 }
            ]
          },
          {
            id: 'ORD-78903',
            customer: 'Mike Chen',
            date: '2023-06-18',
            total: 210.75,
            status: OrderStatus.Delivered,
            items: [
              { name: 'Pro Running Shoes', quantity: 1, price: 129.99 },
              { name: 'Performance Sports Socks (3-Pack)', quantity: 3, price: 26.92 }
            ]
          },
          {
            id: 'ORD-78904',
            customer: 'Emily Rodriguez',
            date: '2023-06-20',
            total: 175.25,
            status: OrderStatus.Cancelled,
            items: [
              { name: 'Winter Parka Jacket', quantity: 1, price: 149.99 },
              { name: 'Knit Beanie', quantity: 1, price: 25.26 }
            ]
          }
        ];
        
        setOrders(mockOrders);
        setLoading(false);
      } catch (err) {
        setError('Failed to load orders. Please check your connection.');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const toggleExpandOrder = (id: string) => {
    setExpandedOrderId(expandedOrderId === id ? null : id);
  };

  const getStatusDetails = (status: OrderStatus) => {
    const statusDetails = {
      [OrderStatus.New]: { color: '#6366F1', icon: '🆕', text: 'New' },
      [OrderStatus.Processing]: { color: '#3B82F6', icon: '🔄', text: 'Processing' },
      [OrderStatus.Shipped]: { color: '#F59E0B', icon: '🚚', text: 'Shipped' },
      [OrderStatus.Delivered]: { color: '#10B981', icon: '✅', text: 'Delivered' },
      [OrderStatus.Cancelled]: { color: '#EF4444', icon: '❌', text: 'Cancelled' },
    };
    return statusDetails[status];
  };

  const renderOrderItem = ({ item }: { item: Order }) => {
    const statusDetails = getStatusDetails(item.status);
    const isExpanded = expandedOrderId === item.id;
    
    return (
      <TouchableOpacity 
        style={[styles.orderCard, isExpanded && styles.expandedCard]}
        onPress={() => toggleExpandOrder(item.id)}
        activeOpacity={0.95}
      >
        <View style={styles.orderHeader}>
          <View style={styles.orderIdContainer}>
            <Text style={styles.orderIdLabel}>ORDER</Text>
            <Text style={styles.orderId}>#{item.id}</Text>
          </View>
          
          <View style={[styles.statusBadge, { backgroundColor: `${statusDetails.color}15` }]}> 
            <Text style={[styles.statusText, { color: statusDetails.color }]}> 
              {statusDetails.icon} {statusDetails.text}
            </Text>
          </View>
        </View>
        
        <View style={styles.customerRow}>
          <Text style={styles.customerIcon}>👤</Text>
          <Text style={styles.customerName}>{item.customer}</Text>
          <Text style={styles.date}>{item.date}</Text>
        </View>
        
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>TOTAL</Text>
          <Text style={styles.totalAmount}>${item.total.toFixed(2)}</Text>
        </View>
        
        {isExpanded && (
          <View style={styles.expandedContent}>
            <Text style={styles.itemsTitle}>ITEMS</Text>
            <View style={styles.itemsContainer}>
              {item.items.map((product, index) => (
                <View key={index} style={styles.productItem}>
                  <View style={styles.productInfo}>
                    <Text style={styles.productName}>{product.name}</Text>
                    <Text style={styles.productQty}>Qty: {product.quantity}</Text>
                  </View>
                  <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
                </View>
              ))}
            </View>
            
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>View Details</Text>
              </TouchableOpacity>
              {item.status === OrderStatus.Processing && (
                <TouchableOpacity 
                  style={[styles.actionButton, styles.primaryButton]}
                  onPress={() => console.log('Process order:', item.id)}
                >
                  <Text style={[styles.actionButtonText, styles.primaryButtonText]}>Process Order</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
        
        <View style={styles.footer}>
          <Text style={styles.viewDetailsText}>
            {isExpanded ? 'Tap to collapse' : 'Tap to view details'}
          </Text>
          <Text style={styles.chevron}>{isExpanded ? '▲' : '▼'}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7C3AED" />
        <Text style={styles.loadingText}>Loading Orders...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Image 
          source={{uri: 'https://cdn-icons-png.flaticon.com/512/564/564619.png'}} 
          style={styles.errorImage}
        />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={() => {
            setError(null);
            setLoading(true);
            setTimeout(() => setOrders([]), 500); // Simulate retry
          }}
        >
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.screenTitle}>Customer Orders</Text>
        <Text style={styles.ordersCount}>{orders.length} orders</Text>
      </View>
      
      {orders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Image 
            source={{uri: 'https://cdn-icons-png.flaticon.com/512/4555/4555971.png'}} 
            style={styles.emptyImage}
          />
          <Text style={styles.emptyTitle}>No Orders Yet</Text>
          <Text style={styles.emptyText}>Your received orders will appear here</Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          renderItem={renderOrderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<View style={styles.listHeader} />}
          ListFooterComponent={<View style={styles.listFooter} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFF',
    paddingHorizontal: isTablet ? 24 : 16,
    paddingTop: 24,
    paddingBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  screenTitle: {
    fontSize: isTablet ? 28 : 24,
    fontWeight: '700',
    color: '#1E293B',
    letterSpacing: 0.5,
  },
  ordersCount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
    backgroundColor: '#E2E8F0',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  orderCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  expandedCard: {
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  orderIdContainer: {
    flex: 1,
  },
  orderIdLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
  },
  statusBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '700',
  },
  customerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  customerIcon: {
    marginRight: 8,
  },
  customerName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  date: {
    fontSize: 14,
    color: '#64748B',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
  },
  expandIcon: {
    fontSize: 20,
    color: '#94A3B8',
  },
  expandedContent: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  itemsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  itemsContainer: {
    marginBottom: 20,
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  productInfo: {
    flex: 1,
    marginRight: 10,
  },
  productName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1E293B',
    marginBottom: 4,
  },
  productQty: {
    fontSize: 13,
    color: '#64748B',
  },
  productPrice: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E293B',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 16,
  },
  actionButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  primaryButton: {
    backgroundColor: '#7C3AED',
    borderColor: '#7C3AED',
  },
  primaryButtonText: {
    color: 'white',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  viewDetailsText: {
    fontSize: 13,
    color: '#64748B',
  },
  chevron: {
    fontSize: 16,
    color: '#94A3B8',
    fontWeight: '700',
  },
  listContent: {
    paddingBottom: 40,
  },
  listHeader: {
    height: 8,
  },
  listFooter: {
    height: 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFF',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: '#64748B',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#F8FAFF',
  },
  errorImage: {
    width: 120,
    height: 120,
    marginBottom: 30,
  },
  errorText: {
    fontSize: 16,
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  retryButton: {
    backgroundColor: '#7C3AED',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  retryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
  emptyImage: {
    width: isTablet ? 250 : 180,
    height: isTablet ? 250 : 180,
    marginBottom: 30,
    opacity: 0.8,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    maxWidth: '80%',
    lineHeight: 24,
  },
});

export default VendorReceivedOrder;