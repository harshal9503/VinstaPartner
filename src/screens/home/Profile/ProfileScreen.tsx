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
  { title: 'Restaurant Information', icon: require('../../../assets/profile2.png'),
     route: 'RestroInformation', key: 'restaurant' },
  { title: 'Delivery Partners', icon: require('../../../assets/expressdelivery.png'), route: 
    'DeliveryPartners', key: 'delivery' },
  { title: 'Order Management', icon: require('../../../assets/order.png'), 
    route: 'OrderManagements', key: 'orders' },
  { title: 'Menu Management', icon: require('../../../assets/menu.png'),
     route: 'MenuManagements', key: 'menu' },
  { title: 'Payouts & Earnings', icon: require('../../../assets/wallet.png'),
     route: 'Payoutsearning', key: 'earnings' },
  { title: 'Delivery Settings', icon: require('../../../assets/settings1.png'),
     route: 'DeliverySetting', key: 'deliverySettings' },
  { title: 'Ratings & Reviews', icon: require('../../../assets/star.png'),
     route: 'Ratingreview', key: 'reviews' },
  { title: 'Documents & Verification', icon: require('../../../assets/document.png'),
     route: 'DocandVeri', key: 'documents' },
  { title: 'Notifications & Preferences', icon: require('../../../assets/notification.png'),
     route: 'NotiandPrefere', key: 'notifications' },
  { title: 'Help & Support', icon: require('../../../assets/support.png'), route: 
    'HelpandSupport', key: 'support' },
  // { title: 'Profile Actions', icon: require('../../../assets/settings1.png'), route:
  //    'ProfileActions', key: 'actions' },
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
              source={require('../../../assets/user1.png')}
              style={styles.profileImage}
            />
            <View>
              <Text style={[styles.name, { color: colors.text }]}>
                Spice Hub Restaurant
              </Text>
              <Text style={[styles.subText, { color: colors.inactive }]}>
                Owner: Harshal Sharma
              </Text>
              <Text style={[styles.subText, { color: colors.inactive }]}>
                +91 9876543210
              </Text>
            </View>
          </View>

          {/* SECTION CONTAINER */}
          <View style={styles.sectionContainer}>
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
                <View style={[
                  styles.menuRow,
                  index === SECTIONS.length - 1 && styles.lastMenuItem
                ]}>
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

            {/* LOGOUT SECTION - Same style as other sections */}
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={() => setShowPopup(true)}
            >
              <View style={[styles.menuRow, styles.logoutRow]}>
                <View style={styles.menuLeft}>
                  <View
                    style={[
                      styles.menuIconWrap,
                      { backgroundColor: colors.tabBg },
                    ]}
                  >
                    <Image
                      source={require('../../../assets/logout.png')}
                      style={[
                        styles.menuIcon,
                        { tintColor: '#FF5252' }, // Red color for logout icon
                      ]}
                    />
                  </View>
                  <Text style={[styles.menuText, { color: '#FF5252' }]}>
                    Logout
                  </Text>
                </View>
                <Text style={[styles.arrow, { color: colors.inactive }]}>›</Text>
              </View>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </View>

      {/* LOGOUT POPUP */}
      <Modal transparent visible={showPopup} animationType="fade">
        <View style={styles.popupOverlay}>
          <View style={[styles.popupBox, { backgroundColor: colors.tabBg }]}>
            <View style={styles.popupIconContainer}>
              <View style={[styles.popupIconWrap, { backgroundColor: '#FFEBEE' }]}>
                <Image
                  source={require('../../../assets/logout.png')}
                  style={[styles.popupIcon, { tintColor: '#FF5252' }]}
                />
              </View>
            </View>
            
            <Text style={[styles.popupTitle, { color: colors.text }]}>
              Logout
            </Text>
            
            <Text style={[styles.popupText, { color: colors.textSecondary }]}>
              Are you sure you want to logout from your account?
            </Text>

            <View style={styles.popupButtons}>
              <TouchableOpacity
                onPress={() => setShowPopup(false)}
                style={[styles.popupBtn, styles.cancelBtn]}
              >
                <Text style={[styles.cancelBtnText, { color: colors.text }]}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={async () => {
                  await logout();
                  navigation.replace('Login');
                }}
                style={[styles.popupBtn, styles.confirmBtn]}
              >
                <Text style={styles.confirmBtnText}>Logout</Text>
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
  container: { 
    flex: 1 
  },

  profileRow: {
    flexDirection: 'row',
    paddingHorizontal: rs(20),
    paddingVertical: rs(20),
    alignItems: 'center',
    marginBottom: rs(8),
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

  sectionContainer: {
    marginTop: rs(0),
    marginHorizontal: rs(8),
    borderRadius: rs(16),
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },

  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: rs(7),
    paddingHorizontal: rs(8),
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },

  lastMenuItem: {
    borderBottomWidth: 0,
  },

  menuLeft: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  
  menuIconWrap: {
    width: rs(40),
    height: rs(40),
    borderRadius: rs(12),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: rs(14),
  },
  
  menuIcon: { 
    width: rs(20), 
    height: rs(20),
    resizeMode: 'contain',
  },
  
  menuText: {
    fontSize: rs(15),
    fontFamily: getFontFamily('Medium'),
    fontWeight: getFontWeight('500'),
  },
  
  arrow: { 
    fontSize: rs(26),
    marginLeft: rs(8),
  },

  logoutRow: {
    borderBottomWidth: 0,
  },

  popupOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: rs(20),
  },
  
  popupBox: {
    width: '100%',
    maxWidth: rs(320),
    borderRadius: rs(20),
    padding: rs(24),
    alignItems: 'center',
  },
  
  popupIconContainer: {
    marginBottom: rs(16),
  },
  
  popupIconWrap: {
    width: rs(60),
    height: rs(60),
    borderRadius: rs(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  popupIcon: {
    width: rs(28),
    height: rs(28),
    resizeMode: 'contain',
  },
  
  popupTitle: {
    fontSize: rs(20),
    fontFamily: getFontFamily('SemiBold'),
    fontWeight: getFontWeight('600'),
    marginBottom: rs(8),
    textAlign: 'center',
  },
  
  popupText: {
    fontSize: rs(14),
    textAlign: 'center',
    marginBottom: rs(24),
    fontFamily: getFontFamily('Regular'),
    fontWeight: getFontWeight('400'),
    lineHeight: rs(20),
  },
  
  popupButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: rs(12),
  },
  
  popupBtn: {
    flex: 1,
    paddingVertical: rs(14),
    alignItems: 'center',
    borderRadius: rs(12),
  },
  
  cancelBtn: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  
  cancelBtnText: {
    fontSize: rs(15),
    fontFamily: getFontFamily('Medium'),
    fontWeight: getFontWeight('500'),
  },
  
  confirmBtn: {
    backgroundColor: '#FF5252',
  },
  
  confirmBtnText: {
    color: '#FFFFFF',
    fontSize: rs(15),
    fontFamily: getFontFamily('SemiBold'),
    fontWeight: getFontWeight('600'),
  },
});