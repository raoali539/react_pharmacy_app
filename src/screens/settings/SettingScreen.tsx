import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import { Icon } from '@rneui/base';
import theme, { TYPOGRAPHY_STYLES } from '../../assets/theme';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../utils/globalFunctions';
import Animated, { FadeInDown, Layout } from 'react-native-reanimated';

interface SettingsItem {
  title: string;
  icon: string;
  iconType: string;
  onPress: () => void;
  rightText?: string;
}

interface SettingsSection {
  title?: string;
  items: SettingsItem[];
}

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../redux/hooks';
import { logout } from '../../redux/slices/authSlice';
import { useNavigation } from '@react-navigation/native';


const SettingsScreen = () => {
  const [animatedIndex, setAnimatedIndex] = useState(-1);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useAppSelector((state: any) => state.auth?.user);
console.log('SettingsScreen user:', user);
  // Handles logout: clears AsyncStorage, Redux, and navigates to Login
  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      dispatch(logout());
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' as never }],
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const settingsSections: SettingsSection[] = [
    {
      title: 'Account',
      items: [
        {
          title: 'Orders & reviews',
          icon: 'shopping-bag',
          iconType: 'feather',
          onPress: () => { },
        },
        {
          title: 'Invoices',
          icon: 'file-text',
          iconType: 'feather',
          onPress: () => { },
        },
        {
          title: 'Messages',
          icon: 'message-circle',
          iconType: 'feather',
          onPress: () => { },
        },
        {
          title: 'Settings',
          icon: 'settings',
          iconType: 'feather',
          onPress: () => { },
        },

      ],
    },
    {
      title: 'Legal',
      items: [
        {
          title: 'Terms of Service',
          icon: 'file',
          iconType: 'feather',
          onPress: () => { },
        },
        {
          title: 'Privacy Policy',
          icon: 'shield',
          iconType: 'feather',
          onPress: () => { },
        },
      ],
    },
    {
      title: 'Support',
      items: [

        {
          title: 'Contact us',
          icon: 'phone',
          iconType: 'feather',
          onPress: () => { },
        },
      ],
    },
    {
      items: [
        {
          title: 'Log out',
          icon: 'log-out',
          iconType: 'feather',
          onPress: handleLogout,
        },
      ],
    },
  ];

  const renderSettingsItem = ({ title, icon, iconType, onPress, rightText }: SettingsItem, index: number) => (
    <Animated.View
      entering={FadeInDown.delay(index * 100).springify()}
      layout={Layout.springify()}
    >
      <TouchableOpacity
        key={title}
        style={[
          styles.settingsItem,
          title === 'Log out' && styles.logoutItem
        ]}
        onPress={() => {
          setAnimatedIndex(index);
          onPress();
        }}
        activeOpacity={0.7}
      >
        <View style={styles.settingsItemLeft}>
          <View style={[styles.iconContainer, title === 'Log out' && styles.logoutIconContainer]}>
            <Icon
              name={icon}
              type={iconType}
              size={20}
              color={title === 'Log out' ? theme.error : theme.primary}
            />
          </View>
          <Text style={[
            styles.settingsItemTitle,
            title === 'Log out' && styles.logoutText
          ]}>{title}</Text>
        </View>
        {rightText ? (
          <Text style={styles.rightText}>{rightText}</Text>
        ) : (
          <Icon
            name="chevron-right"
            type="feather"
            size={18}
            color={title === 'Log out' ? theme.error : theme.textLight}
          />
        )}
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.background} />

      <ScrollView contentContainerStyle={styles.content}>
        {/* Profile Section */}
        <Animated.View
          entering={FadeInDown.duration(600)}
          style={styles.profileSection}
        >
          <View style={styles.profileImageContainer}>
            <Text style={styles.profileInitial}>{user?.userName?.charAt(0)}</Text>
          </View>
          <Text style={styles.profileName}>{user?.userName}</Text>
          <Text style={styles.profileSubtitle}>My Cat</Text>
        </Animated.View>

        {/* Settings Sections */}
        {settingsSections.map((section, sectionIndex) => (
          <Animated.View
            key={sectionIndex}
            entering={FadeInDown.delay(sectionIndex * 200).springify()}
            style={styles.sectionContainer}
          >
            {section.title && (
              <Text style={styles.sectionTitle}>{section.title}</Text>
            )}
            <View style={styles.settingsList}>
              {section.items.map((item, index) => renderSettingsItem(item, sectionIndex * 10 + index))}
            </View>
          </Animated.View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
    backgroundColor: theme.background,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  iconButton: {
    padding: wp(2),
  },
  iconBackground: {
    backgroundColor: theme.surface,
    padding: wp(2),
    borderRadius: wp(3),
    ...Platform.select({
      ios: {
        shadowColor: theme.text,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    marginHorizontal: wp(2),
    color: theme.text,
  },
  content: {
    padding: wp(4),
    paddingBottom: hp(8),
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: hp(4),
    marginTop: hp(2),
  },
  profileImageContainer: {
    width: wp(24),
    height: wp(24),
    borderRadius: wp(12),
    backgroundColor: theme.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(1.5),
    ...Platform.select({
      ios: {
        shadowColor: theme.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  profileInitial: {
    color: theme.surface,
    fontSize: wp(10),
    fontWeight: '600',
  },
  profileName: {
    fontSize: wp(5),
    fontWeight: '700',
    color: theme.text,
    marginBottom: hp(0.5),
  },
  profileSubtitle: {
    fontSize: wp(3.5),
    color: theme.textLight,
    letterSpacing: 0.5,
  },
  sectionContainer: {
    marginBottom: hp(3),
  },
  sectionTitle: {
    fontSize: wp(3.8),
    fontWeight: '600',
    color: theme.textLight,
    marginBottom: hp(1),
    marginLeft: wp(2),
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  settingsList: {
    backgroundColor: theme.surface,
    borderRadius: 16,
    ...Platform.select({
      ios: {
        shadowColor: theme.text,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp(1.8),
    paddingHorizontal: wp(4),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.border,
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
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
  settingsItemTitle: {
    fontSize: wp(3.8),
    color: theme.text,
    fontWeight: '500',
    flex: 1,
  },
  rightText: {
    fontSize: wp(4),
    color: theme.primary,
    fontWeight: '600',
  },
  logoutItem: {
    borderBottomWidth: 0,
  },
  logoutText: {
    color: theme.error,
    fontWeight: '600',
  },
  logoutIconContainer: {
    backgroundColor: `${theme.error}15`,
  },
});

export default SettingsScreen;