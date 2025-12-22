import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  StatusBar,
  Modal,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../../theme/colors';
import { ThemeContext } from '../../../theme/ThemeContext';
const { width } = Dimensions.get('window');

const TodayOfferView = () => {
  const navigation = useNavigation<any>();
   const { theme ,colors} = useContext(ThemeContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState('');

  const offers = [
    {
      id: 1,
      title: 'Free Delivery',
      subtitle: 'On orders above $50',
      description:
        'Enjoy free delivery on all orders above $50. Valid for today only!',
      discount: 'FREE',
      couponCode: 'FREESHIP50',
      img: require('../../../assets/b1.png'),
    },
    {
      id: 2,
      title: '50% Off',
      subtitle: 'On selected items',
      description:
        'Get 50% discount on selected burgers and beverages.',
      discount: '50% OFF',
      couponCode: 'HALFOFF',
      img: require('../../../assets/b2.png'),
    },
    {
      id: 3,
      title: 'Buy 1 Get 1',
      subtitle: 'Pizza special',
      description:
        'Buy any large pizza and get another one absolutely free!',
      discount: 'BOGO',
      couponCode: 'BUY1GET1',
      img: require('../../../assets/b3.png'),
    },
    {
      id: 4,
      title: '30% Off',
      subtitle: 'First order discount',
      description:
        'New users get 30% off on their first order.',
      discount: '30% OFF',
      couponCode: 'WELCOME30',
      img: require('../../../assets/r1.png'),
    },
    {
      id: 5,
      title: 'Combo Deal',
      subtitle: 'Burger + Fries + Drink',
      description:
        'Get our special combo at just $15.99. Save $8 on this deal!',
      discount: '$8 OFF',
      couponCode: 'COMBO8',
      img: require('../../../assets/r2.png'),
    },
  ];

  const onClaimOffer = (code: string) => {
    setSelectedCoupon(code);
    setModalVisible(true);
  };

 
const copyToClipboard = () => {
    Alert.alert(
      'Copied!',
      `Coupon code "${selectedCoupon}" copied to clipboard`,
    );
    setModalVisible(false);
  };
  return (
   <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
      />

      {/* Header */}
       <View style={[styles.header, { backgroundColor: colors.background }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../../assets/back.png')}
            style={[styles.backIcon, { tintColor: colors.text }]}
          />
        </TouchableOpacity>

        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Today's Offers
        </Text>
        <View style={{ width: 20 }} />
      </View>

      {/* OFFERS */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
        
      >
        {offers.map(item => (
         <View
            key={item.id}
            style={[
              styles.offerCard,
              { backgroundColor: colors.tabBg },
            ]}
          >
            <View style={styles.discountBadge}>
              <Text style={[styles.discountText,]}>{item.discount}</Text>
            </View>

            <View style={styles.offerContent}>
              <View style={styles.offerText}>
                <Text style={[styles.offerTitle, { color: colors.text }]}>{item.title}</Text>
                <Text style={[styles.offerSubtitle, { color: colors.inactive }]}>
                  {item.subtitle}
                </Text>
                <Text style={[styles.offerDescription, { color: colors.inactive }]}>
                  {item.description}
                </Text>

                <View style={styles.validityRow}>
                  <Text style={styles.clock}>🕒</Text>
                  <Text style={styles.validityText}>
                    Valid till midnight
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.claimBtn}
                  onPress={() => onClaimOffer(item.couponCode)}
                >
                  <Text style={styles.claimBtnText}>Claim Offer</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.offerImageContainer}>
                <Image source={item.img} style={styles.offerImage} />
              </View>
            </View>
          </View>
        ))}

        {/* TERMS & CONDITIONS */}
       <View
          style={[
            styles.termsCard,
            { backgroundColor: colors.tabBg },
          ]}
        >
         <Text
            style={[styles.termsTitle, { color: colors.text }]}
          >Terms & Conditions</Text>
           <Text
            style={[
              styles.termsText,
              { color: colors.inactive },
            ]}
          >
            • Offers valid for today only{'\n'}
            • Cannot be combined with other offers{'\n'}
            • Minimum order value may apply{'\n'}
            • Valid for dine-in & delivery{'\n'}
            • Restaurant reserves the right to modify offers
          </Text>
        </View>
      </ScrollView>

      {/* COUPON MODAL */}
      {/* Modal */}
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,{backgroundColor:colors.tabBg }
              ,
            ]}
          >
            <Text style={[styles.modalTitle,{color:colors.text} ]}>
              Your Coupon Code
            </Text>

            <View
              style={[
                styles.couponContainer,
                
              ]}
            >
              <Text style={[styles.couponCode,{color:colors.text} ]}>
                {selectedCoupon}
              </Text>
            </View>

            <Text
              style={[styles.modalDescription, { color: colors.inactive }]}
            >
              Use this code at checkout to apply your discount
            </Text>

            <TouchableOpacity
              style={styles.copyButton}
              onPress={copyToClipboard}
            >
              <Image
                source={require('../../../assets/copy.png')}
                style={styles.copyIcon}
              />
              <Text style={[styles.copyButtonText, ]}>Copy Code</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.closeButton, ]}
              onPress={() => setModalVisible(false)}
            >
              <Text
                style={[styles.closeButtonText, {color:colors.text}]}
              >
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TodayOfferView;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
backIcon: { width: 22, height: 22 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
  },

  backArrow: {
    fontSize: 26,
    color: '#000',
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },

  offerCard: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    padding: 16,

    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
  },

  discountBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#E5752F',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderTopRightRadius: 18,
    borderBottomLeftRadius: 14,
  },

  discountText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
  },

  offerContent: {
    flexDirection: 'row',
  },

  offerText: {
    flex: 1,
    paddingRight: 12,
  },

  offerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E1E1E',
    marginBottom: 2,
  },

  offerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },

  offerDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
    marginBottom: 10,
  },

  validityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  clock: {
    fontSize: 14,
    marginRight: 6,
  },

  validityText: {
    fontSize: 12,
    color: '#666',
  },

  claimBtn: {
    backgroundColor: '#E5752F',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },

  claimBtnText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },

  offerImageContainer: {
    width: 90,
    height: 80,
   paddingTop:15,
    overflow: 'hidden',
  },

  offerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
   termsCard: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
    padding: 20,
  },

  termsTitle: {
    fontSize: 16,
    marginBottom: 10,
    //fontFamily: getFontFamily('Bold'),
  },

  termsText: {
    fontSize: 13,
    lineHeight: 20,
    //fontFamily: getFontFamily('Medium'),
  },
modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
    width: '90%',
    borderRadius: 20,
    padding: 24,
  },

  modalTitle: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center',
   // fontFamily: getFontFamily('Bold'),
  },

  couponContainer: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    marginBottom: 20,
  },

  couponCode: {
    fontSize: 24,
    textAlign: 'center',
   /// fontFamily: getFontFamily('Bold'),
    letterSpacing: 2,
  },

  modalDescription: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
    //fontFamily: getFontFamily('Medium'),
  },

  copyButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 12,
    justifyContent: 'center',
    marginBottom: 10,
  },

  copyIcon: { width: 20, height: 20, tintColor: '#fff', marginRight: 10 },

  copyButtonText: {
    color: '#fff',
    fontSize: 16,
   // fontFamily: getFontFamily('SemiBold'),
  },

  closeButton: {
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
  },

  closeButtonText: {
    fontSize: 16,
    textAlign: 'center',
    //fontFamily: getFontFamily('Medium'),
  },
});
