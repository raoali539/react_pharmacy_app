import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Icon } from '@rneui/base';
import { widthPercentageToDP as wp } from '../../utils/globalFunctions';
import theme from '../../assets/theme';
import Animated, { FadeInDown, useAnimatedStyle, withSpring } from 'react-native-reanimated';

const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{
      scale: withSpring(isFocused ? 1.02 : 1, {
        damping: 15,
        stiffness: 100,
      })
    }]
  }));

  return (
    <Animated.View
      entering={FadeInDown.springify()}
      style={[styles.container, animatedStyle]}
    >
      <View style={[styles.searchContainer, isFocused && styles.focused]}>
        <Icon
          name="search"
          type="feather"
          size={20}
          color={theme.textLight}
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Search medicines, healthcare products..."
          style={styles.input}
          placeholderTextColor={theme.textLight}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <TouchableOpacity style={styles.filterButton}>
          <Icon
            name="sliders"
            type="feather"
            size={20}
            color={theme.primary}
          />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(4),
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Platform.select({
      ios: 'rgba(255, 255, 255, 0.8)',
      android: 'white',
    }),
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 50,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  focused: {
    borderWidth: 1.5,
    borderColor: `${theme.primary}50`,
  },
  searchIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: theme.text,
    paddingVertical: 8,
  },
  filterButton: {
    padding: 8,
    marginLeft: 8,
    backgroundColor: `${theme.primary}10`,
    borderRadius: 8,
  },
});

export default SearchBar;