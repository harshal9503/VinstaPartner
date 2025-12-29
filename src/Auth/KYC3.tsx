import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  Platform,
} from 'react-native';
import { COLORS } from '../theme/colors';
import { getFontFamily, getFontWeight } from '../utils/fontHelper';

const { width } = Dimensions.get('window');
const ICON_SIZE = 54;

const KYC3 = ({ navigation }: any) => {
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifsc, setIfsc] = useState('');

  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={require('../assets/kyc3.png')}
            style={styles.progressImage}
            resizeMode="contain"
          />

          <View style={styles.headerTextWrap}>
            <Text style={styles.headerTitle}>Bank details</Text>
            <Text style={styles.headerSubTitle}>Complete registration</Text>
          </View>
        </View>

        {/* Section */}
        <Text style={styles.sectionTitle}>Bank details</Text>
        <Text style={styles.sectionDesc}>
          Please submit the following details to complete your KYC process.
        </Text>

        {/* Account holder name */}
        <Text style={styles.label}>Account holder name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter account holder name"
          placeholderTextColor={COLORS.placeholder}
          value={accountName}
          onChangeText={setAccountName}
        />

        {/* Account number */}
        <Text style={styles.label}>Account number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter account number"
          placeholderTextColor={COLORS.placeholder}
          keyboardType="number-pad"
          value={accountNumber}
          onChangeText={setAccountNumber}
        />

        {/* IFSC */}
        <Text style={styles.label}>IFSC code</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter IFSC code"
          placeholderTextColor={COLORS.placeholder}
          autoCapitalize="characters"
          value={ifsc}
          onChangeText={setIfsc}
        />
      </ScrollView>

      {/* Continue */}
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.85}
        onPress={() => navigation.navigate('SelectLocation')}
      >
        <Text style={styles.buttonText}>Continue</Text>
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

    paddingBottom: 130,
  },

  /* Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 34,
  },

  progressImage: {
    width: ICON_SIZE,
    height: ICON_SIZE,
  },

  headerTextWrap: {
    flex: 1,
    alignItems: 'flex-end', // ✅ RIGHT ALIGN
  },

  headerTitle: {
    fontSize: 20,
    color: COLORS.text,
    fontFamily: getFontFamily('SemiBold'),
    fontWeight: getFontWeight('SemiBold'),
    textAlign: 'right',
  },

  headerSubTitle: {
    fontSize: 15,
    color: COLORS.muted,
    marginTop: 4,
    fontFamily: getFontFamily('Regular'),
    fontWeight: getFontWeight('Regular'),
    textAlign: 'right',
  },

  /* Section */
  sectionTitle: {
    fontSize: 22,
    color: COLORS.primary,
    marginBottom: 8,
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },

  sectionDesc: {
    fontSize: 16,
    color: COLORS.muted,
    marginBottom: 26,
    fontFamily: getFontFamily('Regular'),
    fontWeight: getFontWeight('Regular'),
  },

  label: {
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 8,
    marginTop: 18,
    fontFamily: getFontFamily('Medium'),
    fontWeight: getFontWeight('Medium'),
  },

  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 18,
    fontSize: 16,
    color: COLORS.text,
    backgroundColor: COLORS.secondary,
    fontFamily: getFontFamily('Regular'),
    fontWeight: getFontWeight('Regular'),
  },

  /* Button */
  button: {
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

  buttonText: {
    fontSize: 18,
    color: COLORS.secondary,
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },
});

export default KYC3;
