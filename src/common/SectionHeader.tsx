




import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from '@rneui/base';
import { widthPercentageToDP as wp ,heightPercentageToDP as hp } from '../utils/globalFunctions';
import theme from '../assets/theme';

interface SectionHeaderProps {
  title: string;
  onViewAll?: () => void;
  viewAllLabel?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  onViewAll,
  viewAllLabel = 'View All',
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {onViewAll && (
        <TouchableOpacity
          style={styles.viewAllButton}
          onPress={onViewAll}
          activeOpacity={0.7}
        >
          {/* <Text style={styles.viewAllText}>{viewAllLabel}</Text> */}
          <Icon
            name="chevron-right"
            type="feather"
            size={16}
            color={theme.active}
            style={styles.icon}
          />
        </TouchableOpacity>
      )}
    </View>
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
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 14,
    color: theme.active,
    marginRight: 4,
  },
  icon: {
    marginTop: 1,
  },
});

export default SectionHeader;
