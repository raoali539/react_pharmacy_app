import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import {Icon} from '@rneui/base';
import theme from '../../assets/theme';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from '../../utils/globalFunctions';
import {useNavigation, useRoute} from '@react-navigation/native';

interface Message {
  id: string;
  text: string;
  timestamp: Date;
  sender: 'user' | 'other';
}

const ChatConversationScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const {recipientName} = route.params;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! How can I help you today?',
      timestamp: new Date(),
      sender: 'other',
    },
  ]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: message.trim(),
        timestamp: new Date(),
        sender: 'user',
      };
      setMessages(prev => [...prev, newMessage]);
      setMessage('');
    }
  };

  const renderMessage = ({item}: {item: Message}) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === 'user' ? styles.userMessage : styles.otherMessage,
      ]}>
      <Text style={styles.messageText}>{item.text}</Text>
      <Text style={styles.timestamp}>
        {item.timestamp.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}>
          <Icon
            name="arrow-left"
            type="feather"
            size={wp(6)}
            color={theme.text}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{recipientName}</Text>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.messageList}
          inverted={false}
          showsVerticalScrollIndicator={false}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message..."
            placeholderTextColor={theme.text}
            multiline
            maxLength={1000}
          />
          <TouchableOpacity
            style={[styles.sendButton, !message.trim() && styles.sendButtonDisabled]}
            onPress={sendMessage}
            disabled={!message.trim()}>
            <Icon
              name="send"
              type="feather"
              size={wp(5)}
              color={message.trim() ? theme.text : theme.text + '80'}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.background,
  },
  container: {
    flex: 1,
  },
  messageList: {
    padding: wp(4),
    paddingBottom: hp(2),
  },
  messageContainer: {
    maxWidth: '75%',
    padding: wp(4),
    borderRadius: wp(5),
    marginBottom: hp(1.5),
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: theme.text,
    borderBottomRightRadius: wp(1),
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: theme.border,
    borderBottomLeftRadius: wp(1),
  },
  messageText: {
    color: 'black',
    fontSize: wp(4),
    lineHeight: wp(5.5),
  },
  timestamp: {
    color: 'black',
    fontSize: wp(3),
    alignSelf: 'flex-end',
    marginTop: hp(0.8),
  },
  inputContainer: {
    flexDirection: 'row',
    padding: wp(3),
    paddingHorizontal: wp(8),
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: theme.border,
    backgroundColor: theme.background,
  },
  input: {
    backgroundColor: theme.border,
    borderRadius: wp(6),
    paddingHorizontal: wp(4),
    paddingVertical: wp(3),
    marginRight: wp(3),
    fontSize: wp(4),
    minHeight: wp(12),
    maxHeight: hp(15),
    color: theme.text,
    width: '80%',
  },
  sendButton: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(6),
    backgroundColor: 'rgba(0,0,0,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.border,
    backgroundColor: theme.background,
  },
  backButton: {
    padding: wp(2),
    marginRight: wp(2),
  },
  headerTitle: {
    fontSize: wp(4.5),
    fontWeight: '600',
    color: theme.text,
    flex: 1,
  },
});

export default ChatConversationScreen;
