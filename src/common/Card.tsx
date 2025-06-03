import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../utils/globalFunctions';
import theme from '../assets/theme';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: object;
  variant?: 'default' | 'elevated' | 'outlined';
}

const Card: React.FC<CardProps> = ({
  children,
  onPress,
  style,
  variant = 'default',
}) => {
  const cardStyle = [
    styles.card,
    variant === 'elevated' && styles.elevatedCard,
    variant === 'outlined' && styles.outlinedCard,
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity style={cardStyle} onPress={onPress} activeOpacity={0.7}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.surface,
    borderRadius: theme.borderRadius.lg,
    padding: wp(4),
    ...theme.shadows.base,
  },
  elevatedCard: {
    ...theme.shadows.lg,
  },
  outlinedCard: {
    borderWidth: 1,
    borderColor: theme.border,
    shadowOpacity: 0,
    elevation: 0,
  },
});

export default Card;