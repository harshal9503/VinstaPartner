import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../../../../theme/colors';
import { getFontFamily } from '../../../../../utils/fontHelper';
import TotalOrdersCard from '../Orders/TotalOrdersCard';
import OrderSummaryGrid from '../Orders/OrderSummaryGrid';

export default function Orders() {
  return (
    <View style={styles.container}>
      <TotalOrdersCard />
      <Text style={styles.sectionTitle}>Today order summary</Text>
      <OrderSummaryGrid />
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
