import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Platform,
  Linking,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ThemeContext } from '../../../theme/ThemeContext';

const { width, height } = Dimensions.get('window');

const MAP_HEIGHT = height * 0.32;
const STATUS_BAR_HEIGHT =
  Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 0;

const ICONS = {
  pickup: require('../../../assets/drop.png'),
  drop: require('../../../assets/drop.png'),
  boy: require('../../../assets/user1.png'),
  back: require('../../../assets/back.png'),
};

const TrackOrderMap = () => {
   const route = useRoute<any>();
  const navigation = useNavigation();
  const { isDarkMode } = useContext(ThemeContext);
 const { order } = route.params;

  const lineWidth = 3;
  const markerSize = width * 0.075; // ✅ SAME for pickup & drop
  const boySize = width * 0.14;
  const horizontalLine = width * 0.18;
const HEADER_HEIGHT = 56; // ya jitni tumhari header actual height hai
const HEADER_GAP = 40;    // jitna gap chahiye header aur routes ke beech
const ROUTE_TOP_OFFSET = HEADER_HEIGHT + HEADER_GAP;

  /* handle call */
 const handleCall = () => {
    const phoneNumber = '+911234567890';
    Linking.openURL(`tel:${phoneNumber}`).catch(err => {
      console.log('Error making phone call:', err);
    });
  };

   const handleMessage = () => {
    navigation.navigate('Chat');
  };
  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />

      <View style={styles.mapContainer}>
        <Image
          source={require('../../../assets/mapbg.png')}
          style={styles.mapBg}
        />

        {/* HEADER */}
        <View style={[styles.header, ]}>
          <View style={styles.backheader}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={ICONS.back} style={styles.backIcon} />
          </TouchableOpacity>
          </View>
          <Text style={styles.headerTitle}>Track Order</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* ZIG ZAG ROUTE */}
        <View style={StyleSheet.absoluteFill}>
  {/* Vertical 1 */}
  <View
    style={[
      styles.routeLine,
      {
        top: ROUTE_TOP_OFFSET,
        left: width / 2 - lineWidth / 2,
        height: MAP_HEIGHT * 0.28,
        width: lineWidth,
      },
    ]}
  />

  {/* Horizontal */}
  <View
    style={[
      styles.routeLine,
      {
        top: ROUTE_TOP_OFFSET + MAP_HEIGHT * 0.25,
        left: width / 2 - horizontalLine,
        height: lineWidth,
        width: horizontalLine,
      },
    ]}
  />

  {/* Vertical 2 */}
  <View
    style={[
      styles.routeLine,
      {
        top: ROUTE_TOP_OFFSET + MAP_HEIGHT * 0.25,
        left: width / 2 - horizontalLine,
        height: MAP_HEIGHT * 0.22,
        width: lineWidth,
      },
    ]}
  />
</View>
{/* PICKUP */}
<Image
  source={ICONS.pickup}
  style={[
    styles.marker,
    {
      top: ROUTE_TOP_OFFSET - markerSize / 2,
      left: width / 2 - markerSize / 2,
      width: markerSize,
      height: markerSize,
    },
  ]}
/>

{/* DELIVERY BOY */}
<Image
  source={ICONS.boy}
  style={[
    styles.boy,
    {
      top: ROUTE_TOP_OFFSET + MAP_HEIGHT * 0.24,
      left: width / 2 - boySize / 2,
      width: boySize,
      height: boySize,
    },
  ]}
/>

{/* DROP */}
<Image
  source={ICONS.drop}
  style={[
    styles.marker,
    {
      top: ROUTE_TOP_OFFSET + MAP_HEIGHT * 0.44,
      left: width / 2 - horizontalLine - markerSize / 2,
      width: markerSize,
      height: markerSize,
    },
  ]}
/>
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

        {/* ================= ADDRESS CARD ================= */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <Text style={styles.address}>
            From :- Rahat baker’s, f5 sector
          </Text>
          <Text style={styles.address}>
            To :- Behria sector 8, building 6, B Apart 37 D
          </Text>
        </View>

        {/* ================= PAYMENT CARD ================= */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Payment Status</Text>
          <Text style={styles.cod}>Incomplete (COD)</Text>

          <View style={styles.totalRow}>
            <Text style={styles.totalText}>Total (3 items)</Text>
            <Text style={styles.totalPrice}>₹ 580.00</Text>
          </View>
        </View>

        {/* ================= DELIVERY PERSON CARD ================= */}
        <View style={styles.card}>
          <View style={styles.row}>
            <Image
              source={require('../../../assets/user1.png')}
              style={styles.avatar}
            />

            <View style={{ flex: 1 }}>
              <Text style={styles.driverName}>Mann Sharma</Text>
              <Text style={styles.driverId}>ID: DKS-501F9</Text>
            </View>

            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.callBtn}onPress={handleCall}>
                <Image
                  source={require('../../../assets/call.png')}
                  style={styles.icon}
                />
                <Text style={styles.callText}>Call</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.msgBtn}onPress={handleMessage}>
                <Image
                  source={require('../../../assets/message.png')}
                  style={styles.iconOrange}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

    </View>
    
  );
};

export default TrackOrderMap;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  mapContainer: {
    width: '100%',
    height: MAP_HEIGHT,
    overflow: 'hidden',
  },

  mapBg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  header: {
    position: 'absolute',
    left: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 10,
     paddingTop:30,
     
  },
backheader:{
paddingTop:20,
},
  backIcon: {
   marginLeft:20,
    width: 24,
    height: 24,
    tintColor: '#000',
  },

  headerTitle: {
    fontSize: 18,
    paddingTop:8,
    fontWeight: '700',
    color: '#000',
    
  },

  routeLine: {
    position: 'absolute',
    backgroundColor: '#E63946',
    borderRadius: 2,
  },

  marker: {
    position: 'absolute',
    resizeMode: 'contain',
    zIndex: 5,
    paddingTop:10,
  },

  boy: {
    position: 'absolute',
    resizeMode: 'contain',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#E63946',
    backgroundColor: '#fff',
    zIndex: 6,
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 12,
    padding: 16,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  foodImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 12,
  },

  orderId: {
    fontSize: 13,
    color: '#777',
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },

  meta: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },

  price: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000',
  },

  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  estimate: {
    fontSize: 12,
    color: '#555',
  },

  highlight: {
    color: '#F58220',
    fontWeight: '600',
  },

  status: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1AAA55',
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },

  address: {
    fontSize: 13,
    color: '#444',
    marginBottom: 4,
  },

  cod: {
    fontSize: 13,
    color: '#E63946',
    marginBottom: 8,
  },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  totalText: {
    fontWeight: '600',
  },

  totalPrice: {
    fontWeight: '700',
    fontSize: 15,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },

  driverName: {
    fontSize: 14,
    fontWeight: '600',
  },

  driverId: {
    fontSize: 12,
    color: '#666',
  },

  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  callBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F58220',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },

  callText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 6,
  },

  msgBtn: {
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#F58220',
    padding: 10,
    borderRadius: 10,
  },

  icon: {
    width: 16,
    height: 16,
    tintColor: '#fff',
  },

  iconOrange: {
    width: 16,
    height: 16,
    tintColor: '#F58220',
  },
});
