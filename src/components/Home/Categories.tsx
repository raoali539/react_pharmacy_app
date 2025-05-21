import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Icon } from '@rneui/base';
import { widthPercentageToDP as wp ,heightPercentageToDP as hp } from '../../utils/globalFunctions';
import theme from '../../assets/theme';

const categories = [
  { id: 1, name: 'Medicines', icon: 'pill', type: 'material-community' },
  { id: 2, name: 'Baby Care', icon: 'baby-carriage', type: 'material-community' },
  { id: 3, name: 'Personal Care', icon: 'user', type: 'feather' },
  { id: 4, name: 'Health Devices', icon: 'heartbeat', type: 'font-awesome' },
  { id: 5, name: 'Vitamins', icon: 'food-apple', type: 'material-community' },
  { id: 6, name: 'Ayurveda', icon: 'leaf', type: 'feather' },
  { id: 7, name: 'Covid Care', icon: 'virus', type: 'font-awesome-5' },
  { id: 8, name: 'Fitness', icon: 'dumbbell', type: 'font-awesome-5' },
];

interface CategoriesProps {
  onSelectCategory?: (category: any) => void;
}

const Categories: React.FC<CategoriesProps> = ({ onSelectCategory }) => {
  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryCard}
            onPress={() => onSelectCategory?.(category)}
          >
            <View style={styles.iconContainer}>
              <Icon
                name={category.icon}
                type={category.type}
                size={24}
                color={theme.active}
              />
            </View>
            <Text style={styles.categoryName}>{category.name}</Text>
          </TouchableOpacity>
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
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: hp(2),
    paddingHorizontal: wp(4),
  },
  scrollContent: {
    paddingHorizontal: wp(4),
  },
  categoryCard: {
    alignItems: 'center',
    marginRight: wp(4),
    width: wp(20),
  },
  iconContainer: {
    width: wp(14),
    height: wp(14),
    borderRadius: wp(7),
    backgroundColor: '#F1F29F',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
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
  categoryName: {
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default Categories;
