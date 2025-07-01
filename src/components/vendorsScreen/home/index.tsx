import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, AccessibilityInfo, Dimensions, FlatList } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import theme from '../../../assets/theme'
import { TYPOGRAPHY_STYLES } from '../../../assets/theme'
import Dashboard from './dashboard'
import ProjectStatusChart from '../../vendor/VendorDashboard'
import { getAllProducts, useAppDispatch, useAppSelector } from '../../../redux'
import { fetchCategories } from '../../../redux/slices/categorySlice'
import SectionHeader from '../../../common/SectionHeader'
import { VirtualizedHorizontalList } from '../../../common/VirtualizedHorizontalList'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../../utils/globalFunctions'
import { useNavigation } from '@react-navigation/native'
import VendorProductCard from './productsCard'
import { commonStyles } from '../../../assets/commonStyles'
import VendorHeader from '../header'
import { Icon } from "@rneui/base";

const VendorHome = () => {
    const dispatch = useAppDispatch();
    // const { products: apiProducts, isLoading: productsLoading, error: productsError
    // } = useAppSelector(state => state.products);
    const navigation = useNavigation();
    const apiProducts = [
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
    ]

    const centerChildren = useCallback(() => (
        <Image
            source={require('../../../assets/images/lo.jpeg')}
            style={{ width: 100, height: 100, borderRadius: 20 }}
            resizeMode="contain"
        />
    ), []);

    const leftChildren = useCallback(() => (
        <TouchableOpacity>
            <Icon
                name="settings"
                type="material"
                color={'black'}
                size={30}
            />
        </TouchableOpacity>
    ), [navigation]);

    const rightChildren = useCallback(() => (
        <TouchableOpacity>
            <Icon
                name="notifications"
                type="material"
                color={'black'}
                size={30}
            />
        </TouchableOpacity>
    ), [navigation]);

    const fetchData = useCallback(async () => {
        try {
            const resp = await dispatch(getAllProducts());

            AccessibilityInfo.announceForAccessibility('Content loaded successfully');
        } catch (error) {
            console.error('Error fetching data:', error);
            AccessibilityInfo.announceForAccessibility('Error loading content');
        }
    }, [dispatch]);

    useEffect(() => {
        AccessibilityInfo.announceForAccessibility('Home screen loaded');
        fetchData();
        dispatch(fetchCategories());
    }, []);

    const handleViewAll = () => {
        console.log('View All Products pressed');
        navigation.navigate('VendorAllProducts' as never, {
            title: 'All Products',
            products: apiProducts,
            type: '1',
        } as never);
    };

    const keyExtractor = useCallback((item: any) => item._id, []);


    const renderProduct = useCallback(({ item, index }: { item: any; index: number }) => (
        <VendorProductCard
            item={item}
            index={index}
            showDiscount={item.originalPrice != null}
        onPress={() => {
            console.log('Product pressed:', item.name);
        }}
        />
    ), [navigation]);


    return (
        <View style={styles.container}>
            <VendorHeader
                CenterChildren={centerChildren()}
                leftChildren={leftChildren()}
                rightChildren={rightChildren()}
            />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.sectionSpacing}>
                    <Dashboard />
                </View>
                <View style={[styles.section, styles.sectionSpacing]}>
                    <SectionHeader
                        title="My Products"
                        onViewAll={handleViewAll}
                        style={{
                            paddingVertical: theme.spacing.sm,
                        }}
                        color='black'
                    />
                    <FlatList
                        data={apiProducts}
                        renderItem={renderProduct}
                        keyExtractor={keyExtractor}
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.productGrid}
                        columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: wp(2) }}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

export default VendorHome

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        paddingTop: theme.spacing.base,
    },
    headerBox: {
        backgroundColor: theme.background,
        borderRadius: theme.borderRadius.sm,
        padding: theme.spacing.sm,
        alignItems: 'flex-start',
        position: 'relative',
        paddingTop: theme.spacing.xl,
    },
    title: {
        ...TYPOGRAPHY_STYLES.h3,
        color: theme.text,
        marginBottom: 4,
    },
    subtitle: {
        ...TYPOGRAPHY_STYLES.body1,
        color: theme.text,
    },
    crownIcon: {
        width: 36,
        height: 36,
        position: 'absolute',
        top: 18,
        right: 18,
    },
    premiumBox: {
        backgroundColor: theme.accent,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.lg,
        marginTop: theme.spacing.xl,
        alignItems: 'center',
        ...theme.shadows.md,
    },
    premiumTitle: {
        ...TYPOGRAPHY_STYLES.h2,
        color: '#fff',
        marginBottom: 4,
    },
    premiumDesc: {
        ...TYPOGRAPHY_STYLES.body2,
        color: theme.accentLight,
        textAlign: 'center',
        marginBottom: theme.spacing.base,
    },
    upgradeBtn: {
        backgroundColor: theme.secondary,
        borderRadius: theme.borderRadius.base,
        paddingVertical: 10,
        paddingHorizontal: 32,
    },
    upgradeBtnText: {
        ...TYPOGRAPHY_STYLES.button1,
        color: '#fff',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    scrollContent: {
        paddingVertical: theme.spacing.lg,
    },
    sectionSpacing: {
        marginBottom: theme.spacing.lg,
    },
    section: {
        // marginTop: hp(3),
        paddingBottom: theme.spacing.lg,
    },
    productGrid: {
        paddingBottom: hp(4),
        // paddingHorizontal: wp(1),
    },
})