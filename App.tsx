
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import HomeRoutes from './src/screens/homeRoutes';
import AuthRoutes from './src/screens/authRoutes';
import { Provider, useSelector } from 'react-redux';
// import store, { RootState } from "./src/redux/store"
// import { persistor } from "./src/redux/store"
// import { PersistGate } from 'redux-persist/es/integration/react';
import { CartProvider } from './src/contexts/CartContext';

function App(): React.JSX.Element {
  const accessToken = true; // Replace with your actual logic to check for access token
  // const accessToken = useSelector((state: RootState) => state.auth.token);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <CartProvider>

        {/* <Provider store={store}> */}
        {/* <PersistGate loading={null} persistor={persistor}> */}
        <NavigationContainer>
          {accessToken ? <HomeRoutes /> : <AuthRoutes />}
        </NavigationContainer>
        {/* </PersistGate> */}
        {/* </Provider> */}
      </CartProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
