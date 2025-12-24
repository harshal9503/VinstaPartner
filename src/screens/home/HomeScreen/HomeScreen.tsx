import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  ScrollView,
} from 'react-native';
import { COLORS } from '../../../theme/colors';
import Header from './components/Header';
import Tabs from './components/Tabs';
import Earnings from './components/Earnings';
import Orders from '../HomeScreen/components/Orders/Orders';
import Pricing from '../HomeScreen/components/Orders/Pricing';

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState('Earnings');

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}
      >
        <Header />
        <Tabs activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === 'Earnings' && <Earnings />}
        {activeTab === 'Orders' && <Orders />}
        {activeTab === 'Pricing' && <Pricing />}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.secondary || '#F8F9FA',
  },
  scrollContent: {
    flexGrow: 1, // 🔑 makes whole screen scrollable
    paddingBottom: 40,
    paddingTop: Platform.OS === 'android' ? 8 : 0,
  },
});
