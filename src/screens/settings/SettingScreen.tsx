import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { Icon } from '@rneui/base';
import theme from '../../assets/theme';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../utils/globalFunctions';

interface SettingsItem {
  title: string;
  icon?: string;
  iconType?: string;
  onPress: () => void;
  rightText?: string;
}

interface SettingsSection {
  title?: string;
  items: SettingsItem[];
}

const SettingsScreen = () => {
  const settingsSections: SettingsSection[] = [
    {
      title: 'Balances',
      items: [
        {
          title: 'Available credit',
          rightText: 'A$0.00',
          onPress: () => {},
        },
        {
          title: 'Earn credit',
          onPress: () => {},
        },
      ],
    },
    {
      title: 'Account',
      items: [
        {
          title: 'Orders & reviews',
          onPress: () => {},
        },
        {
          title: 'Invoices',
          onPress: () => {},
        },
        {
          title: 'Messages',
          onPress: () => {},
        },
        {
          title: 'Settings',
          onPress: () => {},
        },
        {
          title: 'Refer brands, earn A$2,000',
          onPress: () => {},
        },
        {
          title: 'My team',
          onPress: () => {},
        },
        {
          title: 'Blog',
          onPress: () => {},
        },
      ],
    },
    {
      items: [
        {
          title: 'Instagram',
          onPress: () => {},
        },
        {
          title: 'Facebook',
          onPress: () => {},
        },
        {
          title: 'Twitter',
          onPress: () => {},
        },
      ],
    },
    {
      title: 'Legal',
      items: [
        {
          title: 'Terms of Service',
          onPress: () => {},
        },
        {
          title: 'Privacy Policy',
          onPress: () => {},
        },
        {
          title: 'Open Source Licenses',
          onPress: () => {},
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          title: 'Give feedback',
          onPress: () => {},
        },
        {
          title: 'Help Center',
          onPress: () => {},
        },
        {
          title: 'Contact us',
          onPress: () => {},
        },
      ],
    },
    {
      items: [
        {
          title: 'Log out',
          onPress: () => {},
        },
      ],
    },
  ];

  const renderSettingsItem = ({ title, icon, iconType, onPress, rightText }: SettingsItem) => (
    <TouchableOpacity
      key={title}
      style={[
        styles.settingsItem,
        title === 'Log out' && styles.logoutItem
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.settingsItemLeft}>
        {icon && iconType && (
          <View style={[styles.iconContainer, title === 'Log out' && styles.logoutIconContainer]}>
            <Icon 
              name={icon} 
              type={iconType} 
              size={22} 
              color={title === 'Log out' ? theme.error : theme.active} 
            />
          </View>
        )}
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
          color={title === 'Log out' ? theme.error : theme.textSecondary} 
        />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Text style={styles.profileInitial}>Z</Text>
          </View>
          <Text style={styles.profileName}>Zohaib Rao</Text>
          <Text style={styles.profileSubtitle}>My Cat</Text>
        </View>

        {/* Settings Sections */}
        {settingsSections.map((section, index) => (
          <View key={index} style={styles.sectionContainer}>
            {section.title && <Text style={styles.sectionTitle}>{section.title}</Text>}
            <View style={styles.settingsList}>ground,
              {section.items.map(renderSettingsItem)}
            </View>
          </View>
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
  content: {
    padding: wp(4),
    paddingBottom: hp(4),
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
    backgroundColor: theme.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(1.5),
    shadowColor: theme.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  profileInitial: {
    color: theme.background,
    fontSize: wp(12),
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
    color: theme.textSecondary,
    letterSpacing: 0.5,
  },
  sectionContainer: {
    marginBottom: hp(3),
  },
  sectionTitle: {
    fontSize: wp(3.8),
    fontWeight: '600',
    color: theme.textSecondary,
    marginBottom: hp(1),
    marginLeft: wp(2),
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  settingsList: {
    backgroundColor: theme.surface,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
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
    backgroundColor: theme.surfaceVariant,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(3),
  },
  settingsItemTitle: {
    fontSize: wp(4),
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
    backgroundColor: theme.coldLight,
  },
});

export default SettingsScreen;