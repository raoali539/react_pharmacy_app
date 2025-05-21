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
      style={styles.settingsItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.settingsItemLeft}>
        {icon && iconType && (
          <View style={styles.iconContainer}>
            <Icon name={icon} type={iconType} size={22} color={theme.active} />
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
        <Icon name="chevron-right" type="feather" size={20} />
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
            <View style={styles.settingsList}>
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
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: wp(4),
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: hp(3),
  },
  profileImageContainer: {
    width: wp(20),
    height: wp(20),
    borderRadius: wp(10),
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(1),
  },
  profileInitial: {
    color: '#fff',
    fontSize: wp(10),
    fontWeight: '600',
  },
  profileName: {
    fontSize: wp(5),
    fontWeight: '600',
     
    marginBottom: hp(0.5),
  },
  profileSubtitle: {
    fontSize: wp(3.5),
     
  },
  sectionContainer: {
    marginBottom: hp(3),
  },
  sectionTitle: {
    fontSize: wp(4),
    fontWeight: '500',
     
    marginBottom: hp(1),
  },
  settingsList: {
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp(2),
    paddingHorizontal: wp(4),
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    backgroundColor: '#F5F6FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(3),
  },
  settingsItemTitle: {
    fontSize: wp(4),
     
    fontWeight: '400',
  },
  rightText: {
    fontSize: wp(4),
     
    fontWeight: '500',
  },
  logoutText: {
    color: '#d32f2f',
  },
});

export default SettingsScreen;