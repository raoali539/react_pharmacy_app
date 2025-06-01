



import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../utils/globalFunctions';
import theme from '../../assets/theme';

const ProductDetails = ({ route, navigation }:any) => {
  const { product } = route.params;
  const [selectedColor, setSelectedColor] = useState('Mint');
  const [quantity, setQuantity] = useState(1);

  const colors = ['Cloud', 'Milk Speckle', 'Mint', 'Rose Quartz'];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>

          <Text style={styles.headerTitle}>{product.name}</Text>
          <TouchableOpacity>
            <Text style={styles.heartIcon}>♡</Text>
          </TouchableOpacity>
        </View>

        <Image source={{ uri: product.image }} style={styles.productImage} />

        <View style={styles.detailsContainer}>
          <Text style={styles.productName}>{product.name}</Text>

          <View style={styles.priceRow}>
            <Text style={styles.price}>{product.price}</Text>
            <Text style={styles.msrp}>{product.msrp}</Text>
          </View>

          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>★ {product.rating}</Text>
            <Text style={styles.reviews}>(1)</Text>
            <Text style={styles.minOrder}>{product.minOrder}</Text>
          </View>

          <View style={styles.colorSection}>
            <Text style={styles.sectionTitle}>Colour</Text>
            <View style={styles.colorOptions}>
              {colors.map((color) => (
                <TouchableOpacity
                  key={color}
                  style={[
                    styles.colorButton,
                    selectedColor === color && styles.selectedColor
                  ]}
                  onPress={() => setSelectedColor(color)}
                >
                  <Text style={styles.colorText}>{color}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.shippingInfo}>
            <Text style={styles.shippingTitle}>Shipping</Text>
            <Text style={styles.deliveryDate}>Estimated Delivery May 23 - Jun 4, 2025</Text>
            <Text style={styles.shippingLocation}>Ships from Australia</Text>

            <View style={styles.freeShippingBox}>
              <Text style={styles.freeShippingText}>Free shipping over $450</Text>
              <Text style={styles.membershipText}>
                Available with an Insider membership. Free for 30 days.
              </Text>
              <TouchableOpacity>
                <Text style={styles.learnMore}>Learn more</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.returnsBox}>
              <Text style={styles.returnsTitle}>Free returns on all opening orders</Text>
              <Text style={styles.returnsText}>
                You're eligible for free returns on this order with Caslew Pty Ltd.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <View style={styles.quantitySelector}>
          <TouchableOpacity
            onPress={() => quantity > 1 && setQuantity(quantity - 1)}
            style={styles.quantityButton}
          >
            <Text>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity
            onPress={() => setQuantity(quantity + 1)}
            style={styles.quantityButton}
          >
            <Text>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.addToCartText}>Add to cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};


export default ProductDetails;
const styles = StyleSheet.create({
  container: {
    flex: 1,
            backgroundColor: theme.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: wp(4),
  },
  backButton: {
    fontSize: wp(6),
  },
  headerTitle: {
    fontSize: wp(4),
    fontWeight: '500',
  },
  heartIcon: {
    fontSize: wp(6),
  },
  productImage: {
    width: '100%',
    height: hp(30),
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: wp(4),
  },
  productName: {
    fontSize: wp(5),
    fontWeight: '600',
    marginBottom: hp(1),
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1),
  },
  price: {
    fontSize: wp(5),
    fontWeight: '600',
    marginRight: wp(2),
  },
  msrp: {
    fontSize: wp(4),
    textDecorationLine: 'line-through',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(2),
  },
  rating: {
    fontSize: wp(3.5),
    marginRight: wp(1),
  },
  reviews: {
    fontSize: wp(3.5),
    marginRight: wp(2),
  },
  minOrder: {
    fontSize: wp(3.5),
  },
  colorSection: {
    marginBottom: hp(2),
  },
  sectionTitle: {
    fontSize: wp(4),
    fontWeight: '500',
    marginBottom: hp(1),
  },
  colorOptions: {
    flexDirection: 'column',
  },
  colorButton: {
    padding: wp(3),
    marginBottom: hp(0.5),
  },
  selectedColor: {
    backgroundColor: '#f5f5f5',
  },
  colorText: {
    fontSize: wp(3.8),
  },
  shippingInfo: {
    marginTop: hp(2),
  },
  shippingTitle: {
    fontSize: wp(4),
    fontWeight: '500',
    marginBottom: hp(1),
  },
  deliveryDate: {
    fontSize: wp(3.8),
    marginBottom: hp(0.5),
  },
  shippingLocation: {
    fontSize: wp(3.8),
       
    marginBottom: hp(2),
  },
  freeShippingBox: {
    backgroundColor: '#f5f5f5',
    padding: wp(4),
    borderRadius: 8,
    marginBottom: hp(2),
  },
  freeShippingText: {
    fontSize: wp(3.8),
    fontWeight: '500',
    marginBottom: hp(0.5),
  },
  membershipText: {
    fontSize: wp(3.5),
       
    marginBottom: hp(0.5),
  },
  learnMore: {
    fontSize: wp(3.5),
    textDecorationLine: 'underline',
  },
  returnsBox: {
    backgroundColor: '#f5f5f5',
    padding: wp(4),
    borderRadius: 8,
  },
  returnsTitle: {
    fontSize: wp(3.8),
    fontWeight: '500',
    marginBottom: hp(0.5),
  },
  returnsText: {
    fontSize: wp(3.5),
       
  },
  bottomBar: {
    flexDirection: 'row',
    padding: wp(4),
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
            backgroundColor: theme.background,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 4,
    marginRight: wp(4),
  },
  quantityButton: {
    padding: wp(2),
    width: wp(10),
    alignItems: 'center',
  },
  quantity: {
    paddingHorizontal: wp(3),
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: '#000',
    padding: wp(3),
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCartText: {
    color: '#fff',
    fontSize: wp(4),
    fontWeight: '500',
  },
});


