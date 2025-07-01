import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity, Image, Dimensions, KeyboardAvoidingView, Platform, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '../../redux/hooks';
import { sellProduct } from '../../redux/slices/productSlice';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Header from '../../common/Header';
import theme from '../../assets/theme';
import { launchImageLibrary } from 'react-native-image-picker';
import { Input } from '../../common/Input';
import { Button } from '../../common/Button';

const { width, height } = Dimensions.get('window');
const isSmallScreen = width < 375;

const categories = [
  { name: 'Prescription', icon: 'medical-services' },
  { name: 'OTC Medicines', icon: 'local-pharmacy' },
  { name: 'Vitamins', icon: 'healing' },
  { name: 'First Aid', icon: 'health-and-safety' },
  { name: 'Personal Care', icon: 'spa' },
  { name: 'Baby Care', icon: 'child-care' },
];

const AddProductScreen = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const selectImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
      maxWidth: 800,
      maxHeight: 800,
    });
    
    if (result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri || null);
    }
  };

  const handleAddProduct = async () => {
    if (!name || !price || !stock || !category) {
      Alert.alert('Required Fields', 'Please fill in all required fields');
      return;
    }
    
    const priceValue = parseFloat(price);
    const stockValue = parseInt(stock, 10);
    
    if (isNaN(priceValue) || priceValue <= 0) {
      Alert.alert('Invalid Price', 'Please enter a valid price greater than 0');
      return;
    }
    
    if (isNaN(stockValue) || stockValue < 0) {
      Alert.alert('Invalid Stock', 'Please enter a valid stock quantity');
      return;
    }
    
    setLoading(true);
    try {
      await dispatch(sellProduct({
        name,
        description,
        price: priceValue,
        stock: stockValue,
        category,
        image: image ?? undefined,
      })).unwrap();
      
      Alert.alert(
        'Success',
        'Product added successfully',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert('Error', typeof error === 'string' ? error : 'Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundGradient} />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardContainer}
      >
        <ScrollView 
          style={styles.scrollContainer} 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header Section */}
          <View style={styles.headerSection}>
            <View style={styles.headerIconContainer}>
              <View style={styles.headerIcon}>
                <Icon name="add-box" size={28} color="white" />
              </View>
            </View>
            <Text style={styles.title}>Add New Product</Text>
            <Text style={styles.subtitle}>Create a listing for your medical product</Text>
          </View>

          {/* Product Details Card */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Icon name="info-outline" size={20} color={theme.primary} />
              <Text style={styles.sectionTitle}>Product Details</Text>
            </View>
            
            <View style={styles.premiumCard}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Product Name *</Text>
                <View style={styles.inputContainer}>
                  <Icon name="inventory" size={20} color="#94A3B8" style={styles.inputIcon} />
                  <Input
                    placeholder="Enter product name"
                    value={name}
                    onChangeText={setName}
                    style={styles.inputField}
                    placeholderTextColor="#94A3B8"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Description</Text>
                <View style={[styles.inputContainer, styles.textAreaContainer]}>
                  <Icon name="description" size={20} color="#94A3B8" style={[styles.inputIcon, styles.textAreaIcon]} />
                  <Input
                    placeholder="Describe your product..."
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    style={[styles.inputField, styles.textArea]}
                    placeholderTextColor="#94A3B8"
                  />
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.priceColumn}>
                  <Text style={styles.label}>Price (USD) *</Text>
                  <View style={styles.inputContainer}>
                    <Icon name="attach-money" size={20} color="#94A3B8" style={styles.inputIcon} />
                    <Input
                      placeholder="0.00"
                      value={price}
                      onChangeText={setPrice}
                      keyboardType="numeric"
                      style={styles.inputField}
                      placeholderTextColor="#94A3B8"
                    />
                  </View>
                </View>
                
                <View style={styles.stockColumn}>
                  <Text style={styles.label}>Stock Quantity *</Text>
                  <View style={styles.inputContainer}>
                    <Icon name="inventory-2" size={20} color="#94A3B8" style={styles.inputIcon} />
                    <Input
                      placeholder="0"
                      value={stock}
                      onChangeText={setStock}
                      keyboardType="numeric"
                      style={styles.inputField}
                      placeholderTextColor="#94A3B8"
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Category Selection */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Icon name="category" size={20} color={theme.primary} />
              <Text style={styles.sectionTitle}>Category *</Text>
            </View>
            
            <View style={styles.premiumCard}>
              <View style={styles.categoriesGrid}>
                {categories.map((cat) => (
                  <TouchableOpacity
                    key={cat.name}
                    style={[
                      styles.categoryCard,
                      category === cat.name && styles.selectedCategoryCard,
                    ]}
                    onPress={() => setCategory(cat.name)}
                    activeOpacity={0.7}
                  >
                    <View style={[
                      styles.categoryIconContainer,
                      category === cat.name && styles.selectedCategoryIconContainer
                    ]}>
                      <Icon 
                        name={cat.icon} 
                        size={24} 
                        color={category === cat.name ? 'white' : theme.primary} 
                      />
                    </View>
                    <Text style={[
                      styles.categoryText,
                      category === cat.name && styles.selectedCategoryText,
                    ]}>
                      {cat.name}
                    </Text>
                    {category === cat.name && (
                      <View style={styles.selectedIndicator}>
                        <Icon name="check-circle" size={18} color={theme.primary} />
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {/* Image Upload Section */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Icon name="photo-camera" size={20} color={theme.primary} />
              <Text style={styles.sectionTitle}>Product Image</Text>
              <Text style={styles.optional}>Optional</Text>
            </View>
            
            <View style={styles.premiumCard}>
              <TouchableOpacity 
                style={styles.imageUploadContainer} 
                onPress={selectImage}
                activeOpacity={0.8}
              >
                {image ? (
                  <View style={styles.imagePreviewContainer}>
                    <Image source={{ uri: image }} style={styles.productImage} />
                    <View style={styles.imageOverlay} />
                    <TouchableOpacity 
                      style={styles.changeImageButton}
                      onPress={selectImage}
                    >
                      <Icon name="camera-alt" size={16} color="white" />
                      <Text style={styles.changeImageText}>Change</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={styles.uploadPlaceholder}>
                    <View style={styles.uploadIconContainer}>
                      <Icon name="cloud-upload" size={32} color={theme.primary} />
                    </View>
                    <Text style={styles.uploadText}>Tap to upload image</Text>
                    <Text style={styles.uploadSubtext}>Recommended: 800x800px, max 10MB</Text>
                    <Text style={styles.supportedFormats}>JPG, PNG, GIF</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Action Button */}
          <TouchableOpacity 
            style={[styles.addButton, loading && styles.addButtonDisabled]}
            onPress={handleAddProduct}
            disabled={loading}
            activeOpacity={0.8}
          >
            <View style={[styles.buttonGradient, loading && styles.buttonGradientDisabled]}>
              {loading ? (
                <View style={styles.loadingContainer}>
                  <Text style={styles.buttonText}>Adding Product...</Text>
                </View>
              ) : (
                <View style={styles.buttonContent}>
                  <Icon name="add" size={24} color="white" />
                  <Text style={styles.buttonText}>Add Product</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backgroundGradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#F8FAFF',
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  
  // Header Styles
  headerSection: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingTop: 60,
  },
  headerIconContainer: {
    marginBottom: 16,
  },
  headerIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.primary,
    shadowColor: theme.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#1E293B',
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
    lineHeight: 24,
  },

  // Section Styles
  sectionContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
    marginLeft: 8,
    flex: 1,
  },
  optional: {
    fontSize: 12,
    color: '#94A3B8',
    fontFamily: 'Inter-Regular',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },

  // Card Styles
  premiumCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#1E293B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },

  // Input Styles
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#334155',
    marginBottom: 8,
    letterSpacing: 0.1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    paddingHorizontal: 16,
    minHeight: 52,
  },
  textAreaContainer: {
    alignItems: 'flex-start',
    paddingVertical: 16,
    minHeight: 120,
  },
  inputIcon: {
    marginRight: 12,
  },
  textAreaIcon: {
    marginTop: 2,
  },
  inputField: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1E293B',
    padding: 0,
  },
  textArea: {
    textAlignVertical: 'top',
    minHeight: 80,
  },

  // Row Layout
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  priceColumn: {
    flex: 1,
  },
  stockColumn: {
    flex: 1,
  },

  // Category Styles
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E2E8F0',
    position: 'relative',
  },
  selectedCategoryCard: {
    backgroundColor: theme.primary + '10',
    borderColor: theme.primary,
    shadowColor: theme.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  categoryIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  selectedCategoryIconContainer: {
    backgroundColor: theme.primary,
  },
  categoryText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 16,
  },
  selectedCategoryText: {
    color: theme.primary,
    fontFamily: 'Inter-SemiBold',
  },
  selectedIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
  },

  // Image Upload Styles
  imageUploadContainer: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  imagePreviewContainer: {
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    resizeMode: 'cover',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 16,
  },
  changeImageButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 4,
  },
  changeImageText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  uploadPlaceholder: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 24,
  },
  uploadIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.primary + '15',
    marginBottom: 16,
  },
  uploadText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#334155',
    marginBottom: 4,
  },
  uploadSubtext: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 8,
    textAlign: 'center',
  },
  supportedFormats: {
    fontSize: 12,
    color: '#94A3B8',
    fontFamily: 'Inter-Regular',
  },

  // Button Styles
  addButton: {
    marginTop: 32,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: theme.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 12,
  },
  addButtonDisabled: {
    shadowOpacity: 0.1,
    elevation: 4,
  },
  buttonGradient: {
    paddingVertical: 18,
    paddingHorizontal: 24,
    alignItems: 'center',
    backgroundColor: theme.primary,
  },
  buttonGradientDisabled: {
    backgroundColor: '#94A3B8',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: 'white',
    letterSpacing: 0.3,
  },
});

export default AddProductScreen;