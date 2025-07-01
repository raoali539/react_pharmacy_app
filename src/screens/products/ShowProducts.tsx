import React from 'react';
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
} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../utils/globalFunctions';
import { Icon } from '@rneui/base';
import theme, { TYPOGRAPHY_STYLES } from '../../assets/theme';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Header from '../../common/Header';
import { commonStyles } from '../../assets/commonStyles';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

// Define the Product type
interface Vendor {
    id: string;
    name: string;
}

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    image: string;
    vendor: Vendor;
}

const ShowProducts = ({ route, navigation }: any) => {
    const { title, products,type } = route?.params;
    console.log('Products:', products);
  const dispatch = useAppDispatch();
  const { products: apiProducts, isLoading: productsLoading, error: productsError,
    lowstockProducts, highstockProducts
  } = useAppSelector(state => state.products);


    const handleNotificationPress = () => {
        navigation.navigate('Notifications');
    };

    const handleCartPress = () => {
        navigation.navigate('Cart');
    };

    // Calculate discount percentage
    const calculateDiscount = (price: number, originalPrice?: number): number | null => {
        if (!originalPrice) return null;
        return Math.round(((originalPrice - price) / originalPrice) * 100);
    };

    // Format price to display with currency
    const formatPrice = (price: number): string => {
        return `₹${price.toFixed(2)}`;
    };

    const renderProduct = ({ item, index }: { item: any, index: number }) => {
        const discountPercentage = calculateDiscount(item?.price, item?.originalPrice);
        // Get first image from array or empty string
        const imageUri = item.imageUrl?.length > 0 ? item.imageUrl[0] : '';
        return (
            <Animated.View
                entering={FadeInDown.delay(index * 100).springify()}
            >
                <TouchableOpacity
                    style={styles.productCard}
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate('ProductDetails', { product: item })}
                >
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: imageUri }} style={styles.productImage} />
                        {discountPercentage && (
                            <View style={styles.discountTag}>
                                <Text style={styles.discountText}>{discountPercentage}% OFF</Text>
                            </View>
                        )}
                    </View>
                    <View style={styles.productInfo}>
                        <Text numberOfLines={2} style={[styles.productName, TYPOGRAPHY_STYLES.h4]}>{item?.name}</Text>
                        <Text numberOfLines={1} style={[styles.description, TYPOGRAPHY_STYLES.body2]}>{item?.description}</Text>
                        <View style={styles.priceContainer}>
                            <Text style={[styles.price, TYPOGRAPHY_STYLES.price]}>{formatPrice(item?.price)}</Text>
                            {item?.originalPrice && (
                                <Text style={[styles.msrp, TYPOGRAPHY_STYLES.body3]}>{formatPrice(item.originalPrice)}</Text>
                            )}
                        </View>
                        <View style={styles.bottomRow}>
                            <View style={styles.vendorContainer}>
                                <Icon name="store" type="material" size={14} color={theme.primary} />
                                <Text style={[styles.vendorName, TYPOGRAPHY_STYLES.body3]}>{item?.vendor?.name}</Text>
                            </View>
                            <TouchableOpacity
                                style={styles.messageButton}
                                onPress={() => navigation.navigate('ChatConversation', { vendor: item?.vendor })}
                            >
                                <Icon name="message-circle" type="feather" size={20} color={theme.primary} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </Animated.View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={theme.background} />
            <Header
                leftIcon='arrow-left'
                leftIconType='feather'
                rightIconType='feather'
                title={title}
                containerStyle={commonStyles.headerContainer}
                onLeftPress={() => {
                    navigation.goBack();
                }}
                onRightPress={handleNotificationPress}
                onRightIcon2Press={handleCartPress}
            />
            <FlatList
                data={type === '1' ? apiProducts : type === '2' ? lowstockProducts : highstockProducts}
                renderItem={renderProduct}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.productList}
                showsVerticalScrollIndicator={false}
                numColumns={1}
                scrollEnabled={true}
                bounces={true}
                overScrollMode="always"
            />
        </SafeAreaView>
    );
};

export default ShowProducts;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: wp(4),
        paddingVertical: hp(2),
        backgroundColor: theme.background,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 12,
            },
            android: {
                elevation: 8,
            },
        }),
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
    backButton: {
        padding: wp(2),
    },
    filterButton: {
        padding: wp(2),
        backgroundColor: `${theme.primary}10`,
        borderRadius: 8,
    },
    categoryTitle: {
        flex: 1,
        textAlign: 'center',
        marginHorizontal: wp(2),
    },
    productList: {
        padding: wp(4),
        paddingBottom: hp(4), // Add extra padding at bottom for better scroll experience
    },
    productCard: {
        width: '100%', // Make card take full width
        marginVertical: wp(2), // Add vertical spacing between cards
        backgroundColor: theme.surface,
        borderRadius: 16,
        overflow: 'hidden',
        ...Platform.select({
            ios: {
                shadowcolor: theme.text,
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.12,
                shadowRadius: 16,
            },
            android: {
                elevation: 6,
            },
        }),
    },
    imageContainer: {
        position: 'relative',
    },
    productImage: {
        width: '100%',
        height: hp(25), // Make image taller since we have more horizontal space
        resizeMode: 'cover',
    },
    discountTag: {
        position: 'absolute',
        top: 8,
        left: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        backgroundColor: theme.warning,
    },
    discountText: {
        color: theme.surface,
        fontWeight: 'bold',
        fontSize: wp(3),
    },
    productInfo: {
        padding: wp(3),
    },
    productName: {
        marginBottom: hp(0.5),
        height: hp(4),
    },
    description: {
        color: theme.textLight,
        marginBottom: hp(1),
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp(1),
    },
    price: {
        marginRight: wp(2),
        color: theme.text,
    },
    msrp: {
        textDecorationLine: 'line-through',
        color: theme.textLight,
    },
    bottomRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: hp(1),
    },
    messageButton: {
        padding: 4,
    },
    vendorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    vendorName: {
        marginLeft: wp(1),
        color: theme.primary,
    },
});


