import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform, TextInput, StatusBar } from 'react-native';
import { Icon } from '@rneui/themed';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../utils/globalFunctions';
import theme from '../assets/theme';
import { TYPOGRAPHY_STYLES } from '../assets/theme';

interface HeaderProps {
  title: string;
  leftIcon?: string;
  rightIcon?: string;
  rightIcon2?: string;
  leftIconType?: string;
  rightIconType?: string;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  onRightIcon2Press?: () => void;
  showBorder?: boolean;
  style?: any;
  containerStyle?: any;
  onSearch?: (text: string) => void;
  showSearch?: boolean;
  CustomLeftComponent?: () => React.ReactElement;
}

const Header: React.FC<HeaderProps> = ({
  title,
  leftIcon = 'arrow-left',
  rightIcon = 'search',
  rightIcon2,
  leftIconType = 'feather',
  rightIconType = 'feather',
  onLeftPress,
  onRightPress,
  onRightIcon2Press,
  showBorder = true,
  style,
  containerStyle,
  onSearch,
  showSearch = true,
  CustomLeftComponent,
}) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  const handleSearchPress = () => {
    setIsSearchVisible(!isSearchVisible);
    if (isSearchVisible) {
      setSearchText('');
    }
  };

  const handleSearchSubmit = () => {
    if (onSearch) {
      onSearch(searchText);
    }
    setIsSearchVisible(false);
    setSearchText('');
  };

  return (
    <View style={[styles.container, !showBorder && styles.noBorder, style, containerStyle]}>
      {isSearchVisible ? (
        <View style={styles.searchContainer}>
          <TextInput
            style={[styles.searchInput, TYPOGRAPHY_STYLES.body1]}
            placeholder="Search..."
            placeholderTextColor={theme.textLight}
            value={searchText}
            onChangeText={setSearchText}
            autoFocus
            returnKeyType="search"
            onSubmitEditing={handleSearchSubmit}
          />
          <TouchableOpacity style={styles.closeButton} onPress={handleSearchPress}>
            <View style={styles.iconBackground}>
              <Icon name="x" type="feather" size={22} color={theme.text} />
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {CustomLeftComponent ? (
            <CustomLeftComponent />
          ) : (
            leftIcon && (
              <TouchableOpacity style={styles.iconButton} onPress={onLeftPress} disabled={!onLeftPress}>
                <View style={styles.iconBackground}>
                  <Icon name={leftIcon} type={leftIconType} size={22} color={theme.text} />
                </View>
              </TouchableOpacity>
            )
          )}
          <Text style={[styles.title, TYPOGRAPHY_STYLES.h4]} numberOfLines={1}>
            {title}
          </Text>

          <View style={styles.rightIcons}>
            {showSearch && (
              <TouchableOpacity style={styles.iconButton} onPress={handleSearchPress}>
                <View style={styles.iconBackground}>
                  <Icon name="search" type="feather" size={22} color={theme.text} />
                </View>
              </TouchableOpacity>
            )}

            {rightIcon2 && (
              <TouchableOpacity
                style={styles.iconButton}
                onPress={onRightIcon2Press}
                disabled={!onRightIcon2Press}
              >
                <View style={styles.iconBackground}>
                  <Icon name={rightIcon2} type={rightIconType} size={22} color={theme.text} />
                </View>
              </TouchableOpacity>
            )}
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
    backgroundColor: theme.background,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    ...theme.shadows.base,
    ...Platform.select({
      android: {
        paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + hp(1) : hp(3),
      },
    }),
  },
  noBorder: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    ...Platform.select({
      ios: {
        shadowOpacity: 0,
      },
      android: {
        elevation: 0,
        // Keep the status bar padding even when no border
        paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + hp(1) : hp(3),
      },
    }),
  },
  iconButton: {
    padding: wp(2),
    width: wp(14),
  },
  iconBackground: {
    backgroundColor: theme.surface,
    padding: wp(2),
    borderRadius: wp(3),
    ...theme.shadows.sm,
    ...Platform.select({
      android: {
        elevation: 2,
      },
    }),
  },
  title: {
    flex: 1,
    textAlign: 'center',
    marginHorizontal: wp(2),
    color: 'black',
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchContainer: {
    flex: 1,
    marginHorizontal: wp(2),
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    backgroundColor: theme.surface,
    height: hp(5),
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: wp(4),
    color: theme.text,
    ...theme.shadows.sm,
    ...Platform.select({
      android: {
        paddingVertical: 0,
      },
    }),
  },
  closeButton: {
    marginLeft: wp(2),
    padding: wp(2),
  },
});

export default Header;



