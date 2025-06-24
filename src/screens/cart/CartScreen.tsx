import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { removeFromCart, updateQuantity, clearCart, checkOut } from '../../redux/slices/cartSlice';
import SafeAreaWrapper from '../../common/SafeAreaWrapper';
import Button from '../../common/Button';
import Input from '../../common/Input';
import Header from '../../common/Header';
import Card from '../../common/Card';
import EmptyState from '../../common/EmptyState';
import theme from '../../assets/theme';

const CartScreen = () => {
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  
  const dispatch = useAppDispatch();
  const { items, totalAmount, isLoading } = useAppSelector((state) => state.cart);
  const navigation = useNavigation();

  const handleRemoveItem = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      dispatch(removeFromCart(productId));
    } else {
      dispatch(updateQuantity({ productId, quantity }));
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      Alert.alert('Error', 'Your cart is empty');
      return;
    }
    
    setIsCheckingOut(true);
  };

  const handleConfirmCheckout = async () => {
    if (!deliveryAddress) {
      Alert.alert('Error', 'Please enter a delivery address');
      return;
    }
    
    try {
      await dispatch(checkOut({
        items,
        deliveryAddress,
        paymentMethod,
      })).unwrap();
      
      Alert.alert(
        'Success',
        'Your order has been placed successfully',
        [{ text: 'OK', onPress: () => navigation.navigate('Orders') }]
      );
    } catch (error) {
      Alert.alert('Error', typeof error === 'string' ? error : 'Failed to place order');
    }
  };

  const renderCartItem = ({ item }: { item: any }) => (
    <Card style={styles.cartItemCard}>
      <View style={styles.cartItem}>
        {item.image && (
          <Image source={{ uri: item.image }} style={styles.itemImage} />
        )}
        
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>${item.price}</Text>
          
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
            >
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            
            <Text style={styles.quantity}>{item.quantity}</Text>
            
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => handleRemoveItem(item.productId)}
        >
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );

  return (
    <SafeAreaWrapper>
      <View style={styles.container}>
        <Header title="My Cart" />
        
        {items.length === 0 ? (
          <EmptyState
            title="Your cart is empty"
            message="Add some products to your cart to get started"
            buttonTitle="Browse Products"
            onButtonPress={() => navigation.navigate('Products')}
          />
        ) : (
          <>
            <FlatList
              data={items}
              renderItem={renderCartItem}
              keyExtractor={(item) => item.productId}
              contentContainerStyle={styles.cartList}
              showsVerticalScrollIndicator={false}
            />
            
            {isCheckingOut ? (
              <View style={styles.checkoutForm}>
                <Text style={styles.checkoutTitle}>Delivery Details</Text>
                
                <Input
                  placeholder="Delivery Address"
                  value={deliveryAddress}
                  onChangeText={setDeliveryAddress}
                  multiline
                  numberOfLines={3}
                  style={styles.addressInput}
                />
                
                <Text style={styles.paymentLabel}>Payment Method</Text>
                <View style={styles.paymentOptions}>
                  {['Credit Card', 'PayPal', 'Cash on Delivery'].map((method) => (
                    <TouchableOpacity
                      key={method}
                      style={[
                        styles.paymentOption,
                        paymentMethod === method && styles.selectedPaymentOption,
                      ]}
                      onPress={() => setPaymentMethod(method)}
                    >
                      <Text
                        style={[
                          styles.paymentOptionText,
                          paymentMethod === method && styles.selectedPaymentOptionText,
                        ]}
                      >
                        {method}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                
                <View style={styles.buttonGroup}>
                  <Button
                    title="Back to Cart"
                    onPress={() => setIsCheckingOut(false)}
                    style={[styles.button, styles.cancelButton]}
                    textStyle={styles.cancelButtonText}
                  />
                  <Button
                    title="Place Order"
                    onPress={handleConfirmCheckout}
                    isLoading={isLoading}
                    style={[styles.button, styles.confirmButton]}
                  />
                </View>
              </View>
            ) : (
              <View style={styles.cartSummary}>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Subtotal</Text>
                  <Text style={styles.summaryValue}>${totalAmount.toFixed(2)}</Text>
                </View>
                
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Delivery Fee</Text>
                  <Text style={styles.summaryValue}>$5.00</Text>
                </View>
                
                <View style={styles.divider} />
                
                <View style={styles.summaryRow}>
                  <Text style={styles.totalLabel}>Total</Text>
                  <Text style={styles.totalValue}>${(totalAmount + 5).toFixed(2)}</Text>
                </View>
                
                <Button
                  title="Checkout"
                  onPress={handleCheckout}
                  style={styles.checkoutButton}
                />
              </View>
            )}
          </>
        )}
      </View>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  cartList: {
    padding: 16,
  },
  cartItemCard: {
    marginBottom: 12,
    borderRadius: 8,
  },
  cartItem: {
    flexDirection: 'row',
    padding: 12,
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: theme.colors.primary,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantity: {
    marginHorizontal: 8,
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.text,
    minWidth: 20,
    textAlign: 'center',
  },
  removeButton: {
    padding: 8,
    justifyContent: 'center',
  },
  removeButtonText: {
    color: theme.colors.error,
    fontSize: 12,
  },
  cartSummary: {
    backgroundColor: 'white',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: theme.colors.textLight,
  },
  summaryValue: {
    fontSize: 14,
    color: theme.colors.text,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  checkoutButton: {
    marginTop: 16,
    backgroundColor: theme.colors.primary,
  },
  checkoutForm: {
    backgroundColor: 'white',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  checkoutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 16,
  },
  addressInput: {
    height: 80,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  paymentLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 8,
  },
  paymentOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  paymentOption: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedPaymentOption: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  paymentOptionText: {
    color: theme.colors.text,
    fontSize: 14,
  },
  selectedPaymentOptionText: {
    color: 'white',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
  },
  cancelButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginRight: 8,
  },
  cancelButtonText: {
    color: theme.colors.text,
  },
  confirmButton: {
    backgroundColor: theme.colors.primary,
    marginLeft: 8,
  },
});

export default CartScreen;
