import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  TextInput,
  Platform,
} from 'react-native';
import { Icon } from '@rneui/base';
import theme, { TYPOGRAPHY_STYLES } from '../../assets/theme';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../utils/globalFunctions';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeInRight, Layout, FadeInDown } from 'react-native-reanimated';
import { commonStyles } from '../../assets/commonStyles';

interface ChatPreview {
  id: string;
  recipientId: string;
  recipientName: string;
  lastMessage: string;
  timestamp: Date;
  unreadCount: number;
  avatar?: string;
}

const ChatListScreen = () => {
  const navigation = useNavigation<any>(); // TODO: Add proper navigation type
  // Replace with actual chat data from your backend
  const chats: ChatPreview[] = [
    {
      id: '1',
      recipientId: 'v1',
      recipientName: 'HealthCare Pharmacy',
      lastMessage: 'Is this product still available?',
      timestamp: new Date(),
      unreadCount: 2,
      avatar: 'https://example.com/avatar1.jpg',
    },
    // Add more chat previews...
  ];

  const navigateToChat = (chat: ChatPreview) => {
    navigation.navigate('ChatConversation', {
      recipientId: chat.recipientId,
      recipientName: chat.recipientName,
    });
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (days === 1) {
      return 'Yesterday';
    } else if (days < 7) {
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  const renderChatItem = ({ item }: { item: ChatPreview }) => (
    <Animated.View
      entering={FadeInRight}
      layout={Layout.springify()}
    >
      <TouchableOpacity 
        style={[styles.chatItem, item.unreadCount > 0 && styles.unreadChatItem]}
        onPress={() => navigateToChat(item)}
        activeOpacity={0.7}
      >
        <View style={styles.avatarContainer}>
          {item.avatar ? (
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>
                {item.recipientName.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
          {item.unreadCount > 0 && (
            <View style={styles.onlineIndicator} />
          )}
        </View>

        <View style={styles.chatInfo}>
          <View style={styles.chatHeader}>
            <Text style={[
              styles.recipientName,
              TYPOGRAPHY_STYLES.h4,
              item.unreadCount > 0 && styles.unreadText
            ]}>
              {item.recipientName}
            </Text>
            <Text style={[
              styles.timestamp,
              TYPOGRAPHY_STYLES.label2,
              item.unreadCount > 0 && styles.unreadTimestamp
            ]}>
              {formatTime(item.timestamp)}
            </Text>
          </View>

          <View style={styles.messagePreview}>
            <Text 
              style={[
                styles.lastMessage,
                TYPOGRAPHY_STYLES.body2,
                item.unreadCount > 0 && styles.unreadText
              ]} 
              numberOfLines={1}
            >
              {item.lastMessage}
            </Text>
            {item.unreadCount > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadCount}>{item.unreadCount}</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
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
        <Text style={[styles.headerTitle, TYPOGRAPHY_STYLES.h4]}>Messages</Text>
        <TouchableOpacity style={styles.iconButton}>
          <View style={styles.iconBackground}>
            <Icon name="edit-2" type="feather" size={22} color={theme.text} />
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
            placeholder="Search messages"
            placeholderTextColor={theme.textLight}
          />
        </View>
      </View>

      {chats.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconContainer}>
            <Icon name="message-circle" type="feather" size={32} color={theme.primary} />
          </View>
          <Text style={[styles.emptyText, TYPOGRAPHY_STYLES.h4]}>No messages yet</Text>
          <Text style={[styles.emptySubtext, TYPOGRAPHY_STYLES.body2]}>
            Start chatting with vendors to get product information
          </Text>
        </View>
      ) : (
        <FlatList
          data={chats}
          renderItem={renderChatItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
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
    marginBottom: hp(2), // Add margin to create space
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
    zIndex: 1, // Add zIndex to ensure proper layering
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.surface,
    borderRadius: 12,
    paddingHorizontal: wp(4),
    height: hp(6),
    marginTop: hp(0.5), // Add some top margin
    ...Platform.select({
      ios: {
        shadowColor: theme.text,
        shadowOffset: { width: 0, height: 2 },
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
    color: theme.text,
    fontSize: wp(3.8),
  },
  listContent: {
    padding: wp(4),
    paddingTop: hp(1),
    flexGrow: 1, // Ensure list takes remaining space
  },
  chatItem: {
    flexDirection: 'row',
    backgroundColor: theme.text,
    borderRadius: theme.borderRadius.xl,
    padding: wp(3.5),
    marginBottom: hp(2),
    ...theme.shadows.base,
  },
  unreadChatItem: {
    backgroundColor: `${theme.text}08`,
    borderLeftWidth: 3,
    borderLeftColor: theme.primary,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: wp(3),
  },
  avatar: {
    width: wp(13),
    height: wp(13),
    borderRadius: wp(6.5),
    backgroundColor: theme.border,
  },
  avatarPlaceholder: {
    width: wp(13),
    height: wp(13),
    borderRadius: wp(6.5),
    backgroundColor: theme.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: theme.surface,
    fontSize: wp(5),
    fontWeight: '600',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: wp(3),
    height: wp(3),
    borderRadius: wp(1.5),
    backgroundColor: theme.success,
    borderWidth: 2,
    borderColor: theme.surface,
  },
  chatInfo: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(0.5),
  },
  recipientName: {
    color: theme.text,
  },
  timestamp: {
    color: theme.text,
  },
  unreadTimestamp: {
    color: theme.text,
    fontWeight: '500',
  },
  messagePreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    flex: 1,
    marginRight: wp(2),
    color: theme.textLight,
  },
  unreadText: {
    color: theme.text,
    fontWeight: '500',
  },
  unreadBadge: {
    minWidth: wp(5),
    height: wp(5),
    borderRadius: wp(2.5),
    backgroundColor: theme.text,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(1.5),
  },
  unreadCount: {
    color: theme.surface,
    fontSize: wp(3),
    fontWeight: '600',
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
    ...theme.shadows.base,
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

export default ChatListScreen;



