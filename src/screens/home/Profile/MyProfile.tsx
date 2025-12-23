import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  ScrollView,
  Platform,
  Modal,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../../theme/ThemeContext';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const { width, height } = Dimensions.get('window');

const ProfileEdit = () => {
  const navigation = useNavigation<any>();
  const { theme, colors } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [pickerVisible, setPickerVisible] = useState(false);
  const [profileImage, setProfileImage] = useState<any>(null);

  const userImg = require('../../../assets/user.png');
  const closeIcon = require('../../../assets/close1.png');

  const COLORS = {
    background: isDark ? '#121212' : '#FFFFFF',
    card: isDark ? '#1E1E1E' : '#F5F5F5',
    text: isDark ? '#FFFFFF' : '#000000',
    subText: isDark ? '#AAAAAA' : '#333333',
    placeholder: isDark ? '#777777' : '#999999',
    border: isDark ? '#2C2C2C' : '#EAEAEA',
    primary: '#E8772E',
  };

  const handleSave = () => {
    Alert.alert('Saved', 'Profile updated successfully');
  };

  const pickImage = async (type: 'camera' | 'gallery') => {
    setPickerVisible(false);
    const res =
      type === 'camera'
        ? await launchCamera({ mediaType: 'photo' })
        : await launchImageLibrary({ mediaType: 'photo' });

    if (res?.assets?.[0]) {
      setProfileImage({ uri: res.assets[0].uri });
    }
  };

  const InputBox = ({
    label,
    value,
    onChange,
    keyboardType,
    multiline,
  }: any) => (
    <>
      <Text style={[styles.label, { color: colors.text }]}>
        {label}
      </Text>

      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: COLORS.card,
            shadowColor: isDark ? 'transparent' : '#000',
          },
        ]}
      >
        <TextInput
          value={value}
          onChangeText={onChange}
          keyboardType={keyboardType}
          multiline={multiline}
          placeholder={`Enter ${label.toLowerCase()}`}
          placeholderTextColor={COLORS.placeholder}
          style={[styles.input, { color: COLORS.primary }]}
        />

        <Image
          source={closeIcon}
          style={[
            styles.closeIcon,
            { tintColor: COLORS.placeholder },
          ]}
        />
      </View>
    </>
  );

  return (
    <View style={[styles.container, { backgroundColor: COLORS.background }]}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../../assets/back.png')}
            style={{ width: 22, height: 22, tintColor: COLORS.text }}
          />
        </TouchableOpacity>

        <Text style={[styles.headerTitle, { color: COLORS.text }]}>
          My Profile
        </Text>

        <View style={{ width: 22 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 80,
        }}
      >
        {/* PROFILE IMAGE */}
        <View style={styles.avatarWrapper}>
          <TouchableOpacity onPress={() => setPickerVisible(true)}>
            <Image
              source={profileImage ? profileImage : userImg}
              style={styles.avatar}
            />

            <View style={styles.cameraBadge}>
              <Text style={{ fontSize: 16 }}>📷</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* FORM */}
        <View style={styles.form}>
          <InputBox label="Name" value={name} onChange={setName} />

          <InputBox
            label="Phone Number"
            value={phone}
            onChange={setPhone}
            keyboardType="phone-pad"
          />

          <InputBox
            label="Gmail"
            value={email}
            onChange={setEmail}
            keyboardType="email-address"
          />

          <InputBox
            label="Delivery Address"
            value={address}
            onChange={setAddress}
            multiline
          />

          <TouchableOpacity
            style={[styles.saveBtn, { backgroundColor: COLORS.primary }]}
            onPress={handleSave}
          >
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>

        {/* 🔴 THIS FIXES EVERYTHING */}
        <View style={{ height: 60 }} />
      </ScrollView>
    </View>
  )
}

export default ProfileEdit;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: { flex: 1 },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? height * 0.07 : 20,
    paddingBottom: 15,
  },
  headerTitle: {
    fontSize: 17,
    fontFamily: 'Figtree-Bold',
  },

  avatarWrapper: {
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: -4,
    backgroundColor: '#FFFFFF',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },

  form: {
    paddingHorizontal: 25,
    marginTop: 10,
  },
  label: {
    marginTop: 16,
    marginBottom: 8,
    fontSize: 14,
    fontFamily: 'Figtree-SemiBold',
  },
  inputContainer: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'Figtree-Regular',
  },
  closeIcon: {
    width: 18,
    height: 18,
  },

  saveBtn: {
    marginTop: 35,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Figtree-Bold',
  },

  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '80%',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  modalBtn: {
    paddingVertical: 14,
  },
});
