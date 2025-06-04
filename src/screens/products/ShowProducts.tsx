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

const ShowProducts = ({ route, navigation }: any) => {

    // Sample product data based on the image you provided
    const products = [
        {
            id: '1',
            name: 'White Chewy Vuiton Dog Bowl',
            price: 'A$13.89',
            msrp: 'A$30.95',
            image: 'https://media.istockphoto.com/id/1778918997/photo/background-of-a-large-group-of-assorted-capsules-pills-and-blisters.jpg?s=612x612&w=0&k=20&c=G6aeWKN1kHyaTxiNdToVW8_xGY0hcenWYIjjG_xwF_Q=',
            sizes: '3 sizes',
            rating: 5.0,
            minOrder: 'A$116 min'
        },
        {
            id: '2',
            name: 'Recycled Ocean Plastic Dog Bowl',
            price: 'A$15.59',
            msrp: 'A$31.15',
            image: 'https://media.istockphoto.com/id/1778918997/photo/background-of-a-large-group-of-assorted-capsules-pills-and-blisters.jpg?s=612x612&w=0&k=20&c=G6aeWKN1kHyaTxiNdToVW8_xGY0hcenWYIjjG_xwF_Q=',
            brand: 'Ochien',
            rating: 5.0,
            minOrder: 'A$98 min'
        },
    ];

    const renderProduct = ({ item, index }: any) => (
        <Animated.View
            entering={FadeInDown.delay(index * 100).springify()}
        >
            <TouchableOpacity
                style={styles.productCard}
                activeOpacity={0.7}
                onPress={() => navigation.navigate('ProductDetails', { product: item })}
            >
                <View style={styles.imageContainer}>
                    <Image source={{ uri: item.image }} style={styles.productImage} />
                    {/* <View style={styles.discountTag}>
                        <Text style={[styles.discountText, TYPOGRAPHY_STYLES.discount]}>50% OFF</Text>
                    </View> */}
                </View>
                <View style={styles.productInfo}>
                    <Text numberOfLines={2} style={[styles.productName, TYPOGRAPHY_STYLES.h4]}>{item.name}</Text>
                    <View style={styles.priceContainer}>
                        <Text style={[styles.price, TYPOGRAPHY_STYLES.price]}>{item.price}</Text>
                        <Text style={[styles.msrp, TYPOGRAPHY_STYLES.body3]}>{item.msrp}</Text>
                    </View>
                    {item.sizes && <Text style={[styles.sizes, TYPOGRAPHY_STYLES.body2]}>{item.sizes}</Text>}
                    {item.brand && <Text style={[styles.brand, TYPOGRAPHY_STYLES.body2]}>{item.brand}</Text>}
                    <View style={styles.ratingContainer}>
                        <View style={styles.ratingBox}>
                            <Icon name="star" type="feather" size={14} color={theme.warning} />
                            <Text style={styles.rating}>{item.rating}</Text>
                        </View>
                        <Text style={[styles.minOrder, TYPOGRAPHY_STYLES.body2]}>{item.minOrder}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={theme.background} />
            <Animated.View 
                entering={FadeInDown.duration(500)}
                style={styles.header}
            >
                <TouchableOpacity 
                    style={styles.iconButton}
                    onPress={() => navigation.goBack()}
                >
                    <View style={styles.iconBackground}>
                        <Icon name="arrow-left" type="feather" size={22} color={theme.text} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                    <View style={styles.iconBackground}>
                        <Icon name="sliders" type="feather" size={22} color={theme.text} />
                    </View>
                </TouchableOpacity>
            </Animated.View>
            <FlatList
                data={products}
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
    },
    discountText: {
        color: theme.surface,
    },
    productInfo: {
        padding: wp(3),
    },
    productName: {
        marginBottom: hp(1),
        height: hp(4),
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
    sizes: {
        marginBottom: hp(0.5),
    },
    brand: {
        marginBottom: hp(0.5),
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: hp(1),
    },
    ratingBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: `${theme.warning}10`,
        paddingHorizontal: wp(2),
        paddingVertical: wp(1),
        borderRadius: 6,
    },
    rating: {
        marginLeft: 4,
        fontSize: wp(3.2),
        color: theme.warning,
        fontWeight: '600',
    },
    minOrder: {
        fontSize: wp(3),
    },
});


