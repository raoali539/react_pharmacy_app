
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
} from 'react-native';
import { Icon } from '@rneui/base';
import theme from '../../assets/theme';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../utils/globalFunctions';
import { useNavigation } from '@react-navigation/native';

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
  const navigation = useNavigation();
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
    // navigation.navigate('ChatConversation', {
    //   recipientId: chat.recipientId,
    //   recipientName: chat.recipientName,
    // });
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
            item.unreadCount > 0 && styles.unreadText
          ]}>
            {item.recipientName}
          </Text>
          <Text style={[
            styles.timestamp,
            item.unreadCount > 0 && styles.unreadTimestamp
          ]}>
            {formatTime(item.timestamp)}
          </Text>
        </View>

        <View style={styles.messagePreview}>
          <Text 
            style={[
              styles.lastMessage,
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
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Icon name="search" type="feather" size={22}       />
        </TouchableOpacity>
      </View>

      {chats.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Icon name="message-circle" type="feather" size={64}      />
          <Text style={styles.emptyText}>No messages yet</Text>
          <Text style={styles.emptySubtext}>Start chatting with vendors to get product information</Text>
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
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: wp(4),
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: wp(5),
    fontWeight: '600',
         
  },
  searchButton: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: wp(4),
  },
  chatItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: wp(3),
    marginBottom: hp(2),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  unreadChatItem: {
    backgroundColor: '#fff',
    borderLeftWidth: 3,
    borderLeftColor: theme.active,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: wp(3),
  },
  avatar: {
    width: wp(14),
    height: wp(14),
    borderRadius: wp(7),
    backgroundColor: '#f0f0f0',
  },
  avatarPlaceholder: {
    width: wp(14),
    height: wp(14),
    borderRadius: wp(7),
    backgroundColor: theme.active,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: wp(6),
    fontWeight: '600',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: wp(3),
    height: wp(3),
    borderRadius: wp(1.5),
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#fff',
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
    fontSize: wp(3.8),
    fontWeight: '500',
         
  },
  timestamp: {
    fontSize: wp(3),
         
  },
  unreadTimestamp: {
    color: theme.active,
    fontWeight: '500',
  },
  messagePreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    flex: 1,
    fontSize: wp(3.5),
         
    marginRight: wp(2),
  },
  unreadText: {
         
    fontWeight: '500',
  },
  unreadBadge: {
    minWidth: wp(5),
    height: wp(5),
    borderRadius: wp(2.5),
    backgroundColor: theme.active,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(1.5),
  },
  unreadCount: {
    color: '#fff',
    fontSize: wp(3),
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp(8),
  },
  emptyText: {
    fontSize: wp(5),
    fontWeight: '600',
         
    marginTop: hp(2),
    marginBottom: hp(1),
  },
  emptySubtext: {
    fontSize: wp(3.5),
         
    textAlign: 'center',
    lineHeight: wp(5),
  },
});

export default ChatListScreen;



