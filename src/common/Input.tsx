import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';
import { Icon } from '@rneui/themed';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../utils/globalFunctions';
import theme from '../assets/theme';
import { TYPOGRAPHY_STYLES } from '../assets/theme';

interface InputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  leftIcon?: string;
  rightIcon?: string;
  onRightIconPress?: () => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  style?: object;
  multiline?: boolean;
}

const Input: React.FC<InputProps> = ({
  value,
  onChangeText,
  placeholder,
  label,
  error,
  leftIcon,
  rightIcon,
  onRightIconPress,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  style,
  multiline = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isSecureTextVisible, setIsSecureTextVisible] = useState(!secureTextEntry);

  const inputHeight = multiline ? hp(15) : hp(7);

  const toggleSecureText = () => {
    setIsSecureTextVisible(!isSecureTextVisible);
  };

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={[styles.label, TYPOGRAPHY_STYLES.label1]}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          { height: inputHeight },
          isFocused && styles.focusedInput,
          error && styles.errorInput,
        ]}
      >
        {leftIcon && (
          <Icon
            name={leftIcon}
            type="feather"
            size={20}
            color={error ? theme.error : isFocused ? theme.primary : theme.textLight}
            style={styles.leftIcon}
          />
        )}
        <TextInput
          style={[styles.input, TYPOGRAPHY_STYLES.body1]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.textLight}
          secureTextEntry={secureTextEntry && !isSecureTextVisible}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          multiline={multiline}
        />
        {secureTextEntry ? (
          <TouchableOpacity onPress={toggleSecureText} style={styles.rightIcon}>
            <Icon
              name={isSecureTextVisible ? 'eye' : 'eye-off'}
              type="feather"
              size={20}
              color={theme.textLight}
            />
          </TouchableOpacity>
        ) : (
          rightIcon && (
            <TouchableOpacity
              onPress={onRightIconPress}
              style={styles.rightIcon}
              disabled={!onRightIconPress}
            >
              <Icon name={rightIcon} type="feather" size={20} color={theme.textLight} />
            </TouchableOpacity>
          )
        )}
      </View>
      {error && (
        <Text style={[styles.errorText, TYPOGRAPHY_STYLES.caption]}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: hp(2),
  },
  label: {
    color: theme.text,
    marginBottom: hp(1),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.surface,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.border,
    paddingHorizontal: wp(4),
  },
  focusedInput: {
    borderColor: theme.primary,
    ...theme.shadows.sm,
  },
  errorInput: {
    borderColor: theme.error,
  },
  input: {
    flex: 1,
    color: theme.text,
    padding: 0,
  },
  leftIcon: {
    marginRight: wp(2),
  },
  rightIcon: {
    marginLeft: wp(2),
    padding: wp(1),
  },
  errorText: {
    color: theme.error,
    marginTop: hp(0.5),
  },
});

export { Input };