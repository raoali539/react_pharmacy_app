import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, ActivityIndicator, Dimensions, SafeAreaView, StatusBar } from 'react-native';
import VendorHeader from '../header';
import theme from '../../../assets/theme';

// Order status constants
enum OrderStatus {
  New = 'New',
  Processing = 'Processing',
  Shipped = 'Shipped',
  Delivered = 'Delivered',
  Cancelled = 'Cancelled',
}




const { width } = Dimensions.get('window');
const isTablet = width >= 768;


import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { fetchOrders } from '../../../redux/slices/orderSlice';
import type { Order } from '../../../redux/slices/orderSlice';
import { heightPercentageToDP } from '../../../utils/globalFunctions';

const VendorReceivedOrder = () => {
  const dispatch = useAppDispatch();
  const { orders, loading, error } = useAppSelector(state => state.orders);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

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

  // Map Redux order to UI fields
  const renderOrderItem = ({ item }: { item: Order }) => {
    // Map status to OrderStatus enum for badge
    let status: OrderStatus;
    switch (item.orderStatus) {
      case 'processing':
        status = OrderStatus.Processing;
        break;
      case 'delivered':
        status = OrderStatus.Delivered;
        break;
      case 'cancelled':
        status = OrderStatus.Cancelled;
        break;
      default:
        status = OrderStatus.New;
    }
    const statusDetails = getStatusDetails(status);
    const isExpanded = expandedOrderId === item._id;

    return (
      <TouchableOpacity
        style={[styles.orderCard, isExpanded && styles.expandedCard]}
        onPress={() => toggleExpandOrder(item._id)}
        activeOpacity={0.95}
      >
        <View style={styles.orderHeader}>
          <View style={styles.orderIdContainer}>
            <Text style={styles.orderIdLabel}>ORDER</Text>
            <Text style={styles.orderId}>#{item._id.slice(-6).toUpperCase()}</Text>
          </View>

          <View style={[styles.statusBadge, { backgroundColor: `${statusDetails.color}15` }]}> 
            <Text style={[styles.statusText, { color: statusDetails.color }]}> 
              {statusDetails.icon} {statusDetails.text}
            </Text>
          </View>
        </View>

        <View style={styles.customerRow}>
          <Text style={styles.customerIcon}>👤</Text>
          <Text style={styles.customerName}>{item.shippingAddress.fullName}</Text>
          <Text style={styles.date}>{new Date(item.createdAt).toLocaleDateString()}</Text>
        </View>

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>TOTAL</Text>
          <Text style={styles.totalAmount}>${item.totalAmount.toFixed(2)}</Text>
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
              {status === OrderStatus.Processing && (
                <TouchableOpacity
                  style={[styles.actionButton, styles.primaryButton]}
                  onPress={() => console.log('Process order:', item._id)}
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
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/564/564619.png' }}
          style={styles.errorImage}
        />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => dispatch(fetchOrders())}
        >
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.background} />

      <VendorHeader
        backIcon={false}
      />
      <View style={{
        paddingHorizontal: 16,
        paddingTop: 24,
        paddingBottom: 16,
      }}>

      <View style={styles.header}>
        <Text style={styles.screenTitle}>Customer Orders</Text>
        <Text style={styles.ordersCount}>{orders.length} orders</Text>
      </View>

      {orders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/4555/4555971.png' }}
            style={styles.emptyImage}
          />
          <Text style={styles.emptyTitle}>No Orders Yet</Text>
          <Text style={styles.emptyText}>Your received orders will appear here</Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          renderItem={renderOrderItem}
          keyExtractor={item => item._id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<View style={styles.listHeader} />}
          ListFooterComponent={<View style={styles.listFooter} />}
        />
      )}
            </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    paddingBottom: heightPercentageToDP(20)
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 20,
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
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#4B2996', // deeper shadow color
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.22,
    shadowRadius: 24,
    elevation: 18,
    borderWidth: 2,
    borderColor: '#E0D7F3', // subtle premium border
    // Add a slight gradient effect using overlay if needed (React Native Linear Gradient for more premium look)
  },
  expandedCard: {
    shadowOpacity: 0.32,
    shadowRadius: 32,
    elevation: 28,
    borderColor: '#7C3AED', // highlight border for expanded
    borderWidth: 2.5,
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
    color: 'black',
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
    color: 'black',
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
    color: 'black',
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
    color: 'black',
    marginBottom: 4,
  },
  productQty: {
    fontSize: 13,
    color: '#64748B',
  },
  productPrice: {
    fontSize: 15,
    fontWeight: '600',
    color: 'black',
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