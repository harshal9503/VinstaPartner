import React from 'react';
import { View, StyleSheet } from 'react-native';
import TodayEarningBox from '../components/TodayEarningBox';

export default function TodayEarningBoxes() {
  return (
    <View style={styles.container}>
      <TodayEarningBox
        title="Today Earning"
        value="₹2,884"
        percent="8.13%"
        trend="down"
        waveColor="#EF4444"
      />

      <TodayEarningBox
        title="Payouts"
        value="₹2,884"
        percent="8.13%"
        trend="up"
        waveColor="#22C55E"
      />

      {/* Spacer for bottom tab */}
      <View style={styles.bottomSpacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },

  // 🔑 prevents bottom tab overlap
  bottomSpacer: {
    height: 90, // adjust if your bottom tab is taller
  },
});
