import React, { useContext } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { ThemeContext } from '../../../theme/ThemeContext';
import { getFontFamily } from '../../../utils/fontHelper';
import { COLORS } from '../../../theme/colors';

const { width } = Dimensions.get('window');
const rs = (size: number) => (width / 375) * size;

const OrderDetails = () => {
  const { theme, colors } = useContext(ThemeContext); // ✅ correct
  const route = useRoute<any>();
  const { order } = route.params;

  const styles = getStyles(colors);

  return (
   <ScrollView
  showsVerticalScrollIndicator={false}
  contentContainerStyle={[
    styles.container,
    { backgroundColor: colors.background, flexGrow: 1 },
  ]}
>

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

        <BillRow label="Item Total" value="₹240.00" styles={styles} />
        <BillRow label="GST & packaging" value="₹26.00" styles={styles} />
        <BillRow label="Delivery Partner Fee" value="₹26.00" styles={styles} />
        <BillRow label="Platform Fee" value="₹8.00" styles={styles} />
      </View>

      {/* PAYMENT */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Payment method</Text>
        <Text style={styles.subText}>Paid via: {order.payment}</Text>
      </View>

      {/* INVOICE */}
      <TouchableOpacity style={styles.invoiceBtn} activeOpacity={0.8}>
        <Text style={styles.invoiceText}>INVOICE</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const BillRow = ({
  label,
  value,
  styles,
}: {
  label: string;
  value: string;
  styles: any;
}) => (
  <View style={styles.billRow}>
    <Text style={styles.billLabel}>{label}</Text>
    <Text style={styles.billValue}>{value}</Text>
  </View>
);

export default OrderDetails;

const getStyles = (colors: any) =>
  StyleSheet.create({
    container: {
  paddingTop:
  Platform.OS === 'android'
    ? StatusBar.currentHeight ?? rs(44)
    : rs(16),
      paddingHorizontal: rs(12),
      backgroundColor: colors.background,
    },

    statusBox: {
      backgroundColor: colors.card,
      padding: rs(14),
      paddingTop:rs(50),
      borderRadius: rs(14),
      //marginBottom: rs(14),
    },

    statusText: {
      color: '#EA580C',
      fontSize: rs(15),
      fontFamily: getFontFamily('Medium'),
    },

    card: {
      backgroundColor: colors.card,
      borderRadius: rs(16),
      padding: rs(14),
      marginBottom: rs(14),
    },

    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    foodImage: {
      width: rs(70),
      height: rs(70),
      borderRadius: rs(12),
      marginRight: rs(12),
    },

    title: {
      fontSize: rs(15),
      fontFamily: getFontFamily('SemiBold'),
      color: colors.text,
    },

    subText: {
      fontSize: rs(12),
      color: colors.inactive,
      marginTop: rs(2),

    },

    orderId: {
      fontSize: rs(12),
      color: colors.primary,
      marginTop: rs(2),
    },

    items: {
      fontSize: rs(12),
      color: colors.inactive,
    },

    price: {
      fontSize: rs(14),
      fontFamily: getFontFamily('SemiBold'),
      color: colors.text,
    },

    sectionTitle: {
      fontSize: rs(14),
      fontFamily: getFontFamily('SemiBold'),
      marginBottom: rs(20),
      color: colors.text,
    },

    billRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: rs(20),
    },

    billLabel: {
      fontSize: rs(14),
      color: colors.subText,
    },

    billValue: {
      fontSize: rs(14),
      fontFamily: getFontFamily('Medium'),
      color: colors.text,
    },

    invoiceBtn: {
      backgroundColor: colors.primary,
      paddingVertical: rs(14),
      borderRadius: rs(14),
      alignItems: 'center',
      marginVertical: rs(24),
    },

    invoiceText: {
      color: COLORS.secondary,
      fontSize: rs(14),
      fontFamily: getFontFamily('SemiBold'),
    },
  });
