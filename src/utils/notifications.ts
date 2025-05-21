import notifee, { AndroidImportance, EventType } from "@notifee/react-native";
import * as Sentry from "@sentry/react-native";
import messaging, {
  FirebaseMessagingTypes,
} from "@react-native-firebase/messaging";
import { handleGetUserLocationEvent } from "./location";
import { storeFcmTokenInAsyncStorage } from "./fcmToken";
import { deleteKey } from "./api";
import { fetchUnreadNotificationsCount, saveFcmToken } from "@/redux/actions/notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PermissionsAndroid, Platform } from 'react-native';

// Type definition for Notifee detail object
interface NotifeeDetail {
  pressAction?: { id: string };
  [key: string]: any; // For additional properties Notifee might provide
}

/**
 * Creates a Notifee notification channel for Android.
 * This is required for displaying notifications.
 */
export const createNotifeeChannel = async (): Promise<void> => {
  try {
    await notifee.createChannel({
      id: "default",
      name: "Default Channel",
      importance : AndroidImportance.DEFAULT,
    });

    await notifee.createChannel({
      id: "priority",
      name: "Priority Channel",
      importance : AndroidImportance.HIGH,
    });
  } catch (error: unknown) {
    console.error("Error creating Notifee channel:", error);
    Sentry.captureException(error);
  }
};

const requestNotificationPermission = async () => {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      console.log("Notification permission denied");
    }
  }
};

/**
 * Displays a notification using Notifee.
 *
 * @param {string} title - The title of the notification.
 * @param {string} body - The body content of the notification.
 * @param {Record<string, any>} data - Additional data to attach to the notification.
 */
export const displayNotifeeNotification = async (
  title: string = "Notification Title",
  body: string = "Main body content of the notification",
  data: Record<string, any> = {},
): Promise<void> => {
  try {
    await requestNotificationPermission();
    await notifee.requestPermission();
    await notifee.displayNotification({
      title,
      body,
      data,
      android: {
        channelId: "priority",
        pressAction: { id: "default" },
      },
    });
  } catch (error: unknown) {
    console.error("Error displaying notification:", error);
    Sentry.captureException(error);
  }
};

/**
 * Handles background notification events from Notifee.
 *
 * @param {EventType} type - The type of the event.
 * @param {NotifeeDetail} detail - Additional details about the event.
 */
export const handleNotifeeBackgroundEvent = async (
  type: EventType,
  detail: NotifeeDetail,
): Promise<void> => {
  try {
    if (
      type === EventType.ACTION_PRESS &&
      detail?.pressAction?.id === "default"
    ) {
      console.log("User pressed the notification in the background", detail);
    }
  } catch (error: unknown) {
    console.error("Error handling Notifee background event:", error);
    Sentry.captureException(error);
  }
};

/**
 * Sets up Firebase Cloud Messaging (FCM) and handles notifications.
 *
 * @returns {Promise<() => void>} A function to unsubscribe from FCM message listeners.
 */
export const setupNotifications = async (): Promise<() => void> => {
  getUnreadNotificationCountAndSetBadge()
  try {
    // Store FCM token in local storage
    await storeFcmTokenInAsyncStorage();

    await createNotifeeChannel()

    // Handle incoming messages while the app is in the foreground
    const unsubscribe = messaging().onMessage(
      async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
        try {
          notifee.incrementBadgeCount()
          const { notification, data } = remoteMessage;
          const title = notification?.title ?? "Notification";
          const body = notification?.body ?? "You have a new message";

          if (notification) {
            switch (data?.event) {
              case "getUserLocation":
                await handleGetUserLocationEvent();
                break;
              case "keyDelete":
                await deleteKey();
                await displayNotifeeNotification(title, body, data);
                break;
              default:
                await displayNotifeeNotification(title, body, data);
            }
          }
        } catch (error: unknown) {
          console.error("Error handling foreground notification:", error);
          Sentry.captureException(error);
        }
      },
    );

    // Handle messages when the app is in the background or terminated
    messaging().setBackgroundMessageHandler(
      async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
        const { notification, data } = remoteMessage;
          const title = notification?.title ?? "Notification";
          const body = notification?.body ?? "You have a new message";
        try {
          notifee.incrementBadgeCount()
          if (remoteMessage?.data?.event === "getUserLocation") {
            await handleGetUserLocationEvent();
          }else{
            displayNotifeeNotification(title, body, data)
          }
        } catch (error: unknown) {
          console.error("Error handling background notification:", error);
          Sentry.captureException(error);
        }
      },
    );

    

    return unsubscribe;
  } catch (error: unknown) {
    console.error("Error setting up notifications:", error);
    Sentry.captureException(error);
    return () => {}; // Return a no-op function in case of setup failure
  }
};

// Function to send FCM token to the backend after login
export const sendFcmTokenToBackendAfterLogin = async (userId: string) => {
  try {
    const fcmToken = await AsyncStorage.getItem("fcmToken");

    if (!fcmToken) {
      console.log("No FCM Token found in AsyncStorage after login.");
      return;
    }

    if (!userId) {
      console.log("User ID is missing, can't send FCM Token to backend.");
      return;
    }

    // Save the token to the backend now that we have the userId
    const res = await saveFcmToken();
    console.log(res);
    console.log("FCM Token sent to backend after login for user:", userId, res);
  } catch (error) {
    console.log("Error sending FCM Token to backend after login:", error);
    Sentry.captureException(error);
  }
};



export const getUnreadNotificationCountAndSetBadge = async () => {
  const authObj = JSON.parse((await AsyncStorage.getItem("user")) as string);
  if(authObj){
    const res = await fetchUnreadNotificationsCount({
      userId: authObj?._id || "",
      unread: true,
      limit: 1,
      page: 1,
    });
  
    if (res) {
      notifee.setBadgeCount(res.totalResults).then(() => console.log('Badge count set!'));
    }else{
      notifee.setBadgeCount(0)
    }
  }else{
    notifee.setBadgeCount(0)
  }
}
