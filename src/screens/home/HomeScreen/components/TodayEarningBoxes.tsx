import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../../../theme/colors';
import { getFontFamily } from '../../../../utils/fontHelper';
import TodayEarningBox from '../components/TodayEarningBox';

const todayEarningData = [2, 4, 6, 8, 6, 4, 2, 4, 6, 8, 10, 8, 6, 4, 6, 8, 10, 12, 10, 8];
const payoutsData = [1, 3, 5, 7, 5, 3, 1, 3, 5, 7, 9, 7, 5, 3, 5, 7, 9, 11, 9, 7];

export default function TodayEarningBoxes() {
  return (
    <View style={styles.container}>
      <TodayEarningBox
        title="Today Earning"
        value="₹2,884"
        change="+8.13%"
        data={todayEarningData}
        color="#10B981"
      />
      <TodayEarningBox
        title="+ Payouts"
        value="₹2,884"
        change="+8.13%"
        data={payoutsData}
        color="#F59E0B"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
});
