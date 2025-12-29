import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const ChatScreen = ({ navigation }: any) => {
  const scrollRef = useRef<any>();

  const [message, setMessage] = useState('');

  const messages = [
    {
      id: 1,
      text: "Hello! I'm on my way with your order.\nI'll reach in about 10 minutes.",
      time: '10:55 AM',
      isUser: false,
    },
    {
      id: 2,
      text: 'Okay, thanks for the update!',
      time: '10:56 AM',
      isUser: true,
    },
    {
      id: 3,
      text: 'Could you please share your exact location?',
      time: '10:57 AM',
      isUser: false,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      {/* ================= HEADER ================= */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Image source={require('../../../assets/back.png')} style={styles.backIcon} />
        </TouchableOpacity>

        <View style={styles.headerText}>
          <Text style={styles.name}>Mann Sharma</Text>
          <Text style={styles.status}>Delivery Partner • Online</Text>
        </View>

        <TouchableOpacity style={styles.callBtn}>
          <Image source={require('../../../assets/call.png')} style={styles.callIcon} />
        </TouchableOpacity>
      </View>

      {/* ================= CHAT ================= */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={styles.chatContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map(item => (
            <View
              key={item.id}
              style={[
                styles.bubble,
                item.isUser ? styles.userBubble : styles.otherBubble,
              ]}
            >
              <Text
                style={[
                  styles.message,
                  item.isUser && { color: '#fff' },
                ]}
              >
                {item.text}
              </Text>
              <Text
                style={[
                  styles.time,
                  item.isUser && { color: 'rgba(255,255,255,0.8)' },
                ]}
              >
                {item.time}
              </Text>
            </View>
          ))}
        </ScrollView>

        {/* ================= INPUT ================= */}
        <View style={styles.inputWrapper}>
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message..."
            placeholderTextColor="#999"
            style={styles.input}
            multiline
          />

          <TouchableOpacity
            style={[
              styles.sendBtn,
              message.trim() && { backgroundColor: '#f58220' },
            ]}
          >
            <Image
              source={require('../../../assets/send.png')}
              style={styles.sendIcon}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  /* ================= HEADER ================= */

  header: {
    position: 'absolute',
    top: 50,
    left: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 18,
    elevation: 6,
    zIndex: 10,
  },

  backBtn: {
    width: 34,
    height: 34,
   
  },

  backIcon: {
    width: 22,
    height: 22,
  },

  headerText: {
    flex: 1,
    marginLeft: 12,
  },

  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },

  status: {
    fontSize: 12,
    marginTop: 2,
    color: '#2da44e',
    fontWeight: '600',
  },

  callBtn: {
    width: 34,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
  },

  callIcon: {
    width: 22,
    height: 22,
    tintColor: '#f58220',
  },

  /* ================= CHAT ================= */

  chatContent: {
    paddingTop: 140,
    paddingHorizontal: 16,
    paddingBottom: 120,
  },

  bubble: {
    maxWidth: width * 0.78,
    padding: 14,
    borderRadius: 18,
    marginBottom: 16,
  },

  otherBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#f1f3f6',
    borderBottomLeftRadius: 6,
  },

  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#f58220',
    borderBottomRightRadius: 6,
  },

  message: {
    fontSize: 14,
    color: '#222',
    lineHeight: 20,
  },

  time: {
    fontSize: 11,
    marginTop: 6,
    color: '#777',
  },

  /* ================= INPUT ================= */

  inputWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'flex-end',
  },

  input: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    borderRadius: 28,
    paddingHorizontal: 18,
    paddingVertical: 14,
    fontSize: 14,
    maxHeight: 120,
    marginRight: 12,
  },

  sendBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },

  sendIcon: {
    width: 22,
    height: 22,
    tintColor: '#fff',
  },
});
