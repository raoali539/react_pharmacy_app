import React, { useRef, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import Header from '../../../../common/Header';
import { commonStyles } from '../../../../assets/commonStyles';
import { useNavigation } from '@react-navigation/native';

const messages = [
  { id: '1', text: 'available?', time: '1:51 PM', sent: false },
  { id: '2', text: 'mjhy chaye', time: '1:52 PM', sent: true },
  { id: '3', text: 'kitne chahiye?', time: '1:53 PM', sent: false },
  { id: '4', text: '2 packs', time: '1:54 PM', sent: true },
  { id: '5', text: 'kal mil jayenge', time: '1:55 PM', sent: false },
  { id: '6', text: 'ok thanks', time: '1:56 PM', sent: true },
  { id: '7', text: 'address bhej dein', time: '1:57 PM', sent: false },
  { id: '8', text: 'main bhejta hoon', time: '1:58 PM', sent: true },
  { id: '9', text: 'payment cash ya online?', time: '1:59 PM', sent: false },
  { id: '10', text: 'cash', time: '2:00 PM', sent: true },
];

const ChatScreen = () => {
  const navigation = useNavigation();
  const [chatMessages, setChatMessages] = useState(messages);
  const [input, setInput] = useState('');
  const flatListRef = useRef<FlatList<any>>(null);

  const handleSend = () => {
    if (input.trim() === '') return;
    const newMessage = {
      id: (chatMessages.length + 1).toString(),
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sent: true,
    };
    setChatMessages([newMessage, ...chatMessages]);
    setInput('');
    setTimeout(() => {
      flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    }, 100);
  };

  const renderItem = ({ item }: { item: { id: string; text: string; time: string; sent: boolean } }) => (
    <View style={item.sent ? styles.sentMessage : styles.receivedMessage}>
      <Text style={[styles.messageText, item.sent && styles.sentMessageText]}>{item.text}</Text>
      <Text style={[styles.timeText, item.sent && styles.sentMessageText]}>{item.time}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header
        leftIcon='arrow-left'
        title="Zohair Rao"
        leftIconType='feather'
        containerStyle={commonStyles.headerContainer}
        onLeftPress={() => {
          navigation.goBack();
        }}
        showSearch={false}
      />
      <FlatList
        ref={flatListRef}
        data={chatMessages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.chatContainer}
        inverted
      />
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <Text style={styles.emojiButton}>😊</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          placeholderTextColor="#aaa"
          value={input}
          onChangeText={setInput}
          returnKeyType="send"
          onSubmitEditing={handleSend}
        />
        <TouchableOpacity style={styles.iconButton} onPress={handleSend} activeOpacity={input.trim() ? 0.7 : 1} disabled={!input.trim()}>
          <Text style={[styles.sendButton, !input.trim() && { opacity: 0.4 }]}>➤</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Text style={styles.micButton}>🎙️</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 10, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  backButton: { fontSize: 20, marginRight: 10 },
  profileImage: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  userName: { fontSize: 18, fontWeight: 'bold', flex: 1 },
  menuButton: { fontSize: 20 },
  chatContainer: { padding: 10, flexGrow: 1, justifyContent: 'flex-end' },
  receivedMessage: { backgroundColor: '#e0e0e0', padding: 12, borderRadius: 16, maxWidth: '75%', marginBottom: 10, alignSelf: 'flex-start', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 2, },
  sentMessage: { backgroundColor: '#000', padding: 12, borderRadius: 16, maxWidth: '75%', marginBottom: 10, alignSelf: 'flex-end', shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 2, },
  messageText: { fontSize: 16, color: '#000' },
  sentMessageText: { color: '#fff' },
  timeText: { fontSize: 12, color: '#888', textAlign: 'right', marginTop: 4 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fafafa',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 2,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 1,
  },
  emojiButton: { fontSize: 22 },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    color: '#222',
    backgroundColor: '#fff',
    marginHorizontal: 6,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.02,
    shadowRadius: 1,
  },
  sendButton: {
    fontSize: 22,
    color: '#ff4d4d',
    fontWeight: 'bold',
    marginLeft: 2,
  },
  micButton: {
    fontSize: 20,
    color: '#ff4d4d',
    marginLeft: 2,
  },
});

export default ChatScreen;