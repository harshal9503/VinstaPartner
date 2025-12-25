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
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../../theme/ThemeContext';
import { COLORS } from '../../../theme/colors';
import { getFontFamily, getFontWeight } from '../../../utils/fontHelper';

const { width } = Dimensions.get('window');
const rs = (size: number) => (width / 375) * size;

const HEADER_HEIGHT = rs(56);
const ANDROID_STATUS_BAR = StatusBar.currentHeight ?? 0;

const HelpSupport = () => {
  const { theme, colors } = useContext(ThemeContext);
  const navigation = useNavigation<any>();

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
          Help
        </Text>

        <View style={{ width: rs(22) }} />
      </View>

      {/* ---------- CONTENT ---------- */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={[styles.title, { color: colors.text }]}>
          Help & Support
        </Text>

        <Text style={[styles.description, { color: colors.text }]}>
          This is a dummy help screen. You can add FAQs, contact information,
          troubleshooting steps, or any support-related content here.
        </Text>

        <TouchableOpacity style={[styles.card, { backgroundColor: theme === 'dark' ? '#1E1E1E' : '#fff' }]}>
          <Text style={[styles.cardText, { color: colors.text }]}>
            ✔ App Usage Guide
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, { backgroundColor: theme === 'dark' ? '#1E1E1E' : '#fff' }]}>
          <Text style={[styles.cardText, { color: colors.text }]}>
            ✔ Troubleshooting Tips
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, { backgroundColor: theme === 'dark' ? '#1E1E1E' : '#fff' }]}>
          <Text style={[styles.cardText, { color: colors.text }]}>
            ✔ Contact Support
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default HelpSupport;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

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

  scrollContent: {
    padding: rs(16),
    paddingBottom: rs(40),
  },

  title: {
    fontSize: rs(26),
    fontFamily: getFontFamily('Poppins', 'Bold'),
    fontWeight: getFontWeight('700'),
    marginBottom: rs(10),
  },

  description: {
    fontSize: rs(15),
    lineHeight: rs(22),
    marginBottom: rs(24),
    fontFamily: getFontFamily('Poppins', 'Regular'),
  },

  card: {
    borderRadius: rs(12),
    paddingVertical: rs(16),
    paddingHorizontal: rs(18),
    marginBottom: rs(12),
  },

  cardText: {
    fontSize: rs(16),
    fontFamily: getFontFamily('Poppins', 'SemiBold'),
    fontWeight: getFontWeight('600'),
  },
});
