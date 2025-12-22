import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { DarkColors, LightColors } from '../../../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../../theme/colors';
import { ThemeContext } from '../../../theme/ThemeContext';
import { getFontFamily, getFontWeight } from '../../../utils/fontHelper';
const orders = [
  {
    id: '12345',
    status: 'Delivered',
    date: '25 Oct 2025',
  },
  {
    id: '67890',
    status: 'In Transit',
    date: '27 Oct 2025',
  },
];

const MyOrdersScreen = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  const colors = theme === 'dark' ? DarkColors : LightColors;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../../assets/back.png')}
            style={[styles.backIcon, { tintColor: colors.text }]}
          />
        </TouchableOpacity>

        <Text style={[styles.headerTitle, { color: colors.text }]}>
          My Orders
        </Text>

        <View style={{ width: 24 }} />
      </View>

      {/* Orders List */}
      <ScrollView contentContainerStyle={styles.list}>
        {orders.map(order => (
          <View
            key={order.id}
            style={[
              styles.card,
              {
                backgroundColor: colors.tabBg,
                shadowColor: theme === 'dark' ? 'transparent' : '#000',
              },
            ]}
          >
            <Text style={[styles.orderId, { color: colors.primary }]}>
              Order #{order.id}
            </Text>

            <Text style={[styles.text, { color: colors.text }]}>
              Status: {order.status}
            </Text>

            <Text style={[styles.text, { color: colors.inactive }]}>
              Date: {order.date}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default MyOrdersScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  backIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },

  list: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },

  card: {
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },

  orderId: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },

  text: {
    fontSize: 14,
    marginBottom: 2,
  },
});
