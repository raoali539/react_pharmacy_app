import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { widthPercentageToDP as wp } from '../utils/globalFunctions';
import theme from '../assets/theme';

interface BadgeProps {
  count?: number;
  variant?: 'primary' | 'error' | 'success' | 'warning';
  size?: 'small' | 'medium' | 'large';
  dot?: boolean;
}

const Badge: React.FC<BadgeProps> = ({
  count,
  variant = 'primary',
  size = 'medium',
  dot = false,
}) => {
  const getBackgroundColor = () => {
    switch (variant) {
      case 'error':
        return theme.error;
      case 'success':
        return theme.success;
      case 'warning':
        return theme.warning;
      default:
        return theme.primary;
    }
  };

  const getDimensions = () => {
    switch (size) {
      case 'small':
        return {
          width: wp(4),
          height: wp(4),
          fontSize: wp(2.5),
        };
      case 'large':
        return {
          width: wp(6),
          height: wp(6),
          fontSize: wp(3.5),
        };
      default:
        return {
          width: wp(5),
          height: wp(5),
          fontSize: wp(3),
        };
    }
  };

  const dimensions = getDimensions();
  const backgroundColor = getBackgroundColor();

  if (dot) {
    return (
      <View
        style={[
          styles.dot,
          { backgroundColor },
          { width: dimensions.width / 2, height: dimensions.width / 2 },
        ]}
      />
    );
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor,
          minWidth: dimensions.width,
          height: dimensions.height,
          borderRadius: dimensions.height / 2,
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            fontSize: dimensions.fontSize,
          },
        ]}
      >
        {count}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(1),
  },
  text: {
    color: theme.surface,
    fontWeight: '600',
  },
  dot: {
    borderRadius: wp(2),
    borderWidth: 2,
    borderColor: theme.surface,
  },
});

export default Badge;