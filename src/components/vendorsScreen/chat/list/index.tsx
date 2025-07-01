import React from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ChatList = () => {
    const navigation = useNavigation();
    const chatData = [
        {
            id: '1',
            name: 'Zohaib Nasir Original',
            message: 'Available Bhai?',
            time: '6:42 PM',
            avatar: 'https://imgv3.fotor.com/images/slider-image/A-clear-image-of-a-woman-wearing-red-sharpened-by-Fotors-image-sharpener.jpg',
        },
        {
            id: '2',
            name: 'Omer Aziz Malik',
            message: 'dd',
            time: '1:39 PM',
            avatar: 'https://imgv3.fotor.com/images/slider-image/A-clear-image-of-a-woman-wearing-red-sharpened-by-Fotors-image-sharpener.jpg',
        },
        {
            id: '3',
            name: 'Zohaib Rao',
            message: 'mjhy chaiye',
            time: '8:16 PM',
            avatar: 'https://imgv3.fotor.com/images/slider-image/A-clear-image-of-a-woman-wearing-red-sharpened-by-Fotors-image-sharpener.jpg',
        },
    ];

    const renderChatItem = ({ item }: any) => (
        <TouchableOpacity style={styles.chatItem} onPress={() => {
            // Navigate to chat screen
            navigation.navigate('ChatScreen', { chatId: item.id, recipientName: item.name });
        }}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.chatContent}>
                <View style={styles.chatHeader}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.time}>{item.time}</Text>
                </View>
                <Text style={styles.message}>{item.message}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Recent Chats</Text>
                <TouchableOpacity>
                    <Text style={styles.clearAll}>Clear all</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={chatData}
                renderItem={renderChatItem}
                keyExtractor={(item) => item.id}
                style={styles.chatList}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 20,
        paddingTop: 54, // Account for status bar
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        marginBottom: 8,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#2C3E50',
        letterSpacing: 0.2,
    },
    clearAll: {
        fontSize: 16,
        color: '#E74C3C',
        fontWeight: '600',
        padding: 4,
    },
    chatList: {
        flex: 1,
    },
    listContent: {
        paddingBottom: 16,
    },
    separator: {
        height: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        marginHorizontal: 24,
    },
    chatItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 18,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 2,
        elevation: 1,
    },
    avatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        marginRight: 18,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    chatContent: {
        flex: 1,
        justifyContent: 'center',
    },
    chatHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    name: {
        fontSize: 18,
        fontWeight: '700',
        color: '#2C3E50',
        flex: 1,
        marginRight: 8,
    },
    time: {
        fontSize: 15,
        color: '#95A5A6',
        fontWeight: '500',
        marginLeft: 8,
    },
    message: {
        fontSize: 16,
        color: '#7F8C8D',
        fontWeight: '400',
        marginTop: 2,
        letterSpacing: 0.1,
    },
});

export default ChatList;