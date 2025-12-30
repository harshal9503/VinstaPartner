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

const MenuManagement = () => {
  const { theme, colors } = useContext(ThemeContext);
  const navigation = useNavigation<any>();

  const menuData = [
    { label: 'Add / Edit Food Items', value: 'Manage Items' },
    { label: 'Item Availability', value: 'In Stock / Out of Stock' },
    { label: 'Price Updates', value: 'Update Prices' },
    { label: 'Category Management', value: 'Add / Edit Categories' },
    { label: 'Veg / Non-Veg Toggle', value: 'Enabled' },
    { label: 'Special Combos / Offers', value: 'Create Offers' },
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
          Menu Management
        </Text>

        <View style={{ width: rs(22) }} />
      </View>

      {/* ---------- CONTENT ---------- */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {menuData.map((item, index) => (
          <View
            key={index}
            style={[
              styles.infoCard,
              {
                backgroundColor: theme === 'dark' ? '#1E1E1E' : '#fff',
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
          <Text style={styles.actionText}>Manage Menu</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default MenuManagement;

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
    borderRadius: rs(12),
    marginBottom: rs(12),
  },

  label: {
    fontSize: rs(15),
    marginBottom: rs(6),
    fontFamily: getFontFamily('Poppins', 'Medium'),
    fontWeight: getFontWeight('500'),
  },

  value: {
    fontSize: rs(15),
    fontFamily: getFontFamily('Poppins', 'SemiBold'),
    fontWeight: getFontWeight('600'),
  },

  actionBtn: {
    marginTop: rs(24),
    backgroundColor: COLORS.primary,
    paddingVertical: rs(14),
    borderRadius: rs(12),
    alignItems: 'center',
  },

  actionText: {
    color: 'white',
    fontSize: rs(16),
    fontFamily: getFontFamily('Poppins', 'SemiBold'),
    fontWeight: getFontWeight('600'),
  },
});
