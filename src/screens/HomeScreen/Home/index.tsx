import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  RefreshControl,
  Platform,
  AccessibilityInfo,
  TextInput,
  Dimensions,
  Image,
} from 'react-native';
import { Text } from 'react-native-gesture-handler';
import { useCart } from '../../../contexts/CartContext';
import ProductCard from '../../../components/Home/ProductCard';
import Header from '../../../common/Header';
import theme from '../../../assets/theme';
import SectionHeader from '../../../common/SectionHeader';
import EssentialsBanner from '../../../components/Home/EssentialsBanner';
import { VirtualizedHorizontalList } from '../../../common/VirtualizedHorizontalList';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../../utils/globalFunctions';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Icon } from '@rneui/base';
import { commonStyles } from '../../../assets/commonStyles';
import { TYPOGRAPHY_STYLES } from '../../../assets/theme';
import Categories from '../../../components/Home/Categories';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getAllProducts } from '../../../redux/slices/productSlice';
import { fetchCategories } from '../../../redux/slices/categorySlice';

// Define a local product interface for the component
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  vendor: {
    id: string;
    name: string;
  };
}

const Home = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const { state: cartState, dispatch: cartDispatch } = useCart();
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Redux
  const dispatch = useAppDispatch();
  const { products: apiProducts, isLoading: productsLoading, error: productsError } = useAppSelector(state => state.products);
  console.log('Products from Redux:', apiProducts);


  useEffect(() => {
    AccessibilityInfo.announceForAccessibility('Home screen loaded');
    fetchData();
    dispatch(fetchCategories());
  }, []);


  const fetchData = useCallback(async () => {
    try {
      // Dispatch the getAllProducts action
      const resp = await dispatch(getAllProducts());
      console.log('Fetched products:', resp);
      setIsLoading(false);
      setIsRefreshing(false);
      AccessibilityInfo.announceForAccessibility('Content loaded successfully');
    } catch (error) {
      console.error('Error fetching data:', error);
      AccessibilityInfo.announceForAccessibility('Error loading content');
    }
  }, [dispatch]);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    fetchData();
  }, [fetchData]);

  const handleViewAll = () => {
    navigation.navigate('ShowProducts', {
      title: 'All Products',
      products: apiProducts,
    });
  };

  const handleAddToCart = useCallback((item: any) => {
    const cartItem = {
      id: Date.now().toString(),
      productId: item._id,
      name: item?.name,
      price: item?.price,
      quantity: 1,
      image: item.imageUrl[0] || '',
      vendorName: item?.vendor?.name || 'Default Vendor',
    };
    cartDispatch({
      type: 'ADD_ITEM',
      payload: cartItem,
    });
    navigation.navigate('Cart');
  }, [navigation, cartDispatch]);

  const renderProduct = useCallback(({ item, index }: { item: any; index: number }) => (
    <ProductCard
      item={item}
      index={index}
      showDiscount={item.originalPrice != null}
      onPress={() => navigation.navigate('ProductDetails', { product: item })}
      onAddToCart={() => handleAddToCart(item)}
      style={index === 0 ? styles.firstProduct : undefined}
    />
  ), [navigation, handleAddToCart]);

  const keyExtractor = useCallback((item: any) => item._id, []);

  const handleNotificationPress = () => {
    navigation.navigate('Notifications');
  };

  const handleCartPress = () => {
    navigation.navigate('Cart');
  };

  // Use the loading state from Redux or the local state
  if (isLoading || productsLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.background} />
      <Header
        CustomLeftComponent={() => (
          <Image
            source={require('../../../assets/images/lo.jpeg')}
            style={styles.headerLogo}
            resizeMode="contain"
          />
        )}
        rightIcon='notifications'
        rightIcon2='shopping-cart'
        rightIconType='feather'
        title=""
        style={styles.elevation}
        containerStyle={commonStyles.headerContainer}
        onRightPress={handleNotificationPress}
        onRightIcon2Press={handleCartPress}
      />

      <Animated.View
        entering={FadeInDown.duration(600).delay(200) as any}
        style={styles.welcomeSection}
      >
        <View style={styles.welcomeContent}>
          <Text style={styles.welcomeText}>
            <Text style={styles.nameText}>Welcome Ali</Text>
          </Text>
          <Text style={styles.subtitleText}>
            Find your products here
          </Text>
        </View>
      </Animated.View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor={theme.primary}
            colors={[theme.primary]}
          />
        }
      >

        <Categories onSelectCategory={(category) => console.log(category)} />

        <View style={styles.section}>
          <SectionHeader
            title="All Products"
            onViewAll={handleViewAll}
          />
          <View style={{
            width: Dimensions.get('window').width,
            // marginHorizontal: wp(2),
          }}>
            <VirtualizedHorizontalList
              data={apiProducts}
              renderItem={renderProduct}
              keyExtractor={keyExtractor}
              showsHorizontalScrollIndicator={false}
              itemWidth={wp(43)}
              contentContainerStyle={styles.productList}
            />
          </View>
        </View>

        <View style={styles.section}>
          <SectionHeader
            title="Top Rated "
            onViewAll={handleViewAll}
          />
          <View style={{
            width: Dimensions.get('window').width,
            marginHorizontal: wp(2),
          }}>
            <VirtualizedHorizontalList
              data={apiProducts}
              renderItem={renderProduct}
              keyExtractor={keyExtractor}
              showsHorizontalScrollIndicator={false}
              itemWidth={wp(43)}
              contentContainerStyle={styles.productList}
            />
          </View>
        </View>

        <View style={styles.bannerContainer}>
          <EssentialsBanner />
        </View>

        <View style={styles.section}>
          <SectionHeader
            title="Low Stock "
            onViewAll={handleViewAll}
          />
          <View style={{
            width: Dimensions.get('window').width,
          }}>
            <VirtualizedHorizontalList
              data={apiProducts}
              renderItem={renderProduct}
              keyExtractor={keyExtractor}
              showsHorizontalScrollIndicator={false}
              itemWidth={wp(43)}
              contentContainerStyle={styles.productList}
            />
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
    paddingBottom: Platform.OS === 'android' ? hp(3) : 0,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: hp(2),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.surface,
    marginHorizontal: 0,
    borderRadius: theme.borderRadius.xl,
    paddingHorizontal: wp(4),
    height: hp(6),
    marginTop: hp(2),
    ...theme.shadows.base,
  },
  searchIcon: {
    marginRight: wp(2),
    color: '#5A5A5A'
  },
  searchInput: {
    flex: 1,
    height: '100%',
    color: theme.text,
    padding: 0,
    ...TYPOGRAPHY_STYLES.body1,
  },
  bannerContainer: {
    marginBottom: hp(4),

    backgroundColor: theme.background,
  },
  section: {
    // marginTop: hp(3),
  },
  productList: {
    paddingBottom: hp(4),
    // paddingHorizontal: wp(1),
  },
  headerLogo: {
    width: wp(20),
    height: hp(4),
  },
  headerSection: {
    width: '100%',
    position: 'relative',
  },
  firstProduct: {
    marginLeft: 0,
  },
  welcomeSection: {
    marginHorizontal: wp(4),
    marginTop: hp(2),
    marginBottom: hp(2),
  },
  welcomeContent: {
    marginBottom: hp(2),
  },
  welcomeText: {
    ...TYPOGRAPHY_STYLES.body1,
    marginBottom: 4,
    color: '#5A5A5A'
  },
  nameText: {
    ...TYPOGRAPHY_STYLES.h2,
    color: '#5A5A5A',
    // italic fontStyle: 'italic',
    fontWeight: '600',
    fontSize: wp(5.2),
    lineHeight: wp(6.5),
    marginBottom: 2,

  },
  subtitleText: {
    ...TYPOGRAPHY_STYLES.body2,
    color: '#5A5A5A',
  },
  elevation: {
    ...Platform.select({
      ios: theme.shadows.base,
      android: {
        elevation: 4
      }
    })
  },
});

export default Home;