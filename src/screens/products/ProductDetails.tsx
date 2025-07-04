import React, { useState, useEffect } from 'react';
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
  ActivityIndicator,
} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../utils/globalFunctions';
import { Icon } from '@rneui/base';
import theme, { TYPOGRAPHY_STYLES } from '../../assets/theme';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { commonStyles } from '../../assets/commonStyles';
import { useCart } from '../../contexts/CartContext';
import Header from '../../common/Header';
import apiClient from '../../utils/apiClient';

const ProductDetails = ({ route, navigation }: any) => {
  const productId = route.params.product;
  console.log('Product ID:', productId, route.params);
  interface Product {
    _id: string;
    name: string;
    price: number;
    description: string;
    imageUrl: string[];
  }

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState('Mint');
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(true);

  const colors = ['Cloud', 'Milk Speckle', 'Mint', 'Rose Quartz'];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await apiClient.get(`/getProductbyid?productId=${productId._id}`);
        console.log('Product Details:', response.data.data);
        setProduct(response.data.data ? response.data.data : []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color={theme.primary} style={styles.loader} />
      </SafeAreaView>
    );
  }

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Failed to load product details.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.background} />
      <Header
        leftIcon='arrow-left'
        title="Product Details"
        leftIconType='feather'
        containerStyle={commonStyles.headerContainer}
        onLeftPress={() => {
          navigation.goBack();
        }}
        showSearch={false}
      />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <Animated.View
          entering={FadeInDown.delay(100)}
          style={styles.imageContainer}
        >
          <Image source={{ uri: product.imageUrl[0] }} style={styles.productImage} />
        </Animated.View>

        <View style={styles.detailsSection}>
          <Animated.View
            entering={FadeInRight.delay(200)}
            style={styles.mainInfo}
          >
            <Text style={[styles.productName, TYPOGRAPHY_STYLES.h3]}>{product.name}</Text>

            <View style={styles.priceContainer}>
              <Text style={[styles.price, TYPOGRAPHY_STYLES.price]}>${product.price}</Text>
            </View>

            <Text style={[styles.description, TYPOGRAPHY_STYLES.body1]}>{product.description}</Text>
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
              id: product._id,
              productId: product._id,
              name: product.name,
              price: product.price,
              quantity: quantity,
              image: product.imageUrl[0],
              vendorName: 'Unknown Vendor'
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
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    textAlign: 'center',
    color: theme.text,
    marginTop: hp(20),
  },
  imageContainer: {
    backgroundColor: theme.surface,
    height: hp(30),
    marginBottom: hp(2),
    ...theme.shadows.base,
    resizeMode: 'cover',
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
  description: {
    color: theme.text,
    marginBottom: hp(2),
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
    paddingHorizontal: wp(3),
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.background,
    borderRadius: wp(4),
    marginRight: wp(2),
    margin: 'auto',
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


