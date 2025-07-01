import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Image, ActivityIndicator } from 'react-native';
import { Icon } from '@rneui/base';
import Animated, { FadeIn, useAnimatedStyle, withTiming, Easing, useSharedValue } from 'react-native-reanimated';
import theme from '../../../../assets/theme';
import { heightPercentageToDP as hp ,widthPercentageToDP as wp } from '../../../../utils/globalFunctions';

interface ProductCardProps {
  item: {
    _id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    imageUrl: string[];
    vendor?: {
      name: string;
    };
    stockAvailable?: boolean;
    rating?: number;
    reviews?: number;
  };
  index: number;
  showDiscount?: boolean;
  onPress: () => void;
  style?: object;
}

const CARD_WIDTH = wp(44); 
const IMAGE_HEIGHT = hp(14);
const CONTENT_HEIGHT = hp(14);

const VendorProductCard: React.FC<ProductCardProps> = ({
  item,
  showDiscount = true,
  onPress,
  style,
  index,
}: any) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  
  const imageUri = item.imageUrl?.length > 0 ? item.imageUrl[0] : '';

  const discount = item.originalPrice && item.originalPrice > item.price
    ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
    : 0;

  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withTiming(0.96, { 
      duration: 200, 
      easing: Easing.bezier(0.25, 0.1, 0.25, 1) 
    });
    opacity.value = withTiming(0.9, { duration: 200 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { 
      duration: 300, 
      easing: Easing.bezier(0.25, 0.1, 0.25, 1) 
    });
    opacity.value = withTiming(1, { duration: 300 });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon
          key={i}
          name="star"
          type="material"
          size={12}
          color="#FFD700"
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Icon
          key="half"
          name="star-half"
          type="material"
          size={12}
          color="#FFD700"
        />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Icon
          key={`empty-${i}`}
          name="star-border"
          type="material"
          size={12}
          color="#E0E0E0"
        />
      );
    }

    return stars;
  };

  return (
    <Animated.View
      entering={FadeIn.delay(index * 70).springify()}
      style={[
        styles.container,
        style,
        { marginHorizontal: wp(1.5), marginBottom: hp(2), width: CARD_WIDTH, height: IMAGE_HEIGHT + CONTENT_HEIGHT },
      ]}
    >
      <TouchableOpacity
        style={styles.card}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.93}
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
          {imageUri ? (
            <Image
              source={{ uri: imageUri }}
              style={styles.image}
              resizeMode="cover"
              onLoadEnd={() => setImageLoading(false)}
              onError={() => { setImageLoading(false); setImageError(true); }}
            />
          ) : (
            <View style={styles.errorContainer}>
              <Icon name="image-off" type="material-community" size={28} color={theme.textMuted} />
            </View>
          )}
          {imageError && (
            <View style={styles.errorContainer}>
              <Icon name="image-off" type="material-community" size={28} color={theme.textMuted} />
            </View>
          )}
          {discount > 0 && showDiscount && (
            <View style={styles.discountTag}>
              <Text style={styles.discountText}>-{discount}%</Text>
            </View>
          )}
          {item.stockAvailable !== undefined && item.stockAvailable <= 3 && (
            <View style={styles.stockBadge}>
              <Text style={styles.stockBadgeText}>Low Stock</Text>
            </View>
          )}
        </View>
        <View style={styles.content}>
          <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
          <View style={styles.footer}>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>₹{item.price}</Text>
              {showDiscount && item.originalPrice && item.originalPrice > item.price && (
                <Text style={styles.originalPrice}>₹{item.originalPrice.toFixed(2)}</Text>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    // width, marginHorizontal, marginBottom, height are set inline for 2-column grid
  },
  card: {
    backgroundColor: theme.surface,
    borderRadius: 16,
    overflow: 'hidden',
    height: '100%',
    borderWidth: 0.5,
    borderColor: '#eee',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.10,
        shadowRadius: 10,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  imageContainer: {
    width: '100%',
    height: IMAGE_HEIGHT,
    backgroundColor: '#F5F7FA',
    position: 'relative',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
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
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
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
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  discountTag: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: theme.error,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
    zIndex: 2,
  },
  discountText: {
    color: theme.background,
    fontWeight: '700',
    fontSize: 11,
  },
  stockBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: theme.warning,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
    zIndex: 2,
  },
  stockBadgeText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 10,
  },
  content: {
    padding: wp(2.5),
    height: CONTENT_HEIGHT,
    justifyContent: 'space-between',
  },
  name: {
    color: theme.text,
    marginBottom: hp(0.5),
    fontWeight: '700',
    fontSize: wp(3.7),
    lineHeight: wp(4.2),
  },
  description: {
    color: theme.textLight,
    fontSize: wp(2.8),
    lineHeight: wp(3.6),
    marginBottom: hp(0.5),
    flexWrap: 'wrap',
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingTop: hp(0.5),
    minHeight: hp(4),
  },
  priceContainer: {
    flexDirection: 'column',
    flex: 1,
    marginRight: wp(2),
  },
  price: {
    color: theme.text,
    fontWeight: '700',
    fontSize: wp(3.8),
  },
  originalPrice: {
    color: theme.textMuted,
    textDecorationLine: 'line-through',
    fontSize: wp(2.7),
    marginTop: 1,
  },
});

export default VendorProductCard;