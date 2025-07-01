import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  TextInput,
  Alert,
  SafeAreaView,
  StatusBar,
  KeyboardTypeOptions,
  Image,
  Platform
} from 'react-native';
import { launchImageLibrary, ImageLibraryOptions, Asset } from 'react-native-image-picker';

interface NotificationSettings {
  orderAlerts: boolean;
  promotionalEmails: boolean;
  smsNotifications: boolean;
  weeklyReports: boolean;
}

interface BusinessSettings {
  autoAcceptOrders: boolean;
  showAvailability: boolean;
  acceptCashPayments: boolean;
  acceptCardPayments: boolean;
}

interface DeliverySettings {
  enableDelivery: boolean;
  deliveryRadius: string;
  deliveryFee: string;
  freeDeliveryThreshold: string;
}

interface VendorSettings {
  businessName: string;
  email: string;
  phone: string;
  address: string;
  notifications: NotificationSettings;
  business: BusinessSettings;
  delivery: DeliverySettings;
}

interface SettingSectionProps {
  title: string;
  children: React.ReactNode;
}

interface ToggleSettingProps {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  description?: string;
}

interface InputSettingProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
}

const VendorSettingsScreen: React.FC = () => {
  const [settings, setSettings] = useState<VendorSettings>({
    businessName: 'Fresh Mart Grocery',
    email: 'contact@freshmart.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, City, State 12345',
    notifications: {
      orderAlerts: true,
      promotionalEmails: false,
      smsNotifications: true,
      weeklyReports: true,
    },
    business: {
      autoAcceptOrders: false,
      showAvailability: true,
      acceptCashPayments: true,
      acceptCardPayments: true,
    },
    delivery: {
      enableDelivery: true,
      deliveryRadius: '5',
      deliveryFee: '2.99',
      freeDeliveryThreshold: '25.00',
    }
  });
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const pickProfileImage = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      maxWidth: 512,
      maxHeight: 512,
      quality: 0.7,
      selectionLimit: 1,
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) return;
      if (response.errorCode) {
        Alert.alert('Error', response.errorMessage || 'Failed to pick image');
        return;
      }
      if (response.assets && response.assets.length > 0) {
        setProfileImage(response.assets[0].uri || null);
      }
    });
  };

  const updateSetting = <T extends keyof VendorSettings>(
    category: T,
    key: keyof VendorSettings[T],
    value: VendorSettings[T][keyof VendorSettings[T]]
  ): void => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const updateBasicInfo = (key: keyof Pick<VendorSettings, 'businessName' | 'email' | 'phone' | 'address'>, value: string): void => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = (): void => {
    Alert.alert(
      'Settings Saved',
      'Your vendor settings have been updated successfully.',
      [{ text: 'OK' }]
    );
  };

  const handleReset = (): void => {
    Alert.alert(
      'Reset Settings',
      'Are you sure you want to reset all settings to default values?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Reset', 
          style: 'destructive',
          onPress: () => {
            // Reset to default values
            setSettings({
              businessName: '',
              email: '',
              phone: '',
              address: '',
              notifications: {
                orderAlerts: true,
                promotionalEmails: false,
                smsNotifications: true,
                weeklyReports: true,
              },
              business: {
                autoAcceptOrders: false,
                showAvailability: true,
                acceptCashPayments: true,
                acceptCardPayments: true,
              },
              delivery: {
                enableDelivery: true,
                deliveryRadius: '5',
                deliveryFee: '2.99',
                freeDeliveryThreshold: '25.00',
              }
            });
          }
        }
      ]
    );
  };

  const SettingSection: React.FC<SettingSectionProps> = ({ title, children }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );

  const ToggleSetting: React.FC<ToggleSettingProps> = ({ label, value, onValueChange, description }) => (
    <View style={styles.settingRow}>
      <View style={styles.settingTextContainer}>
        <Text style={styles.settingLabel}>{label}</Text>
        {description && <Text style={styles.settingDescription}>{description}</Text>}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#E5E5E5', true: '#4CAF50' }}
        thumbColor={value ? '#FFFFFF' : '#FFFFFF'}
        ios_backgroundColor="#E5E5E5"
      />
    </View>
  );

  const InputSetting: React.FC<InputSettingProps> = ({ 
    label, 
    value, 
    onChangeText, 
    placeholder, 
    keyboardType = 'default' 
  }) => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={styles.textInput}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        placeholderTextColor="#999"
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Image Section */}
        <View style={styles.profileImageSection}>
          <TouchableOpacity onPress={pickProfileImage} style={styles.profileImageWrapper}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
            ) : (
              <View style={styles.profileImagePlaceholder}>
                <Text style={styles.profileImagePlaceholderText}>Add Photo</Text>
              </View>
            )}
          </TouchableOpacity>
          <Text style={styles.profileImageLabel}>Profile Image</Text>
        </View>

        {/* Business Information */}
        <SettingSection title="Business Information">
          <InputSetting
            label="Business Name"
            value={settings.businessName}
            onChangeText={(value: string) => updateBasicInfo('businessName', value)}
            placeholder="Enter business name"
          />
          <InputSetting
            label="Email Address"
            value={settings.email}
            onChangeText={(value: string) => updateBasicInfo('email', value)}
            placeholder="Enter email address"
            keyboardType="email-address"
          />
          <InputSetting
            label="Phone Number"
            value={settings.phone}
            onChangeText={(value: string) => updateBasicInfo('phone', value)}
            placeholder="Enter phone number"
            keyboardType="phone-pad"
          />
          <InputSetting
            label="Business Address"
            value={settings.address}
            onChangeText={(value: string) => updateBasicInfo('address', value)}
            placeholder="Enter complete address"
          />
        </SettingSection>

        {/* Notification Settings */}
        <SettingSection title="Notifications">
          <ToggleSetting
            label="Order Alerts"
            value={settings.notifications.orderAlerts}
            onValueChange={(value: boolean) => updateSetting('notifications', 'orderAlerts', value)}
            description="Get notified when new orders are placed"
          />
          <ToggleSetting
            label="SMS Notifications"
            value={settings.notifications.smsNotifications}
            onValueChange={(value: boolean) => updateSetting('notifications', 'smsNotifications', value)}
            description="Receive important updates via SMS"
          />
          <ToggleSetting
            label="Promotional Emails"
            value={settings.notifications.promotionalEmails}
            onValueChange={(value: boolean) => updateSetting('notifications', 'promotionalEmails', value)}
            description="Receive marketing and promotional content"
          />
          <ToggleSetting
            label="Weekly Reports"
            value={settings.notifications.weeklyReports}
            onValueChange={(value: boolean) => updateSetting('notifications', 'weeklyReports', value)}
            description="Get weekly sales and performance reports"
          />
        </SettingSection>

        {/* Business Settings */}
        <SettingSection title="Business Settings">
          <ToggleSetting
            label="Auto-Accept Orders"
            value={settings.business.autoAcceptOrders}
            onValueChange={(value: boolean) => updateSetting('business', 'autoAcceptOrders', value)}
            description="Automatically accept incoming orders"
          />
          <ToggleSetting
            label="Show Availability Status"
            value={settings.business.showAvailability}
            onValueChange={(value: boolean) => updateSetting('business', 'showAvailability', value)}
            description="Display your business availability to customers"
          />
          <ToggleSetting
            label="Accept Cash Payments"
            value={settings.business.acceptCashPayments}
            onValueChange={(value: boolean) => updateSetting('business', 'acceptCashPayments', value)}
            description="Allow customers to pay with cash on delivery"
          />
          <ToggleSetting
            label="Accept Card Payments"
            value={settings.business.acceptCardPayments}
            onValueChange={(value: boolean) => updateSetting('business', 'acceptCardPayments', value)}
            description="Accept credit and debit card payments"
          />
        </SettingSection>

        {/* Delivery Settings */}
        <SettingSection title="Delivery Settings">
          <ToggleSetting
            label="Enable Delivery Service"
            value={settings.delivery.enableDelivery}
            onValueChange={(value: boolean) => updateSetting('delivery', 'enableDelivery', value)}
            description="Offer delivery service to customers"
          />
          <InputSetting
            label="Delivery Radius (km)"
            value={settings.delivery.deliveryRadius}
            onChangeText={(value: string) => updateSetting('delivery', 'deliveryRadius', value)}
            placeholder="Enter delivery radius"
            keyboardType="numeric"
          />
          <InputSetting
            label="Delivery Fee ($)"
            value={settings.delivery.deliveryFee}
            onChangeText={(value: string) => updateSetting('delivery', 'deliveryFee', value)}
            placeholder="Enter delivery fee"
            keyboardType="numeric"
          />
          <InputSetting
            label="Free Delivery Threshold ($)"
            value={settings.delivery.freeDeliveryThreshold}
            onChangeText={(value: string) => updateSetting('delivery', 'freeDeliveryThreshold', value)}
            placeholder="Minimum order for free delivery"
            keyboardType="numeric"
          />
        </SettingSection>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save Settings</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.secondaryButton} onPress={handleReset}>
            <Text style={styles.secondaryButtonText}>Reset to Default</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 90,
    backgroundColor: '#F7F8FA', // Softer background for premium feel
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 28,
    paddingTop: 32,
    paddingBottom: 20,
    borderBottomWidth: 0,
    elevation: 0,
    shadowColor: 'transparent',
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#222B45',
    letterSpacing: 0.2,
  },
  scrollView: {
    flex: 1,
    paddingTop: 8,
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginTop: 24,
    marginHorizontal: 20,
    borderRadius: 18,
    paddingHorizontal: 24,
    paddingVertical: 22,
    elevation: 3,
    shadowColor: '#1A1A1A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: '#F0F1F3',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222B45',
    marginBottom: 18,
    letterSpacing: 0.1,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F4F5F7',
    minHeight: 56,
  },
  settingTextContainer: {
    flex: 1,
    marginRight: 18,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222B45',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    color: '#8F9BB3',
    lineHeight: 18,
    fontWeight: '400',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222B45',
    marginBottom: 7,
    marginLeft: 2,
  },
  textInput: {
    borderWidth: 1.5,
    borderColor: '#E4E9F2',
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 13,
    fontSize: 16,
    color: '#222B45',
    backgroundColor: '#F7F9FC',
    fontWeight: '500',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#222B45',
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#222B45',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.13,
    shadowRadius: 6,
    marginRight: 8,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E4E9F2',
    marginLeft: 8,
  },
  secondaryButtonText: {
    color: '#8F9BB3',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  profileImageSection: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 6,
  },
  profileImageWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#E4E9F2',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F9FC',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  profileImagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5E5E5',
  },
  profileImagePlaceholderText: {
    fontSize: 16,
    color: '#8F9BB3',
    fontWeight: '500',
  },
  profileImageLabel: {
    marginTop: 8,
    fontSize: 14,
    color: '#222B45',
    fontWeight: '600',
  },
});

export default VendorSettingsScreen;