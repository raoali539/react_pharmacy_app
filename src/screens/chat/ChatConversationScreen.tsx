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
import {useRoute} from '@react-navigation/native';

interface Message {
  id: string;
  text: string;
  timestamp: Date;
  sender: 'user' | 'other';
}

const ChatConversationScreen = () => {
  const route = useRoute<any>();
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
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.messageList}
          inverted={false}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message..."
            placeholderTextColor={theme.textLight}
            multiline
          />
          <TouchableOpacity
            style={[styles.sendButton, !message.trim() && styles.sendButtonDisabled]}
            onPress={sendMessage}
            disabled={!message.trim()}>
            <Icon
              name="send"
              type="feather"
              size={20}
              color={message.trim() ? theme.active : theme.textLight}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  messageList: {
    padding: wp(4),
  },
  messageContainer: {
    maxWidth: '80%',
    padding: wp(3),
    borderRadius: wp(4),
    marginBottom: hp(1),
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: theme.active,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: theme.border,
    color: '#fff',
  },
  messageText: {
    color: '#fff',
    fontSize: wp(3.8),
  },
  timestamp: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: wp(3),
    alignSelf: 'flex-end',
    marginTop: hp(0.5),
  },
  inputContainer: {
    flexDirection: 'row',
    padding: wp(4),
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: theme.border,
  },
  input: {
    flex: 1,
    backgroundColor: theme.border,
    borderRadius: wp(5),
    padding: wp(3),
    paddingRight: wp(10),
    marginRight: wp(2),
    fontSize: wp(3.8),
    maxHeight: hp(15),
    color: theme.text,
  },
  sendButton: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    backgroundColor: 'rgba(0,0,0,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});

export default ChatConversationScreen;
