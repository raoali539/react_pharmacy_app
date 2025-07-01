import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
  Modal,
  FlatList,
  Platform,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Header from '../../common/Header';
import { commonStyles } from '../../assets/commonStyles';
import { useNavigation } from '@react-navigation/native';
const MAX_IMAGES = 3;

const AddProductForm = ({params}:any) => {
    const route = useRoute<any>();
    const navigation = useNavigation();
  const { isEditMode = false } = (route.params || {}); // Safely access isEditMode
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('2500000');
  const [category, setCategory] = useState('Cows');
  const [details, setDetails] = useState('this is optional i am writing');
  const [images, setImages] = useState<{ id: string; uri?: string }[]>([]); // Start with no images
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [errors, setErrors] = useState<{ title?: string; price?: string }>({});

  const categories = ['Cows', 'Goats', 'Sheep', 'Buffaloes', 'Chickens', 'Other'];

  const handleImagePicker = async (index: number) => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 1,
        quality: 0.7,
      });
      if (result.didCancel) return;
      if (result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        if (uri) {
          let newImages = [...images];
          if (index < newImages.length) {
            newImages[index] = { id: Date.now().toString(), uri };
          } else {
            newImages.push({ id: Date.now().toString(), uri });
          }
          setImages(newImages);
        }
      }
    } catch (e) {
      Alert.alert('Error', 'Could not pick image.');
    }
  };

  const removeImage = (index: number): void => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const validate = () => {
    const newErrors: { title?: string; price?: string } = {};
    if (!title.trim()) newErrors.title = 'Please provide a title';
    if (!price.trim() || isNaN(Number(price))) newErrors.price = 'Enter a valid price';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    // Submit logic here
    Alert.alert('Product Added', 'Your product has been added successfully!');
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }}>
        {
          isEditMode && (
   <Header
                leftIcon='arrow-left'
                title="Edit Product"
                leftIconType='feather'
                containerStyle={commonStyles.headerContainer}
                onLeftPress={() =>{
                    navigation.goBack();
                }}
                showSearch={false}
             
            />
          )
        }
       
      <View style={styles.content}>
        {
          !isEditMode && (
        <Text style={styles.heading}>{"Add Product"}</Text>

          )
        }
        {/* Image Upload Section */}
        <View style={styles.section}>
          <View style={styles.imageSection}>
            {images.map((img, index) => (
              <View key={img.id} style={styles.imageContainer}>
                <View style={styles.imageWrapper}>
                  <Image source={{ uri: img.uri }} style={styles.image} />
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removeImage(index)}
                  >
                    <Text style={styles.removeButtonText}>×</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
            {images.length < MAX_IMAGES && (
              <View style={styles.imageContainer}>
                <TouchableOpacity
                  style={styles.imagePlaceholder}
                  onPress={() => handleImagePicker(images.length)}
                >
                  <View style={styles.cameraIcon}>
                    <Text style={styles.cameraIconText}>📷</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        {/* Title Section */}
        <View style={styles.section}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={[styles.input, errors.title && styles.inputError]}
            placeholder="Add Title"
            placeholderTextColor="#999"
            value={title}
            onChangeText={setTitle}
          />
          {errors.title && (
            <Text style={styles.errorText}>{errors.title}</Text>
          )}
        </View>

        {/* Price Section */}
        <View style={styles.section}>
          <Text style={styles.label}>Price</Text>
          <TextInput
            style={[styles.priceInput, errors.price && styles.inputError]}
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
          />
          {errors.price && (
            <Text style={styles.errorText}>{errors.price}</Text>
          )}
        </View>

        {/* Category Section */}
        <View style={styles.section}>
          <Text style={styles.label}>Select Category</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setCategoryModalVisible(true)}
            activeOpacity={0.7}
          >
            <Text style={styles.dropdownText}>{category}</Text>
            <Text style={styles.dropdownArrow}>▼</Text>
          </TouchableOpacity>
          <Modal
            visible={categoryModalVisible}
            transparent
            animationType="fade"
            onRequestClose={() => setCategoryModalVisible(false)}
          >
            <TouchableOpacity
              style={styles.modalOverlay}
              activeOpacity={1}
              onPressOut={() => setCategoryModalVisible(false)}
            >
              <View style={styles.modalContent}>
                <FlatList
                  data={categories}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.modalItem}
                      onPress={() => {
                        setCategory(item);
                        setCategoryModalVisible(false);
                      }}
                    >
                      <Text style={styles.modalItemText}>{item}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </TouchableOpacity>
          </Modal>
        </View>

        {/* Details Section */}
        <View style={styles.section}>
          <Text style={styles.label}>Give Details (optional)</Text>
          <TextInput
            style={styles.textArea}
            value={details}
            onChangeText={setDetails}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Submit Button */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
            <Text style={styles.submitBtnText}>Add Product</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 32,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ff4444',
    marginBottom: 32,
    textAlign: 'left',
    alignSelf: 'flex-start',
    letterSpacing: 0.5,
  },
  section: {
    marginBottom: 32,
  },
  imageSection: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    aspectRatio: 1,
    maxWidth: '32%',
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  removeButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#ff4444',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#ff4444',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIconText: {
    fontSize: 20,
    color: 'white',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    backgroundColor: '#f8f8f8',
  },
  inputError: {
    borderColor: '#ff4444',
  },
  errorText: {
    color: '#ff4444',
    fontSize: 12,
    marginTop: 4,
  },
  priceInput: {
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    padding: 14,
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  dropdown: {
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  dropdownArrow: {
    fontSize: 12,
    color: '#666',
  },
  textArea: {
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    minHeight: 80,
    color: '#333',
  },
  submitBtn: {
    backgroundColor: '#ff4444',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 0,
  },
  submitBtnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxHeight: 300,
    elevation: 5,
  },
  modalItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalItemText: {
    fontSize: 16,
    color: '#333',
  },
});

export default AddProductForm;
