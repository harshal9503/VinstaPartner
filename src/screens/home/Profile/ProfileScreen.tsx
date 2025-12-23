import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  Dimensions,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import { ThemeContext } from '../../../theme/ThemeContext';
import { COLORS } from '../../../theme/colors';
import { getFontFamily, getFontWeight } from '../../../utils/fontHelper';
import { logout } from '../../../utils/storage';

const { width } = Dimensions.get('window');
const rs = (size: number) => (width / 375) * size;

/**
 * SAME TOP SPACING FOR ANDROID & IOS
 * (matches your working Profile screen)
 */
const TOP_SPACE =
  Platform.OS === 'android'
    ? StatusBar.currentHeight ?? rs(24)
    : rs(44);

/**
 * Bottom tab height buffer
 */
const TAB_BAR_HEIGHT = Platform.OS === 'android' ? rs(90) : rs(70);

const SECTIONS = [
  { title: 'Restaurant Information', icon: require('../../../assets/profile2.png'), route: 'Info', key: 'restaurant' },
  { title: 'Delivery Partners', icon: require('../../../assets/delivery.png'), route: 'Info', key: 'delivery' },
  { title: 'Order Management', icon: require('../../../assets/order.png'), route: 'Info', key: 'orders' },
  { title: 'Menu Management', icon: require('../../../assets/menu.png'), route: 'Info', key: 'menu' },
  { title: 'Payouts & Earnings', icon: require('../../../assets/wallet.png'), route: 'Info', key: 'earnings' },
  { title: 'Delivery Settings', icon: require('../../../assets/settings1.png'), route: 'Info', key: 'deliverySettings' },
  { title: 'Ratings & Reviews', icon: require('../../../assets/star.png'), route: 'Info', key: 'reviews' },
  { title: 'Documents & Verification', icon: require('../../../assets/document.png'), route: 'Info', key: 'documents' },
  { title: 'Notifications & Preferences', icon: require('../../../assets/notification.png'), route: 'Info', key: 'notifications' },
  { title: 'Help & Support', icon: require('../../../assets/support.png'), route: 'Info', key: 'support' },
  { title: 'Profile Actions', icon: require('../../../assets/settings1.png'), route: 'Info', key: 'actions' },
];

const RestaurantProfileScreen = ({ navigation }: any) => {
  const { colors } = useContext(ThemeContext);
  const [showPopup, setShowPopup] = useState(false);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>

      {/* STATUS BAR — SAME AS PROFILE SCREEN */}
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      {/* MAIN CONTENT */}
      <View style={{ paddingTop: TOP_SPACE }}>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: TAB_BAR_HEIGHT }}
        >

          {/* HEADER */}
          <View style={styles.profileRow}>
            <Image
              source={require('../../../assets/user.png')}
              style={styles.profileImage}
            />
            <View>
              <Text style={[styles.name, { color: colors.text }]}>
                Spice Hub Restaurant
              </Text>
              <Text style={[styles.subText, { color: colors.inactive }]}>
                Owner: Rahul Verma
              </Text>
              <Text style={[styles.subText, { color: colors.inactive }]}>
                +91 9876543210
              </Text>
            </View>
          </View>

          {/* SECTIONS */}
          {SECTIONS.map((item, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.75}
              onPress={() =>
                navigation.navigate(item.route, {
                  type: item.key,
                  title: item.title,
                })
              }
            >
              <View style={styles.menuRow}>
                <View style={styles.menuLeft}>
                  <View
                    style={[
                      styles.menuIconWrap,
                      { backgroundColor: colors.tabBg },
                    ]}
                  >
                    <Image
                      source={item.icon}
                      style={[
                        styles.menuIcon,
                        { tintColor: colors.primary },
                      ]}
                    />
                  </View>
                  <Text style={[styles.menuText, { color: colors.text }]}>
                    {item.title}
                  </Text>
                </View>
                <Text style={[styles.arrow, { color: colors.inactive }]}>›</Text>
              </View>
            </TouchableOpacity>
          ))}

          {/* LOGOUT */}
          <TouchableOpacity
            style={styles.logoutRow}
            onPress={() => setShowPopup(true)}
          >
            <Text style={[styles.logoutText, { color: colors.primary }]}>
              Logout
            </Text>
          </TouchableOpacity>

        </ScrollView>
      </View>

      {/* LOGOUT POPUP */}
      <Modal transparent visible={showPopup} animationType="fade">
        <View style={styles.popupOverlay}>
          <View style={[styles.popupBox, { backgroundColor: colors.tabBg }]}>
            <Text style={[styles.popupText, { color: colors.text }]}>
              Are you sure you want to logout?
            </Text>

            <View style={styles.popupButtons}>
              <TouchableOpacity
                onPress={() => setShowPopup(false)}
                style={[styles.popupBtn, styles.cancelBtn]}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={async () => {
                  await logout();
                  navigation.replace('Login');
                }}
                style={[styles.popupBtn, { backgroundColor: colors.primary }]}
              >
                <Text style={{ color: '#fff' }}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
};

export default RestaurantProfileScreen;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: { flex: 1 },

  profileRow: {
    flexDirection: 'row',
    paddingHorizontal: rs(20),
    paddingVertical: rs(16),
    alignItems: 'center',
  },
  profileImage: {
    width: rs(70),
    height: rs(70),
    borderRadius: rs(35),
    marginRight: rs(15),
  },
  name: {
    fontSize: rs(18),
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },
  subText: {
    fontSize: rs(14),
    fontFamily: getFontFamily('Regular'),
    marginTop: rs(2),
  },

  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: rs(14),
    paddingHorizontal: rs(18),
  },
  menuLeft: { flexDirection: 'row', alignItems: 'center' },
  menuIconWrap: {
    width: rs(42),
    height: rs(42),
    borderRadius: rs(14),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: rs(14),
  },
  menuIcon: { width: rs(20), height: rs(20) },
  menuText: {
    fontSize: rs(16),
    fontFamily: getFontFamily('Medium'),
  },
  arrow: { fontSize: rs(26) },

  logoutRow: {
    paddingVertical: rs(22),
    alignItems: 'center',
  },
  logoutText: {
    fontSize: rs(16),
    fontFamily: getFontFamily('SemiBold'),
  },

  popupOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupBox: {
    width: '85%',
    borderRadius: rs(14),
    padding: rs(22),
  },
  popupText: {
    fontSize: rs(16),
    textAlign: 'center',
    marginBottom: rs(22),
    fontFamily: getFontFamily('Medium'),
  },
  popupButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  popupBtn: {
    paddingVertical: rs(12),
    minWidth: rs(110),
    alignItems: 'center',
    borderRadius: rs(10),
  },
  cancelBtn: {
    backgroundColor: COLORS.inactive,
  },
});
