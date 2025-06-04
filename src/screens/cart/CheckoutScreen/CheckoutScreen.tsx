import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import { Icon } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import theme, { TYPOGRAPHY_STYLES } from '../../../assets/theme';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../../utils/globalFunctions';
import { useCart } from '../../../contexts/CartContext';

const CheckoutScreen = () => {
  const navigation = useNavigation();
  const { state, dispatch } = useCart();
  const [formData, setFormData] = useState({
    street: '',
    aptSuite: '',
    town: '',
    postalCode: '',
    phone: '',
  });
  const [errors, setErrors] = useState({
    street: '',
    town: '',
    postalCode: '',
    phone: '',
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      street: '',
      town: '',
      postalCode: '',
      phone: '',
    };

    // Street validation
    if (!formData.street.trim()) {
      newErrors.street = 'Street address is required';
      isValid = false;
    }

    // Town validation
    if (!formData.town.trim()) {
      newErrors.town = 'Town/Locality is required';
      isValid = false;
    }

    // Postal code validation
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'Postal code is required';
      isValid = false;
    } else if (!/^\d{4}$/.test(formData.postalCode.trim())) {
      newErrors.postalCode = 'Invalid postal code format (4 digits)';
      isValid = false;
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (!/^\d{9,10}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Invalid phone number (9-10 digits)';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      Alert.alert('Error', 'Please fix the errors in the form');
      return;
    }

    if (!state.items.length) {
      Alert.alert('Error', 'Your cart is empty');
      return;
    }

    // Create order object
    const order = {
      items: state.items,
      total: state.total,
      shippingAddress: {
        street: formData.street,
        aptSuite: formData.aptSuite,
        town: formData.town,
        postalCode: formData.postalCode,
        phone: formData.phone,
      },
      orderDate: new Date().toISOString(),
    };

    // Here you would typically send the order to your backend
    console.log('Order submitted:', order);

    // Clear cart
    dispatch({ type: 'CLEAR_CART' });

    // Show success message
    Alert.alert(
      'Success',
      'Your order has been placed successfully!',
      [
        {
          text: 'OK',
          onPress: () => {
            // Navigate back to home screen
            navigation.reset({
              index: 0,
              routes: [{ name: 'Home' as never }],
            });
          },
        },
      ],
    );
  };

  const renderError = (error: string) => {
    if (!error) return null;
    return <Text style={styles.errorText}>{error}</Text>;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
        >
          <View style={styles.iconBackground}>
            <Icon name="arrow-left" type="feather" size={22} color={theme.text} />
          </View>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, TYPOGRAPHY_STYLES.h4]}>Checkout</Text>
        <View style={styles.iconButton} />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Address</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Street and number</Text>
          <TextInput
            style={[styles.input, errors.street ? styles.inputError : null]}
            value={formData.street}
            onChangeText={(text) => {
              setFormData(prev => ({ ...prev, street: text }));
              setErrors(prev => ({ ...prev, street: '' }));
            }}
            placeholder="Enter street address"
          />
          {renderError(errors.street)}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Apt, Suite (optional)</Text>
          <TextInput
            style={styles.input}
            value={formData.aptSuite}
            onChangeText={(text) => setFormData(prev => ({ ...prev, aptSuite: text }))}
            placeholder="Enter apartment or suite number"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Town/Locality</Text>
          <TextInput
            style={[styles.input, errors.town ? styles.inputError : null]}
            value={formData.town}
            onChangeText={(text) => {
              setFormData(prev => ({ ...prev, town: text }));
              setErrors(prev => ({ ...prev, town: '' }));
            }}
            placeholder="Enter town or locality"
          />
          {renderError(errors.town)}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Postal code</Text>
          <TextInput
            style={[styles.input, errors.postalCode ? styles.inputError : null]}
            value={formData.postalCode}
            onChangeText={(text) => {
              setFormData(prev => ({ ...prev, postalCode: text }));
              setErrors(prev => ({ ...prev, postalCode: '' }));
            }}
            placeholder="Enter postal code"
            keyboardType="number-pad"
            maxLength={4}
          />
          {renderError(errors.postalCode)}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone number</Text>
          <View style={styles.phoneInputContainer}>
            <View style={styles.countryCode}>
              <Text style={styles.countryCodeText}>+61</Text>
              <Icon name="chevron-down" type="feather" size={20} color={theme.text} />
            </View>
            <TextInput
              style={[styles.phoneInput, errors.phone ? styles.inputError : null]}
              value={formData.phone}
              onChangeText={(text) => {
                setFormData(prev => ({ ...prev, phone: text }));
                setErrors(prev => ({ ...prev, phone: '' }));
              }}
              placeholder="Enter phone number"
              keyboardType="phone-pad"
              maxLength={10}
            />
          </View>
          {renderError(errors.phone)}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <View>
            <Text style={styles.totalLabel}>Order Total</Text>
            <Text style={styles.totalAmount}>A${state?.total?.toFixed(2) || '0.00'}</Text>
          </View>
          <TouchableOpacity 
            style={[styles.continueButton, !state?.items?.length && styles.disabledButton]}
            onPress={handleSubmit}
            disabled={!state?.items?.length}
          >
            <Text style={styles.continueButtonText}>Place Order</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    width: wp(10),
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
    color: theme.text,
  },
  content: {
    flex: 1,
    padding: wp(4),
  },
  sectionTitle: {
    ...TYPOGRAPHY_STYLES.h3,
    marginBottom: hp(2),
    color: theme.text,
  },
  inputContainer: {
    marginBottom: hp(3),
  },
  label: {
    ...TYPOGRAPHY_STYLES.body2,
    marginBottom: hp(1),
    color: theme.text,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
    fontSize: wp(3.8),
    color: theme.text,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: theme.borderRadius.lg,
    marginRight: wp(2),
  },
  countryCodeText: {
    ...TYPOGRAPHY_STYLES.body1,
    marginRight: wp(2),
    color: theme.text,
  },
  phoneInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
    fontSize: wp(3.8),
    color: theme.text,
  },
  footer: {
    backgroundColor: theme.background,
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
    borderTopWidth: 1,
    borderTopColor: theme.divider,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: wp(3.5),
    marginBottom: hp(0.5),
    color: theme.text,
  },
  totalAmount: {
    fontSize: wp(6),
    fontWeight: '600',
    color: theme.text,
  },
  continueButton: {
    backgroundColor: theme.primary,
    paddingHorizontal: wp(6),
    paddingVertical: hp(1.5),
    borderRadius: theme.borderRadius.lg,
    minWidth: wp(40),
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: theme.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  continueButtonText: {
    fontSize: wp(4),
    fontWeight: '500',
    color: theme.surface,
  },
  errorText: {
    color: theme.error,
    fontSize: wp(3.2),
    marginTop: hp(0.5),
  },
  inputError: {
    borderColor: theme.error,
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default CheckoutScreen;