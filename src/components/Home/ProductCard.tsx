import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Image, ActivityIndicator } from 'react-native';
import { Icon } from '@rneui/base';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../utils/globalFunctions';
import theme, { TYPOGRAPHY_STYLES } from '../../assets/theme';
import Animated, { FadeIn, useAnimatedStyle, withSpring, useSharedValue, withTiming, Easing } from 'react-native-reanimated';

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

const CARD_WIDTH = wp(43);
const IMAGE_HEIGHT = hp(16);
const CONTENT_HEIGHT = hp(13);

const ProductCard: React.FC<ProductCardProps> = ({
  item,
  showDiscount = true,
  onPress,
  onAddToCart,
  style,
  index,
}) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  
  // Calculate discount percentage if original price exists
  const discount = item.originalPrice && item.originalPrice > item.price
    ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
    : 0;

  // Animation values
  const scale = useSharedValue(1);
  
  // Handle press animation
  const handlePressIn = () => {
    scale.value = withTiming(0.97, { duration: 150, easing: Easing.bezier(0.25, 0.1, 0.25, 1) });
  };
  
  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 200, easing: Easing.bezier(0.25, 0.1, 0.25, 1) });
  };

  // Animated styles
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }]
    };
  });

  return (
    <Animated.View 
      entering={FadeIn.delay(index * 70).springify()}
      style={[styles.container, style, animatedStyle]}
    >
      <TouchableOpacity
        style={styles.card}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.95}
        accessible={true}
        accessibilityLabel={`${item.name} ${item.description}`}
        accessibilityHint="Double tap to view product details"
      >
        <View style={styles.imageContainer}>
          {imageLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color={theme.primary} />
            </View>
          )}
          
          <Image
            source={{ uri: item.image }}
            style={styles.image}
            resizeMode="cover"
            onLoadStart={() => setImageLoading(true)}
            onLoadEnd={() => setImageLoading(false)}
            onError={() => {
              setImageLoading(false);
              setImageError(true);
            }}
          />
          
          {imageError && (
            <View style={styles.errorContainer}>
              <Icon name="image-off" type="material-community" size={24} color={theme.textMuted} />
            </View>
          )}
          
          {discount > 0 && showDiscount && (
            <View style={styles.discountTag}>
              <Text style={styles.discountText}>-{discount}%</Text>
            </View>
          )}
        </View>

        <View style={styles.content}>
          <View style={styles.textContainer}>
            <Text style={styles.vendor}>{item.vendor.name}</Text>
            <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
            <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
          </View>
          
          <View style={styles.footer}>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>₹{item.price.toFixed(2)}</Text>
              {showDiscount && item.originalPrice && item.originalPrice > item.price && (
                <Text style={styles.originalPrice}>₹{item.originalPrice.toFixed(2)}</Text>
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
              <Icon name="plus" type="feather" size={18} color={theme.background} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    marginHorizontal: wp(1.5),
    marginBottom: hp(2),
    height: IMAGE_HEIGHT + CONTENT_HEIGHT,
  },
  card: {
    backgroundColor: theme.surface,
    borderRadius: 12,
    overflow: 'hidden',
    height: '100%',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  imageContainer: {
    width: '100%',
    height: IMAGE_HEIGHT,
    backgroundColor: '#F5F7FA',
    position: 'relative',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  errorContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 245, 245, 0.8)',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  discountTag: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: theme.error,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
  },
  discountText: {
    color: theme.background,
    fontWeight: '700',
    fontSize: 10,
  },
  content: {
    padding: 10,
    height: CONTENT_HEIGHT,
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
  },
  vendor: {
    color: theme.textMuted,
    marginBottom: 2,
    fontSize: 10,
    fontWeight: '500',
  },
  name: {
    color: theme.text,
    marginBottom: 4,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
  },
  description: {
    color: theme.textLight,
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  priceContainer: {
    flexDirection: 'column',
  },
  price: {
    color: theme.text,
    fontWeight: '700',
    fontSize: 15,
  },
  originalPrice: {
    color: theme.textMuted,
    textDecorationLine: 'line-through',
    fontSize: 11,
    marginTop: 1,
  },
  addButton: {
    backgroundColor: theme.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: theme.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
});

export default ProductCard;
