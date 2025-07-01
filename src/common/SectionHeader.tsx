import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Icon } from '@rneui/themed';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../utils/globalFunctions';
import theme from '../assets/theme';
import { TYPOGRAPHY_STYLES } from '../assets/theme';
import Animated from 'react-native-reanimated';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  viewAllLabel?: string;
  onViewAll?: () => void;
  showDecoration?: boolean;
  style?: object;
  color?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  viewAllLabel = 'View All',
  onViewAll,
  showDecoration = true,
  style,
  color
}) => {
  return (
    <Animated.View style={[styles.container, style]}>
      <View style={styles.titleContainer}>
        <Text style={[styles.title, TYPOGRAPHY_STYLES.h3, { color }]} numberOfLines={1}>
          {title}
        </Text>
        {subtitle && (
          <Text style={[styles.subtitle, TYPOGRAPHY_STYLES.body2, { color }]} numberOfLines={1}>
            {subtitle}
          </Text>
        )}
        {showDecoration && <View style={styles.titleDecoration} />}
      </View>

      {onViewAll && (
        <TouchableOpacity style={styles.viewAllButton} onPress={onViewAll}>
          <Text style={[styles.viewAllText, TYPOGRAPHY_STYLES.button2, { color }]}>
            {viewAllLabel}
          </Text>
          <Icon
            name="chevron-right"
            type="feather"
            size={16}
            color={theme.text}
            style={styles.icon}
          />
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    marginBottom: hp(2),
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    color: theme.text,
    marginBottom: 4,
  },
  subtitle: {
    color: theme.textLight,
    marginBottom: 4,
  },
  titleDecoration: {
    width: 102,
    height: 3,
    backgroundColor: theme.text,
    borderRadius: 2,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  viewAllText: {
    color: '#5A5A5A',
    marginRight: 4,
  },
  icon: {
    marginTop: 1,
  },
});

export default SectionHeader;
