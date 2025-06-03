import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Icon } from '@rneui/themed';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../utils/globalFunctions';
import theme from '../assets/theme';
import { TYPOGRAPHY_STYLES } from '../assets/theme';
import Button from './Button';

interface EmptyStateProps {
  icon: string;
  title: string;
  description?: string;
  buttonTitle?: string;
  onButtonPress?: () => void;
  containerStyle?: object;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  buttonTitle,
  onButtonPress,
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.iconContainer}>
        <Icon name={icon} type="feather" size={32} color={theme.primary} />
      </View>
      <Text style={[styles.title, TYPOGRAPHY_STYLES.h3]}>{title}</Text>
      {description && (
        <Text style={[styles.description, TYPOGRAPHY_STYLES.body2]}>
          {description}
        </Text>
      )}
      {buttonTitle && onButtonPress && (
        <Button
          title={buttonTitle}
          onPress={onButtonPress}
          variant="primary"
          style={styles.button}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp(8),
  },
  iconContainer: {
    width: wp(20),
    height: wp(20),
    borderRadius: wp(10),
    backgroundColor: `${theme.primary}10`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(3),
    ...theme.shadows.base,
  },
  title: {
    color: theme.text,
    marginBottom: hp(1),
    textAlign: 'center',
  },
  description: {
    color: theme.textLight,
    textAlign: 'center',
    maxWidth: wp(70),
    marginBottom: hp(3),
  },
  button: {
    minWidth: wp(50),
  },
});