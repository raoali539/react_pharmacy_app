
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useCart } from '../contexts/CartContext';
import { widthPercentageToDP as wp ,heightPercentageToDP as hp } from '../utils/globalFunctions';
import theme, { TYPOGRAPHY_STYLES } from '../assets/theme';
import { Icon } from '@rneui/base';


interface HeaderProps {
  onMenuPress?: () => void;
  onNotificationPress?: () => void;
  onCartPress?: () => void;
  hasNotifications?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  onMenuPress,
  onNotificationPress,
  onCartPress,
  hasNotifications = false,
}) => {
  const { state: cartState } = useCart();
  const cartItemCount = cartState?.items?.length || 0;

  return (
    <View 
      style={styles.header}
      accessible={true}
      accessibilityRole="header"
      accessibilityLabel="Main navigation header"
    > 
      <View 
        style={styles.titleContainer}
        accessible={true}
        accessibilityRole="header"
      >
        <View style={styles.logoContainer}>
          <Text style={[styles.logoText,TYPOGRAPHY_STYLES.header12]}>Dharmacy</Text>
        </View>
      </View>
      
      <View style={styles.rightContainer}>
        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={onNotificationPress}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={`Notifications${hasNotifications ? ', new notifications available' : ''}`}
          accessibilityHint="Opens notifications screen"
        >

         <Icon name="notifications" size={30} color="#900" />
          {hasNotifications && <View style={styles.notificationBadge} />}
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={onCartPress}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={`Shopping cart${cartItemCount > 0 ? `, ${cartItemCount} items` : ', empty'}`}
          accessibilityHint="Opens shopping cart"
        >
          <Icon name="shopping-cart" type="feather" size={22} color="#000" />
          {cartItemCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartItemCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(1.5),
    paddingVertical: hp(1.5),
        backgroundColor: theme.background,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  titleContainer: {
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    color: theme.active,
    marginLeft: 8,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.background,
  },
  cartBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: theme.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
});

export default Header;



