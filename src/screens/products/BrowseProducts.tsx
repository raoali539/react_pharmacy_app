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
    Platform,
} from 'react-native';
import { Icon } from '@rneui/base';
import theme from '../../assets/theme';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../utils/globalFunctions';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
    ShowProducts: { category: string };
};

const BrowseProducts = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [searchQuery, setSearchQuery] = React.useState('');

    const handleCategoryPress = (category: string) => {
        navigation.navigate('ShowProducts', { category });
    };

    const renderCategoryCard = (title: string, image: string) => (
        <TouchableOpacity
            style={styles.categoryCard}
            onPress={() => handleCategoryPress(title)}
        >
            <Image source={{ uri: image }} style={styles.categoryImage} />
            <View style={styles.categoryOverlay}>
                <Text style={styles.categoryTitle}>{title}</Text>
            </View>
        </TouchableOpacity>
    );

    const renderForYouSection = (title: string, image: string) => (
        <TouchableOpacity
            style={styles.forYouCard}
            onPress={() => handleCategoryPress(title)}
        >
            <Image source={{ uri: image }} style={styles.forYouImage} />
            <View style={styles.forYouOverlay}>
                <Text style={styles.forYouTitle}>{title}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={theme.background} />
            <View style={styles.header}>
                <View style={styles.searchContainer}>
                    <Icon name="search" type="feather" size={20} color={theme.textLight} style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search medicines, healthcare products..."
                        placeholderTextColor={theme.text}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                {/* Categories Banner */}
                <View style={styles.categoriesBanner}>
                    <Text style={styles.sectionTitle}>Categories</Text>
                    <View style={styles.bannerContainer}>
                        <Image
                            source={{ uri: 'https://media.istockphoto.com/id/1778918997/photo/background-of-a-large-group-of-assorted-capsules-pills-and-blisters.jpg?s=612x612&w=0&k=20&c=G6aeWKN1kHyaTxiNdToVW8_xGY0hcenWYIjjG_xwF_Q=' }}
                            style={styles.bannerImage}
                        />
                        <View style={styles.bannerOverlay} />
                    </View>
                </View>

                {/* Quick Category Cards */}
                <View style={styles.quickCategories}>
                    <TouchableOpacity style={[styles.quickCategoryCard, { backgroundColor: theme.primary }]} 
                        onPress={() => handleCategoryPress('Bestsellers')}
                    >
                        <Icon name="star" type="feather" size={20} color={theme.text} />
                        <Text style={styles.quickCategoryTitle}>Bestsellers</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.quickCategoryCard, { backgroundColor: theme.secondary }]} 
                        onPress={() => handleCategoryPress('Sale')}
                    >
                        <Icon name="tag" type="feather" size={20}color={theme.text} />
                        <Text style={styles.quickCategoryTitle}>Sale</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.quickCategoryCard, { backgroundColor: theme.accent }]} 
                        onPress={() => handleCategoryPress('New Products')}
                    >
                        <Icon name="plus-circle" type="feather" size={20}color={theme.text} />
                        <Text style={styles.quickCategoryTitle}>New Products</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.quickCategoryCard, { backgroundColor: theme.primaryDark }]} 
                        onPress={() => handleCategoryPress('New Brands')}
                    >
                        <Icon name="briefcase" type="feather" size={20}color={theme.text} />
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
    scrollView: {
        flex: 1,
    },
    header: {
        backgroundColor: theme.surface,
        padding: wp(4),
        borderBottomWidth: 1,
        borderBottomColor: theme.divider,
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
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.background,
        borderRadius: 12,
        paddingHorizontal: wp(4),
        borderWidth: 1,
        borderColor: theme.border,
    },
    searchIcon: {
        marginRight: wp(2),
    },
    searchInput: {
        flex: 1,
        height: hp(5.5),
        fontSize: wp(3.8),
        color: theme.text,
    },
    categoriesBanner: {
        padding: wp(4),
    },
    bannerContainer: {
        position: 'relative',
        borderRadius: 16,
        overflow: 'hidden',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 12,
            },
            android: {
                elevation: 8,
            },
        }),
    },
    bannerImage: {
        width: '100%',
        height: hp(20),
        borderRadius: 16,
    },
    bannerOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: hp(10),
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
    },
    sectionTitle: {
        fontSize: wp(5),
        fontWeight: '700',
        color: theme.text,
        marginBottom: hp(2),
    },
    quickCategories: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: wp(4),
        gap: wp(2),
    },
    quickCategoryCard: {
        width: '48%',
        height: hp(12),
        borderRadius: 16,
        padding: wp(3),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: wp(2),
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 8,
            },
            android: {
                elevation: 6,
            },
        }),
    },
    quickCategoryTitle: {
        fontSize: wp(3.5),
        fontWeight: '600',
        color: '#fff',
        marginTop: hp(1),
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
        borderRadius: 16,
        overflow: 'hidden',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 8,
            },
            android: {
                elevation: 6,
            },
        }),
    },
    forYouImage: {
        width: '100%',
        height: hp(20),
    },
    forYouOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: hp(10),
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'flex-end',
        padding: wp(3),
    },
    forYouTitle: {
        fontSize: wp(3.5),
        fontWeight: '600',
        color: '#FFF',
    },
    browseAll: {
        padding: wp(4),
    },
    categoriesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: wp(2),
    },
    categoryCard: {
        width: '48%',
        marginBottom: wp(2),
        borderRadius: 16,
        overflow: 'hidden',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 8,
            },
            android: {
                elevation: 6,
            },
        }),
    },
    categoryImage: {
        width: '100%',
        height: hp(20),
    },
    categoryOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: hp(10),
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'flex-end',
        padding: wp(3),
    },
    categoryTitle: {
        fontSize: wp(3.5),
        fontWeight: '600',
        color: '#FFF',
    },
});

export default BrowseProducts;




