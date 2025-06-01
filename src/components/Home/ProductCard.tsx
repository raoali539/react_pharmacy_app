





import React, { useCallback, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform, Animated, AccessibilityRole } from 'react-native';
import { Icon } from '@rneui/base';
import theme from '../../assets/theme';
import { widthPercentageToDP as wp ,heightPercentageToDP as hp } from '../../utils/globalFunctions';

interface ProductCardProps {
  item: {
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    image: any;
  };
  showDiscount?: boolean;
  onPress?: () => void;
  onAddToCart?: () => void;
  style?: any;
  index?: number;
}

const ProductCard: React.FC<ProductCardProps> = React.memo(({
  item,
  showDiscount = false,
  onPress,
  onAddToCart,
  style,
  index = 0,
}) => {
  const scaleAnim = useMemo(() => new Animated.Value(1), []);
  const animatedValue = useMemo(() => new Animated.Value(0), []);

  useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: 1,
      delay: index * 100,
      useNativeDriver: true,
      tension: 50,
      friction: 7,
    }).start();
  }, [animatedValue, index]);

  const handlePressIn = useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
      tension: 40,
      friction: 3,
    }).start();
  }, [scaleAnim]);

  const handlePressOut = useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 40,
      friction: 3,
    }).start();
  }, [scaleAnim]);

  const discount = useMemo(() => 
    item.originalPrice 
      ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
      : 0
  , [item.originalPrice, item.price]);

  const animatedStyle = useMemo(() => ({
    transform: [
      { 
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [50, 0],
        }),
      },
      { scale: scaleAnim },
    ],
    opacity: animatedValue,
  }), [animatedValue, scaleAnim]);

  const accessibilityLabel = useMemo(() => {
    let label = `${item.name}, ${item.description}. Price: ${item.price.toFixed(2)} rupees`;
    if (showDiscount && discount > 0) {
      label += `. ${discount}% off, Original price: ${item.originalPrice?.toFixed(2)} rupees`;
    }
    return label;
  }, [item, showDiscount, discount]);

  return (
    <Animated.View style={[styles.container, animatedStyle, style]}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.card}
        accessible={true}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        accessibilityHint="Double tap to view product details"
      >
        <View style={styles.imageContainer}>
          <Image
            source={item.image}
            style={styles.image}
            resizeMode="contain"
            accessible={true}
            accessibilityRole="image"
            accessibilityLabel={`Image of ${item.name}`}
          />
          {showDiscount && discount > 0 && (
            <View 
              style={styles.discountBadge}
              accessible={true}
              accessibilityRole="text"
              accessibilityLabel={`${discount}% off`}
            >
              <Text style={styles.discountText}>{discount}% OFF</Text>
            </View>
          )}
        </View>
        <View style={styles.content}>
          <Text 
            style={styles.name} 
            numberOfLines={1}
            accessible={true}
            accessibilityRole="text"
          >
            {item.name}
          </Text>
          <Text 
            style={styles.description} 
            numberOfLines={2}
            accessible={true}
            accessibilityRole="text"
          >
            {item.description}
          </Text>
          <View style={styles.priceRow}>
            <View accessible={true} accessibilityRole="text">
              <Text style={styles.price}>Rs. {item.price.toFixed(2)}</Text>
              {showDiscount && item.originalPrice && (
                <Text style={styles.originalPrice}>Rs. {item.originalPrice.toFixed(2)}</Text>
              )}
            </View>
            <TouchableOpacity
              style={styles.addButton}
              onPress={onAddToCart}
              activeOpacity={0.8}
              accessible={true}
              accessibilityLabel={`Add ${item.name} to cart`}
              accessibilityRole="button"
              accessibilityHint="Double tap to add item to shopping cart"
            >
              <Icon name="plus" type="feather" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.item.price === nextProps.item.price &&
    prevProps.showDiscount === nextProps.showDiscount &&
    prevProps.index === nextProps.index
  );
});

const styles = StyleSheet.create({
  container: {
    width: wp(50),
    marginRight: wp(4),
    backgroundColor:theme.background
  },
  card: {
        backgroundColor: theme.background,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.border,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  imageContainer: {
    width: '100%',
    height: wp(30),
    backgroundColor: '#f9f9f9',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: theme.background,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  discountText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  content: {
    padding: wp(3),
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
    height: 32,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.active,
  },
  originalPrice: {
    fontSize: 12,
    color: '#666',
    textDecorationLine: 'line-through',
  },
  addButton: {
    backgroundColor: theme.background,
    borderRadius: 20,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductCard;
