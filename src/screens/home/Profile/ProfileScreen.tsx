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
import { COLORS } from '../../../theme/colors';
import { ThemeContext } from '../../../theme/ThemeContext';
import { getFontFamily, getFontWeight } from '../../../utils/fontHelper';
import { logout } from '../../../utils/storage';

const { width, height } = Dimensions.get('window');

/* ================= RESPONSIVE ================= */
const responsiveSize = (size: number) => (width / 375) * size;
const rs = responsiveSize;

const ProfileScreen = ({ navigation }: any) => {
  const { theme, toggleTheme, colors } = useContext(ThemeContext);

  const [showPopup, setShowPopup] = useState(false);
  
  const [popupMessage, setPopupMessage] = useState('');
  const [popupAction, setPopupAction] = useState<null | (() => void)>(null);

  const MENU = [
    { title: 'Profile', icon: require('../../../assets/profile2.png'), route: 'ProfileEdit' },
    { title: "Favourite's", icon: require('../../../assets/wishlist1.png'), route: 'Favourite' },
    { title: "My Offer's", icon: require('../../../assets/offers.png'), route: 'Myoffer' },
    { title: 'Refer To Earn', icon: require('../../../assets/refer.png'), route: 'Refertoearn' },
    { title: 'Help', icon: require('../../../assets/support.png'), route: 'Help' },
    { title: 'Support', icon: require('../../../assets/support.png'), route: 'Support' },
    { title: "Setting's", icon: require('../../../assets/settings1.png'), route: 'bottomSettings' },
  ];

  const openPopup = (message: string, action: () => void) => {
    setPopupMessage(message);
    setPopupAction(() => action);
    setShowPopup(true);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* STATUSBAR */}
      <StatusBar
        barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
        backgroundColor={colors.background}
      />

      {/* RESPONSIVE HEADER */}
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <Text style={[styles.headerTitle, { color: colors.secondary }]}>Profile</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: rs(80) }}
      >
        {/* PROFILE INFO */}
        <View style={styles.profileRow}>
          <Image
            source={require('../../../assets/user.png')}
            style={styles.profileImage}
          />
          <View>
            <Text style={[styles.name, { color: colors.text }]}>Harshal Sharma</Text>
            <Text style={[styles.subText, { color: colors.inactive }]}>harshal@gmail.com</Text>
            <Text style={[styles.subText, { color: colors.inactive }]}>+91 1234567890</Text>
          </View>
        </View>

        {/* QUICK ACTION BOXES */}
        <View style={styles.boxRow}>
          {[
            { title: 'Address', icon: require('../../../assets/address1.png'), route: 'Address' },
            { title: 'My Order', icon: require('../../../assets/order.png'), route: 'Orders' },
            { title: 'Wallet', icon: require('../../../assets/wallet.png'), route: 'Wallet' },
            { title: 'Setting', icon: require('../../../assets/settings1.png'), route: 'Setting' },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.box, { backgroundColor: colors.tabBg }]}
              onPress={() => navigation.navigate(item.route)}
              activeOpacity={0.8}
            >
              <Image
                source={item.icon}
                style={[styles.boxIcon, { tintColor: colors.primary }]}
              />
              <Text style={[styles.boxText, { color: colors.text }]}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* MENU LIST */}
        {MENU.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.7}
            onPress={() => navigation.navigate(item.route)}
          >
            <View
              style={[
                styles.menuRow,
                theme === 'light' && { borderBottomWidth: 1, borderBottomColor: '#eee' },
              ]}
            >
              <View style={styles.menuLeft}>
                <View style={[styles.menuIconWrap, { backgroundColor: colors.tabBg }]}>
                  <Image
                    source={item.icon}
                    style={[styles.menuIcon, { tintColor: colors.primary }]}
                  />
                </View>
                <Text style={[styles.menuText, { color: colors.text }]}>{item.title}</Text>
              </View>
              <Text style={[styles.arrow, { color: colors.inactive }]}>›</Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* LOGOUT */}
        <TouchableOpacity
          style={styles.optionRow}
          onPress={() =>
            openPopup('Are you sure you want to logout?', async () => {
              await logout();
              navigation.navigate('Login');
            })
          }
        >
          <View style={styles.optionLeft}>
            <View style={[styles.optionIconContainer, { backgroundColor: colors.tabBg }]}>
              <Image
                source={require('../../../assets/logout.png')}
                style={[styles.optionIcon, { tintColor: colors.primary }]}
              />
            </View>
            <Text style={[styles.optionLabel, { color: colors.primary }]}>Logout</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* LOGOUT POPUP */}
      <Modal transparent visible={showPopup} animationType="fade">
        <View style={styles.popupOverlay}>
          <View style={[styles.popupBox, { backgroundColor: colors.tabBg }]}>
            <Text style={[styles.popupText, { color: colors.text }]}>{popupMessage}</Text>
            <View style={styles.popupButtonsContainer}>
              <TouchableOpacity
                style={[styles.popupButton, styles.popupCancelButton]}
                onPress={() => setShowPopup(false)}
              >
                <Text style={styles.popupButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.popupButton, { backgroundColor: colors.primary }]}
                onPress={() => {
                  setShowPopup(false);
                  popupAction && popupAction();
                }}
              >
                <Text style={[styles.popupButtonText, { color: '#fff' }]}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ProfileScreen;

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  /* ===== RESPONSIVE HEADER ===== */
  header: {
    height: Platform.OS === 'ios' ? rs(90) : rs(70),
    paddingTop: Platform.OS === 'ios' ? rs(40) : rs(20),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  headerTitle: {
    fontSize: rs(20),
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
    color: COLORS.secondary,
  },

  profileRow: {
    flexDirection: 'row',
    padding: rs(20),
    alignItems: 'center',
  },
  profileImage: {
    width: rs(80),
    height: rs(80),
    borderRadius: rs(40),
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
    fontWeight: getFontWeight('Regular'),
    marginTop: rs(2),
  },

  boxRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: rs(15),
  },
  box: {
    width: rs(80),
    borderRadius: rs(14),
    padding: rs(12),
    alignItems: 'center',
    elevation: 4,
  },
  boxIcon: {
    width: rs(26),
    height: rs(26),
    marginBottom: rs(6),
  },
  boxText: {
    fontSize: rs(11),
    textAlign: 'center',
  },

  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: rs(10),
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIconWrap: {
    width: rs(40),
    height: rs(40),
    borderRadius: rs(12),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: rs(14),
    marginLeft: rs(5),
  },
  menuIcon: {
    width: rs(20),
    height: rs(20),
  },
  menuText: {
    fontSize: rs(16),
  },
  arrow: {
    fontSize: rs(30),
    marginRight: rs(10),
  },

  optionRow: {
    paddingVertical: rs(16),
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIconContainer: {
    width: rs(44),
    height: rs(44),
    borderRadius: rs(12),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: rs(15),
    marginLeft: rs(10),
  },
  optionIcon: {
    width: rs(22),
    height: rs(22),
  },
  optionLabel: {
    fontSize: rs(16),
    fontFamily: getFontFamily('SemiBold'),
    fontWeight: getFontWeight('SemiBold'),
  },

  popupOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: rs(20),
  },
  popupBox: {
    width: width * 0.85,
    borderRadius: rs(16),
    padding: rs(25),
    alignItems: 'center',
    ...Platform.select({
      ios: { shadowColor: COLORS.shadow, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8 },
      android: { elevation: 8 },
    }),
  },
  popupText: {
    fontSize: rs(16),
    textAlign: 'center',
    marginBottom: rs(25),
  },
  popupButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  popupButton: {
    borderRadius: rs(10),
    paddingVertical: rs(12),
    paddingHorizontal: rs(20),
    minWidth: rs(100),
    alignItems: 'center',
  },
  popupCancelButton: {
    backgroundColor: '#F0F0F0',
    marginRight: rs(10),
  },
  popupButtonText: {
    fontSize: rs(14),
  },
});
