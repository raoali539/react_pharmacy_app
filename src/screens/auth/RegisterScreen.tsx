import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { registerUser } from '../../redux/slices/authSlice';
import Input from '../../common/Input';
import Button from '../../common/Button';
import SafeAreaWrapper from '../../common/SafeAreaWrapper';
import theme from '../../assets/theme';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);
  const navigation = useNavigation();

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    
    try {
      await dispatch(registerUser({ name, email, password })).unwrap();
      navigation.navigate('MainApp');
    } catch (error) {
      console.log('Registration failed:', error);
    }
  };

  return (
    <SafeAreaWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Sign up to get started</Text>
        
        {error && <Text style={styles.errorText}>{error}</Text>}
        
        <View style={styles.form}>
          <Input
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
          />
          
          <Input
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <Input
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          
          <Input
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          
          <Button 
            title="Register" 
            onPress={handleRegister} 
            isLoading={isLoading}
            style={styles.registerButton}
          />
          
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: theme.colors.primary,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: 30,
  },
  form: {
    width: '100%',
    gap: 15,
  },
  registerButton: {
    backgroundColor: theme.colors.primary,
    marginTop: 10,
  },
  errorText: {
    color: theme.colors.error,
    marginBottom: 15,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginText: {
    color: theme.colors.text,
  },
  loginLink: {
    color: theme.colors.primary,
    marginLeft: 5,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
