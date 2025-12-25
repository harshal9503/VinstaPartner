import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../../../theme/colors';
import { getFontFamily } from '../../../../utils/fontHelper';

const TABS = ['Earnings', 'Orders', 'Pricing'];

interface TabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Tabs({ activeTab, onTabChange }: TabsProps) {
  return (
    <View style={styles.tabsWrapper}>
      <View style={styles.tabs}>
        {TABS.map(tab => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              activeTab === tab && styles.activeTab,
            ]}
            onPress={() => onTabChange(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabsWrapper: {
    marginBottom: 10,
    marginTop: Platform.OS === 'ios' ? 0 : 0,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#F4F4F4',
    borderRadius: 12,
    marginHorizontal: 20,
    padding: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: COLORS.primary || '#FF6B35',
  },
  tabText: {
    color: COLORS.text || '#111827',
    fontSize: 14,
    fontFamily: getFontFamily('Medium'),
  },
  activeTabText: {
    color: '#FFFFFF',
    fontFamily: getFontFamily('SemiBold'),
  },
});
