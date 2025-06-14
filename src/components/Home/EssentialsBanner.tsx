import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Icon } from '@rneui/base';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../utils/globalFunctions';
import theme from '../../assets/theme';
import Animated, { FadeInRight } from 'react-native-reanimated';

const EssentialsBanner = () => {
  return (
    <Animated.View 
      entering={FadeInRight.duration(600)}
      style={styles.container}
    >
      <View style={styles.leftContent}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Daily Essentials</Text>
          <Text style={styles.subtitle}>Up to 50% OFF</Text>
        </View>
        <Text style={styles.description}>
          Get your daily health and wellness products at the best prices
        </Text>
        <TouchableOpacity 
          style={styles.button}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Shop Now</Text>
          <Icon name="arrow-right" type="feather" size={16} color={theme.active} />
        </TouchableOpacity>
      </View>

      <View style={styles.rightContent}>
        <View style={[styles.floatingImage, styles.image1]} />
        <View style={[styles.floatingImage, styles.image2]} />
        <View style={[styles.floatingImage, styles.image3]} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // padding: wp(4),
    backgroundColor: '#FFF',
    marginHorizontal: wp(4),
    borderRadius: 16,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  leftContent: {
    flex: 3,
    justifyContent: 'space-between',
  },
  headerContainer: {
    marginBottom: hp(1),
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: theme.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '800',
    color: theme.primary,
  },
  description: {
    fontSize: 14,
    color: theme.textSecondary,
    lineHeight: 20,
    marginBottom: hp(2),
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${theme.primary}15`,
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  buttonText: {
    color: theme.active,
    fontWeight: '600',
    marginRight: 6,
  },
  rightContent: {
    flex: 2,
    position: 'relative',
  },
  floatingImage: {
    position: 'absolute',
    width: wp(12),
    height: wp(12),
    borderRadius: wp(6),
    backgroundColor: `${theme.primary}30`,
    ...Platform.select({
      ios: {
        shadowColor: theme.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  image1: {
    top: '10%',
    right: '10%',
  },
  image2: {
    top: '40%',
    right: '30%',
  },
  image3: {
    top: '60%',
    right: '5%',
  },
});

export default EssentialsBanner;
