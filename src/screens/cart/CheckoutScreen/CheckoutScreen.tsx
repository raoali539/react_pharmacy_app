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
  StatusBar,
} from 'react-native';
import { Icon } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import theme, { TYPOGRAPHY_STYLES } from '../../../assets/theme';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../../utils/globalFunctions';
import { useCart } from '../../../contexts/CartContext';
import { checkout } from '../../../utils/checkoutApi';

const CheckoutScreen = () => {
  const navigation = useNavigation();
  const { state, dispatch } = useCart();
  const [formData, setFormData] = useState({
    fullName: '',
    addressLine1: '',
    city: '',
    postalCode: '',
    country: '',
    phone: '',
  });
  const [errors, setErrors] = useState({
    fullName: '',
    addressLine1: '',
    city: '',
    postalCode: '',
    country: '',
    phone: '',
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      fullName: '',
      addressLine1: '',
      city: '',
      postalCode: '',
      country: '',
      phone: '',
    };

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
      isValid = false;
    }

    // Address Line 1 validation
    if (!formData.addressLine1.trim()) {
      newErrors.addressLine1 = 'Address is required';
      isValid = false;
    }

    // City validation
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
      isValid = false;
    }

    // Postal code validation
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'Postal code is required';
      isValid = false;
    } else if (!/^\d{4,6}$/.test(formData.postalCode.trim())) {
      newErrors.postalCode = 'Invalid postal code format (4-6 digits)';
      isValid = false;
    }


    setErrors(newErrors);
    return isValid;
  };

 const handleSubmit = async () => {
  if (!validateForm()) {
    Alert.alert('Error', 'Please fix the errors in the form');
    return;
  }

  if (!state.items.length) {
    Alert.alert('Error', 'Your cart is empty');
    return;
  }

  console.log('Form Data:', state.items);

  const payload = {
    items: state.items.map((item: any) => ({
      productId: item.productId || item._id || item.id,
      quantity: item.quantity,
    })),
    shippingAddress: {
      fullName: formData.fullName,
      addressLine1: formData.addressLine1,
      city: formData.city,
      postalCode: formData.postalCode,
      country: formData.country,
    },
  };

  console.log('Checkout Payload:', payload);

  try {
    await checkout(payload);
    dispatch({ type: 'CLEAR_CART' });
    Alert.alert(
      'Success',
      'Your order has been placed successfully!',
      [
        {
          text: 'OK',
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{
                name: 'home',
                params: { screen: 'Orders' },
              }],
            });
          },
        },
      ],
    );
  } catch (error: any) {
    const msg = error?.response?.data?.message || 'Failed to place order. Please try again.';
    Alert.alert('Error', msg);
  }
};

  const renderError = (error: string) => {
    if (!error) return null;
    return <Text style={styles.errorText}>{error}</Text>;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.background} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.iconBackground}>
            <Icon name="arrow-left" type="feather" size={22} color={theme.text} />
          </View>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, TYPOGRAPHY_STYLES.h4]}>Checkout</Text>
        <View style={styles.iconButton} />
      </View>

      <ScrollView style={styles.content} keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start' }}>
        <Text style={styles.sectionTitle}>Shipping Address</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={[styles.input, errors.fullName ? styles.inputError : null]}
            value={formData.fullName}
            onChangeText={text => {
              setFormData(prev => ({ ...prev, fullName: text }));
              setErrors(prev => ({ ...prev, fullName: '' }));
            }}
            placeholder="Enter your full name"
            autoCapitalize="words"
            returnKeyType="next"
          />
          {renderError(errors.fullName)}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Address Line 1</Text>
          <TextInput
            style={[styles.input, errors.addressLine1 ? styles.inputError : null]}
            value={formData.addressLine1}
            onChangeText={text => {
              setFormData(prev => ({ ...prev, addressLine1: text }));
              setErrors(prev => ({ ...prev, addressLine1: '' }));
            }}
            placeholder="Street address, P.O. box, company name, c/o"
            autoCapitalize="words"
            returnKeyType="next"
          />
          {renderError(errors.addressLine1)}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>City</Text>
          <TextInput
            style={[styles.input, errors.city ? styles.inputError : null]}
            value={formData.city}
            onChangeText={text => {
              setFormData(prev => ({ ...prev, city: text }));
              setErrors(prev => ({ ...prev, city: '' }));
            }}
            placeholder="Enter your city"
            autoCapitalize="words"
            returnKeyType="next"
          />
          {renderError(errors.city)}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Postal Code</Text>
          <TextInput
            style={[styles.input, errors.postalCode ? styles.inputError : null]}
            value={formData.postalCode}
            onChangeText={text => {
              setFormData(prev => ({ ...prev, postalCode: text }));
              setErrors(prev => ({ ...prev, postalCode: '' }));
            }}
            placeholder="Enter postal code"
            keyboardType="number-pad"
            maxLength={6}
            returnKeyType="next"
          />
          {renderError(errors.postalCode)}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Country</Text>
          <TextInput
            style={[styles.input, errors.country ? styles.inputError : null]}
            value={formData.country}
            onChangeText={text => {
              setFormData(prev => ({ ...prev, country: text }));
              setErrors(prev => ({ ...prev, country: '' }));
            }}
            placeholder="Enter your country"
            autoCapitalize="words"
            returnKeyType="next"
          />
          {renderError(errors.country)}
        </View>

        {/* <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={[styles.input, errors.phone ? styles.inputError : null]}
            value={formData.phone}
            onChangeText={text => {
              setFormData(prev => ({ ...prev, phone: text }));
              setErrors(prev => ({ ...prev, phone: '' }));
            }}
            placeholder="Enter phone number"
            keyboardType="phone-pad"
            maxLength={15}
            returnKeyType="done"
          />
          {renderError(errors.phone)}
        </View> */}

        {/* Spacer to ensure button is visible when keyboard is open */}
        <View style={{ height: 32 }} />
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
  safeArea: {
    flex: 1,
    backgroundColor: theme.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
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