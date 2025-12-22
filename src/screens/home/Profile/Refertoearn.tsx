import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../../theme/ThemeContext';
const { width } = Dimensions.get('window');

const ReferToEarn = () => {
  const navigation = useNavigation();
const { theme, colors } = useContext(ThemeContext);
   const handleInvite = () => {
    Alert.alert('WhatsApp', 'Invite via WhatsApp clicked');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />

      {/* ---------- HEADER ---------- */}
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
                      source={require('../../../assets/back.png')}
                      style={[styles.backIcon, { tintColor: colors.text }]}
                    />
        </TouchableOpacity>

        <Text style={[styles.headerTitle, { color: colors.text }]}>Refer to earn</Text>

        <View style={{ width: 24 }} />
      </View>

      {/* ---------- MAIN CARD ---------- */}
      <View style={[styles.card, { backgroundColor: colors.tabBg }]}>
        <Text style={[styles.label, { color: colors.text }]}>Invitation Code</Text>

        <View style={[styles.codeBox, { backgroundColor: colors.tabBg }]}>
          <Text style={[styles.codeText, { color: colors.text }]}>XYJLHG</Text>

          <View style={styles.iconRow}>
            <Text style={styles.icon}>📋</Text>
            <Text style={styles.icon}>🔗</Text>
          </View>
        </View>


        <TouchableOpacity style={styles.inviteBtn} onPress={handleInvite}>
            <Image
              source={require('../../../assets/whatsapp.png')}
              style={styles.whatsappIcon}
            />
            <Text style={[styles.inviteText, ]}>Invite via whatsapp</Text>
          </TouchableOpacity>

        <View style={styles.helpRow}>
          <Text style={styles.helpText}>
            How to invite friend's and win award
          </Text>
          <Text style={styles.helpIcon}>?</Text>
        </View>
      </View>

      {/* ---------- BOTTOM CARDS ---------- */}
      <View style={[styles.bottomRow, { backgroundColor: colors.background }]}>
        <View style={[styles.smallCard, { backgroundColor: colors.tabBg }]}>
         <Image
              source={require('../../../assets/earned.png')}
              style={styles.giftIcon}
            />
          <Text style={[styles.cardText, { color: colors.text }]}>Earned Reward's</Text>
        </View>

        <View style={[styles.smallCard, { backgroundColor: colors.tabBg }]}>
         <Image
              source={require('../../../assets/earned.png')}
              style={styles.giftIcon}
            />
          <Text style={[styles.cardText, { color: colors.text }]  }>Track Referral's</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ReferToEarn;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
 backIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  /* ---------- HEADER ---------- */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  backText: {
    fontSize: 28,
    color: '#000',
  },

  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },

  /* ---------- MAIN CARD ---------- */
  card: {
    marginHorizontal: 16,
    marginTop: 10,
    padding: 16,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',

    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },

  label: {
    fontSize: 13,
    color: '#6F6F6F',
    marginBottom: 10,
  },

  codeBox: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#D6D6D6',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
  },

  codeText: {
    fontSize: 18,
    letterSpacing: 2,
    fontWeight: '700',
    color: '#000',
  },

  iconRow: {
    flexDirection: 'row',
  },

  icon: {
    fontSize: 18,
    marginLeft: 12,
  },

  /* ---------- WHATSAPP BUTTON ---------- */
  whatsappBtn: {
    marginTop: 18,
    backgroundColor: '#FF8C00',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
  },

  whatsappText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },

  /* ---------- HELP ---------- */
  helpRow: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  helpText: {
    fontSize: 13,
    color: '#666666',
  },

  helpIcon: {
    width: 20,
    height: 20,
    textAlign: 'center',
    borderRadius: 10,
    backgroundColor: '#FF8C00',
    color: '#fff',
    fontWeight: '700',
  },

  /* ---------- BOTTOM CARDS ---------- */
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginTop: 22,
  },

  smallCard: {
    width: (width - 48) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 22,
    alignItems: 'center',

    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },

  giftIcon: {
     width: 38,
    height: 50,
    resizeMode: 'contain',
  },

  cardText: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '600',
  },
   inviteBtn: {
    flexDirection: 'row',
    backgroundColor: '#f57c00',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    paddingVertical: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
      },
      android: { elevation: 2 },
    }),
  },
  whatsappIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 8,
  },
  inviteText: {
    color: '#fff',
    fontSize: width * 0.038,
    textTransform: 'capitalize',
    //fontFamily: getFontFamily('SemiBold'),
   // fontWeight: getFontWeight('SemiBold'),
  },
});
