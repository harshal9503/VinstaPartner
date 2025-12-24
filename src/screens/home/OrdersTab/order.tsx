import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  StatusBar,
  Platform,
  Dimensions,
  TextInput,
  Modal,
} from 'react-native';
import UnderShipMent from './UnderShipMent';
import { ThemeContext } from '../../../theme/ThemeContext';
import OrderStatusTabs from './OrderTab';
import Header from './Header';
import Completed from './Completed';
import { COLORS } from '../../../theme/colors';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { getFontFamily, getFontWeight } from '../../../utils/fontHelper';


const { width } = Dimensions.get('window');
const rs = (size: number) => (width / 375) * size;

const HEADER_HEIGHT = rs(56);
const ANDROID_STATUS_BAR = StatusBar.currentHeight ?? 0;
const ORDERS = [
  {
    id: '1',
    orderId: '#265896',
    title: 'Spicy Paneer Burger',
    date: '20 Jun, 10:30',
    items: '3 Items',
    image: require('../../../assets/pizza.png'),
  },
  {
    id: '2',
    orderId: '#265897',
    title: 'Spicy Paneer Burger',
    date: '20 Jun, 10:30',
    items: '3 Items',
    image: require('../../../assets/pizza.png'),
  },
  {
    id: '3',
    orderId: '#265898',
    title: 'Spicy Paneer Burger',
    date: '20 Jun, 10:30',
    items: '3 Items',
    image: require('../../../assets/pizza.png'),
  },
];
const COMPLETED_ORDERS = [
  {
    id: '265896',
    name: 'John Doe',
    combo: 'South Indian Combo',
    items: 3,
    date: '20 Jun, 7:30 PM',
    status: 'Delivered',
    total: '499.00',
    payment: 'UPI / Phone Pay',
    image: require('../../../assets/pizza.png'),
  },
  {
    id: '265897',
    name: 'John Doe',
    combo: 'South Indian Combo',
    items: 3,
    date: '20 Jun, 7:30 PM',
    status: 'Delivered',
    total: '499.00',
    payment: 'UPI / Phone Pay',
    image: require('../../../assets/pizza.png'),
  },
];
const UNDER_SHIPMENT_ORDERS = [
  {
    id: '265896',
    name: 'Spicy Paneer Burger',
    date: '20 Jun, 10:30',
    items: 3,
    image: require('../../../assets/pizza.png'),
  },
  {
    id: '265897',
    name: 'Spicy Paneer Burger',
    date: '20 Jun, 10:30',
    items: 3,
    image: require('../../../assets/pizza.png'),
  },
   {
    id: '265898',
    name: 'Spicy Paneer Burger',
    date: '20 Jun, 10:30',
    items: 3,
    image: require('../../../assets/pizza.png'),
  },
  {
    id: '265899',
    name: 'Spicy Paneer Burger',
    date: '20 Jun, 10:30',
    items: 3,
    image: require('../../../assets/pizza.png'),
  },
];
const OrdersScreen = () => {
  const [activeTab, setActiveTab] = useState(0);
  const navigation = useNavigation();
 const { theme, colors } = useContext(ThemeContext);
 
  const statusBarHeight = getStatusBarHeight();
const [showOrderDetails, setShowOrderDetails] = useState(false);

 const [selectedOrder, setSelectedOrder] = useState<any>(null);
 const [noteModalVisible, setNoteModalVisible] = useState(false);
const [noteText, setNoteText] = useState('');

  /** 🔥 TAB KE ACCORDING DATA FILTER */
   const getStatusText = () => {
    if (activeTab === 0) return 'Waiting for confirmation';
    if (activeTab === 1) return 'Confirmed';
    if (activeTab === 2) return 'Delivered';
    
    
  };

  /** ✅ BUTTON TEXT TAB KE HISAAB SE */
  const getButtonText = () => {
    if (activeTab === 1) return 'Processing';
    if (activeTab === 2) return 'Processing';
    return 'VIEW ORDER';
  };

  const BOTTOM_NAV_HEIGHT = Platform.OS === 'ios' ? 83 : 70;

  const renderOrder = ({ item }: any) => (
  <View style={styles.card}>
    <View style={styles.row}>
      <Image source={item.image} style={styles.foodImage} />

      <View style={{ flex: 1 }}>
        <Text style={styles.orderId}>{item.orderId}</Text>
        <Text style={styles.title}>{item.title}</Text>

        <Text style={styles.meta}>
          {item.date} · {item.items}
        </Text>

        <Text style={styles.statusLabel}>Status</Text>
        <Text style={[styles.status,{fontFamily:getFontFamily('regular'),}]}>
          {getStatusText()}</Text>
      </View>
    </View>
    {/* ✅ COMPLETED TAB */}
  {activeTab === 3 && (
    <FlatList
      data={COMPLETED_ORDERS}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Completed item={item} />
      )}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 100 }}
    />
  )}
    {/* 🔥 BUTTONS */}
    {activeTab === 2 ? (
      /* ===== ORDER DELIVERED TAB (2 BUTTONS) ===== */
      <View style={styles.doubleBtnRow}>
        <TouchableOpacity
          style={[styles.button, styles.processingBtn]}
        >
          <Text style={styles.buttonText}>PROCESSING</Text>
        </TouchableOpacity>

        <TouchableOpacity
      style={[styles.button, styles.readyBtn]}
      onPress={() => setNoteModalVisible(true)}   // 👈 OPEN MODAL
    >
      <Text style={styles.buttonText}>READY FOR SHIPMENT</Text>
    </TouchableOpacity>
      </View>
    ) : (
      /* ===== OTHER TABS (1 BUTTON) ===== */
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setSelectedOrder(item);
          setShowOrderDetails(true);
        }}
      >
        <Text style={styles.buttonText}>
          {getButtonText()}
        </Text>
      </TouchableOpacity>
    )}
  </View>
);


  return (
  <SafeAreaView style={styles.safe}>
    <StatusBar
      barStyle="dark-content"
      backgroundColor={COLORS.background}
    />

    {/* ===== HEADER ===== */}
    <View style={{ flex: 1 }}>
  {/* ORDER STATUS TABS */}
  <Header
    activeTab={activeTab}
    onTabChange={setActiveTab}
  />

   <View style={{ flex: 1 }}>
  {/* ORDER STATUS TABS */}
  <OrderStatusTabs
    activeTab={activeTab}
    onTabChange={setActiveTab}
  />

  {/* TAB BASED CONTENT */}
 {activeTab <= 2 ? (
  <FlatList
    data={ORDERS}
    keyExtractor={(item) => item.id.toString()}
    renderItem={renderOrder}
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{
      paddingBottom: BOTTOM_NAV_HEIGHT + 40,
    }}
  />
) : activeTab === 3 ? (
  <FlatList
    data={COMPLETED_ORDERS}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => <Completed item={item} />}
    showsVerticalScrollIndicator={false}
  />
) : (
  <FlatList
    data={UNDER_SHIPMENT_ORDERS}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => (
      <UnderShipMent
        item={item}
        onTrack={() => console.log('Track Order', item.id)}
      />
    )}
    showsVerticalScrollIndicator={false}
  />
)}


    {/* ===== ORDER DETAILS (SAME FILE) ===== */}
      {showOrderDetails && (
        <View style={styles.overlay}>
          <View style={styles.orderDetailsCard}>
            <Text style={styles.sectionTitle}>Order Information</Text>

            <View style={styles.userRow}>
              <Image
                source={require('../../../assets/user1.png')}
                style={styles.avatar}
              />
              <View>
                <Text style={styles.userName}>Manan Sharma</Text>
                <Text style={styles.orderIdText}>ID: DKS-5019</Text>
              </View>
            </View>

            <View style={styles.foodCard}>
              <Image
                source={selectedOrder?.image}
                style={styles.foodImg}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.foodTitle}>
                  {selectedOrder?.title}
                </Text>
                <Text style={styles.foodSub}>Additional cheese</Text>
                  <Text style={styles.quatity}>Quantity</Text>
                <Text style={styles.price}>₹250.00</Text>
              </View>
              <Text style={styles.qty}>01</Text>
            </View>

            <View style={styles.billRow}>
              <Text>Items total</Text>
              <Text>₹450.00</Text>
            </View>
            <View style={styles.billRow}>
              <Text>Discount applied</Text>
              <Text>₹50.00</Text>
            </View>
            <View style={styles.billRow}>
              <Text>Platform fee including tax</Text>
              <Text>₹50.00</Text>
            </View>
            <View style={styles.billRow}>
              <Text>Delivery fee</Text>
              <Text>₹50.00</Text>
            </View>

            <View style={styles.totalRow}>
              <Text style={styles.totalText}>Total</Text>
              <Text style={styles.totalPrice}>₹830.00</Text>
            </View>

            <View style={styles.actionRow}>
              <TouchableOpacity
                style={styles.ordercancelbtn}
                onPress={() => setShowOrderDetails(false)}
              >
                <Text>CANCEL</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.confirmBtn}>
                <Text style={styles.confirmText}>CONFIRM ORDER</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

     <Modal
  transparent
  animationType="fade"
  visible={noteModalVisible}
  onRequestClose={() => setNoteModalVisible(false)}
>
  <View style={styles.modalOverlay}>
    <View style={styles.modalBox}>
      <Text style={styles.modalTitle}>Add Note</Text>

      <TextInput
        style={styles.textArea}
        placeholder="Textarea"
        placeholderTextColor="#999"
        multiline
        value={noteText}
        onChangeText={setNoteText}
      />

      <View style={styles.modalBtnRow}>
        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={() => setNoteModalVisible(false)}
        >
          <Text style={styles.cancelText}>CANCEL</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.submitBtn}
          onPress={() => {
            console.log('Note:', noteText);
            setNoteModalVisible(false);
            setNoteText('');
          }}
        >
          <Text style={styles.submitText}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>

</View>
</View>
    </SafeAreaView>
    
        )}
export default OrdersScreen;
const ORANGE = '#F0821F';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
backBtn: {
    padding: 6,
  },
safe: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
  backIcon: {
    width: 22,
    height: 22,
  },

 headerWrapper: {
     backgroundColor: COLORS.secondary,
   },
 scroll: {
    paddingHorizontal: 0,
    paddingTop: 10,
  },
   header: {
     width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: rs(16),
  borderBottomWidth: 1,
  borderBottomColor: COLORS.border,
   },

  headerTitle: {
     fontSize: rs(18),
  fontFamily: getFontFamily( 'SemiBold'),
  fontWeight: getFontWeight('600'),
  },

  icon: {
   
   padding:10,
    width:20,
    height:20,
  },

  tabs: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
  },

  tab: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: 'center',
  },

  activeTab: {
    backgroundColor: COLORS.primary,
  },

  tabText: {
    fontSize: 12,
    color: '#999',
  },

  activeTabText: {
    color: '#fff',
    fontWeight: '600',
  },

  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 14,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },

  row: {
    flexDirection: 'row',
  },

  foodImage: {
    width: 70,
    height: 70,
    borderRadius: 12,
    marginRight: 12,
  },

  orderId: {
    color: ORANGE,
    fontSize: 12,
    fontWeight: '600',
  },

  title: {
    fontSize: 15,
    fontWeight: '600',
    marginVertical: 2,
    fontFamily:getFontFamily('SemiBold'),
  },

  meta: {
    fontSize: 12,
    color: '#777',
  },

  statusLabel: {
    fontSize: 12,
    color: '#999',
    marginTop: 6,
  },

  status: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },

  button: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },

  buttonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    fontFamily: getFontFamily('Medium'),
  },
  overlay: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.4)',
  justifyContent: 'flex-end',
},

orderDetailsCard: {
  backgroundColor: '#fff',
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  padding: 16,
  height:600,
},

sectionTitle: {
  fontSize: 16,
  fontWeight: '600',
  marginBottom: 12,
  fontFamily: getFontFamily('Regular'),
},

userRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 12,
},

avatar: {
  width: 40,
  height: 40,
  borderRadius: 20,
  marginRight: 10,
  marginLeft:10,
},

userName: {
  fontWeight: '600',
},

orderIdText: {
  fontSize: 12,
  color: '#777',
},

foodCard: {
  flexDirection: 'row',
  backgroundColor: '#F8F8F8',
  padding: 10,
  borderRadius: 12,
  marginVertical: 10,
},

foodImg: {
  width: 60,
  height: 60,
  borderRadius: 10,
  marginRight: 10,
  
},

foodTitle: {
  fontWeight: '600',
},

foodSub: {
  fontSize: 12,
  color: '#888',
  
},
quatity:{
   fontSize: 12,
  color: '#888',
},
price: {
  marginTop: 4,
  fontWeight: '600',
  marginBottom:20,
},

qty: {
  alignSelf: 'center',
  fontWeight: '600',
   marginBottom:20,
},

billRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginVertical: 4,
   marginBottom:20,
},

divider: {
  height: 1,
  backgroundColor: '#EEE',
  marginVertical: 10,
   marginBottom:20,
},

totalRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 14,
   
},

totalText: {
  fontWeight: '600',

},

totalPrice: {
  fontWeight: '700',
},

actionRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
},

ordercancelbtn: {
 // flex: 1,
  backgroundColor: '#EEE',
  padding: 12,
  borderRadius: 10,
  paddingHorizontal:30,
  paddingVertical:15,
  marginRight: 8,
  alignItems: 'center',
   marginBottom:20,
},

confirmBtn: {
  flex: 1,
  backgroundColor: COLORS.primary,
  padding: 14,
  borderRadius: 10,
  marginLeft: 8,
  alignItems: 'center',
   marginBottom:20,
},

confirmText: {
  color: '#fff',
  fontWeight: '600',
},
// order details button styling
doubleBtnRow: {
  flexDirection: 'row',
  marginTop: 12,
},


processingBtn: {
  //flex: 1,
  marginRight: 5,
  paddingVertical: 12,
  paddingHorizontal:10,
  borderRadius: 8,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#1AAA55',
},


readyBtn: {
  flex: 1,
  marginLeft: 8,
  paddingVertical: 12,
  borderRadius: 8,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: COLORS.primary, // orange
},

buttonText: {
  fontFamily: getFontFamily('SemiBold'),
  color: '#FFFFFF',
  fontSize: 13,
},

modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.4)',
  justifyContent: 'center',
  alignItems: 'center',
},

modalBox: {
  width: '85%',
  backgroundColor: '#fff',
  borderRadius: 14,
  padding: 16,
},

modalTitle: {
  fontSize: 16,
  fontWeight: '600',
  marginBottom: 10,
},

textArea: {
  height: 90,
  borderWidth: 1,
  borderColor: '#ddd',
  borderRadius: 10,
  padding: 10,
  textAlignVertical: 'top',
  marginBottom: 14,
},

modalBtnRow: {
  flexDirection: 'row',
  justifyContent: 'flex-end',
},

cancelBtn: {
  paddingVertical: 8,
  paddingHorizontal: 16,
  marginRight: 10,
  borderRadius: 20,
  backgroundColor: '#f2f2f2',
},

cancelText: {
  color: '#333',
  fontWeight: '500',
},

submitBtn: {
  paddingVertical: 8,
  paddingHorizontal: 18,
  borderRadius: 20,
  backgroundColor: '#F57C00',
},

submitText: {
  color: '#fff',
  fontWeight: '600',
},

});
