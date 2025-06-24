import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { loginUser, signUpWithGoogle } from '../../redux/slices/authSlice';
import Input from '../../common/Input';
import Button from '../../common/Button';
import SafeAreaWrapper from '../../common/SafeAreaWrapper';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import theme from '../../assets/theme';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    try {
      await dispatch(loginUser({ email, password })).unwrap();
      // Navigate to main app after successful login
      navigation.navigate('MainApp');
    } catch (error) {
      console.log('Login failed:', error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      
      if (userInfo.idToken) {
        await dispatch(signUpWithGoogle({ 
          token: userInfo.idToken,
          userInfo: userInfo.user
        })).unwrap();
        navigation.navigate('MainApp');
      }
    } catch (error) {
      console.log('Google Sign In Error:', error);
    }
  };

  return (
    <SafeAreaWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to your account</Text>
        
        {error && <Text style={styles.errorText}>{error}</Text>}
        
        <View style={styles.form}>
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
          
          <Button 
            title="Login" 
            onPress={handleLogin} 
            isLoading={isLoading}
            style={styles.loginButton}
          />
          
          <Button 
            title="Sign in with Google" 
            onPress={handleGoogleSignIn}
            isLoading={isLoading}
            style={styles.googleButton}
            textStyle={styles.googleButtonText}
          />
          
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.registerLink}>Register</Text>
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
  loginButton: {
    backgroundColor: theme.colors.primary,
    marginTop: 10,
  },
  googleButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  googleButtonText: {
    color: '#333',
  },
  errorText: {
    color: theme.colors.error,
    marginBottom: 15,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  registerText: {
    color: theme.colors.text,
  },
  registerLink: {
    color: theme.colors.primary,
    marginLeft: 5,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
