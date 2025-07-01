import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Icon } from '@rneui/base';
import Ionicons from 'react-native-vector-icons/Ionicons';
const UpdateProfileScreen = () => {
  const [name, setName] = useState('Ali Raza');
  const [email, setEmail] = useState('raoali539@gmail.com');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Update Profile</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        {/* Profile Image Section */}
        <View style={styles.profileImageContainer}>
          <View style={styles.profileImageCircle}>
            <View style={styles.cameraIconContainer}>
              <Ionicons name="camera" size={24} color="#ffffff" />
            </View>
          </View>
        </View>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          {/* Name Field */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Name</Text>
            <TextInput
              style={styles.textInput}
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
            />
          </View>

          {/* Email Field */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Email</Text>
            <TextInput
              style={styles.textInput}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Address Field */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Address</Text>
            <TouchableOpacity style={styles.addressInput}>
              <View style={styles.addressContent}>
                <View style={styles.locationIconContainer}>
                  <Ionicons name="location" size={20} color="#E53E5C" />
                </View>
                <View style={styles.addressTextContainer} />
                <Ionicons name="chevron-forward" size={20} color="#666" />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Update Button */}
        <TouchableOpacity style={styles.updateButton}>
          <Text style={styles.updateButtonText}>Update</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E5E5',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  placeholder: {
    width: 34,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 40,
  },
  profileImageCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E53E5C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    flex: 1,
  },
  fieldContainer: {
    marginBottom: 25,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginBottom: 12,
  },
  textInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#000',
    borderWidth: 0,
  },
  addressInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  addressContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIconContainer: {
    marginRight: 12,
  },
  addressTextContainer: {
    flex: 1,
  },
  updateButton: {
    backgroundColor: '#E53E5C',
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  updateButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default UpdateProfileScreen;