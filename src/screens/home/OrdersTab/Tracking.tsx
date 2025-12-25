import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const MAP_HEIGHT = height * 0.45;
const markerSize = 28;
const driverSize = 36;
const lineWidth = 3;
const horizontalLineLength = 60;
const downsize =40;

const TrackOrder = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { order } = route.params;

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* MAP AREA */}
        <View style={styles.mapContainer}>
          <Image
            source={require('../../../assets/mapbg.png')} // map bg
            style={styles.mapBg}
          />

          {/* ZIG-ZAG ROUTE */}
          <View style={styles.routeContainer}>
            {/* Vertical Line */}
            <View style={[styles.lineVertical, 
              { top: MAP_HEIGHT * 0.25, height: MAP_HEIGHT * 0.25 }]} />
            {/* Horizontal Line */}
            <View
              style={[
                styles.lineHorizontal,
                { top: MAP_HEIGHT * 0.5, width: horizontalLineLength },
              ]}
            />
            {/* Vertical Line after horizontal */}
            <View
              style={[
                styles.lineVertical,
                { top: MAP_HEIGHT * 0.5, height: MAP_HEIGHT * 0.25, left: width / 2 +
                   horizontalLineLength },
              ]}
            />
          </View>

          {/* MARKERS */}
          <View style={styles.markerContainer}>
            {/* Start Marker */}
            <Image
              source={require('../../../assets/drop.png')}
              style={[styles.marker, { top: MAP_HEIGHT * 0.25 }]}
            />
            {/* Driver */}
            <Image
              source={require('../../../assets/user1.png')}
              style={[styles.driver, { top: MAP_HEIGHT * 0.45 }]}
            />
            {/* End Marker */}
            <Image
              source={require('../../../assets/drop.png')}
              style={[styles.marker, { top: 120,left:80 }]}
            />
          </View>

          {/* HEADER */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={require('../../../assets/back.png')} style={styles.backIcon} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Track Order</Text>
            <View style={{ width: 24 }} />
          </View>
        </View>

        {/* ================= ORDER CARD ================= */}
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

        {/* ================= ADDRESS ================= */}
        <View style={styles.card}>
          <Text style={styles.address}>From :- Rahat baker’s, f5 sector</Text>
          <Text style={styles.address}>To :- Behria sector 8, building 6,B Apart 37 D</Text>
        </View>

        {/* ================= PAYMENT ================= */}
        <View style={styles.card}>
          <Text style={styles.payment}>Payment status</Text>
          <Text style={styles.cod}>Incomplete (COD)</Text>
          <View style={styles.totalRow}>
            <Text style={styles.totalText}>Total (3 items)</Text>
            <Text style={styles.totalPrice}>₹ 580.00</Text>
          </View>
        </View>

        {/* ================= DELIVERY PERSON ================= */}
        <View style={styles.deliveryRow}>
  {/* DRIVER IMAGE */}
  <Image
    source={require('../../../assets/user1.png')}
    style={styles.avatar}
  />

  {/* DRIVER INFO */}
  <View style={{ flex: 1 }}>
    <Text style={styles.driverName}>Mann Sharma</Text>
    <Text style={styles.driverId}>ID: DKS-501F9</Text>
  </View>

  {/* CALL + MESSAGE BUTTONS */}
  <View style={styles.actionRow}>
    {/* CALL BUTTON */}
    <TouchableOpacity style={styles.callBtn}>
      <Image
        source={require('../../../assets/call.png')}
        style={[styles.icon, { tintColor: '#fff' }]}
      />
      <Text style={styles.callText}>Call</Text>
    </TouchableOpacity>

    {/* MESSAGE BUTTON */}
    <TouchableOpacity style={styles.msgBtn}>
      <Image
        source={require('../../../assets/message.png')}
        style={[styles.icon, { tintColor: '#F58220' }]}
      />
    </TouchableOpacity>
  </View>
</View>

      </ScrollView>
    </View>
  );
};

export default TrackOrder;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  mapContainer: { height: MAP_HEIGHT, width: '100%' },
  mapBg: { width: '100%', height: '100%' },
  header: {
    position: 'absolute',
    top: 50,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backIcon: { width: 24, height: 24 },
  headerTitle: { fontSize: 18, fontWeight: '600' },
  routeContainer: { position: 'absolute', top: 0, left: width / 2 - lineWidth / 2, width: lineWidth, height: '100%' },
  lineVertical: { position: 'absolute', width: lineWidth, backgroundColor: '#de1a1aff',
     left: 0 },
  lineHorizontal: { position: 'absolute', height: lineWidth, 
    backgroundColor: '#e31515ff', left:20,},
  markerContainer: { position: 'absolute', width: '100%', height: '100%', alignItems: 'center' },
  marker: { width: markerSize, height: markerSize, resizeMode: 'contain', },
  driver: { width: driverSize, height: driverSize, borderRadius: driverSize / 2, 
    position: 'absolute', resizeMode: 'cover' },

  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  foodImage: { width: 60, height: 60, borderRadius: 8, marginRight: 12 },
  orderId: { fontSize: 14, color: '#555' },
  title: { fontSize: 16, fontWeight: '600', color: '#222' },
  meta: { fontSize: 12, color: '#999' },
  price: { fontSize: 14, fontWeight: '600' },
  statusRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  estimate: { fontSize: 12 },
  highlight: { fontWeight: '600', color: '#E63946' },
  status: { fontWeight: '600', color: '#1AAA55' },
  address: { fontSize: 14, marginBottom: 4 },
  payment: { fontSize: 14, marginBottom: 4 },
  cod: { color: '#E63946' },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  totalText: { fontWeight: '600' },
  totalPrice: { fontWeight: '700' },
  deliveryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  avatar: { width: 48, height: 48, borderRadius: 24, marginRight: 12 },
  driverName: { fontWeight: '600', fontSize: 14 },
  driverId: { fontSize: 12, color: '#555' },
  callBtn: { backgroundColor: '#1AAA55', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8, marginLeft: 8 },
  chatBtn: { backgroundColor: '#FFA500', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8, marginLeft: 8 },
  callText: { color: '#fff', fontWeight: '600' },

  actionRow: {
  flexDirection: 'row',
  alignItems: 'center',
},

callBtn: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#F58220',
  paddingHorizontal: 16,
  paddingVertical: 10,
  borderRadius: 12,
},

callText: {
  color: '#fff',
  fontSize: 14,
  fontWeight: '600',
  marginLeft: 6,
},

msgBtn: {
  marginLeft: 12,
  borderWidth: 1,
  borderColor: '#F58220',
  padding: 10,
  borderRadius: 12,
},

icon: {
  width: 18,
  height: 18,
  resizeMode: 'contain',
},

});
