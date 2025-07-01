// Import necessary modules and components
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CartScreen from "../cart/CartScreen/CartScreen";
import CheckoutScreen from "../cart/CheckoutScreen/CheckoutScreen";
import BottomTab from "../bottomTab";
import NotificationsScreen from "../notifications/NotificationsScreen";
import ProductDetails from "../products/ProductDetails";
import ShowProducts from "../products/ShowProducts";
import BrowseProducts from "../products/BrowseProducts";
import ChatConversationScreen from "../chat/ChatConversationScreen";
import Login from "../auth/SplashScreen/Login";
import Registration from "../auth/Registration";
import OrdersScreen from "../orders/OrdersScreen";
import VendorBottomTab from "../bottomTab/vendor";
import VendorAllProducts from "../../components/vendorsScreen/home/allProducts";
import ChatScreen from "../../components/vendorsScreen/chat/oneToOne";
import AddProductForm from "../../components/products/AddProductForm";
import VendorProductDetail from "../../components/vendorsScreen/home/productDetail";
import SettingsScreen from "../settings/SettingScreen";
import VendorSettingsScreen from "../../components/vendorsScreen/setting";

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
    component: VendorBottomTab,
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
    name: "VendorAllProducts",
    component: VendorAllProducts,
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
    name: "Orders",
    component: OrdersScreen,
    options: {
      headerShown: false,
      title: "My Orders",
      headerTitleAlign: "center",
    },
  },
  {
    name: "ChatConversation",
    component: ChatConversationScreen,
    options: {
      headerShown: false,
      title: "Chat",
      headerTitleAlign: "center",
    },
  },
    {
    name: "ChatScreen",
    component: ChatScreen,
    options: {
      headerShown: false,
      title: "Chat",
      headerTitleAlign: "center",
    },
  },
  // AddProduct
  {
    name: "AddProduct",
    component: AddProductForm,
    options: {
      headerShown: false,
      title: "Add Product",
      headerTitleAlign: "center",
    },
  },
  {
    name: "VendorProductDetail",
    component: VendorProductDetail,
    options: {
      headerShown: false,
      title: "Product Details",
      headerTitleAlign: "center",
    },
  },
  {
    name: "Settings",
    component: VendorSettingsScreen,
    options: {
      headerShown: false,
      title: "Settings",
      headerTitleAlign: "center",
    },
  },
  { name: "Login", component: Login, options: headerShownFalse },
  { name: "Register", component: Registration, options: headerShownFalse },
];

/**
 * HomeRoutes component manages the stack navigation for the main app flow.
 * It defines the navigation stack for the home screen and related screens.
 *
 * @component
 * @returns {React.ReactElement} The home stack navigator.
 */
const VendorRoutes = () => (
  <HomeStack.Navigator screenOptions={{ headerShown: false }}>
    {homeStackScreens.map(({ name, component, options }) => (
      <HomeStack.Screen
        key={name}
        name={name}
        component={component}
        options={options}
      />
    ))}
  </HomeStack.Navigator>
);

export default VendorRoutes;
