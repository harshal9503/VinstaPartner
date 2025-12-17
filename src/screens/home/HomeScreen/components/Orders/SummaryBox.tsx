import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { COLORS } from '../../../../../theme/colors';
import { getFontFamily } from '../../../../../utils/fontHelper';

interface SummaryBoxProps {
  title: string;
  value: string;
  icon: any;
  iconTint?: string;
}

export default function SummaryBox({ title, value, icon, iconTint = COLORS.primary }: SummaryBoxProps) {
  return (
    <View style={styles.box}>
      <View style={styles.header}>
        <Image source={icon} style={[styles.icon, { tintColor: iconTint }]} />
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  title: {
    fontSize: 12,
    color: COLORS.muted || '#6B7280',
    fontFamily: getFontFamily('Medium'),
    flex: 1,
  },
  value: {
    fontSize: 24,
    fontFamily: getFontFamily('Bold'),
    color: COLORS.text || '#111827',
  },
});
