

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
import theme from '../../assets/theme';

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
            onPress={() => navigation.navigate('ProductDetails', { product: item })}
        >
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.name}</Text>
                <View style={styles.priceContainer}>
                    <Text style={styles.price}>{item.price}</Text>
                    <Text style={styles.msrp}>{item.msrp}</Text>
                </View>
                {item.sizes && <Text style={styles.sizes}>{item.sizes}</Text>}
                {item.brand && <Text style={styles.brand}>{item.brand}</Text>}
                <View style={styles.ratingContainer}>
                    <Text style={styles.rating}>★ {item.rating}</Text>
                    <Text style={styles.minOrder}>{item.minOrder}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={products}
                renderItem={renderProduct}
                keyExtractor={item => item.id}
                numColumns={2}
                contentContainerStyle={styles.productList}
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
    productList: {
        padding: wp(2),
    },
    productCard: {
        flex: 1,
        margin: wp(2),
                backgroundColor: theme.background,
        borderRadius: 8,
        overflow: 'hidden',
    },
    productImage: {
        width: '100%',
        height: hp(15),
        resizeMode: 'cover',
    },
    productInfo: {
        padding: wp(2),
    },
    productName: {
        fontSize: wp(3.5),
        fontWeight: '500',
        marginBottom: hp(0.5),
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp(0.5),
    },
    price: {
        fontSize: wp(3.8),
        fontWeight: '600',
        marginRight: wp(2),
    },
    msrp: {
        fontSize: wp(3.2),
        textDecorationLine: 'line-through',
    },
    sizes: {
        fontSize: wp(3.2),
        marginBottom: hp(0.5),
    },
    brand: {
        fontSize: wp(3.2),
        marginBottom: hp(0.5),
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    rating: {
        fontSize: wp(3.2),
    },
    minOrder: {
        fontSize: wp(3.2),
    },
});


