import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../utils/globalFunctions';

const ShowProducts = ({ route, navigation }: any) => {
    const { category } = route.params;

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

    const renderProduct = ({ item }: any) => (
        <TouchableOpacity
            style={styles.productCard}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('ProductDetails', { product: item })}
        >
            <View style={styles.imageContainer}>
                <Image source={{ uri: item.image }} style={styles.productImage} />
            </View>
            <View style={styles.productInfo}>
                <Text numberOfLines={2} style={styles.productName}>{item.name}</Text>
                <View style={styles.priceContainer}>
                    <Text style={styles.price}>{item.price}</Text>
                    <Text style={styles.msrp}>{item.msrp}</Text>
                </View>
                {item.sizes && <Text style={styles.sizes}>{item.sizes}</Text>}
                {item.brand && <Text style={styles.brand}>{item.brand}</Text>}
                <View style={styles.ratingContainer}>
                    <View style={styles.ratingBox}>
                        <Text style={styles.rating}>★ {item.rating}</Text>
                    </View>
                    <Text style={styles.minOrder}>{item.minOrder}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.categoryTitle}>{category}</Text>
            <FlatList
                data={products}
                renderItem={renderProduct}
                keyExtractor={item => item.id}
                numColumns={2}
                contentContainerStyle={styles.productList}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};

export default ShowProducts;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F6F8',
    },
    categoryTitle: {
        fontSize: wp(5),
        fontWeight: '700',
        padding: wp(4),
        color: '#1A1B1E',
    },
    productList: {
        padding: wp(2),
    },
    productCard: {
        flex: 1,
        margin: wp(2),
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    imageContainer: {
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        overflow: 'hidden',
    },
    productImage: {
        width: '100%',
        height: hp(18),
        resizeMode: 'cover',
    },
    productInfo: {
        padding: wp(3),
    },
    productName: {
        fontSize: wp(3.5),
        fontWeight: '600',
        marginBottom: hp(1),
        color: '#1A1B1E',
        height: hp(4),
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp(1),
    },
    price: {
        fontSize: wp(4),
        fontWeight: '700',
        marginRight: wp(2),
        color: '#2E7D32',
    },
    msrp: {
        fontSize: wp(3.2),
        textDecorationLine: 'line-through',
        color: '#9E9E9E',
    },
    sizes: {
        fontSize: wp(3.2),
        marginBottom: hp(0.5),
        color: '#616161',
    },
    brand: {
        fontSize: wp(3.2),
        marginBottom: hp(0.5),
        color: '#616161',
        fontWeight: '500',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: hp(1),
    },
    ratingBox: {
        backgroundColor: '#FFF8E1',
        paddingHorizontal: wp(2),
        paddingVertical: wp(1),
        borderRadius: 6,
    },
    rating: {
        fontSize: wp(3.2),
        color: '#FFA000',
        fontWeight: '600',
    },
    minOrder: {
        fontSize: wp(3),
        color: '#757575',
    },
});


