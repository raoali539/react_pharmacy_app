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
  TextInput,
  Dimensions,
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
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../../utils/globalFunctions';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Icon } from '@rneui/base';
import { commonStyles } from '../../../assets/commonStyles';
import { TYPOGRAPHY_STYLES } from '../../../assets/theme';

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
    navigation.navigate('ShowProducts'); // Navigate to Browse screen
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
    navigation.navigate('Notifications');
  };

  const handleCartPress = () => {
    navigation.navigate('Cart');
  };

  if (isLoading) {
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
        leftIcon='menu'
        rightIcon='notifications'
        rightIcon2='shopping-cart'
        leftIconType='feather'
        rightIconType='feather'
        title=""
        style={styles.elevation}
        containerStyle={commonStyles.headerContainer}
        onLeftPress={() => console.log('Menu pressed')}
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
            Find your medicines and health products
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
        {/* <Categories onSelectCategory={(category) => console.log('Selected:', category)} /> */}
        {/* <View style={styles.bannerContainer}>
          <EssentialsBanner />
        </View> */}

        <View style={styles.section}>
          <SectionHeader
            title="All Products"
            onViewAll={handleViewAll}
          />
          <View style={{
            width:Dimensions.get('window').width - wp(12), // full width minus horizontal padding
            marginHorizontal: wp(6),
          }}>
          <VirtualizedHorizontalList
            data={FEATURED_PRODUCTS}
            renderItem={renderProduct}
            keyExtractor={keyExtractor}
            showsHorizontalScrollIndicator={false}
            itemWidth={wp(44)} // width + margin
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
    color:'#5A5A5A'
  },
  searchInput: {
    flex: 1,
    height: '100%',
    color: theme.text,
    padding: 0,
    ...TYPOGRAPHY_STYLES.body1,
  },
  bannerContainer: {
    marginVertical: hp(2),
    backgroundColor: theme.background,
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
    color:'#5A5A5A'
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