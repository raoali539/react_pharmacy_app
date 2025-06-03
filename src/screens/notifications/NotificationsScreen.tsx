import React from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  Platform,
  StatusBar,
  TextInput 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/base';
import theme, { TYPOGRAPHY_STYLES } from '../../assets/theme';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../utils/globalFunctions';
import Header from '../../common/Header';
import Animated, { FadeInDown, Layout } from 'react-native-reanimated';
import { commonStyles } from '../../assets/commonStyles';

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isRead?: boolean;
  type?: 'order' | 'delivery' | 'promo' | 'system';
}

const NotificationsScreen: React.FC = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = React.useState('');

  // Dummy data for notifications
  const [notifications, setNotifications] = React.useState<Notification[]>([
    {
      id: '1',
      title: 'Order Confirmed',
      message: 'Your order #123 has been confirmed and is being processed',
      timestamp: '2 hours ago',
      isRead: false,
      type: 'order'
    },
    {
      id: '2',
      title: 'Special Offer',
      message: 'Get 20% off on all health supplements this weekend!',
      timestamp: '5 hours ago',
      isRead: false,
      type: 'promo'
    },
  ]);

  const getIconForType = (type?: string) => {
    switch(type) {
      case 'order': return 'shopping-bag';
      case 'delivery': return 'truck';
      case 'promo': return 'tag';
      default: return 'bell';
    }
  };

  const handleNotificationPress = (id: string) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  const renderNotificationItem = ({ item, index }: { item: Notification; index: number }) => (
    <Animated.View
      entering={FadeInDown.delay(index * 100).springify()}
      layout={Layout.springify()}
    >
      <TouchableOpacity 
        style={[
          styles.notificationItem,
          !item.isRead && styles.unreadNotification
        ]}
        onPress={() => handleNotificationPress(item.id)}
        activeOpacity={0.7}
      >
        <View style={[
          styles.iconContainer,
          !item.isRead && styles.unreadIconContainer
        ]}>
          <Icon 
            name={getIconForType(item.type)} 
            type="feather" 
            size={20} 
            color={!item.isRead ? theme.primary : theme.textLight} 
          />
        </View>
        <View style={styles.contentContainer}>
          <Text style={[styles.title, TYPOGRAPHY_STYLES.h4, !item.isRead && styles.unreadText]}>
            {item.title}
          </Text>
          <Text style={[styles.message, TYPOGRAPHY_STYLES.body2]}>
            {item.message}
          </Text>
          <Text style={[styles.timestamp, TYPOGRAPHY_STYLES.label2]}>
            {item.timestamp}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  const EmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconContainer}>
        <Icon name="bell-off" type="feather" size={32} color={theme.primary} />
      </View>
      <Text style={[styles.emptyText, TYPOGRAPHY_STYLES.h4]}>No notifications yet</Text>
      <Text style={[styles.emptySubtext, TYPOGRAPHY_STYLES.body2]}>
        We'll notify you when something arrives
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.background} />
      <Animated.View 
        entering={FadeInDown.duration(500)}
        style={styles.header}
      >
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={() => navigation.goBack()}
        >
          <View style={styles.iconBackground}>
            <Icon name="arrow-left" type="feather" size={22} color={theme.text} />
          </View>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, TYPOGRAPHY_STYLES.h4]}>Notifications</Text>
        <TouchableOpacity style={styles.iconButton}>
          <View style={styles.iconBackground}>
            <Icon name="settings" type="feather" size={22} color={theme.text} />
          </View>
        </TouchableOpacity>
      </Animated.View>
      
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Icon 
            name="search" 
            type="feather" 
            size={20} 
            color={theme.textLight} 
            style={styles.searchIcon} 
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search notifications"
            placeholderTextColor={theme.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {notifications.length > 0 ? (
        <FlatList
          data={notifications}
          renderItem={renderNotificationItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <EmptyState />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
    backgroundColor: theme.background,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  iconButton: {
    padding: wp(2),
  },
  iconBackground: {
    backgroundColor: theme.surface,
    padding: wp(2),
    borderRadius: wp(3),
    ...Platform.select({
      ios: {
        shadowColor: theme.text,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    marginHorizontal: wp(2),
    color: theme.text,
  },
  searchContainer: {
    paddingHorizontal: wp(4),
    marginBottom: hp(2),
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.surface,
    borderRadius: wp(3),
    paddingHorizontal: wp(4),
    height: hp(6),
    ...Platform.select({
      ios: {
        shadowColor: theme.text,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  searchIcon: {
    marginRight: wp(2),
  },
  searchInput: {
    flex: 1,
    fontSize: wp(3.8),
    color: theme.text,
  },
  listContainer: {
    padding: wp(4),
  },
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: theme.surface,
    padding: wp(4),
    marginBottom: hp(2),
    borderRadius: wp(4),
    ...Platform.select({
      ios: {
        shadowColor: theme.text,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  unreadNotification: {
    backgroundColor: `${theme.primary}08`,
    borderLeftWidth: 3,
    borderLeftColor: theme.primary,
  },
  iconContainer: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    backgroundColor: `${theme.primary}10`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(3),
  },
  unreadIconContainer: {
    backgroundColor: `${theme.primary}15`,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    marginBottom: hp(0.5),
    color: theme.text,
  },
  unreadText: {
    color: theme.primary,
    fontWeight: '600',
  },
  message: {
    marginBottom: hp(1),
    color: theme.textLight,
  },
  timestamp: {
    color: theme.textLight,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp(8),
  },
  emptyIconContainer: {
    width: wp(20),
    height: wp(20),
    borderRadius: wp(10),
    backgroundColor: `${theme.primary}10`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(3),
    ...Platform.select({
      ios: {
        shadowColor: theme.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  emptyText: {
    marginBottom: hp(1),
    textAlign: 'center',
    color: theme.text,
  },
  emptySubtext: {
    textAlign: 'center',
    maxWidth: wp(70),
    color: theme.textLight,
  },
});

export default NotificationsScreen;
