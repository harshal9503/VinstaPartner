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
  Modal,
  Pressable,
} from 'react-native';
import { COLORS } from '../../../../../theme/colors';
import { getFontFamily, getFontWeight } from '../../../../../utils/fontHelper';

const { width } = Dimensions.get('window');
const CIRCLE_SIZE = 54;

/* dropdown data */
const promoTypes = ['Percentage discount', 'Fixed amount', 'Buy one get one'];
const discountOptions = ['5 %', '10 %', '15 %', '20 %', '25 %', '30 %'];

const PricingAddPromo = ({ navigation }: any) => {
  const [promoName, setPromoName] = useState('');
  const [promoType, setPromoType] = useState('Percentage discount');
  const [discount, setDiscount] = useState('10 %');
  const [startDate, setStartDate] = useState('12/8/2025');
  const [endDate, setEndDate] = useState('12/8/2025');
  const [description, setDescription] = useState('');
  const [sheet, setSheet] = useState<null | 'promo' | 'discount'>(null);

  const renderSheet = (data: string[], onSelect: (v: string) => void) => (
    <Modal transparent animationType="slide" visible>
      <Pressable style={styles.overlay} onPress={() => setSheet(null)} />
      <View style={styles.bottomSheet}>
        {data.map(item => (
          <TouchableOpacity
            key={item}
            style={styles.optionRow}
            onPress={() => {
              onSelect(item);
              setSheet(null);
            }}
          >
            <Text style={styles.optionText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </Modal>
  );

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* ===== HEADER ===== */}
        <View style={styles.header}>
          <View style={styles.progressWrapper}>
            <Image
              source={require('../../../../../assets/kyc1.png')}
              style={styles.progressImage}
              resizeMode="contain"
            />
          </View>

          <View style={styles.headerTextWrap}>
            <Text style={styles.headerTitle}>Add offer</Text>
            <Text style={styles.headerSubTitle}>Completed</Text>
          </View>
        </View>

        {/* ===== TITLE ===== */}
        <Text style={styles.sectionTitle}>Create promotional offer</Text>
        <Text style={styles.sectionDesc}>Add promotional offer</Text>

        {/* Promo name */}
        <Text style={styles.label}>Promo name</Text>
        <TextInput
          style={styles.input}
          placeholder="New year offer"
          placeholderTextColor={COLORS.placeholder}
          value={promoName}
          onChangeText={setPromoName}
        />

        {/* Promo type */}
        <Text style={styles.label}>Promo type</Text>
        <TouchableOpacity
          style={styles.selectBox}
          onPress={() => setSheet('promo')}
        >
          <Text style={styles.selectText}>{promoType}</Text>
          <Image
            source={require('../../../../../assets/dropdown.png')}
            style={styles.dropdownIcon}
          />
        </TouchableOpacity>

        {/* Discount */}
        <Text style={styles.label}>Discount percentage</Text>
        <TouchableOpacity
          style={styles.selectBox}
          onPress={() => setSheet('discount')}
        >
          <Text style={styles.selectText}>{discount}</Text>
          <Image
            source={require('../../../../../assets/dropdown.png')}
            style={styles.dropdownIcon}
          />
        </TouchableOpacity>

        {/* Dates */}
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Start date</Text>
            <TextInput
              style={styles.input}
              placeholder="12/8/2025"
              placeholderTextColor={COLORS.placeholder}
              value={startDate}
              onChangeText={setStartDate}
            />
          </View>

          <View style={{ width: 14 }} />

          <View style={{ flex: 1 }}>
            <Text style={styles.label}>End date</Text>
            <TextInput
              style={styles.input}
              placeholder="12/8/2025"
              placeholderTextColor={COLORS.placeholder}
              value={endDate}
              onChangeText={setEndDate}
            />
          </View>
        </View>

        {/* Description */}
        <Text style={styles.label}>
          Description{' '}
          <Text style={styles.optional}>(Describe your promotional offer)</Text>
        </Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Describe your promotional offer"
          placeholderTextColor={COLORS.placeholder}
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
        />

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* ===== FOOTER BUTTONS ===== */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.navigate('PricingBrowse')}
          activeOpacity={0.85}
        >
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.nextBtn}
          onPress={() => navigation.navigate('AddPromo2')}
          activeOpacity={0.85}
        >
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
      </View>

      {/* Dropdown sheets */}
      {sheet === 'promo' && renderSheet(promoTypes, setPromoType)}
      {sheet === 'discount' && renderSheet(discountOptions, setDiscount)}
    </View>
  );
};

export default PricingAddPromo;

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },

  container: {
    paddingHorizontal: width * 0.06,
    paddingTop: Platform.OS === 'ios' ? 55 : 45,
  },

  /* Header */
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 32,
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
    fontFamily: getFontFamily('SemiBold'),
    fontWeight: getFontWeight('SemiBold'),
    color: COLORS.text,
  },

  headerSubTitle: {
    fontSize: 14,
    marginTop: 4,
    color: COLORS.muted,
    fontFamily: getFontFamily('Regular'),
  },

  /* Section */
  sectionTitle: {
    fontSize: 22,
    color: COLORS.primary,
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
    marginBottom: 6,
  },

  sectionDesc: {
    fontSize: 15,
    color: COLORS.muted,
    marginBottom: 26,
  },

  label: {
    fontSize: 15,
    color: COLORS.text,
    marginBottom: 8,
    marginTop: 18,
    fontFamily: getFontFamily('Medium'),
  },

  optional: {
    fontSize: 13,
    color: COLORS.muted,
  },

  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 16,
    fontSize: 15,
    backgroundColor: COLORS.secondary,
    color: COLORS.text,
  },

  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },

  selectBox: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  selectText: {
    fontSize: 15,
    color: COLORS.text,
    flex: 1,
  },

  dropdownIcon: {
    width: 14,
    height: 14,
  },

  row: {
    flexDirection: 'row',
  },

  /* Footer */
  footer: {
    flexDirection: 'row',
    paddingHorizontal: width * 0.06,
    paddingBottom: 24,
  },

  backBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginRight: 12,
  },

  backText: {
    fontSize: 16,
    color: COLORS.primary,
    fontFamily: getFontFamily('SemiBold'),
  },

  nextBtn: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },

  nextText: {
    fontSize: 16,
    color: COLORS.secondary,
    fontFamily: getFontFamily('SemiBold'),
  },

  /* Dropdown Sheet Styles */
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },

  bottomSheet: {
    backgroundColor: COLORS.secondary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  optionRow: {
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  optionText: {
    fontSize: 15,
    color: COLORS.text,
    fontFamily: getFontFamily('Medium'),
  },
});
