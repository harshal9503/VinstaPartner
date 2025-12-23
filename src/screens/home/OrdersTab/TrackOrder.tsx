import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getFontFamily } from '../../../utils/fontHelper';

const TrackOrder = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { order } = route.params;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* MAP PLACEHOLDER */}
      <View style={styles.mapContainer}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
        
        </TouchableOpacity>

      <View style={styles.mapContainer}>
  {/* MAP IMAGE */}
  <Image
    source={require('../../../assets/mapbg.png')}
    style={styles.mapimg}
    resizeMode="cover"
  />

  {/* BACK BUTTON */}
  <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
   <Image
               source={require('../../../assets/back.png')}
               style={styles.backIcon}
             />
  </TouchableOpacity>

  {/* TITLE */}
  <Text style={styles.headerTitle}>Track Order</Text>
</View>

      </View>

      {/* ORDER CARD */}
      <View style={styles.card}>
        <View style={styles.row}>
          <Image source={order.image} style={styles.foodImage} />

          <View style={{ flex: 1 }}>
            <Text style={styles.orderId}>#{order.id}</Text>
            <Text style={styles.title}>{order.name}</Text>
            <Text style={styles.meta}>
              {order.date} · {order.items} Items
            </Text>
          </View>

          <Text style={styles.price}>₹{order.price || '240.00'}</Text>
        </View>

        <View style={styles.statusRow}>
          <Text style={styles.estimate}>
            Estimate completion <Text style={styles.highlight}>5 min</Text>
          </Text>
          <Text style={styles.status}>On the way</Text>
        </View>
      </View>

      {/* ADDRESS */}
      <View style={styles.card}>
        <Text style={styles.address}>
          From : Rahat baker’s, f5 sector
        </Text>
        <Text style={styles.address}>
          To : Behira sector 8, building 6, B Apart 37 D
        </Text>
      </View>

      {/* PAYMENT */}
      <View style={styles.card}>
        <Text style={styles.payment}>Payment status</Text>
        <Text style={styles.cod}>Incomplete (COD)</Text>

        <View style={styles.totalRow}>
          <Text style={styles.totalText}>Total (3 items)</Text>
          <Text style={styles.totalPrice}>₹ 580.00</Text>
        </View>
      </View>

      {/* DELIVERY PERSON */}
      <View style={styles.cardRow}>
        <Image
          source={require('../../../assets/user1.png')}
          style={styles.avatar}
        />

        <View style={{ flex: 1 }}>
          <Text style={styles.driverName}>Mann Sharma</Text>
          <Text style={styles.driverId}>ID: DKS-501F9</Text>
        </View>

        <TouchableOpacity style={styles.callBtn}>
          <Text style={styles.callText}>Call</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default TrackOrder;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },

  mapContainer: {
    height: 260,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },

  mapText: {
    color: '#9CA3AF',
  },
backIcon:{
    height:20,
    width:20,
    resizeMode:"contain",
},
  backBtn: {
    position: 'absolute',
    top: 40,
    left: 16,
    backgroundColor: '#FFF',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },

  backText: {
    fontSize: 20,
  },

  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 14,
    margin: 16,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  foodImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 12,
  },

  orderId: {
    fontSize: 12,
    color: '#F97316',
    fontFamily: getFontFamily('Medium'),
  },

  title: {
    fontSize: 15,
    fontFamily: getFontFamily('SemiBold'),
  },

  meta: {
    fontSize: 12,
    color: '#6B7280',
  },

  price: {
    fontFamily: getFontFamily('SemiBold'),
  },

  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  estimate: {
    fontSize: 12,
    color: '#6B7280',
  },

  highlight: {
    color: '#EA580C',
  },

  status: {
    fontSize: 12,
    color: '#10B981',
    fontFamily: getFontFamily('Medium'),
  },

  address: {
    fontSize: 12,
    color: '#374151',
    marginBottom: 6,
  },

  payment: {
    fontSize: 13,
    fontFamily: getFontFamily('Medium'),
  },

  cod: {
    fontSize: 12,
    color: '#EF4444',
    marginTop: 4,
  },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  totalText: {
    fontSize: 13,
  },

  totalPrice: {
    fontFamily: getFontFamily('SemiBold'),
  },

  cardRow: {
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginBottom: 30,
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 10,
  },

  driverName: {
    fontFamily: getFontFamily('SemiBold'),
  },

  driverId: {
    fontSize: 11,
    color: '#6B7280',
  },

  callBtn: {
    backgroundColor: '#EA580C',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },

  callText: {
    color: '#FFF',
    fontSize: 12,
    fontFamily: getFontFamily('Medium'),
  },

   mapContainer: {
    height: 280,
    width: '100%',
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    overflow: 'hidden',
    backgroundColor: '#E5E7EB',
  },

  mapimg: {
    width: '100%',
    height: '100%',
  },

  backBtn: {
    position: 'absolute',
    top: 48,
    left: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },

  backText: {
    fontSize: 20,
    color: '#111827',
  },

  headerTitle: {
    position: 'absolute',
    top: 52,
    alignSelf: 'center',
    fontSize: 16,
    fontFamily: getFontFamily('SemiBold'),
    color: '#111827',
  },
});
