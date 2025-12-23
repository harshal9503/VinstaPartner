import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { getFontFamily } from '../../../utils/fontHelper';

const Completed = ({ item }) => {
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() =>
        navigation.navigate('OrderDetails', { order: item })
      }
      style={styles.card}
    >
      {/* TOP ROW */}
      <View style={styles.topRow}>
        <Image source={item.image} style={styles.foodImage} />

        <View style={styles.orderInfo}>
          <Text style={styles.orderId}>#{item.id}</Text>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.desc}>
            {item.combo} • {item.items} Dishes
          </Text>
        </View>

        <Text style={styles.date}>{item.date}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.detailRow}>
        <Text style={styles.label}>Status:</Text>
        <Text style={styles.value}>{item.status}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.label}>Total:</Text>
        <Text style={styles.value}>₹{item.total}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.label}>Payment:</Text>
        <Text style={styles.value}>{item.payment}</Text>
      </View>

      <View style={styles.viewBtn}>
        <Text style={styles.viewBtnText}>VIEW DETAILS</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Completed;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 14,

    // shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  foodImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 12,
  },

  orderInfo: {
    flex: 1,
  },

  orderId: {
    color: '#F97316',
    fontSize: 12,
    fontFamily: getFontFamily('Medium'),
  },

  name: {
    fontSize: 15,
    fontFamily: getFontFamily('SemiBold'),
    color: '#111827',
    marginTop: 2,
  },

  desc: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },

  date: {
    fontSize: 11,
    color: '#6B7280',
  },

  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 12,
  },

  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },

  label: {
    fontSize: 13,
    color: '#6B7280',
  },

  value: {
    fontSize: 13,
    color: '#111827',
    fontFamily: getFontFamily('Medium'),
  },

  viewBtn: {
    marginTop: 10,
    alignSelf: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  viewBtnText: {
    fontSize: 12,
    color: '#111827',
    fontFamily: getFontFamily('Medium'),
  },
});
