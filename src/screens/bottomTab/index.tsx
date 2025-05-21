
import React, { useCallback, useMemo } from "react";
import { Platform, TouchableOpacity, View, Animated } from "react-native";
import { BottomTabBarProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "@rneui/base";
import  {styles}  from "./styles";
import theme from "../../assets/theme";
import { heightPercentageToDP } from "../../utils/globalFunctions";
import SettingsScreen from "../settings/SettingScreen";
import Home from "../HomeScreen/Home";
import BrowseProducts from "../products/BrowseProducts";
import CartScreen from "../cart/CartScreen/CartScreen";
import ChatListScreen from "../chat/ChatListScreen";

const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <View>
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
              color: isFocused ? theme.active : "rgba(255, 255, 255, 0.6)",
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
              index === 0 && styles.firstButton,
              index === state.routes.length - 1 && styles.lastButton,
            ]}
          >
            {tabBarIcon}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

function BottomTab() {
  const Tab = createBottomTabNavigator();

  const tabBarStyle = useMemo(
    () => ({
      backgroundColor: '#000000',
      height: Platform.OS === "android"
        ? heightPercentageToDP(8.2)
        : heightPercentageToDP(9.2),
      borderTopWidth: 0,
      position: 'absolute' as const,
      left: 0,
      right: 0,
      bottom: 0,
      elevation: 0,
      shadowColor: 'transparent',
    }),
    [],
  );

  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.active,
        tabBarInactiveTintColor: "rgba(255, 255, 255, 0.6)",
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
              type="octicon"
              color={color}
              size={22}
                  />
          ),
        }}
      />

      {/* Browse All Categories */}
      <Tab.Screen
        name="BrowseProducts"
        component={BrowseProducts}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="grid"
              type="feather"
              color={color}
              size={22}
                  />
          ),
        }}
      />

      {/* add to card screen */}
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="shopping-bag"
              type="feather"
              color={color}
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
              name="chatbubbles"
              type="ionicon"
              color={color}
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
              type="ionicon"
              color={color}
              size={22}
                  />
          ),
        }}
      />

    </Tab.Navigator>
  );
}

export default BottomTab;


