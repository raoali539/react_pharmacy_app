import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Icon } from '@rneui/themed';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../utils/globalFunctions';
import theme from '../assets/theme';
import { TYPOGRAPHY_STYLES } from '../assets/theme';
import Badge from './Badge';

interface ListItemProps {
  title: string;
  subtitle?: string;
  leftIcon?: string;
  rightIcon?: string;
  rightText?: string;
  badge?: number;
  badgeVariant?: 'primary' | 'error' | 'success' | 'warning';
  onPress?: () => void;
  style?: object;
  showBorder?: boolean;
}

const ListItem: React.FC<ListItemProps> = ({
  title,
  subtitle,
  leftIcon,
  rightIcon = 'chevron-right',
  rightText,
  badge,
  badgeVariant = 'primary',
  onPress,
  style,
  showBorder = true,
}) => {
  const renderRight = () => {
    if (badge !== undefined) {
      return <Badge count={badge} variant={badgeVariant} />;
    }
    if (rightText) {
      return <Text style={[styles.rightText, TYPOGRAPHY_STYLES.button2]}>{rightText}</Text>;
    }
    if (rightIcon) {
      return <Icon name={rightIcon} type="feather" size={20} color={theme.textLight} />;
    }
    return null;
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        showBorder && styles.border,
        style,
      ]}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      {leftIcon && (
        <View style={styles.iconContainer}>
          <Icon name={leftIcon} type="feather" size={20} color={theme.primary} />
        </View>
      )}
      <View style={styles.content}>
        <Text style={[styles.title, TYPOGRAPHY_STYLES.body1]} numberOfLines={1}>
          {title}
        </Text>
        {subtitle && (
          <Text style={[styles.subtitle, TYPOGRAPHY_STYLES.body2]} numberOfLines={1}>
            {subtitle}
          </Text>
        )}
      </View>
      <View style={styles.right}>{renderRight()}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1.8),
    paddingHorizontal: wp(4),
    backgroundColor: theme.surface,
  },
  border: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.border,
  },
  iconContainer: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    backgroundColor: `${theme.primary}10`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(3),
  },
  content: {
    flex: 1,
    marginRight: wp(2),
  },
  title: {
    color: theme.text,
  },
  subtitle: {
    color: theme.textLight,
    marginTop: 2,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightText: {
    color: theme.primary,
    marginRight: wp(2),
  },
});