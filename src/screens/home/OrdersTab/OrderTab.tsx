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
    //marginTop: Platform.OS === 'ios' ? 0 : -10,
  },

  tabs: {
    flexDirection: 'row',
  backgroundColor: '#F2F2F2',   // light grey like image
  borderRadius: 18,
  marginHorizontal: 16,
  padding: 4, 
  },

  tab: {
     flex: 1,                     // equal width tabs
  paddingVertical: 14,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 10,
  padding:10,
 
  },

  activeTab: {
    backgroundColor: COLORS.primary || '#FF6B35',
  },

  tabText: {
    color: COLORS.text || '#111827',
    fontSize: 13,
    fontFamily: getFontFamily('Medium'),
  },

  activeTabText: {
    color: '#FFFFFF',
    fontFamily: getFontFamily('SemiBold'),
  },
});
