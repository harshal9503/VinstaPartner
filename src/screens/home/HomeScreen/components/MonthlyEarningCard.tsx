import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { COLORS } from '../../../../theme/colors';
import { getFontFamily } from '../../../../utils/fontHelper';

const days = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];

export default function MonthlyEarningCard() {
  const earningsData = [2.0, 2.5, 3.5, 3.8, 3.0, 2.5, 2.0];
  const maxEarnings = Math.max(...earningsData);

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.cardTitle}>Monthly earning (first week)</Text>
          <Text style={styles.cardDate}>Thursday, Nov 4, 2024</Text>
        </View>
        <Image source={require('../../../../assets/dots.png')} style={styles.dots} />
      </View>

      <View style={styles.graphContainer}>
        <View style={styles.yAxis}>
          {[0, 1, 2, 3, 4].map((value) => (
            <Text key={value} style={styles.yAxisText}>
              {value === 0 ? '₹0' : `₹${value}K`}
            </Text>
          ))}
        </View>

        <View style={styles.barsContainer}>
          {[0, 1, 2, 3, 4].map((_, i) => (
            <View key={`line-${i}`} style={[styles.gridLine, { top: `${i * 25}%` }]} />
          ))}
          
          {earningsData.map((value, index) => {
            const percentage = (value / maxEarnings) * 100;
            return (
              <View key={index} style={styles.barColumn}>
                <View style={[styles.bar, { height: `${percentage}%` }]} />
                <Text style={styles.dayLabel}>{days[index]}</Text>
              </View>
            );
          })}
        </View>
      </View>

      <Text style={styles.cardAmount}>₹3,820</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: getFontFamily('SemiBold'),
    color: COLORS.text || '#111827',
  },
  cardDate: {
    fontSize: 12,
    color: COLORS.muted || '#9CA3AF',
    marginTop: 4,
    fontFamily: getFontFamily('Regular'),
  },
  dots: {
    width: 24,
    height: 24,
  },
  graphContainer: {
    flexDirection: 'row',
    height: 140,
    marginBottom: 20,
  },
  yAxis: {
    justifyContent: 'space-between',
    marginRight: 10,
    paddingVertical: 8,
    width: 40,
  },
  yAxisText: {
    fontSize: 10,
    color: COLORS.muted || '#9CA3AF',
    fontFamily: getFontFamily('Medium'),
  },
  barsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    position: 'relative',
  },
  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#F3F4F6',
  },
  barColumn: {
    alignItems: 'center',
    width: '12%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  bar: {
    width: '70%',
    backgroundColor: COLORS.primary || '#FF6B35',
    borderRadius: 4,
    marginBottom: 8,
    minHeight: 4,
  },
  dayLabel: {
    fontSize: 10,
    color: COLORS.muted || '#9CA3AF',
    fontFamily: getFontFamily('Medium'),
    marginTop: 4,
  },
  cardAmount: {
    fontSize: 28,
    fontFamily: getFontFamily('Bold'),
    color: COLORS.text || '#111827',
    marginTop: 8,
  },
});
