




import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Login from "../auth/SplashScreen/Login";
import Registration from "../auth/Registration";




// Import screens


// Create a native stack navigator
const AuthStack = createNativeStackNavigator();

// Default option for screens without a header
const headerShownFalse = { headerShown: false };

// Define an array of route configurations
export const authStackScreens = [
  { name: "Login", component: Login, options: headerShownFalse },
  { name: "Register", component: Registration, options: headerShownFalse },

];

/**
 * AuthRoutes component manages the stack navigation for authentication-related screens.
 * It defines the navigation flow from splash screen to login, registration, password reset, etc.
 *
 * @component
 * @returns {React.ReactElement} The authentication stack navigator.
 */
const AuthRoutes = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    {authStackScreens.map(({ name, component, options }) => (
      <AuthStack.Screen
        key={name}
        name={name}
        component={component}
        options={options}
      />
    ))}
  </AuthStack.Navigator>
);

export default AuthRoutes;