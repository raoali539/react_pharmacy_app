import React, { useState, useRef } from 'react';
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
  Platform,
  Dimensions,
} from 'react-native';
import { Icon } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import theme, { TYPOGRAPHY_STYLES } from '../../../assets/theme';
import { useCart } from '../../../contexts/CartContext';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../../utils/globalFunctions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../../common/Header';
import { commonStyles } from '../../../assets/commonStyles';

type RootStackParamList = {
  Auth: { screen: string };
  Checkout: undefined;
};

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const CartScreen = () => {
  const { state, dispatch } = useCart();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [searchText, setSearchText] = useState('');
  const scaleAnims = useRef(new Map()).current;

  // Add safe checks for arrays
  const cartItems = state?.items || [];
  const cartTotal = state?.total || 0;

  const getScaleAnim = (itemId: string) => {
    if (!scaleAnims.has(itemId)) {
      scaleAnims.set(itemId, new Animated.Value(1));
    }
    return scaleAnims.get(itemId);
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity >= 1) {
      const scaleAnim = getScaleAnim(itemId);
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 0.95,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 4,
          useNativeDriver: true,
        }),
      ]).start();

      dispatch({ type: 'UPDATE_QUANTITY', payload: { id: itemId, quantity } });
    }
  };

  const handleRemoveItem = (itemId: string) => {
    const scaleAnim = getScaleAnim(itemId);
    Animated.timing(scaleAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      dispatch({ type: 'REMOVE_ITEM', payload: itemId });
      scaleAnims.delete(itemId);
    });
  };

  const proceedToCheckout = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        navigation.navigate('Checkout');
      } else {
        navigation.navigate('Login', { screen: 'Login' });
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
      navigation.navigate('Login', { screen: 'Login' });
    }
  };

  const navigateToBrowse = () => {
    navigation.navigate('ShowProducts' as never);
  };

  const filteredCartItems = cartItems.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase()) ||
    item.vendorName.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderCartItem = ({ item }: any) => (
    <Animated.View 
      style={[
        styles.cartItem,
        {
          transform: [{ scale: getScaleAnim(item.id) }],
        }
      ]}
    >
      <View style={styles.cartItemContent}>
        <Image 
          source={{ uri: item.image }} 
          style={styles.itemImage}
          resizeMode="cover"
        />
        
        <View style={styles.itemDetailsContainer}>
          <View style={styles.itemInfo}>
            <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
            <View style={styles.vendorContainer}>
              <Icon name="shop" type="feather" size={12} color="#666" />
              <Text style={styles.vendorName}>{item.vendorName}</Text>
            </View>
            <Text style={styles.itemPrice}>${typeof item?.price === 'number' ? item.price.toFixed(2) : '0.00'}</Text>
          </View>

        <View style={styles.itemActions}>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={[styles.quantityButton, item.quantity === 1 && styles.quantityButtonDisabled]}
                onPress={() => {
                  updateQuantity(item.id, item.quantity - 1);
                }}
                disabled={item.quantity === 1}
              >
                <Icon name="minus" type="feather" size={16} color={item.quantity === 1 ? '#999' : theme.text} />
              </TouchableOpacity>
              <Text style={styles.quantity}>{item.quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => {
                  updateQuantity(item.id, item.quantity + 1);
                }}
              >
                <Icon name="plus" type="feather" size={16} color={"#5A5A5A"} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.actionButtons}>
              <TouchableOpacity 
                style={[styles.actionButton, styles.removeButton]}
                onPress={() => handleRemoveItem(item.id)}
              >
                <Icon name="trash-2" type="feather" size={20} color="#5A5A5A" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.background} />
       <Header
                leftIcon='arrow-left'
                title="Shopping Cart"
                leftIconType='feather'
                containerStyle={commonStyles.headerContainer}
                onLeftPress={() =>{
                    navigation.goBack();
                }}
                showSearch={false}
             
            />
      
      <View style={styles.searchContainer}>
        <Icon name="search" type="feather" size={20} color={theme.textLight} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search in cart"
          placeholderTextColor={theme.textLight}
          returnKeyType="search"
          value={searchText}
          onChangeText={setSearchText}
        />
        {searchText ? (
          <TouchableOpacity onPress={() => setSearchText('')}>
            <Icon name="x" type="feather" size={20} color={theme.textLight} />
          </TouchableOpacity>
        ) : null}
      </View>

      {filteredCartItems.length === 0 ? (
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
      ) : (
        <View style={styles.contentContainer}>
          <FlatList
            data={filteredCartItems}
            renderItem={renderCartItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
          />

          <View style={styles.footer}>
            <View style={styles.totalContainer}>
              <View>
                <Text style={styles.totalLabel}>Total Amount</Text>
                <Text style={styles.totalAmount}>${cartTotal.toFixed(2)}</Text>
              </View>
              <TouchableOpacity 
                style={styles.checkoutButton}
                onPress={proceedToCheckout}
              >
                <Text style={styles.checkoutButtonText}>Checkout</Text>
                <Icon 
                  name="arrow-right" 
                  type="feather" 
                  size={20} 
                  color={theme.text}
                  style={styles.checkoutIcon} 
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
    backgroundColor: theme.background,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  iconButton: {
    padding: wp(2),
  },
  iconBackground: {
    backgroundColor: theme.surface,
    padding: wp(2),
    borderRadius: wp(3),
    ...Platform.select({
      ios: {
        shadowColor: theme.text,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    marginHorizontal: wp(2),
    color: theme.text,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.surface,
    marginHorizontal: wp(4),
    marginVertical: hp(2),
    borderRadius: theme.borderRadius.xl,
    paddingHorizontal: wp(4),
    height: hp(6),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  searchIcon: {
    marginRight: wp(2),
    color: theme.textLight,
  },
  searchInput: {
    flex: 1,
    ...TYPOGRAPHY_STYLES.body1,
    color: theme.text,
  },
  list: {
    padding: wp(4),
    paddingBottom: hp(15), // Add padding to prevent footer overlap
  },
  cartItem: {
    backgroundColor: theme.surface,
    borderRadius: theme.borderRadius.xl,
    padding: wp(4),
    marginBottom: hp(2),
    ...Platform.select({
      ios: {
        shadowColor: theme.text,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
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
  vendorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(1),
    marginVertical: hp(0.5),
  },
  vendorName: {
    fontSize: wp(3.2),
    marginBottom: hp(0.5),
  },
  itemPrice: {
    fontSize: wp(4),
    fontWeight: '600',
    color: theme.text,
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
    backgroundColor: theme.background,
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
    width: wp(20),
    height: wp(20),
    borderRadius: wp(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(3),
   
  },
  emptyText: {
    fontSize: wp(5),
    fontWeight: '600',
    marginBottom: hp(1),
    textAlign: 'center',
    color: theme.text,
  },
  emptySubtext: {
    fontSize: wp(4),
    marginBottom: hp(3),
    textAlign: 'center',
    color: theme.text,
  },
  browseButton: {
    paddingHorizontal: wp(6),
    paddingVertical: hp(1.5),
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.background,
    color: theme.text,
    // ...Platform.select({
    //   ios: {
    //     shadowColor: theme.primary,
    //     shadowOffset: { width: 0, height: 4 },
    //     shadowOpacity: 0.3,
    //     shadowRadius: 8,
    //   },
    //   android: {
    //     elevation: 4,
    //   },
    // }),
  },
  browseButtonText: {
    fontSize: wp(4),
    fontWeight: '500',
    color: theme.text,
  },
  footer: {
    backgroundColor: theme.background,
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
    borderTopWidth: 1,
    borderTopColor: theme.divider,
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: wp(3.5),
    marginBottom: hp(0.5),
    color:theme.text
  },
  totalAmount: {
    fontSize: wp(6),
    fontWeight: '600',
    color: theme.text,
  },
  checkoutButton: {
    backgroundColor: 'white',
    paddingHorizontal: wp(6),
    paddingVertical: hp(1.5),
    borderRadius: theme.borderRadius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: wp(40),
    ...Platform.select({
      ios: {
        shadowColor: theme.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  checkoutButtonText: {
    fontSize: wp(4),
    fontWeight: '500',
    color: theme.text,
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
    borderBottomColor: theme.primary,
  },
  activeTabLabel: {
    color: theme.primary,
  },
  activeTabCount: {
    color: theme.primary,
  },
  contentContainer: {
    flex: 1,
    position: 'relative',
  },
});

export default CartScreen;