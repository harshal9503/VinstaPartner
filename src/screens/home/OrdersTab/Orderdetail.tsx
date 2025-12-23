import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Completed from './Completed';
import { useRoute } from '@react-navigation/native';
import { getFontFamily } from '../../../utils/fontHelper';

const OrderDetails = () => {
  const route = useRoute<any>();
  const { order } = route.params;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* STATUS */}
      <View style={styles.statusBox}>
        <Text style={styles.statusText}>Order was delivered</Text>
      </View>

      {/* FOOD INFO */}
      <View style={styles.card}>
        <View style={styles.row}>
          <Image source={order.image} style={styles.foodImage} />

          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{order.combo}</Text>
            <Text style={styles.subText}>Sudama Nagar, Indore</Text>
            <Text style={styles.orderId}>Order ID: #{order.id}</Text>
            <Text style={styles.items}>{order.items} Dishes</Text>
          </View>

          <Text style={styles.price}>₹{order.total}</Text>
        </View>
      </View>

      {/* BILL SUMMARY */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Bill Summary</Text>

        <BillRow label="Item Total" value="₹240.00" />
        <BillRow label="GST & packaging" value="₹26.00" />
        <BillRow label="Delivery Partner Fee" value="₹26.00" />
        <BillRow label="Platform Fee" value="₹8.00" />
      </View>

      {/* PAYMENT */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Payment method</Text>
        <Text style={styles.subText}>Paid via: {order.payment}</Text>
      </View>

      {/* INVOICE */}
      <TouchableOpacity style={styles.invoiceBtn}>
        <Text style={styles.invoiceText}>INVOICE</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const BillRow = ({ label, value }) => (
  <View style={styles.billRow}>
    <Text style={styles.billLabel}>{label}</Text>
    <Text style={styles.billValue}>{value}</Text>
  </View>
);

export default OrderDetails;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 16,
  },

  statusBox: {
    backgroundColor: '#FFF7ED',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },

  statusText: {
    color: '#EA580C',
    fontFamily: getFontFamily('Medium'),
  },

  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  foodImage: {
    width: 64,
    height: 64,
    borderRadius: 12,
    marginRight: 12,
  },

  title: {
    fontSize: 15,
    fontFamily: getFontFamily('SemiBold'),
    color: '#111827',
  },

  subText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },

  orderId: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },

  items: {
    fontSize: 12,
    color: '#6B7280',
  },

  price: {
    fontSize: 14,
    fontFamily: getFontFamily('SemiBold'),
  },

  sectionTitle: {
    fontSize: 14,
    fontFamily: getFontFamily('SemiBold'),
    marginBottom: 10,
  },

  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },

  billLabel: {
    fontSize: 13,
    color: '#6B7280',
  },

  billValue: {
    fontSize: 13,
    fontFamily: getFontFamily('Medium'),
  },

  invoiceBtn: {
    backgroundColor: '#EA580C',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 30,
  },

  invoiceText: {
    color: '#FFF',
    fontFamily: getFontFamily('SemiBold'),
  },
});
