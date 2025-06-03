import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Image } from 'react-native';
import { Icon } from '@rneui/base';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../utils/globalFunctions';
import theme, { TYPOGRAPHY_STYLES } from '../../assets/theme';
import Animated, { FadeIn, useAnimatedStyle, withSpring } from 'react-native-reanimated';

interface ProductCardProps {
  item: {
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    image: string;
    vendor: {
      name: string;
    };
  };
  index: number;
  showDiscount?: boolean;
  onPress: () => void;
  onAddToCart: () => void;
  style?: object;
}

const ProductCard: React.FC<ProductCardProps> = ({
  item,
  showDiscount,
  onPress,
  onAddToCart,
  style,
}) => {
  const discount = item.originalPrice 
    ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
    : 0;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{
        scale: withSpring(1)
      }]
    };
  });

  return (
    <Animated.View 
      entering={FadeIn.delay(200).springify()}
      style={[styles.container, style, animatedStyle]}
    >
      <TouchableOpacity
        style={styles.card}
        onPress={onPress}
        activeOpacity={0.9}
        accessible={true}
        accessibilityLabel={`${item.name} ${item.description}`}
        accessibilityHint="Double tap to view product details"
      >
        <View style={styles.imageContainer}>
          {/* <Image
            source={item.image ? { uri: item.image } : require('../../assets/images/placeholder.png')}
            style={styles.image}
            resizeMode="cover"
          /> */}
          {/* {showDiscount && (
            <View style={styles.discountTag}>
              <Text style={[styles.discountText, TYPOGRAPHY_STYLES.discount]}>{discount}% OFF</Text>
            </View>
          )} */}
        </View>
        
        <View style={styles.content}>
          <Text style={[styles.vendor, TYPOGRAPHY_STYLES.label2]}>{item.vendor.name}</Text>
          <Text style={[styles.name, TYPOGRAPHY_STYLES.h4]} numberOfLines={1}>{item.name}</Text>
          <Text style={[styles.description, TYPOGRAPHY_STYLES.body2]} numberOfLines={2}>{item.description}</Text>
          
          <View style={styles.footer}>
            <View>
              <Text style={[styles.price, TYPOGRAPHY_STYLES.price]}>₹{item.price.toFixed(2)}</Text>
              {showDiscount && (
                <Text style={[styles.originalPrice, TYPOGRAPHY_STYLES.body3]}>₹{item.originalPrice?.toFixed(2)}</Text>
              )}
            </View>
            
            <TouchableOpacity
              style={styles.addButton}
              onPress={onAddToCart}
              activeOpacity={0.7}
              accessible={true}
              accessibilityLabel={`Add ${item.name} to cart`}
              accessibilityHint="Double tap to add this item to your shopping cart"
            >
              <Icon name="plus" type="feather" size={20} color={theme.text} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp(42),
    marginHorizontal: wp(1),
    marginBottom: hp(1.5),
  },
  card: {
    backgroundColor: theme.card,
    borderRadius: 16,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: theme.primary,
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
    width: '100%',
    height: wp(42),
    backgroundColor: theme.primaryLight,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  discountTag: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: theme.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  discountText: {
    color: theme.white,
  },
  content: {
    padding: 12,
  },
  vendor: {
    color: theme.textSecondary,
    marginBottom: 4,
  },
  name: {
    color: theme.text,
    marginBottom: 4,
  },
  description: {
    color: theme.textSecondary,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 4,
  },
  price: {
    color: theme.text,
  },
  originalPrice: {
    color: theme.textSecondary,
    textDecorationLine: 'line-through',
    marginTop: 2,
  },
  addButton: {
    backgroundColor: 'white',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: theme.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
});

export default ProductCard;
