import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import HomeRoutes from './src/screens/homeRoutes';
import AuthRoutes from './src/screens/authRoutes';
import VendorRoutes from './src/screens/vendor/VendorRoutes';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store/store';
import { CartProvider } from './src/contexts/CartContext';

function App(): React.JSX.Element {
  const accessToken = true;
  const role = "vendor"

  let RenderedRoutes;
  if (accessToken) {
    if (role === "vendor") {
      RenderedRoutes = <VendorRoutes />;
    } else if (role === "user") {
      RenderedRoutes = <HomeRoutes />;
    } else {
      RenderedRoutes = <HomeRoutes />;
    }
  } else {
    RenderedRoutes = <AuthRoutes />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <CartProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <NavigationContainer>
              {RenderedRoutes}
            </NavigationContainer>
          </PersistGate>
        </Provider>
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
