import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../utils/globalFunctions';
import { Icon } from '@rneui/base';
import theme, { TYPOGRAPHY_STYLES } from '../../assets/theme';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { commonStyles } from '../../assets/commonStyles';
import { useCart } from '../../contexts/CartContext';

const ProductDetails = ({ route, navigation }:any) => {
  const { product } = route.params;
  const [selectedColor, setSelectedColor] = useState('Mint');
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const colors = ['Cloud', 'Milk Speckle', 'Mint', 'Rose Quartz'];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.background} />
      <Animated.View 
        entering={FadeInDown.duration(500)}
        style={[commonStyles.headerContainer]}
      >
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={() => navigation.goBack()}
        >
          <View style={styles.iconBackground}>
            <Icon name="arrow-left" type="feather" size={22} color={theme.text} />
          </View>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, TYPOGRAPHY_STYLES.h4]}>Product Details</Text>
        {/* <TouchableOpacity style={styles.iconButton}>
          <View style={styles.iconBackground}>
            <Icon name="heart" type="feather" size={22} color={theme.text} />
          </View>
        </TouchableOpacity> */}
      </Animated.View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <Animated.View 
          entering={FadeInDown.delay(100)}
          style={styles.imageContainer}
        >
          <Image source={{ uri: product.image }} style={styles.productImage} />
        </Animated.View>

        <View style={styles.detailsSection}>
          <Animated.View 
            entering={FadeInRight.delay(200)}
            style={styles.mainInfo}
          >
            <Text style={[styles.productName, TYPOGRAPHY_STYLES.h3]}>{product.name}</Text>

            <View style={styles.priceContainer}>
              <Text style={[styles.price, TYPOGRAPHY_STYLES.price]}>${product.price}</Text>
              {product.msrp && (
                <Text style={[styles.originalPrice, TYPOGRAPHY_STYLES.body2]}>${product.msrp}</Text>
              )}
            </View>

            <View style={styles.ratingContainer}>
              <Icon name="star" type="feather" size={16} color={theme.text} />
              <Text style={[styles.rating, TYPOGRAPHY_STYLES.body2]}>{product.rating}</Text>
              <Text style={[styles.reviews, TYPOGRAPHY_STYLES.body2]}>(1)</Text>
              {product.minOrder && (
                <Text style={[styles.minOrder, TYPOGRAPHY_STYLES.body2]}>{product.minOrder}</Text>
              )}
            </View>
          </Animated.View>

          <Animated.View 
            entering={FadeInRight.delay(300)}
            style={styles.colorSection}
          >
            <Text style={[styles.sectionTitle, TYPOGRAPHY_STYLES.h4]}>Colour</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.colorOptions}>
                {colors.map((color) => (
                  <TouchableOpacity
                    key={color}
                    style={[
                      styles.colorButton,
                      selectedColor === color && styles.selectedColor,
                    ]}
                    onPress={() => setSelectedColor(color)}
                  >
                    {/* <View style={[styles.colorDot, { backgroundColor: color.toLowerCase() }]} /> */}
                    <Text style={[
                      styles.colorText,
                      TYPOGRAPHY_STYLES.button2,
                      selectedColor === color && styles.selectedColorText
                    ]}>{color}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </Animated.View>

          <Animated.View 
            entering={FadeInRight.delay(400)}
            style={styles.shippingInfo}
          >
            <Text style={[styles.sectionTitle, TYPOGRAPHY_STYLES.h4]}>Shipping</Text>
            <Text style={[styles.deliveryDate, TYPOGRAPHY_STYLES.body1]}>
              Estimated Delivery May 23 - Jun 4, 2025
            </Text>
            <Text style={[styles.shippingLocation, TYPOGRAPHY_STYLES.body2]}>
              Ships from Australia
            </Text>

            <View style={styles.infoCard}>
              <View style={styles.iconContainer}>
                <Icon name="refresh-ccw" type="feather" size={20} color={theme.primary} />
              </View>
              <View style={styles.infoContent}>
                <Text style={[styles.returnsTitle, TYPOGRAPHY_STYLES.button2]}>
                  Free returns on all opening orders
                </Text>
                <Text style={[styles.returnsText, TYPOGRAPHY_STYLES.body2]}>
                  You're eligible for free returns on this order with Caslew Pty Ltd.
                </Text>
              </View>
            </View>
          </Animated.View>
        </View>
      </ScrollView>

      <Animated.View 
        entering={FadeInDown.delay(500)}
        style={styles.bottomBar}
      >
        <View style={styles.quantitySelector}>
          <TouchableOpacity
            onPress={() => quantity > 1 && setQuantity(quantity - 1)}
            style={[styles.quantityButton, quantity === 1 && styles.quantityButtonDisabled]}
          >
            <Icon 
              name="minus" 
              type="feather" 
              size={20} 
              color={quantity === 1 ? theme.textLight : theme.text} 
            />
          </TouchableOpacity>
          <Text style={[styles.quantity, TYPOGRAPHY_STYLES.button1]}>{quantity}</Text>
          <TouchableOpacity
            onPress={() => setQuantity(quantity + 1)}
            style={styles.quantityButton}
          >
            <Icon name="plus" type="feather" size={20} color={theme.text} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.addToCartButton} 
          onPress={() => {
            addToCart({
              id: product.id,
              productId: product.id,
              name: product.name,
              price: product.price,
              quantity: quantity,
              image: product.image,
              vendorName: product.vendorName || 'Unknown Vendor'
            });
            navigation.navigate('Cart');
          }}
        >
          <Text style={styles.addToCartText}>Add to cart</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  content: {
    flex: 1,
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
  imageContainer: {
    backgroundColor: theme.surface,
    height: hp(25),
    marginBottom: hp(2),
    ...theme.shadows.base,
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  detailsSection: {
    paddingHorizontal: wp(4),
  },
  mainInfo: {
    marginBottom: hp(3),
  },
  productName: {
    marginBottom: hp(1),
    color: theme.text,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(2),
  },
  price: {
    ...TYPOGRAPHY_STYLES.price,
    color: theme.text,
    marginRight: wp(2),
  },
  originalPrice: {
    ...TYPOGRAPHY_STYLES.body2,
    textDecorationLine: 'line-through',
    color: theme.text,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(2),
  },
  rating: {
    marginLeft: wp(1),
    marginRight: wp(1),
    color: theme.text,
  },
  reviews: {
    marginRight: wp(2),
    color: theme.text,
  },
  minOrder: {
    color: theme.textLight,
  },
  colorSection: {
    marginBottom: hp(3),
  },
  sectionTitle: {
    marginBottom: hp(1),
    color: theme.text,
  },
  colorOptions: {
    flexDirection: 'row',
    paddingVertical: hp(1),
    paddingHorizontal: wp(2),
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.surface,
    borderRadius: wp(4),
    ...theme.shadows.base,
    marginRight: wp(2),
  },
  colorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: wp(2),
    gap: wp(3),
    paddingHorizontal: wp(7),
    paddingVertical: wp(2),   
    borderRadius: wp(8),
    borderWidth: 1,
    borderColor: theme.border,
    backgroundColor: theme.surface,

  },
  colorDot: {
    width: wp(3),
    height: wp(3),
    borderRadius: wp(1.5),
    marginRight: wp(2),
  },
  selectedColor: {
    backgroundColor: theme.text,
    borderColor: theme.text,
  },
  selectedColorText: {
    color: theme.surface,
  },
  colorText: {
    color: theme.text,
  },
  shippingInfo: {
    marginTop: hp(2),
  },
  deliveryDate: {
    marginBottom: hp(0.5),
    color: theme.text,
  },
  shippingLocation: {
    marginBottom: hp(2),
    color: theme.text,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: `${theme.primary}08`,
    padding: wp(4),
    borderRadius: wp(4),
    marginBottom: hp(2),
  },
  iconContainer: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    backgroundColor: `${theme.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(3),
  },
  infoContent: {
    flex: 1,
  },
  freeShippingText: {
    marginBottom: hp(0.5),
  },
  membershipText: {
    color: theme.text,
  },
  returnsTitle: {
    marginBottom: hp(0.5),
    color: theme.text,
  },
  returnsText: {
    color: theme.text,
  },
  bottomBar: {
    flexDirection: 'row',
    padding: wp(4),
    backgroundColor: theme.surface,
    borderTopWidth: 1,
    borderTopColor: theme.border,
    ...theme.shadows.lg,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.background,
    borderRadius: theme.borderRadius.lg,
    marginRight: wp(4),
    padding: wp(1),
    borderWidth: 1,
    borderColor: theme.border,
  },
  quantityButton: {
    padding: wp(2),
    width: wp(10),
    height: wp(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonDisabled: {
    opacity: 0.5,
  },
  quantity: {
    ...TYPOGRAPHY_STYLES.h3,
    marginHorizontal: wp(3),
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: theme.text,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: hp(1),
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.base,
  },
  addToCartText: {
    ...TYPOGRAPHY_STYLES.button1,
    color: theme.surface,
  },
});

export default ProductDetails;


