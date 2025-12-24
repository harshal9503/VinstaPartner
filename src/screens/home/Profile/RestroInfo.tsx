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

const RestaurantInformation = () => {
  const { theme, colors } = useContext(ThemeContext);
  const navigation = useNavigation<any>();

  const infoData = [
    { label: 'Restaurant Name', value: 'Delicious Bites' },
    { label: ' Manager Name', value: 'Rahul Verma' },
    { label: 'Contact Number', value: '+91 9876543210' },
    { label: 'Email ID', value: 'Rahul@example.com' },
    { label: 'Restaurant Address', value: '123, MG Road, Mumbai' },
    { label: 'GST Number', value: '27ABCDE1234F2Z5' },
    { label: 'FSSAI License', value: '100200300400' },
    { label: 'Opening & Closing Time', value: '10:00 AM - 11:00 PM' },
    { label: 'Restaurant Status', value: 'Open' },
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
              HEADER_HEIGHT + (Platform.OS === 'android' ? ANDROID_STATUS_BAR : rs(44)),
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
          Restaurant Information
        </Text>

        <View style={{ width: rs(22) }} />
      </View>

      {/* ---------- CONTENT ---------- */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {infoData.map((item, index) => (
          <View
            key={index}
            style={[
              styles.infoCard,
              { backgroundColor: theme === 'dark' ? '#1E1E1E' : '#fff' },
            ]}
          >
            <Text style={[styles.label, {color:COLORS.primary}]}>{item.label}</Text>
            <Text style={[styles.value, { color:COLORS.textLight}]}>{item.value}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default RestaurantInformation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: rs(16),
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  backIcon: {
    width: rs(22),
    height: rs(22),
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: rs(18),
    fontFamily: getFontFamily('Bold'),
        fontWeight: getFontWeight('Bold'),
  },
  scrollContent: {
    padding: rs(16),
    paddingBottom: rs(32),
  },
  infoCard: {
    padding: rs(16),
    borderRadius: rs(12),
    marginBottom: rs(12),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: rs(15),
    marginBottom: rs(6),
    fontFamily:getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
    
  },
  value: {
    fontSize: rs(15),
     fontFamily:getFontFamily('light'),
     fontWeight: getFontWeight('light'),
  },
});
