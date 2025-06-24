import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getProductById } from '../../redux/slices/productSlice';
import { addToCart } from '../../redux/slices/cartSlice';
import SafeAreaWrapper from '../../common/SafeAreaWrapper';
import Button from '../../common/Button';
import Header from '../../common/Header';
import theme from '../../assets/theme';

const ProductDetailsScreen = () => {
  const [quantity, setQuantity] = useState(1);
  
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  
  const { productId } = route.params as { productId: string };
  const { selectedProduct, isLoading, error } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProductById(productId));
  }, [dispatch, productId]);

  const handleAddToCart = () => {
    if (selectedProduct) {
      dispatch(addToCart({
        productId: selectedProduct.id,
        name: selectedProduct.name,
        price: selectedProduct.price,
        quantity,
        image: selectedProduct.image,
      }));
      navigation.navigate('Cart');
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  if (isLoading) {
    return (
      <SafeAreaWrapper>
        <View style={styles.container}>
          <Header title="Product Details" backButton />
          <View style={styles.loaderContainer}>
            <Text>Loading product details...</Text>
          </View>
        </View>
      </SafeAreaWrapper>
    );
  }

  if (error || !selectedProduct) {
    return (
      <SafeAreaWrapper>
        <View style={styles.container}>
          <Header title="Product Details" backButton />
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error || 'Product not found'}</Text>
            <Button
              title="Go Back"
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            />
          </View>
        </View>
      </SafeAreaWrapper>
    );
  }

  return (
    <SafeAreaWrapper>
      <View style={styles.container}>
        <Header title="Product Details" backButton />
        
        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {selectedProduct.image && (
            <Image
              source={{ uri: selectedProduct.image }}
              style={styles.productImage}
              resizeMode="cover"
            />
          )}
          
          <View style={styles.contentContainer}>
            <Text style={styles.productName}>{selectedProduct.name}</Text>
            <Text style={styles.productCategory}>{selectedProduct.category}</Text>
            <Text style={styles.productPrice}>${selectedProduct.price.toFixed(2)}</Text>
            
            <View style={styles.stockContainer}>
              <Text style={styles.stockLabel}>In Stock:</Text>
              <Text style={styles.stockValue}>{selectedProduct.stock} units</Text>
            </View>
            
            <Text style={styles.descriptionLabel}>Description</Text>
            <Text style={styles.descriptionText}>{selectedProduct.description || 'No description available.'}</Text>
            
            <View style={styles.quantityContainer}>
              <Text style={styles.quantityLabel}>Quantity:</Text>
              <View style={styles.quantityControls}>
                <Button
                  title="-"
                  onPress={handleDecreaseQuantity}
                  style={styles.quantityButton}
                  textStyle={styles.quantityButtonText}
                />
                <Text style={styles.quantityValue}>{quantity}</Text>
                <Button
                  title="+"
                  onPress={handleIncreaseQuantity}
                  style={styles.quantityButton}
                  textStyle={styles.quantityButtonText}
                />
              </View>
            </View>
          </View>
        </ScrollView>
        
        <View style={styles.footer}>
          <Text style={styles.totalText}>
            Total: ${(selectedProduct.price * quantity).toFixed(2)}
          </Text>
          <Button
            title="Add to Cart"
            onPress={handleAddToCart}
            style={styles.addButton}
          />
        </View>
      </View>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContainer: {
    flex: 1,
  },
  productImage: {
    width: '100%',
    height: 250,
    backgroundColor: '#f0f0f0',
  },
  contentContainer: {
    padding: 16,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 4,
  },
  productCategory: {
    fontSize: 14,
    color: theme.colors.textLight,
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 12,
  },
  stockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  stockLabel: {
    fontSize: 14,
    color: theme.colors.text,
  },
  stockValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.success,
    marginLeft: 4,
  },
  descriptionLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    color: theme.colors.text,
    lineHeight: 20,
    marginBottom: 16,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 36,
    height: 36,
    backgroundColor: theme.colors.primary,
    marginHorizontal: 0,
  },
  quantityButtonText: {
    fontSize: 18,
  },
  quantityValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginHorizontal: 16,
    minWidth: 20,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    backgroundColor: 'white',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  addButton: {
    flex: 1,
    marginLeft: 16,
    backgroundColor: theme.colors.primary,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  errorText: {
    color: theme.colors.error,
    marginBottom: 16,
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: theme.colors.primary,
  },
});

export default ProductDetailsScreen;
