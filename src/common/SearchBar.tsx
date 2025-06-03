import React from 'react';
import { StyleSheet, View, TextInput, Platform } from 'react-native';
import { Icon } from '@rneui/themed';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../utils/globalFunctions';
import theme from '../assets/theme';
import { TYPOGRAPHY_STYLES } from '../assets/theme';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  containerStyle?: object;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Search',
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Icon
        name="search"
        type="feather"
        size={20}
        color={theme.textLight}
        style={styles.icon}
      />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.textLight}
        returnKeyType="search"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.surface,
    borderRadius: theme.borderRadius.xl,
    paddingHorizontal: wp(4),
    height: hp(6),
    ...theme.shadows.base,
  },
  icon: {
    marginRight: wp(2),
  },
  input: {
    flex: 1,
    ...TYPOGRAPHY_STYLES.body1,
    color: theme.text,
    padding: 0,
  },
});

export default SearchBar;