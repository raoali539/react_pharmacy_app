import React, { useCallback, useMemo } from "react";
import { Platform, TouchableOpacity, View, Animated, Text } from "react-native";
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
    <View style={{ flexDirection: 'row', backgroundColor: '#000000' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const label = options.tabBarLabel || route.name;

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
              color: isFocused ? 'white' : "rgba(255, 255, 255, 0.6)",
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
              {
                flex: 1,
                alignItems: 'center',
                paddingVertical: 8,
              },
              index === 0 && styles.firstButton,
              index === state.routes.length - 1 && styles.lastButton,
            ]}
          >
            {tabBarIcon}
            <Text
              style={{
                color: isFocused ? 'white' : "rgba(255, 255, 255, 0.6)",
                fontSize: 12,
                marginTop: 4,
              }}
            >
              {label}
            </Text>
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
      backgroundColor:theme.active,
      height: Platform.OS === "android"
        ? heightPercentageToDP(12)
        : heightPercentageToDP(13),
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
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#ffffff',
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
              type="material"
              color={color}
              size={22}
            />
          ),
        }}
      />

      {/* Browse All Categories */}
      <Tab.Screen
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
      />

      {/* add to card screen */}
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="shopping-cart"
              type="material"
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
              name="chat"
              type="material"
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
              type="material"
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


