import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking,
  Alert,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../../theme/ThemeContext';

const Support = () => {
  const navigation = useNavigation<any>();
  const { colors, theme } = useContext(ThemeContext);

  const openEmail = () => {
    Linking.openURL('mailto:support@vinsta.com').catch(() =>
      Alert.alert('Error', 'Could not open email client'),
    );
  };

  const openPhone = () => {
    Linking.openURL('tel:+911234567890').catch(() =>
      Alert.alert('Error', 'Could not open phone dialer'),
    );
  };

  const openWebsite = () => {
    Linking.openURL('https://vinsta.com/support').catch(() =>
      Alert.alert('Error', 'Could not open browser'),
    );
  };

  const openFAQ = () => {
    Alert.alert('FAQ', 'Open FAQ screen');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../../assets/back.png')}
            style={[styles.backIcon, { tintColor: colors.text }]}
          />
        </TouchableOpacity>

        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Support
        </Text>

        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Contact Options :-
        </Text>

        {/* EMAIL */}
        <TouchableOpacity style={[styles.card,{backgroundColor: colors.tabBg}]} onPress={openEmail}>
          <View style={styles.leftRow}>
            <Image
              source={require('../../../assets/email.png')}
              style={[styles.icon, { tintColor: colors.text }]}
            />
            <View>
              <Text style={[styles.cardTitle, { color: colors.text }]}>Email Support</Text>
              <Text style={styles.cardSub}>support@vinsta.com</Text>
            </View>
          </View>
          <Image
            source={require('../../../assets/right-arrow.png')}
            style={[styles.arrow, { tintColor: colors.text }]}
          />
        </TouchableOpacity>

        {/* PHONE */}
        <TouchableOpacity style={[styles.card,{backgroundColor: colors.tabBg}]} onPress={openPhone}>
          <View style={styles.leftRow}>
            <Image
              source={require('../../../assets/phone.png')}
              style={[styles.icon, { tintColor: colors.text }]}
            />
            <View>
              <Text style={[styles.cardTitle, { color: colors.text }]}>Phone Support</Text>
              <Text style={styles.cardSub}>+91 1234567890</Text>
            </View>
          </View>
          <Image
            source={require('../../../assets/right-arrow.png')}
            style={[styles.arrow, { tintColor: colors.text }]}
          />
        </TouchableOpacity>

        {/* WEBSITE */}
        <TouchableOpacity style={[styles.card,{backgroundColor: colors.tabBg}]} onPress={openWebsite}>
          <View style={styles.leftRow}>
            <Image
              source={require('../../../assets/website.png')}
              style={[styles.icon, { tintColor: colors.text }]}
            />
            <View>
              <Text style={[styles.cardTitle, { color: colors.text }]}>Help Center</Text>
              <Text style={styles.cardSub}>vinsta.com/support</Text>
            </View>
          </View>
          <Image
            source={require('../../../assets/right-arrow.png')}
            style={[styles.arrow, { tintColor: colors.text }]}
          />
        </TouchableOpacity>

        {/* FAQ */}
        <TouchableOpacity style={[styles.card,{backgroundColor: colors.tabBg}]} onPress={openFAQ}>
          <View style={styles.leftRow}>
            <Image
              source={require('../../../assets/faq.png')}
              style={[styles.icon, { tintColor: colors.text }]}
            />
            <View>
              <Text style={[styles.cardTitle, { color: colors.text }]}>FAQ</Text>
              <Text style={styles.cardSub}>
                Frequently asked questions
              </Text>
            </View>
          </View>
          <Image
            source={require('../../../assets/right-arrow.png')}
            style={[styles.arrow, { tintColor: colors.text }]}
          />
        </TouchableOpacity>

        {/* BOTTOM INFO */}
        <View style={styles.infoBox}>
          <Text style={[styles.infoText, { color: colors.text }]}>📞 Support Hours: 24/7</Text>
          <Text style={[styles.infoText, { color: colors.text }]}>
            ⏰ Average Response Time: 2 hours
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Support;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
   // borderBottomWidth: 1,
   // borderBottomColor: '#EAEAEA',
  },

  backIcon: {
    width: 22,
    height: 22,
  },

  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },

  content: {
    padding: 16,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,

    // shadow (image jaisa)
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },

  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },

  icon: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
  },

  arrow: {
    width: 8,
    height: 13,
    tintColor: '#555',
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },

  cardSub: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },

  infoBox: {
    marginTop: 30,
    alignItems: 'center',
    gap: 8,
  },

  infoText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
});
