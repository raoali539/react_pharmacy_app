import React from 'react';
import { View, StyleSheet, ScrollView, StatusBar, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn } from 'react-native-reanimated';
import theme from '../../assets/theme';
import { heightPercentageToDP as hp } from '../../utils/globalFunctions';
import Categories from '../../components/Home/Categories';
import SearchBar from '../../components/Home/SearchBar';


const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Platform.select({
          ios: 'transparent',
          android: theme.background,
        })}
      />
      
      <Animated.View 
        entering={FadeIn}
        style={styles.container}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <SearchBar />
          {/* <Categories onSelectCategory={(category) => console.log(category)} /> */}
          {/* <FeaturedProducts /> */}
          {/* <PopularProducts /> */}
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.background,
  },
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  scrollContent: {
    paddingTop: hp(2),
    paddingBottom: hp(10),
  },
});

export default HomeScreen;