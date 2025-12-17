import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../../../../theme/colors';
import { getFontFamily } from '../../../../../utils/fontHelper';

export default function Pricing() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Pricing overview</Text>

      <View style={styles.priceRow}>
        <Text style={styles.label}>Base price</Text>
        <Text style={styles.value}>₹120</Text>
      </View>

      <View style={styles.priceRow}>
        <Text style={styles.label}>Commission</Text>
        <Text style={styles.value}>₹20</Text>
      </View>

      <View style={styles.priceRow}>
        <Text style={styles.label}>Your earning</Text>
        <Text style={[styles.value, { color: COLORS.primary }]}>₹100</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 17,
    fontFamily: getFontFamily('Bold'),
    color: COLORS.text || '#111827',
    marginBottom: 20,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    alignItems: 'center',
    paddingVertical: 4,
  },
  label: {
    fontSize: 14,
    color: COLORS.muted || '#6B7280',
    fontFamily: getFontFamily('Medium'),
  },
  value: {
    fontSize: 15,
    fontFamily: getFontFamily('SemiBold'),
    color: COLORS.text || '#111827',
  },
});
