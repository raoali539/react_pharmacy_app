import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  Platform,
  PermissionsAndroid
} from 'react-native';
import HomeRoutes from './src/screens/homeRoutes';
import AuthRoutes from './src/screens/authRoutes';
import VendorRoutes from './src/screens/vendor/VendorRoutes';
import { useAppSelector } from './src/redux/hooks';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store/store';
import { CartProvider } from './src/contexts/CartContext';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';

function AppContent() {
  const user = useAppSelector((state: any) => state.auth?.user);
  const accessToken = !!user?.token;
  const role = user?.role?.toLowerCase();
  const [testNotifCount, setTestNotifCount] = React.useState(0);
  
  // Enhanced logging for debugging
  console.log('AppContent rendering - User:', user);
  console.log('Access Token:', accessToken);
  console.log('Role:', role);

  // Request notification permissions
  async function requestUserPermission() {
    console.log('Requesting notification permissions...');
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );
      console.log('Android notification permission:', granted === PermissionsAndroid.RESULTS.GRANTED);
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } else if (Platform.OS === 'ios') {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      console.log('iOS notification permission:', enabled);
      return enabled;
    }
    console.log('Android notification permission: granted by default');
    return true;
  }

  async function getFCMToken() {
    try {
      await requestUserPermission();
      const token = await messaging().getToken();
      console.log('FCM Token:', token);
      return token;
    } catch (error) {
      console.error('Failed to get FCM token', error);
      return null;
    }
  }

  async function createNotificationChannel() {
    if (Platform.OS === 'android') {
      console.log('Creating Android notification channel...');
      await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
        vibration: true,
      });
      console.log('Android notification channel created.');
    }
  }

  async function displayLocalNotification(title: string, body: string) {
    try {
      console.log('Displaying notification:', title);
      await notifee.displayNotification({
        title,
        body,
        android: {
          channelId: 'default',
          smallIcon: 'ic_launcher',
          pressAction: {
            id: 'default',
          },
        },
      });
    } catch (e) {
      console.error('Failed to display notification', e);
    }
  }

  // Render navigation routes based on accessToken and role
  const getRoutes = () => {
    if (accessToken) {
      if (role === "vendor") {
        console.log('Rendering VendorRoutes');
        return <VendorRoutes />;
      } else {
        console.log('Rendering HomeRoutes');
        return <HomeRoutes />;
      }
    } else {
      console.log('Rendering AuthRoutes');
      return <AuthRoutes />;
    }
  };

  useEffect(() => {
    const initNotifications = async () => {
      await createNotificationChannel();
      await requestUserPermission();
      await getFCMToken();
    };
    initNotifications();
    
    const unsubscribeToken = messaging().onTokenRefresh(token => {
      console.log('Refreshed FCM Token:', token);
    });
    
    const unsubscribeMessage = messaging().onMessage(async remoteMessage => {
      console.log('Foreground message:', remoteMessage);
      const title = typeof remoteMessage.notification?.title === 'string'
        ? remoteMessage.notification.title
        : typeof remoteMessage.data?.title === 'string'
          ? remoteMessage.data.title
          : 'Notification';
      const body = typeof remoteMessage.notification?.body === 'string'
        ? remoteMessage.notification.body
        : typeof remoteMessage.data?.body === 'string'
          ? remoteMessage.data.body
          : '';
      await displayLocalNotification(title, body);
    });
    
    return () => {
      unsubscribeToken();
      unsubscribeMessage();
    };
  }, []);

  useEffect(() => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Background message:', remoteMessage);
      const title = typeof remoteMessage.notification?.title === 'string'
        ? remoteMessage.notification.title
        : typeof remoteMessage.data?.title === 'string'
          ? remoteMessage.data.title
          : 'Notification';
      const body = typeof remoteMessage.notification?.body === 'string'
        ? remoteMessage.notification.body
        : typeof remoteMessage.data?.body === 'string'
          ? remoteMessage.data.body
          : '';
      await displayLocalNotification(title, body);
    });
  }, []);

  const handleTestNotification = async () => {
    setTestNotifCount(c => c + 1);
    await displayLocalNotification(
      `Test #${testNotifCount + 1}`,
      'Manual notification test successful!'
    );
  };

  return (
    <NavigationContainer 
      key={accessToken ? 'authenticated' : 'guest'}
    >
      {getRoutes()}
      {/* <TouchableOpacity
        style={styles.testButton}
        onPress={handleTestNotification}
      >
        <Text>Test Notification</Text>
      </TouchableOpacity> */}
    </NavigationContainer>
  );
}

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <CartProvider>
        <Provider store={store}>
          {/* Add loading indicator for PersistGate */}
          <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
            <AppContent />
          </PersistGate>
        </Provider>
      </CartProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  testButton: {
    position: 'absolute',
    top: 40,
    right: 10,
    zIndex: 9999,
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
});

export default App;