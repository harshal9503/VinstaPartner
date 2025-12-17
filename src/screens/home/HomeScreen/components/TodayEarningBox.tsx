import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../../../theme/colors';
import { getFontFamily } from '../../../../utils/fontHelper';

interface TodayEarningBoxProps {
  title: string;
  value: string;
  change: string;
  data: number[];
  color: string;
}

export default function TodayEarningBox({ title, value, change, data, color }: TodayEarningBoxProps) {
  return (
    <View style={styles.box}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.changeRow}>
          <Text style={styles.change}>{change}</Text>
        </View>
      </View>
      <Text style={styles.value}>{value}</Text>
      
      <View style={styles.graphContainer}>
        <View style={styles.graph}>
          {data.map((value, index) => {
            const height = Math.min((value / 12) * 50, 50);
            return (
              <View 
                key={index} 
                style={[
                  styles.graphBar,
                  { height, backgroundColor: color }
                ]}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 12,
    color: COLORS.muted || '#6B7280',
    fontFamily: getFontFamily('Medium'),
  },
  value: {
    fontSize: 24,
    fontFamily: getFontFamily('Bold'),
    color: COLORS.text || '#111827',
    marginBottom: 16,
  },
  changeRow: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  change: {
    fontSize: 11,
    color: '#10B981',
    fontFamily: getFontFamily('SemiBold'),
  },
  graphContainer: {
    height: 40,
    marginTop: 4,
  },
  graph: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: '100%',
    justifyContent: 'space-between',
  },
  graphBar: {
    width: 2,
    borderRadius: 1,
    marginHorizontal: 0.5,
  },
});
