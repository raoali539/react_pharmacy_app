import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    SafeAreaView,
    Platform,
    StatusBar,
    Modal,
    Pressable,
    Dimensions,
    ActivityIndicator
} from 'react-native';
import { Icon } from '@rneui/base';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../../../utils/globalFunctions';
import theme, { TYPOGRAPHY_STYLES } from '../../../../assets/theme';
import Header from '../../../../common/Header';
import { commonStyles } from '../../../../assets/commonStyles';

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string[];
    createdBy?: {
        userName: string;
    };
    stockAvailable: number;
}

const VendorAllProducts = ({ route, navigation }: any) => {
    const { title } = route?.params;
    const [isLoading] = useState(false); // Simulate loading state
    const [isError] = useState(false);   // Simulate error state

    // Mock data - replace with real API data
    const products: Product[] = [
        {
            "totalSale": 0,
            "_id": "6857b1aeae03cd256168dcb4",
            "name": "Paracetamol 500mg",
            "description": "Effective for fever and mild pain relief.",
            "price": 120,
            "imageUrl": [
                "https://www.mccabespharmacy.com/cdn/shop/files/PfizerParacetamol500mgFilmCoatedTablets24Pack.jpg?v=1704467734&width=1500"
            ],
            "category": {
                "_id": "6856dce28ce19353d0f1f737",
                "name": "Pain Relief",
                "image": "https://static.wixstatic.com/media/ab257c_d1b1127572b74288b6c4969de6f0c678~mv2.png/v1/fill/w_377,h_379,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/chronic-pain.png"
            },
            "totalViews": 3,
            "isDeleted": false,
            "isActive": true,
            "stockAvailable": 4,
            "createdAt": "2025-06-22T07:33:02.738Z",
            "updatedAt": "2025-06-24T13:40:37.675Z",
            "__v": 0
        },
        {
            "totalSale": 0,
            "_id": "6857b292ae03cd256168dcb6",
            "name": "Ibuprofen 200mg",
            "description": "Used to reduce fever and treat pain or inflammation.",
            "price": 180,
            "imageUrl": [
                "https://www.binsina.ae/media/catalog/product/m/3635_1.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=600&width=600&canvas=600:600"
            ],
            "category": {
                "_id": "6856dce28ce19353d0f1f737",
                "name": "Pain Relief",
                "image": "https://static.wixstatic.com/media/ab257c_d1b1127572b74288b6c4969de6f0c678~mv2.png/v1/fill/w_377,h_379,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/chronic-pain.png"
            },
            "totalViews": 1,
            "isDeleted": false,
            "isActive": true,
            "stockAvailable": 3,
            "createdAt": "2025-06-22T07:36:50.144Z",
            "updatedAt": "2025-06-24T10:41:22.399Z",
            "__v": 0
        },
        {
            "totalSale": 0,
            "_id": "6857b331ae03cd256168dcb8",
            "name": "Vitamin C 1000mg",
            "description": "Boosts immunity and helps in collagen formation.",
            "price": 250,
            "imageUrl": [
                "https://www.nutrifactor.com.pk/cdn/shop/files/NutraC.png?v=1716383636"
            ],
            "category": {
                "_id": "6856dce28ce19353d0f1f737",
                "name": "Pain Relief",
                "image": "https://static.wixstatic.com/media/ab257c_d1b1127572b74288b6c4969de6f0c678~mv2.png/v1/fill/w_377,h_379,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/chronic-pain.png"
            },
            "totalViews": 1,
            "isDeleted": false,
            "isActive": true,
            "stockAvailable": 2,
            "createdAt": "2025-06-22T07:39:29.446Z",
            "updatedAt": "2025-06-24T10:31:16.683Z",
            "__v": 0
        },
        {
            "totalSale": 0,
            "_id": "6857b3c7ae03cd256168dcba",
            "name": "Cough Syrup",
            "description": "Soothes throat and relieves cough.",
            "price": 150,
            "imageUrl": [
                "https://prospancough.co.za/wp-content/uploads/2023/12/syrup-img-optimized.png"
            ],
            "category": {
                "_id": "6856e0ee8ce19353d0f1f739",
                "name": "Cough & Cold",
                "image": "https://silkymahajan.com/wp-content/uploads/2021/03/Checkout-the-home-remedies-to-cure-Cough-Cold.jpg"
            },
            "totalViews": 0,
            "isDeleted": false,
            "isActive": true,
            "stockAvailable": 1,
            "createdAt": "2025-06-22T07:41:59.359Z",
            "updatedAt": "2025-06-22T07:41:59.359Z",
            "__v": 0
        },
        {
            "totalSale": 0,
            "_id": "6857b437ae03cd256168dcbc",
            "name": "Cold & Flu Tablets",
            "description": "Relieves symptoms of cold and flu.",
            "price": 200,
            "imageUrl": [
                "https://images.ctfassets.net/zi25g2m16kts/7sgp9WOX6lzVmzqz0U9f0v/4c81481c5c6026319a441262227e70a4/codral-day-night-cold-flu-24-tablets-1_0-en-au"
            ],
            "category": {
                "_id": "6856e0ee8ce19353d0f1f739",
                "name": "Cough & Cold",
                "image": "https://silkymahajan.com/wp-content/uploads/2021/03/Checkout-the-home-remedies-to-cure-Cough-Cold.jpg"
            },
            "totalViews": 0,
            "isDeleted": false,
            "isActive": true,
            "stockAvailable": 1,
            "createdAt": "2025-06-22T07:43:51.926Z",
            "updatedAt": "2025-06-22T07:43:51.926Z",
            "__v": 0
        },
        {
            "totalSale": 0,
            "_id": "6857b54bae03cd256168dcbe",
            "name": "Moisturizing Cream",
            "description": "Hydrates dry skin and protects against damage.",
            "price": 300,
            "imageUrl": [
                "https://www.medoget.com/cdn/shop/products/download_3fa65009-d8f7-4f89-b829-aeea34673bb2.png?v=1650369609"
            ],
            "category": {
                "_id": "6856e1b38ce19353d0f1f73b",
                "name": "Skin Care",
                "image": "https://img.bebeautiful.in/www-bebeautiful-in/are-facials-good-for-skin-pros-cons_mobilehome.jpg"
            },
            "totalViews": 0,
            "isDeleted": false,
            "isActive": true,
            "stockAvailable": 1,
            "createdAt": "2025-06-22T07:48:27.846Z",
            "updatedAt": "2025-06-22T07:48:27.846Z",
            "__v": 0
        },
        {
            "totalSale": 0,
            "_id": "6857b5a1ae03cd256168dcc0",
            "name": "Acne Control Gel",
            "description": "Treats and prevents acne breakouts.",
            "price": 280,
            "imageUrl": [
                "https://celestiaglow.pk/wp-content/uploads/2025/02/IMG_0446-Photoroom.png"
            ],
            "category": {
                "_id": "6856e1b38ce19353d0f1f73b",
                "name": "Skin Care",
                "image": "https://img.bebeautiful.in/www-bebeautiful-in/are-facials-good-for-skin-pros-cons_mobilehome.jpg"
            },
            "totalViews": 5,
            "isDeleted": false,
            "isActive": true,
            "stockAvailable": 1,
            "createdAt": "2025-06-22T07:49:53.612Z",
            "updatedAt": "2025-06-24T10:23:46.085Z",
            "__v": 0
        },
        {
            "totalSale": 0,
            "_id": "6857c448e202f3d932ce0332",
            "name": "test for update",
            "description": "Treats and prevents acne breakouts.",
            "price": 280,
            "imageUrl": [
                "https://celestiaglow.pk/wp-content/uploads/2025/02/IMG_0446-Photoroom.png"
            ],
            "category": {
                "_id": "6856e1b38ce19353d0f1f73b",
                "name": "Skin Care",
                "image": "https://img.bebeautiful.in/www-bebeautiful-in/are-facials-good-for-skin-pros-cons_mobilehome.jpg"
            },
            "totalViews": 0,
            "isDeleted": false,
            "isActive": true,
            "stockAvailable": 1,
            "createdAt": "2025-06-22T08:52:24.750Z",
            "updatedAt": "2025-06-22T08:52:24.750Z",
            "__v": 0
        },
        {
            "_id": "685ee5438af1382cc44f9887",
            "name": "Acne Gel",
            "description": "Treats and prevents acne breakouts.",
            "price": 280,
            "imageUrl": [
                "https://celestiaglow.pk/wp-content/uploads/2025/02/IMG_0446-Photoroom.png"
            ],
            "category": {
                "_id": "6856e1b38ce19353d0f1f73b",
                "name": "Skin Care",
                "image": "https://img.bebeautiful.in/www-bebeautiful-in/are-facials-good-for-skin-pros-cons_mobilehome.jpg"
            },
            "totalViews": 0,
            "totalSale": 0,
            "isDeleted": false,
            "isActive": true,
            "stockAvailable": 15,
            "createdBy": {
                "profilePicture": {
                    "url": ""
                },
                "address": {
                    "street": "Main Street 123",
                    "city": "Lahore",
                    "state": "Punjab",
                    "postalCode": "54000",
                    "country": "Pakistan"
                },
                "_id": "685d53d2d0c4b520af9cf4dc",
                "userName": "Ali Raza",
                "contactNumber": "03001234567",
                "email": "ali@example.com",
                "totalSales": 0,
                "totalRating": 5,
                "updatedBy": "true",
                "createdBy": "true",
                "isOtpVerified": false,
                "accountStatus": true,
                "createdAt": "2025-06-26T14:06:10.918Z",
                "updatedAt": "2025-06-26T14:06:10.918Z",
                "__v": 0
            },
            "updatedBy": "685d53d2d0c4b520af9cf4dc",
            "createdAt": "2025-06-27T18:38:59.891Z",
            "updatedAt": "2025-06-27T18:38:59.891Z",
            "__v": 0
        }
    ];

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const handleNotificationPress = () => navigation.navigate('Notifications');
    const handleCartPress = () => navigation.navigate('Cart');

    const formatPrice = (price: number): string => `₹${price.toFixed(0)}`;

    const renderProduct = ({ item, index }: { item: Product, index: number }) => {
        const imageUri = item.imageUrl?.length > 0 ? item.imageUrl[0] : '';
        const vendorName = item.createdBy?.userName || 'Unknown Vendor';

        return (
            <Animated.View entering={FadeInDown.delay(index * 100).springify()}>
                <TouchableOpacity
                    style={styles.productCard}
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate('VendorProductDetail', { product: item })}
                >
                    <View style={styles.imageContainer}>
                        {imageUri ? (
                            <Image 
                                source={{ uri: imageUri }} 
                                style={styles.productImage} 
                                resizeMode="cover"
                            />
                        ) : (
                            <View style={styles.imagePlaceholder}>
                                <Icon name="image" type="feather" size={24} color={theme.textLight} />
                            </View>
                        )}
                        
                        <TouchableOpacity
                            style={styles.threeDotsButton}
                            onPress={(e) => {
                                e.stopPropagation();
                                setSelectedProduct(item);
                                setModalVisible(true);
                            }}
                        >
                            <Icon name="more-vert" type="material" size={20} color={theme.text} />
                        </TouchableOpacity>
                    </View>
                    
                    <View style={styles.productInfo}>
                        <Text 
                            numberOfLines={2} 
                            style={[styles.productName, TYPOGRAPHY_STYLES.h4]}
                        >
                            {item.name}
                        </Text>
                        
                        <Text 
                            numberOfLines={1} 
                            style={[styles.description, TYPOGRAPHY_STYLES.body2]}
                        >
                            {item.description}
                        </Text>
                        
                        <Text style={[styles.price, TYPOGRAPHY_STYLES.price]}>
                            {formatPrice(item.price)}
                        </Text>
                        
                        <View style={styles.stockContainer}>
                            <Text style={styles.stockText}>
                                Stock: {item.stockAvailable}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </Animated.View>
        );
    };

    const handleOptionSelect = (option: string) => {
        if (!selectedProduct) return;
        
        switch (option) {
            case 'Edit':
                navigation.navigate('AddProduct', { 
                    product: selectedProduct,
                    isEdit: true 
                });
                break;
            case 'Delete':
                console.log('Delete product:', selectedProduct._id);
                // Implement actual delete logic
                break;
            case 'Update Status':
                console.log('Update status for:', selectedProduct._id);
                // Implement status update logic
                break;
        }
        setModalVisible(false);
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={theme.primary} />
            </View>
        );
    }

    if (isError) {
        return (
            <View style={styles.errorContainer}>
                <Icon name="error" size={40} color={theme.error} />
                <Text style={styles.errorText}>Failed to load products</Text>
                <TouchableOpacity style={styles.retryButton}>
                    <Text style={styles.retryText}>Try Again</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={theme.background} />
            <Header
                leftIcon="arrow-left"
                leftIconType="feather"
                rightIconType="feather"
                title={title}
                containerStyle={commonStyles.headerContainer}
                onLeftPress={navigation.goBack}
                onRightPress={handleNotificationPress}
                onRightIcon2Press={handleCartPress}
            />
            
            {products.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Icon name="package" type="feather" size={60} color={theme.textLight} />
                    <Text style={styles.emptyText}>No products available</Text>
                </View>
            ) : (
                <FlatList
                    data={products}
                    renderItem={renderProduct}
                    keyExtractor={item => item._id}
                    contentContainerStyle={styles.productList}
                    columnWrapperStyle={styles.columnWrapper}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                />
            )}
            
            {/* Options Modal */}
            <Modal
                animationType="fade"
                transparent
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <Pressable 
                    style={styles.modalOverlay} 
                    onPress={() => setModalVisible(false)}
                >
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Product Options</Text>
                        
                        <Pressable 
                            onPress={() => handleOptionSelect('Edit')} 
                            style={styles.modalButton}
                        >
                            <Text style={styles.modalButtonText}>Edit Product</Text>
                        </Pressable>
                        
                        <Pressable 
                            onPress={() => handleOptionSelect('Update Status')} 
                            style={styles.modalButtonSecondary}
                        >
                            <Text style={styles.modalButtonTextSecondary}>
                                Update Status
                            </Text>
                        </Pressable>
                        
                        <Pressable 
                            onPress={() => handleOptionSelect('Delete')} 
                            style={styles.modalButtonDanger}
                        >
                            <Text style={styles.modalButtonTextDanger}>Delete Product</Text>
                        </Pressable>
                    </View>
                </Pressable>
            </Modal>
        </SafeAreaView>
    );
};

export default VendorAllProducts;

// Styles
const CARD_WIDTH = (Dimensions.get('window').width - wp(12)) / 2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
    },
    productList: {
        padding: wp(2),
        paddingBottom: hp(2),
    },
    columnWrapper: {
        justifyContent: 'space-between',
        paddingHorizontal: wp(2),
        marginBottom: hp(1.5),
    },
    productCard: {
        width: CARD_WIDTH,
        backgroundColor: theme.surface,
        borderRadius: 12,
        overflow: 'hidden',
        ...Platform.select({
            ios: {
                shadowColor: theme.text,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 6,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    imageContainer: {
        height: hp(18),
        backgroundColor: theme.background,
    },
    productImage: {
        width: '100%',
        height: '100%',
    },
    imagePlaceholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.surface,
    },
    threeDotsButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 20,
        padding: 4,
    },
    productInfo: {
        padding: wp(3),
    },
    productName: {
        marginBottom: hp(0.5),
        height: hp(4.5),
    },
    description: {
        color: theme.textLight,
        marginBottom: hp(0.8),
        fontSize: wp(3.2),
    },
    price: {
        color: theme.text,
        marginBottom: hp(0.5),
        fontWeight: '700',
    },
    stockContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: hp(0.3),
    },
    stockText: {
        fontSize: wp(3),
        color: theme.textLight,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: theme.surface,
        borderRadius: 16,
        padding: 24,
        alignItems: 'center',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 8,
            },
            android: {
                elevation: 10,
            },
        }),
    },
    modalTitle: {
        ...TYPOGRAPHY_STYLES.h5,
        marginBottom: hp(2),
        textAlign: 'center',
    },
    modalButton: {
        width: '100%',
        paddingVertical: 12,
        borderRadius: 10,
        backgroundColor: theme.primary,
        marginVertical: hp(0.5),
        alignItems: 'center',
    },
    modalButtonText: {
        ...TYPOGRAPHY_STYLES.button,
        color: theme.surface,
    },
    modalButtonDanger: {
        width: '100%',
        paddingVertical: 12,
        borderRadius: 10,
        backgroundColor: theme.errorLight,
        marginVertical: hp(0.5),
        alignItems: 'center',
    },
    modalButtonTextDanger: {
        ...TYPOGRAPHY_STYLES.button,
        color: theme.error,
    },
    modalButtonSecondary: {
        width: '100%',
        paddingVertical: 12,
        borderRadius: 10,
        backgroundColor: theme.secondaryLight,
        marginVertical: hp(0.5),
        alignItems: 'center',
    },
    modalButtonTextSecondary: {
        ...TYPOGRAPHY_STYLES.button2,
        color: theme.secondary,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: wp(10),
    },
    errorText: {
        ...TYPOGRAPHY_STYLES.h2,
        marginVertical: hp(2),
        color: theme.error,
        textAlign: 'center',
    },
    retryButton: {
        padding: wp(3),
        paddingHorizontal: wp(8),
        borderRadius: 8,
        backgroundColor: theme.primaryLight,
    },
    retryText: {
        ...TYPOGRAPHY_STYLES.body1,
        color: theme.primary,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: wp(10),
    },
    emptyText: {
        ...TYPOGRAPHY_STYLES.h5,
        marginTop: hp(2),
        color: theme.textLight,
        textAlign: 'center',
    },
});
