import {
  withTiming,
  withSpring,
  withDelay,
  Easing,
  WithSpringConfig,
  WithTimingConfig,
} from 'react-native-reanimated';
import theme from '../assets/theme';

// Standard spring configuration for natural-feeling animations
export const SPRING_CONFIG: WithSpringConfig = {
  damping: 20,
  mass: 1,
  stiffness: 200,
  overshootClamping: false,
  restDisplacementThreshold: 0.01,
  restSpeedThreshold: 2,
};

// Standard timing configurations for different durations
export const TIMING_CONFIG: Record<keyof typeof theme.animation, WithTimingConfig> = {
  fast: {
    duration: theme.animation.fast,
    easing: Easing.bezier(0.4, 0, 0.2, 1), // Material Design standard easing
  },
  normal: {
    duration: theme.animation.normal,
    easing: Easing.bezier(0.4, 0, 0.2, 1),
  },
  slow: {
    duration: theme.animation.slow,
    easing: Easing.bezier(0.4, 0, 0.2, 1),
  },
};

// Reusable animation functions
export const animations = {
  // Fade animations
  fadeIn: (duration: keyof typeof theme.animation = 'normal') =>
    withTiming(1, TIMING_CONFIG[duration]),
  fadeOut: (duration: keyof typeof theme.animation = 'normal') =>
    withTiming(0, TIMING_CONFIG[duration]),
  
  // Scale animations
  scaleIn: (duration: keyof typeof theme.animation = 'normal') =>
    withSpring(1, SPRING_CONFIG),
  scaleOut: (duration: keyof typeof theme.animation = 'normal') =>
    withTiming(0, TIMING_CONFIG[duration]),
  
  // Translation animations
  slideInRight: (distance: number, duration: keyof typeof theme.animation = 'normal') =>
    withSpring(-distance, SPRING_CONFIG),
  slideOutRight: (distance: number, duration: keyof typeof theme.animation = 'normal') =>
    withTiming(0, TIMING_CONFIG[duration]),
  slideInLeft: (distance: number, duration: keyof typeof theme.animation = 'normal') =>
    withSpring(distance, SPRING_CONFIG),
  slideOutLeft: (distance: number, duration: keyof typeof theme.animation = 'normal') =>
    withTiming(0, TIMING_CONFIG[duration]),
  slideInUp: (distance: number, duration: keyof typeof theme.animation = 'normal') =>
    withSpring(distance, SPRING_CONFIG),
  slideOutUp: (distance: number, duration: keyof typeof theme.animation = 'normal') =>
    withTiming(0, TIMING_CONFIG[duration]),
  
  // Combined animations
  fadeInScale: (duration: keyof typeof theme.animation = 'normal') => {
    'worklet';
    return {
      opacity: withTiming(1, TIMING_CONFIG[duration]),
      transform: [{ scale: withSpring(1, SPRING_CONFIG) }],
    };
  },
  fadeOutScale: (duration: keyof typeof theme.animation = 'normal') => {
    'worklet';
    return {
      opacity: withTiming(0, TIMING_CONFIG[duration]),
      transform: [{ scale: withTiming(0.8, TIMING_CONFIG[duration]) }],
    };
  },
  
  // Delayed animations
  withDelayedFadeIn: (
    delay: number,
    duration: keyof typeof theme.animation = 'normal',
  ) => withDelay(delay, withTiming(1, TIMING_CONFIG[duration])),
  
  withDelayedSpring: (
    delay: number,
    config: Partial<WithSpringConfig> = {},
  ) => withDelay(delay, withSpring(1, { ...SPRING_CONFIG, ...config })),
};

// Animation sequence helper
export const createAnimationSequence = (
  animations: Array<[number, () => void]>,
) => {
  animations.forEach(([delay, animation], index) => {
    setTimeout(animation, delay);
  });
};

// Common animation hooks could be added here
// Example: useAnimatedMount, useAnimatedUnmount, etc.