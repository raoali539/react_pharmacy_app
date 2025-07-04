import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../redux/slices/authSlice';
import { RootState } from '../../../redux/store/store';
import theme from '../../../assets/theme';

const Registration = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    userType: 'User',
  });

  const handleRegistration = async () => {

    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword || !formData.phone || !formData.userType) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      const resultAction = await dispatch(registerUser({
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        userType: formData.userType
      }) as any);

      if (registerUser.fulfilled.match(resultAction)) {
        navigation.navigate('HomeRoutes' as never);
      } else if (registerUser.rejected.match(resultAction)) {
        Alert.alert('Error', resultAction.payload as string || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert('Error', 'Something went wrong during registration');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Create Account</Text>

        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={formData.fullName}
          onChangeText={(value) => handleInputChange('fullName', value)}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={formData.email}
          onChangeText={(value) => handleInputChange('email', value)}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={formData.phone}
          onChangeText={(value) => handleInputChange('phone', value)}
          keyboardType="phone-pad"
        />

        {/* User Type Dropdown */}
        <View style={styles.dropdownContainer}>
          <Text style={styles.dropdownLabel}>Register as:</Text>
          <View style={styles.dropdownRow}>
            <TouchableOpacity
              style={[styles.dropdownOption, formData.userType === 'User' && styles.dropdownOptionSelected]}
              onPress={() => handleInputChange('userType', 'User')}
            >
              <Text style={formData.userType === 'User' ? styles.dropdownTextSelected : styles.dropdownText}>User</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.dropdownOption, formData.userType === 'Vendor' && styles.dropdownOptionSelected]}
              onPress={() => handleInputChange('userType', 'Vendor')}
            >
              <Text style={formData.userType === 'Vendor' ? styles.dropdownTextSelected : styles.dropdownText}>Vendor</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={formData.password}
          onChangeText={(value) => handleInputChange('password', value)}
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChangeText={(value) => handleInputChange('confirmPassword', value)}
          secureTextEntry
        />

        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleRegistration}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Creating Account...' : 'Register'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login' as never)}>
          <Text style={styles.linkText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: theme.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: theme.text,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    color: theme.text,
    backgroundColor: theme.surface,
  },
  button: {
    backgroundColor: theme.primary,
    padding: 15,
    borderRadius: 8,
    marginVertical: 15,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  linkText: {
    color: theme.primary,
    textAlign: 'center',
    marginTop: 10,
  },
  dropdownContainer: {
    marginBottom: 15,
  },
  dropdownLabel: {
    marginBottom: 5,
    color: theme.text,
    fontWeight: '500',
  },
  dropdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropdownOption: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 8,
    backgroundColor: theme.surface,
    alignItems: 'center',
  },
  dropdownOptionSelected: {
    backgroundColor: theme.primary,
    borderColor: theme.primary,
  },
  dropdownText: {
    color: theme.text,
    fontWeight: '500',
  },
  dropdownTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Registration;









