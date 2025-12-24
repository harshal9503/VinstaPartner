import React, { useContext, useState } from 'react';
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
  Switch,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../../theme/ThemeContext';
import { COLORS } from '../../../theme/colors';
import { getFontFamily, getFontWeight } from '../../../utils/fontHelper';

const { width } = Dimensions.get('window');
const rs = (size: number) => (width / 375) * size;

const HEADER_HEIGHT = rs(56);
const ANDROID_STATUS_BAR = StatusBar.currentHeight ?? 0;

const NotificationsPreferences = () => {
  const { theme, colors } = useContext(ThemeContext);
  const navigation = useNavigation<any>();

  const [orderNotifications, setOrderNotifications] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [soundAlerts, setSoundAlerts] = useState(false);
  const [autoAcceptOrders, setAutoAcceptOrders] = useState(false);

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
          Notifications & Preferences
        </Text>

        <View style={{ width: rs(22) }} />
      </View>

      {/* ---------- CONTENT ---------- */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Order Notifications */}
        <View
          style={[
            styles.preferenceCard,
            { backgroundColor: theme === 'dark' ? '#1E1E1E' : COLORS.white },
          ]}
        >
          <Text style={styles.label}>Order Notifications</Text>
          <Switch
            value={orderNotifications}
            onValueChange={setOrderNotifications}
            thumbColor={orderNotifications ? COLORS.primary : '#ccc'}
            trackColor={{ true: COLORS.primaryLight, false: '#ddd' }}
          />
        </View>

        {/* SMS / WhatsApp Alerts */}
        <View
          style={[
            styles.preferenceCard,
            { backgroundColor: theme === 'dark' ? '#1E1E1E' : COLORS.white },
          ]}
        >
          <Text style={styles.label}>SMS / WhatsApp Alerts</Text>
          <Switch
            value={smsAlerts}
            onValueChange={setSmsAlerts}
            thumbColor={smsAlerts ? COLORS.primary : '#ccc'}
            trackColor={{ true: COLORS.primaryLight, false: '#ddd' }}
          />
        </View>

        {/* Sound Alerts */}
        <View
          style={[
            styles.preferenceCard,
            { backgroundColor: theme === 'dark' ? '#1E1E1E' : COLORS.white },
          ]}
        >
          <Text style={styles.label}>Sound Alerts</Text>
          <Switch
            value={soundAlerts}
            onValueChange={setSoundAlerts}
            thumbColor={soundAlerts ? COLORS.primary : '#ccc'}
            trackColor={{ true: COLORS.primaryLight, false: '#ddd' }}
          />
        </View>

        {/* Auto Accept Orders */}
        <View
          style={[
            styles.preferenceCard,
            { backgroundColor: theme === 'dark' ? '#1E1E1E' : COLORS.white },
          ]}
        >
          <Text style={styles.label}>Auto-Accept Orders</Text>
          <Switch
            value={autoAcceptOrders}
            onValueChange={setAutoAcceptOrders}
            thumbColor={autoAcceptOrders ? COLORS.primary : '#ccc'}
            trackColor={{ true: COLORS.primaryLight, false: '#ddd' }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default NotificationsPreferences;
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

  preferenceCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: rs(16),
    borderRadius: rs(14),
    marginBottom: rs(14),

    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,

    // Android shadow
    elevation: 4,
  },

  label: {
    fontSize: rs(15),
    color: COLORS.primary,
    fontFamily: getFontFamily('Poppins', 'Medium'),
    fontWeight: getFontWeight('500'),
  },
});

