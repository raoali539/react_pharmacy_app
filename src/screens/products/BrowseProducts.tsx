

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    SafeAreaView,
    StatusBar,
    Image,
} from 'react-native';
import { Icon } from '@rneui/base';
import theme from '../../assets/theme';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../utils/globalFunctions';
import { useNavigation } from '@react-navigation/native';

const BrowseProducts = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = React.useState('');

    const handleCategoryPress = (category: string) => {
        // navigation.navigate('ShowProducts', { category });
    };

    const renderCategoryCard = (title: string, image: string) => (
        <TouchableOpacity
            style={styles.categoryCard}
            onPress={() => handleCategoryPress(title)}
        >
            <Image source={{ uri: image }} style={styles.categoryImage} />
            <Text style={styles.categoryTitle}>{title}</Text>
        </TouchableOpacity>
    );

    const renderForYouSection = (title: string, image: string) => (
        <TouchableOpacity
            style={styles.forYouCard}
            onPress={() => handleCategoryPress(title)}
        >
            <Image source={{ uri: image }} style={styles.forYouImage} />
            <Text style={styles.forYouTitle}>{title}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={theme.background} />
            <View style={styles.header}>
                <View style={styles.searchContainer}>
                    <Icon name="search" type="feather" size={20} style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Categories Banner */}
                <View style={styles.categoriesBanner}>
                    <Text style={styles.sectionTitle}>Categories</Text>
                    <Image
                        source={{ uri: 'https://media.istockphoto.com/id/1778918997/photo/background-of-a-large-group-of-assorted-capsules-pills-and-blisters.jpg?s=612x612&w=0&k=20&c=G6aeWKN1kHyaTxiNdToVW8_xGY0hcenWYIjjG_xwF_Q=' }}
                        style={styles.bannerImage}
                    />
                </View>

                {/* Quick Category Cards */}
                <View style={styles.quickCategories}>
                    <TouchableOpacity style={styles.quickCategoryCard}>
                        <Text style={styles.quickCategoryTitle}>Bestsellers</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.quickCategoryCard}>
                        <Text style={styles.quickCategoryTitle}>Sale</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.quickCategoryCard}>
                        <Text style={styles.quickCategoryTitle}>New Products</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.quickCategoryCard}>
                        <Text style={styles.quickCategoryTitle}>New Brands</Text>
                    </TouchableOpacity>
                </View>

                {/* For You Section */}
                <View style={styles.forYouSection}>
                    <Text style={styles.sectionTitle}>For you</Text>
                    <View style={styles.forYouGrid}>
                        {renderForYouSection('Other Pets', 'https://media.istockphoto.com/id/1778918997/photo/background-of-a-large-group-of-assorted-capsules-pills-and-blisters.jpg?s=612x612&w=0&k=20&c=G6aeWKN1kHyaTxiNdToVW8_xGY0hcenWYIjjG_xwF_Q=')}
                        {renderForYouSection('Apparel', 'https://media.istockphoto.com/id/1778918997/photo/background-of-a-large-group-of-assorted-capsules-pills-and-blisters.jpg?s=612x612&w=0&k=20&c=G6aeWKN1kHyaTxiNdToVW8_xGY0hcenWYIjjG_xwF_Q=')}
                        {renderForYouSection('Accessories', 'https://media.istockphoto.com/id/1778918997/photo/background-of-a-large-group-of-assorted-capsules-pills-and-blisters.jpg?s=612x612&w=0&k=20&c=G6aeWKN1kHyaTxiNdToVW8_xGY0hcenWYIjjG_xwF_Q=')}
                        {renderForYouSection('Kitchen & tabletop', 'https://media.istockphoto.com/id/1778918997/photo/background-of-a-large-group-of-assorted-capsules-pills-and-blisters.jpg?s=612x612&w=0&k=20&c=G6aeWKN1kHyaTxiNdToVW8_xGY0hcenWYIjjG_xwF_Q=')}
                        {renderForYouSection('Dogs', 'https://media.istockphoto.com/id/1778918997/photo/background-of-a-large-group-of-assorted-capsules-pills-and-blisters.jpg?s=612x612&w=0&k=20&c=G6aeWKN1kHyaTxiNdToVW8_xGY0hcenWYIjjG_xwF_Q=')}
                        {renderForYouSection('Home accents', 'https://media.istockphoto.com/id/1778918997/photo/background-of-a-large-group-of-assorted-capsules-pills-and-blisters.jpg?s=612x612&w=0&k=20&c=G6aeWKN1kHyaTxiNdToVW8_xGY0hcenWYIjjG_xwF_Q=')}
                    </View>
                </View>

                {/* Browse All Categories */}
                <View style={styles.browseAll}>
                    <Text style={styles.sectionTitle}>Browse all</Text>
                    <View style={styles.categoriesGrid}>
                        {renderCategoryCard('Featured', 'https://media.istockphoto.com/id/1778918997/photo/background-of-a-large-group-of-assorted-capsules-pills-and-blisters.jpg?s=612x612&w=0&k=20&c=G6aeWKN1kHyaTxiNdToVW8_xGY0hcenWYIjjG_xwF_Q=')}
                        {renderCategoryCard('New brands', 'https://media.istockphoto.com/id/1778918997/photo/background-of-a-large-group-of-assorted-capsules-pills-and-blisters.jpg?s=612x612&w=0&k=20&c=G6aeWKN1kHyaTxiNdToVW8_xGY0hcenWYIjjG_xwF_Q=')}
                        {renderCategoryCard('New products', 'https://media.istockphoto.com/id/1778918997/photo/background-of-a-large-group-of-assorted-capsules-pills-and-blisters.jpg?s=612x612&w=0&k=20&c=G6aeWKN1kHyaTxiNdToVW8_xGY0hcenWYIjjG_xwF_Q=')}
                        {renderCategoryCard('Bestsellers', 'https://media.istockphoto.com/id/1778918997/photo/background-of-a-large-group-of-assorted-capsules-pills-and-blisters.jpg?s=612x612&w=0&k=20&c=G6aeWKN1kHyaTxiNdToVW8_xGY0hcenWYIjjG_xwF_Q=')}
                        {renderCategoryCard('Gifts', 'https://media.istockphoto.com/id/1778918997/photo/background-of-a-large-group-of-assorted-capsules-pills-and-blisters.jpg?s=612x612&w=0&k=20&c=G6aeWKN1kHyaTxiNdToVW8_xGY0hcenWYIjjG_xwF_Q=')}
                        {renderCategoryCard('Pets', 'https://media.istockphoto.com/id/1778918997/photo/background-of-a-large-group-of-assorted-capsules-pills-and-blisters.jpg?s=612x612&w=0&k=20&c=G6aeWKN1kHyaTxiNdToVW8_xGY0hcenWYIjjG_xwF_Q=')}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,

    },
    header: {
        backgroundColor: theme.background,
        padding: wp(4),
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 25,
        paddingHorizontal: wp(4),
    },
    searchIcon: {
        marginRight: wp(2),
    },
    searchInput: {
        flex: 1,
        height: hp(5.5),
        fontSize: wp(3.8),
    },
    categoriesBanner: {
        padding: wp(4),
    },
    bannerImage: {
        width: '100%',
        height: hp(15),
        borderRadius: 10,
        marginTop: hp(1),
        borderWidth: 1,
        borderColor: '#ddd',
    },
    sectionTitle: {
        fontSize: wp(5),
        fontWeight: '600',
        marginBottom: hp(1),
    },
    quickCategories: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: wp(4),
        gap: wp(2),
    },
    quickCategoryCard: {
        width: '48%',
        height: hp(10),
        backgroundColor: theme.active,
        borderRadius: 10,
        padding: wp(3),
        justifyContent: 'center',
        marginBottom: wp(2),
        borderWidth: 1,
        borderColor: 'gray',
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
    },
    quickCategoryTitle: {
        fontSize: wp(3.5),
        fontWeight: '500',
        color: '#fff',
        cursor: 'pointer',
    },
    forYouSection: {
        padding: wp(4),
    },
    forYouGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: wp(2),
    },
    forYouCard: {
        width: '48%',
        marginBottom: wp(2),
    },
    forYouImage: {
        width: '100%',
        height: hp(15),
        borderRadius: 10,
    },
    forYouTitle: {
        fontSize: wp(3.5),
        marginTop: hp(1),
    },
    browseAll: {
        padding: wp(4),
    },
    categoriesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: wp(2),
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: hp(1),
        paddingBottom: hp(2),
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        backgroundColor: theme.background,
        borderRadius: 10,
        paddingHorizontal: wp(2),
    },
    categoryCard: {
        width: '48%',
        marginBottom: wp(2),
    },
    categoryImage: {
        width: '100%',
        height: hp(15),
        borderRadius: 10,
    },
    categoryTitle: {
        fontSize: wp(3.5),
        marginTop: hp(1),
    },
});

export default BrowseProducts;




