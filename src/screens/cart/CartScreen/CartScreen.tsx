

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  Animated,
  TextInput,
} from 'react-native';
import { Icon } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import theme from '../../../assets/theme';
import { useCart } from '../../../contexts/CartContext';
import { widthPercentageToDP as wp ,heightPercentageToDP as hp} from '../../../utils/globalFunctions';

const CartScreen = () => {
  const { state, dispatch } = useCart();
  const navigation = useNavigation();
  const scaleAnim = new Animated.Value(1);
  const [activeTab, setActiveTab] = useState<'cart' | 'saved'>('cart');

  // Add safe checks for arrays
  const cartItems = state?.items || [];
  const savedItems = state?.savedItems || [];
  const cartTotal = state?.total || 0;

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity >= 1) {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id: itemId, quantity } });
    }
  };

  const handleRemoveItem = (itemId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: itemId });
  };

  const handleRemoveSavedItem = (itemId: string) => {
    dispatch({ type: 'REMOVE_FROM_SAVED', payload: itemId });
  };

  const handleSaveForLater = (item: any) => {
    dispatch({ type: 'SAVE_FOR_LATER', payload: item });
  };

  const handleMoveToCart = (item: any) => {
    dispatch({ type: 'MOVE_TO_CART', payload: item });
  };

  const proceedToCheckout = () => {
    navigation.navigate('Checkout' as never);
  };

  const navigateToBrowse = () => {
    navigation.navigate('Browse' as never);
  };

  const renderCartItem = ({ item }: any) => (
    <Animated.View style={[styles.cartItem, { transform: [{ scale: scaleAnim }] }]}>
      <View style={styles.cartItemContent}>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        
        <View style={styles.itemDetailsContainer}>
          <View style={styles.itemInfo}>
            <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
            <Text style={styles.vendorName}>{item.vendorName}</Text>
            <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
          </View>

          <View style={styles.itemActions}>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={[styles.quantityButton, item.quantity === 1 && styles.quantityButtonDisabled]}
                onPress={() => updateQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity === 1}
              >
                <Icon name="minus" type="feather" size={16} 
               />
              </TouchableOpacity>
              <Text style={styles.quantity}>{item.quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => updateQuantity(item.id, item.quantity + 1)}
              >
                <Icon name="plus" type="feather" size={16}       />
              </TouchableOpacity>
            </View>
            
            <View style={styles.actionButtons}>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => handleSaveForLater(item)}
              >
                <Icon name="bookmark" type="feather" size={20}     />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => handleRemoveItem(item.id)}
              >
                <Icon name="trash-2" type="feather" size={20}      />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Animated.View>
  );

  const renderSavedItem = ({ item }: any) => (
    <Animated.View style={[styles.cartItem, { transform: [{ scale: scaleAnim }] }]}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.vendorName}>{item.vendorName}</Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handleMoveToCart(item)}
        >
          <Icon name="shopping-cart" type="feather" size={20} color={theme.active} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handleRemoveSavedItem(item.id)}
        >
          <Icon name="trash-2" type="feather" size={20}      />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Text style={styles.headerTitle}>Cart</Text>
      
      <View style={styles.searchContainer}>
        <Icon name="search" type="feather" size={20}     style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Medicine cart"
          placeholderTextColor={theme.inActiveColor}
        />
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tabItem, activeTab === 'cart' && styles.activeTabItem]} 
          onPress={() => setActiveTab('cart')}
        >
          <Text style={[styles.tabLabel, activeTab === 'cart' && styles.activeTabLabel]}>In cart</Text>
          <Text style={[styles.tabCount, activeTab === 'cart' && styles.activeTabCount]}>{cartItems.length}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabItem, activeTab === 'saved' && styles.activeTabItem]}
          onPress={() => setActiveTab('saved')}
        >
          <Text style={[styles.tabLabel, activeTab === 'saved' && styles.activeTabLabel]}>Saved</Text>
          <Text style={[styles.tabCount, activeTab === 'saved' && styles.activeTabCount]}>{savedItems.length}</Text>
        </TouchableOpacity>
      </View>
      
      {activeTab === 'cart' && cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconContainer}>
            <Icon name="shopping-cart" type="feather" size={24} color="#999" />
          </View>
          <Text style={styles.emptyText}>Your cart is empty</Text>
          <Text style={styles.emptySubtext}>Looking for ideas?</Text>
          <TouchableOpacity style={styles.browseButton} onPress={navigateToBrowse}>
            <Text style={styles.browseButtonText}>Shop new arrivals</Text>
          </TouchableOpacity>
        </View>
      ) : activeTab === 'saved' && savedItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconContainer}>
            <Icon name="bookmark" type="feather" size={24} color="#999" />
          </View>
          <Text style={styles.emptyText}>No saved items</Text>
          <Text style={styles.emptySubtext}>Items you save will appear here</Text>
          <TouchableOpacity style={styles.browseButton} onPress={navigateToBrowse}>
            <Text style={styles.browseButtonText}>Browse products</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={activeTab === 'cart' ? cartItems : savedItems}
            renderItem={activeTab === 'cart' ? renderCartItem : renderSavedItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
          />

          {activeTab === 'cart' && cartItems.length > 0 && (
            <View style={styles.footer}>
              <View style={styles.totalContainer}>
                <View >
                  <Text style={styles.totalLabel}>Total Amount</Text>
                  <Text style={styles.totalAmount}>${cartTotal.toFixed(2)}</Text>
                </View>
                <TouchableOpacity 
                  style={styles.checkoutButton}
                  onPress={proceedToCheckout}
                >
                  <Text style={styles.checkoutButtonText}>Checkout</Text>
                  <Icon name="arrow-right" type="feather" size={20} color="#fff" style={styles.checkoutIcon} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: wp(5),
    fontWeight: '600',
         
    marginHorizontal: wp(4),
    marginVertical: hp(2),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    marginHorizontal: wp(4),
    borderRadius: 25,
    paddingHorizontal: wp(4),
    height: hp(6),
  },
  searchIcon: {
    marginRight: wp(2),
  },
  searchInput: {
    flex: 1,
    fontSize: wp(3.8),
         
  },
  tabContainer: {
    flexDirection: 'row',
    marginTop: hp(2),
    paddingHorizontal: wp(4),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabItem: {
    marginRight: wp(8),
    paddingVertical: hp(1),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: wp(2),
  },
  tabLabel: {
    fontSize: wp(3.8),
         
  },
  tabCount: {
    fontSize: wp(5),
    fontWeight: '600',
         
    marginTop: hp(0.5),
  },
  list: {
    padding: wp(4),
  },
  cartItem: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: wp(3),
    marginBottom: hp(2),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cartItemContent: {
    flexDirection: 'row',
  },
  itemDetailsContainer: {
    flex: 1,
    marginLeft: wp(3),
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  itemActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp(1),
  },
  itemImage: {
    width: wp(18),
    height: wp(18),
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: wp(3.8),
    fontWeight: '500',
         
    marginBottom: hp(0.5),
    flexWrap: 'wrap',
  },
  vendorName: {
    fontSize: wp(3.2),
        
    marginBottom: hp(0.5),
  },
  itemPrice: {
    fontSize: wp(4),
    fontWeight: '600',
    color: theme.active,
    marginTop: hp(0.5),
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: wp(1),
  },
  quantityButton: {
    width: wp(7),
    height: wp(7),
    borderRadius: 8,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  quantityButtonDisabled: {
    backgroundColor: '#f0f0f0',
  },
  quantity: {
    fontSize: wp(3.5),
    fontWeight: '500',
    marginHorizontal: wp(2),
    minWidth: wp(5),
    textAlign: 'center',
  },
  removeButton: {
    padding: wp(2),
    marginLeft: wp(2),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(4),
  },
  emptyIconContainer: {
    width: wp(15),
    height: wp(15),
    borderRadius: wp(7.5),
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(2),
  },
  emptyText: {
    fontSize: wp(5),
    fontWeight: '600',
         
    marginBottom: hp(1),
  },
  emptySubtext: {
    fontSize: wp(4),
        
    marginBottom: hp(3),
  },
  browseButton: {
    backgroundColor: '#333',
    paddingHorizontal: wp(8),
    paddingVertical: hp(1.5),
    borderRadius: 4,
  },
  browseButtonText: {
    color: '#fff',
    fontSize: wp(4),
    fontWeight: '500',
  },
  footer: {
    backgroundColor: '#fff',
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: wp(3.5),
        
    marginBottom: hp(0.5),
  },
  totalAmount: {
    fontSize: wp(6),
    fontWeight: '600',
         
  },
  checkoutButton: {
    backgroundColor: theme.active,
    paddingHorizontal: wp(6),
    paddingVertical: hp(1.5),
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: wp(4),
    fontWeight: '500',
    marginRight: wp(2),
  },
  checkoutIcon: {
    marginLeft: wp(2),
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: wp(2),
    marginLeft: wp(2),
  },
  activeTabItem: {
    borderBottomWidth: 2,
    borderBottomColor: theme.active,
  },
  activeTabLabel: {
    color: theme.active,
  },
  activeTabCount: {
    color: theme.active,
  },
});

export default CartScreen;