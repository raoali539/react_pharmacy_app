
import React from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  Platform,
  StatusBar 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import theme from '../../assets/theme';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../utils/globalFunctions';
import Header from '../../common/Header';

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isRead?: boolean;
}

const NotificationsScreen: React.FC = () => {
  const navigation = useNavigation();

  // Dummy data for notifications
  const [notifications, setNotifications] = React.useState<Notification[]>([
    {
      id: '1',
      title: 'New Order',
      message: 'Your order #123 has been confirmed',
      timestamp: '2 hours ago',
      isRead: false
    },
    {
      id: '2',
      title: 'Delivery Update',
      message: 'Your order is out for delivery',
      timestamp: '5 hours ago',
      isRead: false
    },
  ]);

  const handleNotificationPress = (id: string) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  const renderNotificationItem = ({ item }: { item: Notification }) => (
    <TouchableOpacity 
      style={[
        styles.notificationItem,
        !item.isRead && styles.unreadNotification
      ]}
      onPress={() => handleNotificationPress(item.id)}
      activeOpacity={0.7}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.message}>{item.message}</Text>
      <Text style={styles.timestamp}>{item.timestamp}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Header 
        onMenuPress={() => navigation.goBack()}
        onCartPress={() => navigation.navigate('Cart' as never)}
        hasNotifications={false}
      />
      <FlatList
        data={notifications}
        renderItem={renderNotificationItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContainer: {
    padding: wp(4),

  },
  notificationItem: {
    backgroundColor: '#fff',
    padding: wp(4),
    marginBottom: hp(2),
    borderRadius: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
    borderWidth: 1,
    borderColor: 'green',
  },
  unreadNotification: {
    borderLeftWidth: 4,
    borderLeftColor: theme.active,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: hp(0.5),
  },
  message: {
    fontSize: 14,
    marginBottom: hp(1),
  },
  timestamp: {
    fontSize: 12,
  },
});

export default NotificationsScreen;
