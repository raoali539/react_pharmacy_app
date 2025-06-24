import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getAllProducts, getProductByCategory } from '../../redux/slices/productSlice';
import { addToCart } from '../../redux/slices/cartSlice';
import SafeAreaWrapper from '../../common/SafeAreaWrapper';
import SearchBar from '../../common/SearchBar';
import Card from '../../common/Card';
import Button from '../../common/Button';
import Header from '../../common/Header';
import theme from '../../assets/theme';

// Sample categories for the pharmacy app
const categories = [
  'All',
  'Prescription',
  'OTC Medicines',
  'Vitamins',
  'First Aid',
  'Personal Care',
  'Baby Care',
];

const ProductsScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const dispatch = useAppDispatch();
  const { products, filteredProducts, isLoading, error } = useAppSelector((state) => state.products);
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    if (category === 'All') {
      dispatch(getAllProducts());
    } else {
      dispatch(getProductByCategory(category));
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Implement local search functionality here
  };

  const handleAddToCart = (product: any) => {
    dispatch(addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    }));
  };

  const handleProductPress = (productId: string) => {
    navigation.navigate('ProductDetails', { productId });
  };

  const renderCategoryItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item && styles.selectedCategoryItem,
      ]}
      onPress={() => handleCategorySelect(item)}
    >
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item && styles.selectedCategoryText,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderProductItem = ({ item }: { item: any }) => (
    <Card style={styles.productCard}>
      <TouchableOpacity
        style={styles.productCardContent}
        onPress={() => handleProductPress(item.id)}
      >
        {/* Product image would go here */}
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productPrice}>${item.price}</Text>
          <Text style={styles.productDescription} numberOfLines={2}>
            {item.description}
          </Text>
        </View>
        <Button
          title="Add to Cart"
          onPress={() => handleAddToCart(item)}
          style={styles.addButton}
          textStyle={styles.addButtonText}
        />
      </TouchableOpacity>
    </Card>
  );

  return (
    <SafeAreaWrapper>
      <View style={styles.container}>
        <Header title="Products" />
        
        <SearchBar
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={handleSearch}
          style={styles.searchBar}
        />
        
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item}
          style={styles.categoriesList}
          contentContainerStyle={styles.categoriesContainer}
        />
        
        {isLoading ? (
          <View style={styles.loaderContainer}>
            <Text>Loading products...</Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <Button
              title="Try Again"
              onPress={() => dispatch(getAllProducts())}
              style={styles.retryButton}
            />
          </View>
        ) : (
          <FlatList
            data={filteredProducts.length > 0 ? filteredProducts : products}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.productsContainer}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.colors.background,
  },
  searchBar: {
    marginBottom: 16,
  },
  categoriesList: {
    maxHeight: 50,
    marginBottom: 16,
  },
  categoriesContainer: {
    paddingRight: 16,
  },
  categoryItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: theme.colors.cardBackground,
  },
  selectedCategoryItem: {
    backgroundColor: theme.colors.primary,
  },
  categoryText: {
    color: theme.colors.text,
  },
  selectedCategoryText: {
    color: 'white',
  },
  productsContainer: {
    paddingBottom: 16,
  },
  productCard: {
    marginBottom: 16,
    borderRadius: 8,
  },
  productCardContent: {
    padding: 16,
  },
  productInfo: {
    marginBottom: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: theme.colors.text,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 4,
  },
  productDescription: {
    color: theme.colors.textLight,
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: theme.colors.primary,
    height: 36,
  },
  addButtonText: {
    fontSize: 14,
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
  },
  errorText: {
    color: theme.colors.error,
    marginBottom: 16,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: theme.colors.primary,
  },
});

export default ProductsScreen;
