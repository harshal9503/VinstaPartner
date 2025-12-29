import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
  ScrollView,
  Platform,
} from 'react-native';
import { COLORS } from '../theme/colors';
import { getFontFamily, getFontWeight } from '../utils/fontHelper';

const { width } = Dimensions.get('window');

const DeliveryCharges = ({ navigation }: any) => {
  const [charges, setCharges] = useState({
    zone1: '',
    zone2: '',
    zone3: '',
  });

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
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

          <Text style={styles.headerTitle}>Delivery Charges</Text>
          <View style={{ width: 46 }} />
        </View>

        {/* Info */}
        <Text style={styles.selectedText}>Selected 3 zones</Text>
        <Text style={styles.desc}>
          Please submit the following details to complete your delivery charges
        </Text>

        {/* Zone 1 */}
        <Text style={styles.label}>Zone 1 (Radius 5 k.m.)</Text>
        <TextInput
          style={styles.input}
          placeholder="20 rs"
          placeholderTextColor={COLORS.placeholder}
          keyboardType="numeric"
          value={charges.zone1}
          onChangeText={t => setCharges({ ...charges, zone1: t })}
        />

        {/* Zone 2 */}
        <Text style={styles.label}>Zone 2 (Radius 10 k.m.)</Text>
        <TextInput
          style={styles.input}
          placeholder="50 rs"
          placeholderTextColor={COLORS.placeholder}
          keyboardType="numeric"
          value={charges.zone2}
          onChangeText={t => setCharges({ ...charges, zone2: t })}
        />

        {/* Zone 3 */}
        <Text style={styles.label}>Zone 3 (Radius 15 k.m.)</Text>
        <TextInput
          style={styles.input}
          placeholder="100 rs"
          placeholderTextColor={COLORS.placeholder}
          keyboardType="numeric"
          value={charges.zone3}
          onChangeText={t => setCharges({ ...charges, zone3: t })}
        />
      </ScrollView>

      {/* Next Button */}
      <TouchableOpacity
        style={styles.nextBtn}
        activeOpacity={0.9}
        onPress={() => navigation.navigate('CatelogSetup')}
      >
        <Text style={styles.nextText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },

  container: {
    paddingHorizontal: width * 0.06,
    paddingTop: Platform.OS === 'ios' ? 10 : 30,

    paddingBottom: 140,
  },

  /* Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 26,
  },

  backBtn: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: COLORS.secondary,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  backIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },

  headerTitle: {
    fontSize: 18,
    color: COLORS.text,
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },

  /* Info */
  selectedText: {
    fontSize: 22,
    color: COLORS.primary,
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
    marginBottom: 6,
  },

  desc: {
    fontSize: 15,
    color: COLORS.muted,
    marginBottom: 26,
    fontFamily: getFontFamily('Regular'),
  },

  /* Inputs */
  label: {
    fontSize: 15,
    color: COLORS.text,
    marginBottom: 8,
    marginTop: 18,
    fontFamily: getFontFamily('Medium'),
    fontWeight: getFontWeight('Medium'),
  },

  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 18,
    fontSize: 15,
    color: COLORS.text,
    fontFamily: getFontFamily('Regular'),
    backgroundColor: COLORS.secondary,
  },

  /* Next */
  nextBtn: {
    position: 'absolute',
    bottom: 24,
    left: width * 0.06,
    right: width * 0.06,
    backgroundColor: COLORS.primary,
    paddingVertical: 18,
    borderRadius: 18,
    alignItems: 'center',
  },

  nextText: {
    fontSize: 18,
    color: COLORS.secondary,
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },
});

export default DeliveryCharges;
