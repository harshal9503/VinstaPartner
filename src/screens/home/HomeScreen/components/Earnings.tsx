import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../../../theme/colors';
import { getFontFamily } from '../../../../utils/fontHelper';
import MonthlyEarningCard from '../components/MonthlyEarningCard';
import TodayEarningBoxes from '../components/TodayEarningBoxes';

export default function Earnings() {
  return (
    <View style={styles.container}>
      <MonthlyEarningCard />
      <Text style={styles.sectionTitle}>Today Earning</Text>
      <TodayEarningBoxes />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 17,
    marginBottom: 16,
    fontFamily: getFontFamily('SemiBold'),
    color: COLORS.text || '#111827',
  },
});
