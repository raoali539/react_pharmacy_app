import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../utils/globalFunctions';
import theme from '../assets/theme';
import { TYPOGRAPHY_STYLES } from '../assets/theme';

interface DividerProps {
  text?: string;
  style?: object;
  orientation?: 'horizontal' | 'vertical';
}

const Divider: React.FC<DividerProps> = ({
  text,
  style,
  orientation = 'horizontal',
}) => {
  if (text) {
    return (
      <View style={[styles.containerWithText, style]}>
        <View style={styles.line} />
        <Text style={[styles.text, TYPOGRAPHY_STYLES.body2]}>{text}</Text>
        <View style={styles.line} />
      </View>
    );
  }

  return (
    <View
      style={[
        orientation === 'horizontal' ? styles.horizontal : styles.vertical,
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  containerWithText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp(2),
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: theme.border,
  },
  text: {
    marginHorizontal: wp(4),
    color: theme.textLight,
  },
  horizontal: {
    height: 1,
    backgroundColor: theme.border,
    marginVertical: hp(1),
  },
  vertical: {
    width: 1,
    backgroundColor: theme.border,
    marginHorizontal: wp(1),
    alignSelf: 'stretch',
  },
});