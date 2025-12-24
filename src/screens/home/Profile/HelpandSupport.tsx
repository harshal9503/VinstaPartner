import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  Platform,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../../theme/ThemeContext';

const { width } = Dimensions.get('window');
const rs = (size: number) => (width / 375) * size;

const HEADER_HEIGHT = Platform.OS === 'ios' ? rs(56) : rs(60);
const ANDROID_STATUS_BAR = StatusBar.currentHeight ?? 0;

const HelpSupport = () => {
  const { theme, colors } = useContext(ThemeContext);
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />

      {/* ---------- HEADER ---------- */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.background,
            paddingTop: Platform.OS === 'android' ? ANDROID_STATUS_BAR : 0,
            height:
              HEADER_HEIGHT +
              (Platform.OS === 'android' ? ANDROID_STATUS_BAR : 0),
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
          Help
        </Text>

        <View style={{ width: rs(22) }} />
      </View>

      {/* ---------- CONTENT ---------- */}
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>
          Help & Support
        </Text>

        <Text style={[styles.description, { color: colors.text }]}>
          This is a dummy help screen. You can add FAQs, contact information,
          troubleshooting steps, or any support-related content here.
        </Text>

        <TouchableOpacity style={[styles.card, { backgroundColor: colors.tabBg }]}>
          <Text style={[styles.cardText, { color: colors.text }]}>
            ✔ App Usage Guide
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, { backgroundColor: colors.tabBg }]}>
          <Text style={[styles.cardText, { color: colors.text }]}>
            ✔ Troubleshooting Tips
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, { backgroundColor: colors.tabBg }]}>
          <Text style={[styles.cardText, { color: colors.text }]}>
            ✔ Contact Support
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HelpSupport;
const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: rs(20),
  },

  backIcon: {
    width: rs(22),
    height: rs(22),
    resizeMode: 'contain',
  },

  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: rs(18),
    fontWeight: '600',
  },

  content: {
    flex: 1,
    paddingHorizontal: rs(18),
    paddingTop: rs(20),
  },

  title: {
    fontSize: rs(26),
    fontWeight: '700',
    marginBottom: rs(10),
  },

  description: {
    fontSize: rs(15),
    lineHeight: rs(22),
    marginBottom: rs(24),
  },

  card: {
    borderRadius: rs(14),
    paddingVertical: rs(16),
    paddingHorizontal: rs(18),
    marginBottom: rs(14),
  },

  cardText: {
    fontSize: rs(16),
    fontWeight: '600',
  },
});
