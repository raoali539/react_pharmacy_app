import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import { Icon } from '@rneui/base';
import theme from '../../assets/theme';
import { widthPercentageToDP as wp ,heightPercentageToDP as hp } from '../../utils/globalFunctions';

interface FloatingImageProps {
  style?: any;
  delay?: number;
}

const FloatingImage = ({ style, delay = 0 }: FloatingImageProps) => {
  const translateY = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(translateY, {
          toValue: -10,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={[
        style,
        {
          transform: [{ translateY }],
        },
      ]}
    />
  );
};

const EssentialsBanner = () => {
  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.banner}>
    
        <View style={styles.leftContent}>
          <View style={styles.iconContainer}>
            <Icon name="shopping-bag" type="feather" size={24} color="#fff" />
          </View>
          <Text style={styles.title}>SHOP YOUR</Text>
          <Text style={styles.subtitle}>ESSENTIALS</Text>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Shop Now</Text>
            <Icon name="chevron-right" type="feather" size={16} color={theme.active} />
          </View>
        </View>

        <View style={styles.rightContent}>
          <FloatingImage style={[styles.floatingImage, styles.image1]} delay={0} />
          <FloatingImage style={[styles.floatingImage, styles.image2]} delay={500} />
          <FloatingImage style={[styles.floatingImage, styles.image3]} delay={1000} />
        </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: wp(4),
    overflow: 'hidden',
    height: hp(20),
    marginHorizontal: wp(4),
  },
  leftContent: {
    flex: 1,
    justifyContent: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.active,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 14,
    color: theme.active,
    fontWeight: '500',
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.active,
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  buttonText: {
    color: theme.active,
    fontWeight: '600',
    marginRight: 4,
  },
  rightContent: {
    flex: 1,
    position: 'relative',
  },
  floatingImage: {
    position: 'absolute',
    width: wp(15),
    height: wp(15),
    borderRadius: wp(7.5),
  },
  image1: {
    backgroundColor: '#fff',
    top: '10%',
    right: '10%',
  },
  image2: {
    backgroundColor: '#fff',
    top: '40%',
    right: '30%',
  },
  image3: {
    backgroundColor: '#fff',
    top: '60%',
    right: '5%',
  },
});

export default EssentialsBanner;
