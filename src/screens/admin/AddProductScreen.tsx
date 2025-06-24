import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { sellProduct } from '../../redux/slices/productSlice';
import SafeAreaWrapper from '../../common/SafeAreaWrapper';
import Input from '../../common/Input';
import Button from '../../common/Button';
import Header from '../../common/Header';
import theme from '../../assets/theme';
import { launchImageLibrary } from 'react-native-image-picker';

const categories = [
  'Prescription',
  'OTC Medicines',
  'Vitamins',
  'First Aid',
  'Personal Care',
  'Baby Care',
];

const AddProductScreen = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState<string | null>(null);
  
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.products);
  const navigation = useNavigation();

  const selectImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
    });
    
    if (result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri || null);
    }
  };

  const handleAddProduct = async () => {
    if (!name || !price || !stock || !category) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    
    const priceValue = parseFloat(price);
    const stockValue = parseInt(stock, 10);
    
    if (isNaN(priceValue) || priceValue <= 0) {
      Alert.alert('Error', 'Please enter a valid price');
      return;
    }
    
    if (isNaN(stockValue) || stockValue < 0) {
      Alert.alert('Error', 'Please enter a valid stock quantity');
      return;
    }
    
    try {
      await dispatch(sellProduct({
        name,
        description,
        price: priceValue,
        stock: stockValue,
        category,
        image,
      })).unwrap();
      
      Alert.alert(
        'Success',
        'Product added successfully',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert('Error', typeof error === 'string' ? error : 'Failed to add product');
    }
  };

  return (
    <SafeAreaWrapper>
      <View style={styles.container}>
        <Header title="Add New Product" backButton />
        
        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {error && (
            <Text style={styles.errorText}>{error}</Text>
          )}
          
          <View style={styles.formContainer}>
            <Text style={styles.label}>Product Name *</Text>
            <Input
              placeholder="Enter product name"
              value={name}
              onChangeText={setName}
            />
            
            <Text style={styles.label}>Description</Text>
            <Input
              placeholder="Enter product description"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              style={styles.textArea}
            />
            
            <Text style={styles.label}>Price (USD) *</Text>
            <Input
              placeholder="Enter price"
              value={price}
              onChangeText={setPrice}
              keyboardType="decimal-pad"
            />
            
            <Text style={styles.label}>Stock Quantity *</Text>
            <Input
              placeholder="Enter available stock"
              value={stock}
              onChangeText={setStock}
              keyboardType="number-pad"
            />
            
            <Text style={styles.label}>Category *</Text>
            <View style={styles.categoriesContainer}>
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.categoryItem,
                    category === cat && styles.selectedCategoryItem,
                  ]}
                  onPress={() => setCategory(cat)}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      category === cat && styles.selectedCategoryText,
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            
            <Text style={styles.label}>Product Image</Text>
            <TouchableOpacity style={styles.imageContainer} onPress={selectImage}>
              {image ? (
                <Image source={{ uri: image }} style={styles.productImage} />
              ) : (
                <View style={styles.imagePlaceholder}>
                  <Text style={styles.placeholderText}>Tap to select an image</Text>
                </View>
              )}
            </TouchableOpacity>
            
            <Button
              title="Add Product"
              onPress={handleAddProduct}
              isLoading={isLoading}
              style={styles.addButton}
            />
          </View>
        </ScrollView>
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
  formContainer: {
    padding: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 4,
    marginTop: 12,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  errorText: {
    color: theme.colors.error,
    padding: 16,
    backgroundColor: '#ffeeee',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 4,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 8,
  },
  categoryItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
    borderRadius: 20,
    backgroundColor: theme.colors.cardBackground,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  selectedCategoryItem: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  categoryText: {
    color: theme.colors.text,
  },
  selectedCategoryText: {
    color: 'white',
  },
  imageContainer: {
    marginVertical: 16,
  },
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  imagePlaceholder: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderStyle: 'dashed',
  },
  placeholderText: {
    color: theme.colors.textLight,
  },
  addButton: {
    marginTop: 20,
    backgroundColor: theme.colors.primary,
  },
});

export default AddProductScreen;
