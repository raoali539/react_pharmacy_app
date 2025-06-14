import React, { useCallback, useMemo } from "react";
import { Platform, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { BottomTabBarProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import theme from "../../assets/theme";
import { heightPercentageToDP } from "../../utils/globalFunctions";
import SettingsScreen from "../settings/SettingScreen";
import Home from "../HomeScreen/Home";
import BrowseProducts from "../products/BrowseProducts";
import CartScreen from "../cart/CartScreen/CartScreen";
import ChatListScreen from "../chat/ChatListScreen";
import OrdersScreen from "../orders/OrdersScreen";
import { Icon } from "@rneui/base";

const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <View style={styles.tabBarContainer}>
      <View style={styles.tabBarContent}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = useCallback(() => {
            navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            navigation.navigate(route.name);
          }, [navigation, route.key, route.name]);

          const tabBarIcon = useMemo(() => {
            return options.tabBarIcon
              ? options.tabBarIcon({
                color: isFocused ? theme.primary : "rgba(255, 255, 255, 0.7)",
                focused: isFocused,
                size: 24,
              })
              : null;
          }, [options, isFocused]);

          return (
            <TouchableOpacity
              key={index}
              onPress={onPress}
              activeOpacity={0.7}
              style={[
                styles.tabButton,
                isFocused && styles.tabButtonActive
              ]}
            >
              <View style={styles.iconContainer}>
                {tabBarIcon}
                {isFocused && <View style={styles.activeDot} />}
              </View>
              <Text
                style={[
                  styles.tabLabel,
                  isFocused && styles.tabLabelActive
                ]}
              >
                {typeof options.tabBarLabel === 'string' ? options.tabBarLabel : route.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

function BottomTab() {
  const Tab = createBottomTabNavigator();

  const tabBarStyle = useMemo(
    () => ({
      backgroundColor: '#000000',
      height: Platform.OS === "android"
        ? heightPercentageToDP(10)
        : heightPercentageToDP(11),
      borderTopWidth: 0,
      position: 'absolute' as const,
      left: 8,
      right: 8,
      bottom: Platform.OS === 'ios' ? 24 : 0,
      elevation: 0,
      borderRadius: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 8,
    }),
    [],
  );

  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: "#5A5A5A",
        tabBarStyle: tabBarStyle,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="home"
              type="material"
              color={focused ? theme.primary : "#5A5A5A"}
              size={22}
            />
          ),
        }}
      />

      {/* Browse All Categories */}
      {/* <Tab.Screen
        name="Browse"
        component={BrowseProducts}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="apps"
              type="material"
              color={color}
              size={22}
            />
          ),
        }}
      /> */}

      {/* add to card screen */}
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="shopping-cart"
              type="material"
              color={focused ? theme.primary : "#5A5A5A"}
              size={22}
            />
          ),
        }}
      />

      {/* Orders Tab */}
      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="receipt"
              type="material"
              color={focused ? theme.primary : "#5A5A5A"}
              size={22}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Messages"
        component={ChatListScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="chat"
              type="material"
              color={focused ? theme.primary : "#5A5A5A"}
              size={22}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="settings"
              type="material"
              color={focused ? theme.primary : "#5A5A5A"}
              size={22}
            />
          ),
        }}
      />

    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 24 : 16,
    left: 8,
    right: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    height: Platform.OS === "android"
      ? heightPercentageToDP(8)
      : heightPercentageToDP(9),
    ...theme.shadows.lg,
  },
  tabBarContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: '100%',
    paddingHorizontal: 5,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    position: 'relative',
  },
  tabButtonActive: {
    transform: [{scale: 1.1}],
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  activeDot: {
    position: 'absolute',
    bottom: -8,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.primary,
  },
  tabLabel: {
    fontSize: theme.fontSizes.xs,
    fontWeight: '600',
    color: "#5A5A5A",
    marginTop: 2,
  },
  tabLabelActive: {
    color: theme.primary,
    fontWeight: '700',
  },
});

export default BottomTab;


