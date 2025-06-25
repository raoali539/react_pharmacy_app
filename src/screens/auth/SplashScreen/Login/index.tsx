import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../../../../assets/theme';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../../../utils/globalFunctions';
import { loginUser } from '../../../../redux/slices/authSlice';
import { RootState } from '../../../../redux/store/store';
import { imagePath } from '../../../../assets/imagePath';
import { Picker } from '@react-native-picker/picker';

type NavigationProp = NativeStackNavigationProp<any>;

const Login = () => {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<any>();

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        Alert.alert('Error', 'Please fill in all fields');
        return;
      }
      // Optionally, you can validate userType here if needed
      const resultAction = await dispatch(loginUser({ email, password, userType }) as any);
      if (loginUser.fulfilled.match(resultAction)) {
        navigation.navigate('HomeRoutes');
      } else if (loginUser.rejected.match(resultAction)) {
        Alert.alert('Error', resultAction.payload as string || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Image source={require('../../../../assets/images/logo.jpeg')} style={styles.logo} resizeMode="cover" />
          </View>

          <Text style={styles.title}>DHARMACY</Text>
          <Text style={styles.subtitle}>Welcome to Dharmacy</Text>
          <View style={styles.inputWrapper}>
            <View style={styles.inputContainer}>
              <Icon name="email-outline" size={20} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor={'black'}
              />
            </View>

            <View style={styles.inputContainer}>
              <Icon name="lock-outline" size={20} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                placeholderTextColor={'black'}

              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                <Icon name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} />
              </TouchableOpacity>
            </View>
               <View style={{ marginBottom: hp(2) }}>
            <Text style={{ fontSize: 16, marginBottom: 4, color: 'black' }}>Login as</Text>
            <View style={{
              borderWidth: 1,
              borderColor: theme.border,
              borderRadius: 12,
              backgroundColor: '#F5F6FA',
              overflow: 'hidden',
            }}>
              <Picker
                selectedValue={userType}
                onValueChange={(value)=>{
                  console.log('Selected user type:', value);
                  setUserType(value);
                }}
                style={{ color: 'black' }}
                dropdownIconColor="black"
              >
                <Picker.Item label="User" value="User" />
                <Picker.Item label="Vendor" value="Vendor" />
              </Picker>
            </View>
          </View>
          </View>

       

          <TouchableOpacity 
            style={[styles.button, isLoading && styles.buttonDisabled]} 
            onPress={handleLogin}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>{isLoading ? 'Signing in...' : 'Sign In'}</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity 
            onPress={()=>{}}
            style={styles.forgotPasswordContainer}
          >
            <Text style={styles.linkText}>Forgot Password?</Text>
          </TouchableOpacity> */}

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>Or</Text>
            <View style={styles.divider} />
          </View>
          <TouchableOpacity 
            style={[styles.button12, isLoading && styles.buttonDisabled]} 
            disabled={isLoading}
          >
            <View style={styles.googleButtonContent}>
              <Icon name="google" size={20} style={{
                marginRight: wp(2),
              }} color={'#4285F4'} />
              <Text style={styles.buttonText}>{'Continue with Google'}</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.socialButtonsContainer}>
            {/* <TouchableOpacity style={styles.socialButton}> */}
              {/* <Image source={imagePath.googleIcon} style={styles.socialIcon} /> */}
            {/* </TouchableOpacity> */}
            {/* <TouchableOpacity style={styles.socialButton}> */}
              {/* <Image source={imagePath.appleIcon} style={styles.socialIcon} /> */}
            {/* </TouchableOpacity> */}
            {/* <TouchableOpacity style={styles.socialButton}> */}
              {/* <Image source={imagePath.facebookIcon} style={styles.socialIcon} /> */}
            {/* </TouchableOpacity> */}
          </View>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Registration' as never)}>
              <Text style={styles.registerLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: hp(2.5),
  },
  logoContainer: {
    alignItems: 'center',
    // marginTop: hp(4),
    marginBottom: hp(3),
    width: '100%',
    justifyContent: 'center',
  },
  logo: {
    width: wp(100),
    height: hp(25),
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: hp(1),
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: hp(4),
  },
  inputWrapper: {
    marginBottom: hp(3),
    marginTop: hp(1),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F6FA',
    borderRadius: 12,
    marginBottom: hp(2),
    paddingHorizontal: wp(4),
    height: hp(7),
    borderWidth: 1,
    borderColor: theme.border,
  },
  inputIcon: {
    marginRight: wp(2),
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "black"
    
  },
  eyeIcon: {
    padding: 8,
  },
  button: {
    backgroundColor: theme.background,
    height: hp(5),
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  button12: {
    height: hp(5),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderWidth: 1,
    borderColor: 'black',
  },
  googleButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 12,
    borderColor:'black'
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#737373',
  },
  forgotPasswordContainer: {
    alignItems: 'center',
    marginTop: hp(2),
  },
  linkText: {
    color: theme.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp(3),
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
  },
  dividerText: {
    paddingHorizontal: wp(4),
    fontSize: 14,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: hp(3),
  },
  socialButton: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(6),
    backgroundColor: '#F5F6FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: wp(2),
  },
  socialIcon: {
    width: wp(6),
    height: wp(6),
    resizeMode: 'contain',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    fontSize: 14,
  },
  registerLink: {
    color: theme.primary,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default Login;