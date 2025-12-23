import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ScrollView,
} from 'react-native';
import { COLORS } from '../../../theme/colors';
import { getFontFamily } from '../../../utils/fontHelper';

const TABS = [
  'Order received',
  'Confirm Order',
  'Order in Progress',
  'Completed',
  'UnderShipMent',
];

interface OrderStatusTabsProps {
  activeTab: number;
  onTabChange: (index: number) => void;
}

export default function OrderStatusTabs({
  activeTab,
  onTabChange,
}: OrderStatusTabsProps) {
  return (
    <View style={styles.tabsWrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabs}
      >
        {TABS.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.tab,
              activeTab === index && styles.activeTab,
            ]}
            onPress={() => onTabChange(index)}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === index && styles.activeTabText,
              ]}
              numberOfLines={1}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  tabsWrapper: {
    marginBottom: 24,
    marginTop: Platform.OS === 'ios' ? 0 : -10,
  },

  tabs: {
    flexDirection: 'row',
    backgroundColor: '#F4F4F4',
    borderRadius: 30,
    marginHorizontal: 14,
    padding: 4,
  },

  tab: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    alignItems: 'center',
    borderRadius: 24,
    marginRight: 6,
  },

  activeTab: {
    backgroundColor: COLORS.primary || '#FF6B35',
  },

  tabText: {
    color: COLORS.text || '#111827',
    fontSize: 12,
    fontFamily: getFontFamily('Medium'),
  },

  activeTabText: {
    color: '#FFFFFF',
    fontFamily: getFontFamily('SemiBold'),
  },
});
