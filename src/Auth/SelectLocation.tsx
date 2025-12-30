import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
  ImageBackground,
  Platform,
} from 'react-native';
import { COLORS } from '../theme/colors';
import { getFontFamily, getFontWeight } from '../utils/fontHelper';

const { width } = Dimensions.get('window');

const SelectLocation = ({ navigation }: any) => {
  return (
    <View style={styles.root}>
      <ImageBackground
        source={require('../assets/mapbg.png')}
        style={styles.map}
        resizeMode="cover"
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <Image
              source={require('../assets/back.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Select Location</Text>
          <View style={{ width: 50 }} />
        </View>

        {/* Search */}
        <View style={styles.searchBox}>
          <Image
            source={require('../assets/search.png')}
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="search for area"
            placeholderTextColor={COLORS.placeholder}
            style={styles.searchInput}
          />
        </View>

        {/* Location Card */}
        <View style={styles.locationCard}>
          <View style={styles.row}>
            <Image
              source={require('../assets/location.png')}
              style={styles.locationIcon}
            />

            <View style={styles.locationTextWrap}>
              <Text style={styles.useLocation}>Use Current location</Text>
              <Text style={styles.address}>
                Barpeta town. Assam, India
              </Text>
            </View>

            <Image
              source={require('../assets/rightarrow.png')}
              style={styles.arrowIcon}
            />
          </View>

          <View style={styles.divider} />

          <Text style={styles.addAddress}>Add Address</Text>
        </View>

        {/* Save */}
        <TouchableOpacity
          style={styles.saveButton}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('StoreHours')}
        >
          <Text style={styles.saveText}>SAVE</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },

  map: {
    flex: 1,
  },

  /* Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.05,
    paddingTop: Platform.OS === 'ios' ? 10 : 30,

    paddingBottom: 16,
  },

  backBtn: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  backIcon: {
    width: 24, // ⬅️ increased
    height: 24, // ⬅️ increased
    tintColor: COLORS.text,
  },

  headerTitle: {
    fontSize: 18,
    color: COLORS.text,
    fontFamily: getFontFamily('Bold'), // ⬅️ bold
    fontWeight: getFontWeight('Bold'),
  },

  /* Search */
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
    marginHorizontal: width * 0.05,
    marginTop: 12,
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 52,
  },

  searchIcon: {
    width: 20,
    height: 20,
    tintColor: COLORS.primary,
    marginRight: 10,
  },

  searchInput: {
    flex: 1,
    fontSize: 15,
    color: COLORS.text,
    fontFamily: getFontFamily('Regular'),
  },

  /* Location Card */
  locationCard: {
    backgroundColor: COLORS.secondary,
    marginHorizontal: width * 0.05,
    marginTop: 16,
    borderRadius: 16,
    padding: 16,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  locationIcon: {
    width: 22,
    height: 22,
    tintColor: COLORS.primary,
    marginRight: 12,
  },

  locationTextWrap: {
    flex: 1,
  },

  useLocation: {
    fontSize: 16,
    color: COLORS.primary,
    fontFamily: getFontFamily('Medium'),
    fontWeight: getFontWeight('Medium'),
  },

  address: {
    fontSize: 14,
    color: COLORS.text,
    marginTop: 4,
    fontFamily: getFontFamily('Regular'),
  },

  arrowIcon: {
    width: 8,
    height: 13,
    tintColor: COLORS.primary,
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 14,
  },

  addAddress: {
    fontSize: 16,
    color: COLORS.primary,
    fontFamily: getFontFamily('Medium'),
    fontWeight: getFontWeight('Medium'),
  },

  /* Save */
  saveButton: {
    position: 'absolute',
    bottom: 24,
    left: width * 0.06,
    right: width * 0.06,
    backgroundColor: COLORS.primary,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 6,
  },

  saveText: {
    fontSize: 18,
    color: COLORS.secondary,
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },
});

export default SelectLocation;
