import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../../theme/ThemeContext';
import { useContext } from 'react';
const HelpSupport = () => {
  const { theme, colors } = useContext(ThemeContext);
  const navigation = useNavigation<any>();

  return (
   <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
         <StatusBar
           barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
           backgroundColor={colors.background}
         />

      {/* -------- HEADER -------- */}
        <View style={[styles.header, { backgroundColor: colors.background }]}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                            source={require('../../../assets/back.png')}
                            style={[styles.backIcon, { tintColor: colors.text }]}
                          />
              </TouchableOpacity>

        <Text style={[styles.headerTitle,{color:colors.text}]}>Help</Text>

        <View style={{ width: 24 }} />
      </View>

      {/* -------- CONTENT -------- */}
      <View style={styles.content}>
        <Text style={[styles.title,{color:colors.text}]}>Help & Support</Text>

        <Text style={[styles.description,{color:colors.text}]}>
          This is a dummy help screen. You can add FAQs, contact information,
          troubleshooting steps, or any support-related content here.
        </Text>

        {/* -------- OPTIONS -------- */}
        <TouchableOpacity style={[styles.card,{backgroundColor:colors.tabBg}]}>
          <Text style={[styles.cardText,{color:colors.text}]}>✔ App Usage Guide</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card,{backgroundColor:colors.tabBg}]}>
          <Text style={[styles.cardText,{color:colors.text}]}>✔ Troubleshooting Tips</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card,{backgroundColor:colors.tabBg}]}>
          <Text style={[styles.cardText,{color:colors.text}]}>✔ Contact Support</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HelpSupport;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
   // borderBottomWidth: 1,
   // borderBottomColor: '#eee',
  },

  backIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },

  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },

  content: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#000',
    marginBottom: 10,
  },

  description: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
    marginBottom: 24,
  },

  card: {
    backgroundColor: '#F5F5F5',
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginBottom: 14,
  },

  cardText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});
