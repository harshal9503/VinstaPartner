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
  Switch,
} from 'react-native';
import { COLORS } from '../theme/colors';
import { getFontFamily, getFontWeight } from '../utils/fontHelper';

const { width } = Dimensions.get('window');

type Offer = {
  threshold: string;
  discountIfExceed: string;
  discount: string;
  description: string;
};

const Food4 = ({ navigation }: any) => {
  const [offerEnabled, setOfferEnabled] = useState(true);

  const [offers, setOffers] = useState<Offer[]>([
    {
      threshold: '',
      discountIfExceed: '',
      discount: '',
      description: '',
    },
  ]);

  const addOffer = () => {
    setOffers(prev => [
      ...prev,
      {
        threshold: '',
        discountIfExceed: '',
        discount: '',
        description: '',
      },
    ]);
  };

  const updateOffer = (
    index: number,
    key: keyof Offer,
    value: string,
  ) => {
    const updated = [...offers];
    updated[index][key] = value;
    setOffers(updated);
  };

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={require('../assets/f4.png')}
            style={styles.progressImg}
          />
          <View style={styles.headerTextWrap}>
            <Text style={styles.headerTitle}>Add offer</Text>
            <Text style={styles.headerSubTitle}>Completed</Text>
          </View>
        </View>

        {/* Page title */}
        <Text style={styles.pageTitle}>
          Add offer <Text style={styles.optional}>(optional)</Text>
        </Text>
        <Text style={styles.pageDesc}>Register your food</Text>

        {/* Toggle */}
        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>
            Do you want to add offer on food ?
          </Text>
          <Switch
            value={offerEnabled}
            onValueChange={setOfferEnabled}
            trackColor={{
              false: COLORS.border,
              true: COLORS.primary,
            }}
            thumbColor={COLORS.secondary}
          />
        </View>

        {/* OFFERS */}
        {offerEnabled &&
          offers.map((offer, index) => (
            <View key={index}>
              <Text style={styles.offerTitle}>
                Offer {index + 1}
              </Text>

              <Text style={styles.label}>
                Timing threshold for discount
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter time threshold"
                placeholderTextColor={COLORS.muted}
                value={offer.threshold}
                onChangeText={v =>
                  updateOffer(index, 'threshold', v)
                }
              />

              <Text style={styles.label}>
                Discount Percentage{' '}
                <Text style={styles.labelHint}>
                  (if quantity exceeds threshold)
                </Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="%"
                keyboardType="numeric"
                placeholderTextColor={COLORS.muted}
                value={offer.discountIfExceed}
                onChangeText={v =>
                  updateOffer(index, 'discountIfExceed', v)
                }
              />

              <Text style={styles.label}>Discount Percentage</Text>
              <TextInput
                style={styles.input}
                placeholder="38%"
                keyboardType="numeric"
                placeholderTextColor={COLORS.muted}
                value={offer.discount}
                onChangeText={v =>
                  updateOffer(index, 'discount', v)
                }
              />

              <Text style={styles.label}>
                Description{' '}
                <Text style={styles.labelHint}>
                  (Tell us about your Vehicle)
                </Text>
              </Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Textarea"
                placeholderTextColor={COLORS.muted}
                multiline
                value={offer.description}
                onChangeText={v =>
                  updateOffer(index, 'description', v)
                }
              />
            </View>
          ))}

        {/* BUTTONS */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.saveBtn}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.addBtn}
            onPress={addOffer}
          >
            <Text style={styles.addText}>Add</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Food4;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },

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

  progressImg: {
    width: 64,
    height: 64,
  },

  headerTextWrap: {
    flex: 1,
    alignItems: 'flex-end',
  },

  headerTitle: {
    fontSize: 18,
    fontFamily: getFontFamily('SemiBold'),
    fontWeight: getFontWeight('SemiBold'),
  },

  headerSubTitle: {
    fontSize: 14,
    color: COLORS.muted,
    marginTop: 4,
  },

  pageTitle: {
    fontSize: 26,
    color: COLORS.primary,
    fontFamily: getFontFamily('Bold'),
  },

  optional: {
    fontSize: 16,
    color: COLORS.primary,
  },

  pageDesc: {
    fontSize: 15,
    color: COLORS.muted,
    marginBottom: 26,
  },

  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  toggleLabel: {
    fontSize: 15,
    fontFamily: getFontFamily('Medium'),
    width: '80%',
  },

  offerTitle: {
    marginTop: 30,
    fontSize: 20,
    color: COLORS.primary,
    fontFamily: getFontFamily('Bold'),
  },

  label: {
    fontSize: 15,
    marginTop: 18,
    marginBottom: 8,
    fontFamily: getFontFamily('Medium'),
  },

  labelHint: {
    fontSize: 14,
    color: COLORS.muted,
  },

  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    padding: 16,
    backgroundColor: COLORS.secondary,
  },

  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },

  buttonRow: {
    flexDirection: 'row',
    marginTop: 40,
  },

  saveBtn: {
    flex: 1,
    marginRight: 12,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },

  saveText: {
    color: COLORS.primary,
    fontSize: 16,
    fontFamily: getFontFamily('Medium'),
  },

  addBtn: {
    flex: 1,
    marginLeft: 12,
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },

  addText: {
    color: COLORS.secondary,
    fontSize: 16,
    fontFamily: getFontFamily('Bold'),
  },
});
