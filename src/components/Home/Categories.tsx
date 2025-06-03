import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Icon } from '@rneui/base';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../utils/globalFunctions';
import theme from '../../assets/theme';
import Animated, { FadeInDown, useAnimatedStyle, withSpring } from 'react-native-reanimated';

const categories = [
  { id: '1', name: 'Medicines', icon: 'pill', type: 'material-community' },
  { id: '2', name: 'Healthcare', icon: 'heart-pulse', type: 'material-community' },
  { id: '3', name: 'Baby Care', icon: 'baby-carriage', type: 'material-community' },
  { id: '4', name: 'Personal', icon: 'face-man', type: 'material-community' },
  { id: '5', name: 'Devices', icon: 'stethoscope', type: 'material-community' },
];

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
        <View style={[styles.iconContainer, { backgroundColor: `${theme.primary}10` }]}>
          <Icon
            name={category.icon}
            type={category.type}
            size={26}
            color={theme.primary}
          />
        </View>
        <Text style={styles.categoryName}>{category.name}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const Categories: React.FC<CategoriesProps> = ({ onSelectCategory }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories</Text>
      <View style={styles.scrollContent}>
        {categories.map((category, index) => (
          <CategoryCard
            key={category.id}
            category={category}
            index={index}
            onPress={onSelectCategory}
          />
        ))}
      </View>
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
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    alignItems: 'center',
    width: wp(28),
    marginBottom: hp(2.5),
    padding: 8,
    borderRadius: 16,
    // backgroundColor: Platform.select({
    //   ios: 'rgba(255, 255, 255, 0.8)',
    //   android: 'white',
    // }),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  iconContainer: {
    width: wp(16),
    height: wp(16),
    borderRadius: wp(8),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
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
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.text,
    textAlign: 'center',
    letterSpacing: 0.3,
  },
});

export default Categories;
