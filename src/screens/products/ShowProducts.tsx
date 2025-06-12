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
    const handleNotificationPress = () => {
        navigation.navigate('Notifications');
    };

    const handleCartPress = () => {
        navigation.navigate('Cart');
    };

    const FEATURED_PRODUCTS: Product[] = [
        {
            id: "1",
            name: 'Panadol Extra',
            description: 'Paracetamol & Caffeine Tablets',
            price: 150.00,
            originalPrice: 180.00,
            image: "https://c8.alamy.com/comp/D91062/fake-mushroom-on-forest-floor-D91062.jpg",
            vendor: {
                id: "v1",
                name: "Main Pharmacy"
            }
        },
        {
            id: "2",
            name: 'Centrum Adults',
            description: 'Multivitamin Tablets (30)',
            price: 1250.00,
            originalPrice: 1399.00,
            image: "https://www.brandonthatchers.co.uk/uploads/items/6456424cf4e1410e/1c26823365d0ae27.jpeg?size=224&date=1602000697",
            vendor: {
                id: "v2",
                name: "Health Plus"
            }
        },
        {
            id: "3",
            name: 'Ensure Gold',
            description: 'Adult Nutrition Drink 400g',
            price: 2199.00,
            image: "https://www.brandonthatchers.co.uk/uploads/items/7c76091ce601ce2f/b54e2fbd44fb96f6.jpeg?size=224&date=1602000547",
            vendor: {
                id: "v3",
                name: "Health Plus"
            }
        },
        {
            id: "4",
            name: 'Baby Milk',
            description: 'Infant Formula Stage 1',
            price: 3299.00,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn41hy2eegjTPDitK6e63GyBdSzvsSHR5JgGaRxWP5bO7gpGfFP01zplribLxllEWp8fc&usqp=CAU",
            vendor: {
                id: "v2",
                name: "Health Plus"
            }
        },
        {
            id: "5",
            name: 'Vicks Vaporub',
            description: 'Relief for Cold Symptoms (50g)',
            price: 280.00,
            originalPrice: 310.00,
            image: "https://media.post.rvohealth.io/wp-content/uploads/2020/02/mushrooms-varieties-types-732x549-thumbnail-732x549.jpg",
            vendor: {
                id: "v1",
                name: "Main Pharmacy"
            }
        },
        {
            id: "6",
            name: 'Dettol Hand Sanitizer',
            description: 'Instant Hand Sanitizer 200ml',
            price: 450.00,
            originalPrice: 500.00,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2QG7iUSlAOSeTcY9rGTGN4cPNyYdndqSZYA&s",
            vendor: {
                id: "v4",
                name: "SafeCare Pharmacy"
            }
        },
        {
            id: "7",
            name: 'Revital H',
            description: 'Daily Health Supplement (30 Capsules)',
            price: 799.00,
            image: "https://m.media-amazon.com/images/I/81EyKYuu06L._AC_UF894,1000_QL80_.jpg",
            vendor: {
                id: "v3",
                name: "Health Plus"
            }
        },
        {
            id: "8",
            name: 'ORS Powder Sachets',
            description: 'Electrolyte Rehydration Formula (Pack of 10)',
            price: 250.00,
            originalPrice: 300.00,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7ppSBbwaGkSNB-GB2rfSY3dimWrn-LgsPeA&s",
            vendor: {
                id: "v5",
                name: "Wellness Pharmacy"
            }
        }
    ];

    // Calculate discount percentage
    const calculateDiscount = (price: number, originalPrice?: number): number | null => {
        if (!originalPrice) return null;
        return Math.round(((originalPrice - price) / originalPrice) * 100);
    };

    // Format price to display with currency
    const formatPrice = (price: number): string => {
        return `₹${price.toFixed(2)}`;
    };

    const renderProduct = ({ item, index }: { item: Product, index: number }) => {
        const discountPercentage = calculateDiscount(item.price, item.originalPrice);
        
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
                        <Image source={{ uri: item.image }} style={styles.productImage} />                        {discountPercentage && (
                            <View style={styles.discountTag}>
                                <Text style={styles.discountText}>{discountPercentage}% OFF</Text>
                            </View>
                        )}
                    </View>
                    <View style={styles.productInfo}>
                        <Text numberOfLines={2} style={[styles.productName, TYPOGRAPHY_STYLES.h4]}>{item.name}</Text>
                        <Text numberOfLines={1} style={[styles.description, TYPOGRAPHY_STYLES.body2]}>{item.description}</Text>
                        <View style={styles.priceContainer}>
                            <Text style={[styles.price, TYPOGRAPHY_STYLES.price]}>{formatPrice(item.price)}</Text>
                            {item.originalPrice && (
                                <Text style={[styles.msrp, TYPOGRAPHY_STYLES.body3]}>{formatPrice(item.originalPrice)}</Text>
                            )}
                        </View>
                        <View style={styles.vendorContainer}>
                            <Icon name="store" type="material" size={14} color={theme.primary} />
                            <Text style={[styles.vendorName, TYPOGRAPHY_STYLES.body3]}>{item.vendor.name}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </Animated.View>
        );
    };    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={theme.background} />
            <Header
                leftIcon='arrow-left'
              
                
                leftIconType='feather'
                rightIconType='feather'
                title=""
                containerStyle={commonStyles.headerContainer}
                onLeftPress={() =>{
                    navigation.goBack();
                }}
                onRightPress={handleNotificationPress}
                onRightIcon2Press={handleCartPress}
            />
            <FlatList
                data={FEATURED_PRODUCTS}
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
    vendorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: hp(1),
    },
    vendorName: {
        marginLeft: wp(1),
        color: theme.primary,
    },
});


