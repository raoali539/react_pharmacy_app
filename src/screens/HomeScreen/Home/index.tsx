







import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  RefreshControl,
  Platform,
  AccessibilityInfo,
} from 'react-native';

import { Text } from 'react-native-gesture-handler';
import { useCart } from '../../../contexts/CartContext';
import ProductCard from '../../../components/Home/ProductCard';
import Header from '../../../common/Header';
import theme from '../../../assets/theme';
import SectionHeader from '../../../common/SectionHeader';
import EssentialsBanner from '../../../components/Home/EssentialsBanner';
import Categories from '../../../components/Home/Categories';
import VirtualizedHorizontalList from '../../../common/VirtualizedHorizontalList';
import { heightPercentageToDP as hp ,widthPercentageToDP as wp } from '../../../utils/globalFunctions';

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

const FEATURED_PRODUCTS: Product[] = [
  {
    id: "1",
    name: 'Panadol Extra',
    description: 'Paracetamol & Caffeine Tablets',
    price: 150.00,
    originalPrice: 180.00,
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
    vendor: {
      id: "v2",
      name: "Health Plus"
    }
  }
];

const Home = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const { state: cartState, dispatch } = useCart();
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Announce screen load to screen readers
    AccessibilityInfo.announceForAccessibility('Home screen loaded');
    fetchData();
  }, []);

  const fetchData = useCallback(async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsLoading(false);
      setIsRefreshing(false);
      AccessibilityInfo.announceForAccessibility('Content loaded successfully');
    } catch (error) {
      console.error('Error fetching data:', error);
      AccessibilityInfo.announceForAccessibility('Error loading content');
    }
  }, []);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    fetchData();
  }, [fetchData]);

  const handleViewAll = () => {
    navigation.navigate('Browse'); // Navigate to Browse screen
  };

  const handleAddToCart = useCallback((item: Product) => {
    const cartItem = {
      id: Date.now().toString(),
      productId: item.id.toString(),
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image || '',
      vendorName: 'Default Vendor', // Update this with actual vendor info if available
    };
    dispatch({
      type: 'ADD_ITEM',
      payload: cartItem,
    });
    navigation.navigate('Cart');
  }, [navigation, dispatch]);

  const renderProduct = useCallback(({ item, index }: { item: Product; index: number }) => (
    <ProductCard
      item={item}
      index={index}
      showDiscount={item.originalPrice != null}
      onPress={() => navigation.navigate('ProductDetails', { product: item })}
      onAddToCart={() => handleAddToCart(item)}
      style={index === 0 ? styles.firstProduct : undefined}
    />
  ), [navigation, handleAddToCart]);

  const keyExtractor = useCallback((item: Product) => item.id.toString(), []);

  const handleNotificationPress = () => {
    // navigation.navigate(routeNames.Notifications);
  };

  const handleCartPress = () => {
    navigation.navigate('Cart');
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        {/* <HomeSkeleton /> */}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <Header
        onMenuPress={() => console.log('Menu pressed')}
        onNotificationPress={handleNotificationPress}
        onCartPress={handleCartPress}
      />
      <View>
        <Text style={{ fontSize: 24, fontWeight: 'bold', paddingHorizontal:16 }}>
          Welcome Ali
        </Text>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor={theme.active}
            colors={[theme.active]}
          />
        }
      >
        {/* <View style={styles.searchContainer}>
          <SearchBar
            onSearch={setSearchQuery}
            onFocus={() => console.log('Search focused')}
            onBlur={() => console.log('Search blurred')}
          />
        </View> */}

        <Categories onSelectCategory={(category) => console.log('Selected:', category)} />
        
        {/* <Promotions onPromotionPress={(promo) => console.log('Promotion:', promo)} /> */}
        
        <View style={styles.bannerContainer}>
          <EssentialsBanner />
        </View>

        <View style={styles.section}>
          <SectionHeader 
            title="All Products" 
            onViewAll={handleViewAll}
          />
          <VirtualizedHorizontalList
            data={FEATURED_PRODUCTS}
            renderItem={renderProduct}
            keyExtractor={keyExtractor}
            itemWidth={wp(44)} // width + margin
            contentContainerStyle={styles.productList}
          />
        </View>

        {/* <View style={styles.section}>
          <SectionHeader 
            title="Trending Now" 
            onViewAll={() => console.log('View all trending')}
          />
          <VirtualizedHorizontalList
            data={TRENDING_PRODUCTS}
            renderItem={renderProduct}
            keyExtractor={keyExtractor}
            itemWidth={wp(44)}
            containerStyle={styles.productList}
          />
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingBottom: hp(2),
  },
  searchContainer: {
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
    zIndex: 1,
  },
  bannerContainer: {
    marginVertical: hp(2),
    backgroundColor:'#F2F2F2'
  },
  section: {
    marginTop: hp(3),
  },
  productList: {
    paddingBottom: hp(2),
  },
  firstProduct: {
    marginLeft: 0,
  },
});

export default Home;