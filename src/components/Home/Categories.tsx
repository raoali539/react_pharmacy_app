import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, ScrollView, Image, ActivityIndicator } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../utils/globalFunctions';
import theme from '../../assets/theme';
import Animated, { FadeInDown, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchCategories } from '../../redux/slices/categorySlice';

interface CategoriesProps {
  onSelectCategory: (category: string) => void;
}

const CategoryCard = ({ category, index, onPress }: any) => {
  const [isPressed, setIsPressed] = useState(false);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withSpring(isPressed ? 0.95 : 1, {
            damping: 10,
            stiffness: 100,
          }),
        },
      ],
    };
  });

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100).springify()}
      style={animatedStyle}
    >
      <TouchableOpacity
        style={styles.categoryCard}
        onPress={() => {
          setIsPressed(true);
          onPress(category.name);
          setTimeout(() => setIsPressed(false), 200);
        }}
        activeOpacity={0.9}
      >
        <View style={[styles.imageContainer, { backgroundColor: `${theme.primary}10` }]}>
          <Image
            source={{ uri: category.image }}
            style={styles.categoryImage}
            resizeMode="cover"
          />
        </View>
        <Text style={styles.categoryName}>{category.name}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const Categories: React.FC<CategoriesProps> = ({ onSelectCategory }) => {
  const dispatch = useAppDispatch();
  const { categories, loading, error } = useAppSelector((state) => state.categories);
  console.log('Categories:', categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.errorContainer]}>
        <Text style={styles.errorText}>Error loading categories</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories?.map((category, index) => (
          <CategoryCard
            key={category?._id}
            category={category}
            index={index}
            onPress={onSelectCategory}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: hp(2),
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: theme.text,
    marginBottom: hp(2.5),
    paddingHorizontal: wp(4),
    letterSpacing: 0.5,
  },
  scrollContent: {
    paddingHorizontal: wp(4),
    flexDirection: 'row',
    gap: wp(2),
  },
  categoryCard: {
    alignItems: 'center',
    width: wp(28),
    borderRadius: 16,
    marginBottom: hp(4),
  },
  imageContainer: {
    width: wp(16),
    height: wp(16),
    borderRadius: wp(8),
    marginBottom: 12,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: theme.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.text,
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: hp(20),
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: hp(20),
  },
  errorText: {
    color: theme.error,
    fontSize: 16,
  },
});

export default Categories;
