// Import necessary modules and components
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CartScreen from "../cart/CartScreen/CartScreen";
import BottomTab from "../bottomTab";
import NotificationsScreen from "../notifications/NotificationsScreen";
import ProductDetails from "../products/ProductDetails";
import ShowProducts from "../products/ShowProducts";
import BrowseProducts from "../products/BrowseProducts";
import ChatConversationScreen from "../chat/ChatConversationScreen";

// Default option for screens without a header
const headerShownFalse = { headerShown: false };

// Create a stack navigator for the Home Routes
const HomeStack = createNativeStackNavigator<any & any>();

// List of screens and their corresponding options
export const homeStackScreens: Array<{
  name: string;
  component: React.ComponentType<any>;
  options: object;
}> = [
  // Home screen with bottom tab navigation
  {
    name: "home",
    component: BottomTab,
    options: headerShownFalse,
  },
  {
    name: "Notifications",
    component: NotificationsScreen,
    options: {
      headerShown: false,
    },
  },
  {
    name: "Browse",
    component: BrowseProducts,
    options: {
      headerShown: true,
      title: "All Products",
      headerTitleAlign: "center",
    },
  },
  {
    name: "Cart",
    component: CartScreen,
    options: {
      headerShown: true,
      title: "Shopping Cart",
      headerTitleAlign: "center",
    },
  },
  {
    name: "ShowProducts",
    component: ShowProducts,
    options: {
      headerShown: false,
      title: "Products",
      headerTitleAlign: "center",
    },
  },
  {
    name: "ProductDetails",
    component: ProductDetails,
    options: {
      headerShown: false,
      title: "Product Details",
      headerTitleAlign: "center",
    },
  },
  {
    name: "ChatConversation",
    component: ChatConversationScreen,
    options: {
      headerShown: true,
      title: "Chat",
      headerTitleAlign: "center",
    },
  },
];

/**
 * HomeRoutes component that defines all the routes in the home navigation stack.
 * @returns {JSX.Element} A stack navigator with defined routes.
 */
const HomeRoutes = () => {
  return (
    <>
      <HomeStack.Navigator screenOptions={{ headerShown: true }}>
        {homeStackScreens.map(({ name, component, options }) => (
          <HomeStack.Screen
            key={name.toString()}
            name={name}
            component={component}
            options={options}
          />
        ))}
      </HomeStack.Navigator>
    </>
  );
};

export default HomeRoutes;
