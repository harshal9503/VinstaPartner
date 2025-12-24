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

const DeliverySettings = () => {
  const { theme, colors } = useContext(ThemeContext);
  const navigation = useNavigation<any>();

  const deliverySettingsData = [
    { label: 'Delivery Radius', value: '5 km' },
    { label: 'Delivery Charges', value: '₹40' },
    { label: 'Minimum Order Value', value: '₹199' },
    { label: 'Estimated Delivery Time', value: '30 – 40 mins' },
    { label: 'Free Delivery', value: 'Enabled' },
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
          Delivery Settings
        </Text>

        <View style={{ width: rs(22) }} />
      </View>

      {/* ---------- CONTENT ---------- */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {deliverySettingsData.map((item, index) => (
          <View
            key={index}
            style={[
              styles.infoCard,
              {
                backgroundColor: theme === 'dark' ? '#1E1E1E' : COLORS.white,
              },
            ]}
          >
            <Text style={[styles.label, { color: COLORS.primary }]}>
              {item.label}
            </Text>

            <Text style={[styles.value, { color: colors.text }]}>
              {item.value}
            </Text>
          </View>
        ))}

        {/* ---------- ACTION BUTTON ---------- */}
        <TouchableOpacity style={styles.actionBtn}>
          <Text style={styles.actionText}>Edit Delivery Settings</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default DeliverySettings;
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

  infoCard: {
    padding: rs(16),
    borderRadius: rs(14),
    marginBottom: rs(14),

    // ✅ ANDROID + iOS SHADOW
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },

  label: {
    fontSize: rs(13),
    marginBottom: rs(6),
    fontFamily: getFontFamily('Poppins', 'Medium'),
    fontWeight: getFontWeight('500'),
  },

  value: {
    fontSize: rs(16),
    fontFamily: getFontFamily('Poppins', 'SemiBold'),
    fontWeight: getFontWeight('600'),
  },

  actionBtn: {
    marginTop: rs(24),
    backgroundColor: COLORS.primary,
    paddingVertical: rs(14),
    borderRadius: rs(12),
    alignItems: 'center',
    elevation: 2,
  },

  actionText: {
    color: COLORS.white,
    fontSize: rs(16),
    fontFamily: getFontFamily('Poppins', 'SemiBold'),
    fontWeight: getFontWeight('600'),
  },
});
