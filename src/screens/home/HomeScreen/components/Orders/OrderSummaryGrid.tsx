import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SummaryBox from '../../components/Orders/SummaryBox';

export default function OrderSummaryGrid() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.grid,
        {
          paddingBottom:
            (Platform.OS === 'ios' ? 90 : 80) + insets.bottom,
        },
      ]}
    >
      <View style={styles.gridRow}>
        <SummaryBox
          title="Active orders"
          value="50"
          icon={require('../../../../../assets/activeorder.png')}
          iconTint="#3B82F6"
        />
        <SummaryBox
          title="Prepared"
          value="30"
          icon={require('../../../../../assets/prepared.png')}
          iconTint="#10B981"
        />
      </View>

      <View style={styles.gridRow}>
        <SummaryBox
          title="Picked up"
          value="15"
          icon={require('../../../../../assets/pickedup.png')}
          iconTint="#8B5CF6"
        />
        <SummaryBox
          title="Out for delivery"
          value="8"
          icon={require('../../../../../assets/delivery.png')}
          iconTint="#F59E0B"
        />
      </View>

      <View style={styles.gridRow}>
        <SummaryBox
          title="Delivered"
          value="6"
          icon={require('../../../../../assets/delivered.png')}
          iconTint="#EF4444"
        />
        <SummaryBox
          title="Delayed orders"
          value="10"
          icon={require('../../../../../assets/delayed.png')}
          iconTint="#6B7280"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    paddingHorizontal: 0,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
});
