import React from 'react';
import { StyleSheet, TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';
import { Icon } from '@rneui/themed';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../utils/globalFunctions';
import theme from '../assets/theme';
import { TYPOGRAPHY_STYLES } from '../assets/theme';

interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: string;
  rightIcon?: string;
  style?: object;
}

const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  style,
}) => {
  const getButtonStyle = () => {
    const baseStyle = [styles.button];

    // Add variant styles
    switch (variant) {
      case 'secondary':
        baseStyle.push({ ...styles.button, ...styles.secondaryButton });
        break;
      case 'outline':
        baseStyle.push({ ...styles.button, ...styles.outlineButton });
        break;
      case 'ghost':
        baseStyle.push({ ...styles.button, ...styles.ghostButton });
        break;
      default:
        baseStyle.push({ ...styles.button, ...styles.primaryButton });
    }

    // Add size styles
    switch (size) {
      case 'small':
        baseStyle.push(styles.smallButton);
        break;
      case 'large':
        baseStyle.push(styles.largeButton);
        break;
      default:
        baseStyle.push(styles.mediumButton);
    }

    if (disabled) {
      baseStyle.push(styles.disabledButton);
    }

    return baseStyle;
  };

  const getTextStyle = () => {
    const baseStyle = [styles.text];

    switch (variant) {
      case 'outline':
        baseStyle.push({ ...styles.text, ...styles.outlineText });
        break;
      case 'ghost':
        baseStyle.push({ ...styles.text, ...styles.ghostText });
        break;
      default:
        baseStyle.push({ ...styles.text, ...styles.primaryText });
    }

    switch (size) {
      case 'small':
        baseStyle.push(styles.smallText);
        break;
      case 'large':
        baseStyle.push(styles.largeText);
        break;
      default:
        baseStyle.push(styles.mediumText);
    }

    if (disabled) {
      baseStyle.push(styles.disabledText);
    }

    return baseStyle;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[getButtonStyle(), style]}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? theme.surface : theme.primary} />
      ) : (
        <View style={styles.content}>
          {leftIcon && (
            <Icon
              name={leftIcon}
              type="feather"
              size={size === 'small' ? 16 : size === 'large' ? 24 : 20}
              color={variant === 'primary' ? theme.surface : theme.primary}
              style={styles.leftIcon}
            />
          )}
          <Text style={getTextStyle()}>{title}</Text>
          {rightIcon && (
            <Icon
              name={rightIcon}
              type="feather"
              size={size === 'small' ? 16 : size === 'large' ? 24 : 20}
              color={variant === 'primary' ? theme.surface : theme.primary}
              style={styles.rightIcon}
            />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: theme.primary,
    ...theme.shadows.base,
  },
  secondaryButton: {
    backgroundColor: theme.secondary,
    ...theme.shadows.base,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.primary,
  },
  ghostButton: {
    backgroundColor: 'transparent',
  },
  smallButton: {
    paddingVertical: hp(1),
    paddingHorizontal: wp(3),
  },
  mediumButton: {
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(4),
  },
  largeButton: {
    paddingVertical: hp(2),
    paddingHorizontal: wp(6),
  },
  disabledButton: {
    opacity: 0.5,
  },
  text: {
    ...TYPOGRAPHY_STYLES.button1,
    textAlign: 'center',
  },
  primaryText: {
    color: theme.surface,
  },
  outlineText: {
    color: theme.primary,
  },
  ghostText: {
    color: theme.primary,
  },
  smallText: {
    ...TYPOGRAPHY_STYLES.button2,
  },
  mediumText: {
    ...TYPOGRAPHY_STYLES.button1,
  },
  largeText: {
    ...TYPOGRAPHY_STYLES.h4,
  },
  disabledText: {
    opacity: 0.5,
  },
  leftIcon: {
    marginRight: wp(2),
  },
  rightIcon: {
    marginLeft: wp(2),
  },
});

export { Button };