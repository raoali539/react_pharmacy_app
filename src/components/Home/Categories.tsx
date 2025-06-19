import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, ScrollView, Image } from 'react-native';
import { Icon } from '@rneui/base';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../utils/globalFunctions';
import theme from '../../assets/theme';
import Animated, { FadeInDown, useAnimatedStyle, withSpring } from 'react-native-reanimated';

const categories = [
  { id: '1', name: 'Anxiety', icon: 'brain', type: 'material-community', img: 'https://medlineplus.gov/images/AnxietyNew_Share.jpg' },
  { id: '2', name: 'Depression', icon: 'emoticon-sad', type: 'material-community', img: 'https://stjosephinstitute.com/wp-content/uploads/2024/03/AdobeStock_138892525-scaled.webp' },
  { id: '3', name: 'ADHD', icon: 'head-flash', type: 'material-community', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQakSAJqGXY5D-lasZ1rwJSDZgmDUrPDzNiFg&s' },
  { id: '4', name: 'Insomnia', icon: 'power-sleep', type: 'material-community', img: 'https://www.nhlbi.nih.gov/sites/default/files/inline-images/19-1243%20NHLBI%20OY2%20Q1%20FHT%20Insomnia_900x600px%20%281%29.jpg' },
  { id: '5', name: 'Stress', icon: 'meditation', type: 'material-community', img: 'https://neuronup.us/wp-content/uploads/2022/09/agency-young-adult-profession-stressed-black-1.jpg' },
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
        <View style={[styles.imageContainer, { backgroundColor: `${theme.primary}10` }]}>
          <Image
            source={{ uri: category.img }}
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
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map((category, index) => (
          <CategoryCard
            key={category.id}
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
});

export default Categories;
