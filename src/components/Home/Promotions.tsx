
import { widthPercentageToDP as wp ,heightPercentageToDP as hp } from '../../utils/globalFunctions';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, Platform } from 'react-native';
import { Icon } from '@rneui/base';
import theme from '../../assets/theme';

const promotions = [
  {
    id: 1,
    title: 'Special Offer',
    description: 'Get 20% off on all medicines',
    backgroundColor: '#E8F5E9',
    textColor: theme.active,
    icon: 'tag',
  },
  {
    id: 2,
    title: 'Free Delivery',
    description: 'On orders above Rs. 500',
    backgroundColor: '#FFF3E0',
    textColor: '#F57C00',
    icon: 'truck',
  },
  {
    id: 3,
    title: 'Cashback',
    description: '10% cashback on prepaid orders',
    backgroundColor: '#E3F2FD',
    textColor: '#1976D2',
    icon: 'credit-card',
  },
];

interface PromotionsProps {
  onPromotionPress?: (promotion: any) => void;
}

const Promotions: React.FC<PromotionsProps> = ({ onPromotionPress }) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {promotions.map((promo) => (
          <TouchableOpacity
            key={promo.id}
            style={[styles.card, { backgroundColor: promo.backgroundColor }]}
            onPress={() => onPromotionPress?.(promo)}
          >
            <View style={styles.cardContent}>
              <Icon
                name={promo.icon}
                type="feather"
                size={24}
                color={promo.textColor}
                style={styles.icon}
              />
              <View style={styles.textContainer}>
                <Text style={[styles.title, { color: promo.textColor }]}>
                  {promo.title}
                </Text>
                <Text style={[styles.description, { color: promo.textColor }]}>
                  {promo.description}
                </Text>
              </View>
              <Icon
                name="chevron-right"
                type="feather"
                size={20}
                color={promo.textColor}
              />
            </View>
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
  scrollContent: {
    paddingHorizontal: wp(4),
  },
  card: {
    width: wp(80),
    marginRight: wp(3),
    borderRadius: 12,
    padding: wp(4),
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
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: wp(3),
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    opacity: 0.8,
  },
});

export default Promotions;


