import React, { useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Platform,
  StatusBar,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../../theme/ThemeContext';
import { COLORS } from '../../../theme/colors';
import { getFontFamily, getFontWeight } from '../../../utils/fontHelper';

const { width } = Dimensions.get('window');
const rs = (size: number) => (width / 375) * size;

const HEADER_HEIGHT = rs(56);
const ANDROID_STATUS_BAR = StatusBar.currentHeight ?? 0;

const ProfileActions = () => {
  const { theme, colors } = useContext(ThemeContext);
  const navigation = useNavigation<any>();

  const actions = [
    { title: 'Edit Profile', onPress: () => {} },
    { title: 'Change Password / PIN', onPress: () => {} },
    { title: 'Switch Restaurant', onPress: () => {} },
    { title: 'Logout', onPress: () => {} },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar
        translucent={Platform.OS === 'android'}
        backgroundColor="transparent"
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
      />

      {/* ---------- HEADER ---------- */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.background,
            paddingTop: Platform.OS === 'android' ? ANDROID_STATUS_BAR : rs(44),
            height:
              HEADER_HEIGHT +
              (Platform.OS === 'android' ? ANDROID_STATUS_BAR : rs(44)),
          },
        ]}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../../assets/back.png')}
            style={[styles.backIcon, { tintColor: colors.text }]}
          />
        </TouchableOpacity>

        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Profile Actions
        </Text>

        <View style={{ width: rs(22) }} />
      </View>

      {/* ---------- CONTENT ---------- */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {actions.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.actionCard,
              {
                backgroundColor: theme === 'dark' ? '#1E1E1E' : '#fff',
                borderColor: item.title === 'Logout' ? COLORS.error : COLORS.border,
              },
            ]}
            onPress={item.onPress}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.actionText,
                {
                  color: item.title === 'Logout' ? COLORS.error : colors.text,
                },
              ]}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default ProfileActions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  /* ---------- HEADER ---------- */
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: rs(16),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  backIcon: {
    width: rs(22),
    height: rs(22),
    resizeMode: 'contain',
  },

  headerTitle: {
    fontSize: rs(18),
    fontFamily: getFontFamily('Poppins', 'SemiBold'),
    fontWeight: getFontWeight('600'),
  },

  /* ---------- CONTENT ---------- */
  scrollContent: {
    padding: rs(16),
    paddingBottom: rs(40),
  },

  actionCard: {
    paddingVertical: rs(18),
    paddingHorizontal: rs(16),
    borderRadius: rs(12),
    marginBottom: rs(12),
    borderWidth: 1,
  },

  actionText: {
    fontSize: rs(15),
    fontFamily: getFontFamily('Poppins', 'Medium'),
    fontWeight: getFontWeight('500'),
  },
});
