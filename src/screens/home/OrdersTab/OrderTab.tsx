import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { COLORS } from '../../../theme/colors';
import { getFontFamily } from '../../../utils/fontHelper';

const { width } = Dimensions.get('window');
const rs = (size: number) => (width / 375) * size;

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
    marginBottom: rs(24),
  },

  /** Grey rounded container */
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F2',
    borderRadius: rs(15),
    padding: rs(4),
    marginHorizontal: rs(12),
  },

  /** Individual tab */
  tab: {
    paddingVertical: rs(14),
    paddingHorizontal: rs(16),
    borderRadius: rs(10),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(30), // ✅ responsive right gap like image
  },

  activeTab: {
    backgroundColor: COLORS.primary || '#FF6B35',
  },

  tabText: {
    color: '#111827',
    fontSize: rs(14),
    fontFamily: getFontFamily('Medium'),
  },

  activeTabText: {
    color: '#FFFFFF',
    fontFamily: getFontFamily('SemiBold'),
  },
});
