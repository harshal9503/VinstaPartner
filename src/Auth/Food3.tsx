import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  TextInput,
  ScrollView,
  Modal,
  Pressable,
} from 'react-native';
import { COLORS } from '../theme/colors';
import { getFontFamily, getFontWeight } from '../utils/fontHelper';

const { width } = Dimensions.get('window');

type Slot = {
  id: number;
  label: string;
};

const Food3 = ({ navigation }: any) => {
  const [availability, setAvailability] = useState<number>(2);

  const [slots, setSlots] = useState<Slot[]>([
    { id: 1, label: 'Mon 11 To 7' },
    { id: 2, label: 'Tue 1 To 7' },
  ]);

  const [showSlotModal, setShowSlotModal] = useState(false);
  const [fromTime, setFromTime] = useState('');
  const [toTime, setToTime] = useState('');

  const addSlot = () => {
    if (!fromTime || !toTime) return;

    const newSlot: Slot = {
      id: Date.now(),
      label: `${fromTime} To ${toTime}`,
    };

    setSlots(prev => [...prev, newSlot]);
    setAvailability(newSlot.id);
    setFromTime('');
    setToTime('');
    setShowSlotModal(false);
  };

  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Image source={require('../assets/f3.png')} style={styles.progressImg} />
          <View style={styles.headerTextWrap}>
            <Text style={styles.headerTitle}>Pricing details</Text>
            <Text style={styles.headerSubTitle}>Next step offer applicability</Text>
          </View>
        </View>

        <Text style={styles.pageTitle}>Pricing details</Text>
        <Text style={styles.pageDesc}>Register your vehicle</Text>

        {/* Price Inputs */}
        <Text style={styles.label}>Enter Item Price</Text>
        <TextInput style={styles.input} placeholder="$470" placeholderTextColor={COLORS.muted} />

        <Text style={styles.label}>
          Display Price <Text style={styles.labelHint}>(the price customers will see)</Text>
        </Text>
        <TextInput style={styles.input} placeholder="$470" placeholderTextColor={COLORS.muted} />

        {/* Variants */}
        <Text style={styles.sectionTitle}>
          Variants / Portions <Text style={styles.labelHint}>(If applicable)</Text>
        </Text>

        <View style={styles.variantRow}>
          <View style={styles.variantBox}>
            <Text style={styles.variantLabel}>Small</Text>
            <TextInput style={styles.variantInput} placeholder="$100" placeholderTextColor={COLORS.muted} />
          </View>
          <View style={styles.variantBox}>
            <Text style={styles.variantLabel}>Medium</Text>
            <TextInput style={styles.variantInput} placeholder="$200" placeholderTextColor={COLORS.muted} />
          </View>
        </View>

        <View style={styles.variantRow}>
          <View style={styles.variantBox}>
            <Text style={styles.variantLabel}>Large</Text>
            <TextInput style={styles.variantInput} placeholder="$300" placeholderTextColor={COLORS.muted} />
          </View>
          <View style={styles.variantBox}>
            <Text style={styles.variantLabel}>Half</Text>
            <TextInput style={styles.variantInput} placeholder="$400" placeholderTextColor={COLORS.muted} />
          </View>
        </View>

        {/* Availability */}
        <View style={styles.availabilityHeader}>
          <Text style={styles.label}>Availability</Text>
          <TouchableOpacity onPress={() => setShowSlotModal(true)}>
            <Text style={styles.addSlot}>+ Add Slot</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.availabilityRow}>
          {slots.map(slot => (
            <TouchableOpacity
              key={slot.id}
              style={[
                styles.availabilityBox,
                availability === slot.id && styles.availabilityActive,
              ]}
              onPress={() => setAvailability(slot.id)}
            >
              <Text
                style={[
                  styles.availabilityText,
                  availability === slot.id && styles.activeText,
                ]}
              >
                {slot.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.nextBtn} onPress={() => navigation.navigate('Food4')}>
            <Text style={styles.nextText}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* ADD SLOT MODAL */}
      <Modal transparent animationType="slide" visible={showSlotModal}>
        <View style={styles.modalOverlay}>
          <Pressable style={{ flex: 1 }} onPress={() => setShowSlotModal(false)} />
          <View style={styles.modalContainer}>
            <View style={styles.modalHandle} />

            <Text style={styles.modalTitle}>Add Availability Slot</Text>

            <TextInput
              style={styles.modalInput}
              placeholder="From (e.g. Wed 10)"
              value={fromTime}
              onChangeText={setFromTime}
            />

            <TextInput
              style={styles.modalInput}
              placeholder="To (e.g. Wed 6)"
              value={toTime}
              onChangeText={setToTime}
            />

            <TouchableOpacity style={styles.modalAddBtn} onPress={addSlot}>
              <Text style={styles.modalAddText}>Add Slot</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Food3;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.secondary },

  container: {
    paddingHorizontal: width * 0.06,
   paddingTop: Platform.OS === 'ios' ? 10 : 30,

    paddingBottom: 60,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 34,
    paddingRight: width * 0.06,
  },

  progressImg: { width: 64, height: 64 },

  headerTextWrap: { flex: 1, alignItems: 'flex-end' },

  headerTitle: {
    fontSize: 18,
    fontFamily: getFontFamily('SemiBold'),
    fontWeight: getFontWeight('SemiBold'),
  },

  headerSubTitle: { fontSize: 14, color: COLORS.muted, marginTop: 4 },

  pageTitle: {
    fontSize: 26,
    color: COLORS.primary,
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },

  pageDesc: { fontSize: 15, color: COLORS.muted, marginBottom: 26 },

  label: {
    fontSize: 15,
    marginTop: 18,
    marginBottom: 8,
    fontFamily: getFontFamily('Medium'),
  },

  labelHint: { fontSize: 14, color: COLORS.muted },

  sectionTitle: {
    marginTop: 28,
    fontSize: 18,
    color: COLORS.primary,
    fontFamily: getFontFamily('Bold'),
  },

  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    padding: 16,
    backgroundColor: COLORS.secondary,
  },

  variantRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 },
  variantBox: { width: '48%' },

  variantLabel: { marginBottom: 6, fontSize: 14, fontFamily: getFontFamily('Medium') },

  variantInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    padding: 16,
    backgroundColor: COLORS.secondary,
  },

  availabilityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 28,
  },

  addSlot: { color: COLORS.primary, fontFamily: getFontFamily('Medium') },

  availabilityRow: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 14 },

  availabilityBox: {
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 14,
    marginRight: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  availabilityActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  availabilityText: { fontSize: 14 },

  activeText: {
    color: COLORS.secondary,
    fontFamily: getFontFamily('SemiBold'),
  },

  buttonRow: { flexDirection: 'row', marginTop: 40 },

  backBtn: {
    flex: 1,
    marginRight: 12,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },

  backText: { color: COLORS.primary, fontSize: 16 },

  nextBtn: {
    flex: 1,
    marginLeft: 12,
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },

  nextText: {
    color: COLORS.secondary,
    fontSize: 16,
    fontFamily: getFontFamily('Bold'),
  },

  /* MODAL */
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.35)',
  },

  modalContainer: {
    backgroundColor: COLORS.secondary,
    padding: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },

  modalHandle: {
    width: 52,
    height: 5,
    borderRadius: 3,
    backgroundColor: COLORS.border,
    alignSelf: 'center',
    marginBottom: 12,
  },

  modalTitle: {
    fontSize: 18,
    fontFamily: getFontFamily('SemiBold'),
    marginBottom: 16,
  },

  modalInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
  },

  modalAddBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },

  modalAddText: {
    color: COLORS.secondary,
    fontSize: 16,
    fontFamily: getFontFamily('Bold'),
  },
});
