import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Platform,
} from 'react-native';
import { COLORS } from '../../../../../theme/colors';
import { getFontFamily, getFontWeight } from '../../../../../utils/fontHelper';

const { width } = Dimensions.get('window');
const CIRCLE_SIZE = 54;

const AddPromo3 = ({ navigation }: any) => {
  const handleBack = () => {
    navigation.goBack();
  };

  const handleLaunch = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* ===== HEADER ===== */}
        <View style={styles.header}>
          <View style={styles.progressWrapper}>
            <Image
              source={require('../../../../../assets/kyc3.png')}
              style={styles.progressImage}
              resizeMode="contain"
            />
          </View>

          <View style={styles.headerTextWrap}>
            <Text style={styles.headerTitle}>Preview promo</Text>
            <Text style={styles.headerSubTitle}>Completed</Text>
          </View>
        </View>

        {/* ===== SECTION ===== */}
        <Text style={styles.sectionTitle}>Create promotional offer</Text>
        <Text style={styles.sectionDesc}>Add promotional offer</Text>

        <Text style={styles.previewTitle}>Preview promo</Text>

        {/* ===== PROMO BANNER ===== */}
        <View style={styles.bannerWrapper}>
          <Image
            source={require('../../../../../assets/promo.png')}
            style={styles.banner}
            resizeMode="cover"
          />
        </View>
      </ScrollView>

      {/* ===== FOOTER BUTTONS ===== */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.backBtn}
          activeOpacity={0.85}
          onPress={handleBack}
        >
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.launchBtn}
          activeOpacity={0.85}
          onPress={handleLaunch}
        >
          <Text style={styles.launchText}>Launch</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddPromo3;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },

  container: {
    paddingHorizontal: width * 0.06,
    paddingTop: Platform.OS === 'ios' ? 55 : 45,
    paddingBottom: 140,
  },

  /* Header */
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 36,
  },

  progressWrapper: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
  },

  progressImage: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
  },

  headerTextWrap: {
    flex: 1,
    alignItems: 'flex-end',
  },

  headerTitle: {
    fontSize: 18,
    color: COLORS.text,
    fontFamily: getFontFamily('SemiBold'),
    fontWeight: getFontWeight('SemiBold'),
  },

  headerSubTitle: {
    fontSize: 14,
    color: COLORS.muted,
    marginTop: 4,
    fontFamily: getFontFamily('Regular'),
  },

  /* Section */
  sectionTitle: {
    fontSize: 22,
    color: COLORS.primary,
    marginBottom: 6,
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },

  sectionDesc: {
    fontSize: 15,
    color: COLORS.muted,
    marginBottom: 26,
    fontFamily: getFontFamily('Regular'),
  },

  previewTitle: {
    fontSize: 18,
    color: COLORS.text,
    marginBottom: 14,
    fontFamily: getFontFamily('SemiBold'),
    fontWeight: getFontWeight('SemiBold'),
  },

  /* Banner */
  bannerWrapper: {
    width: '100%',
    height: 180,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#F3F3F3',
  },

  banner: {
    width: '100%',
    height: '100%',
  },

  /* Footer */
  footer: {
    position: 'absolute',
    bottom: 24,
    left: width * 0.06,
    right: width * 0.06,
    flexDirection: 'row',
  },

  backBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginRight: 12,
    backgroundColor: COLORS.secondary,
  },

  backText: {
    fontSize: 16,
    color: COLORS.primary,
    fontFamily: getFontFamily('SemiBold'),
    fontWeight: getFontWeight('SemiBold'),
  },

  launchBtn: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },

  launchText: {
    fontSize: 16,
    color: COLORS.secondary,
    fontFamily: getFontFamily('SemiBold'),
    fontWeight: getFontWeight('SemiBold'),
  },
});
