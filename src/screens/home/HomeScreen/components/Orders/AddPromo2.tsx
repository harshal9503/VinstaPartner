import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
  Modal,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../../../../theme/colors';
import { getFontFamily, getFontWeight } from '../../../../../utils/fontHelper';
import ItemDetailsPopup from '../../../Add/ItemDetailsPopup'; // Import ItemDetailsPopup

const { width } = Dimensions.get('window');

const TABS = ['All', 'Fast food', 'Coldrink', 'Paneer'];

const ITEMS = [
  {
    id: 1,
    name: 'Spicy paneer burger',
    price: '₹120',
    sku: 'SKU: JWL-GOL-001',
    lastUpdated: '12/15/2025',
    status: 'In-stock',
    tag: 'Bestseller',
    statusColor: '#D9FAD7',
    dot: '#28A745',
    image: require('../../../../../assets/pizza.png'),
  },
  {
    id: 2,
    name: 'Gold Necklace Set',
    price: '₹18,000',
    sku: 'SKU: JWL-GNS-002',
    lastUpdated: '12/20/2025',
    status: 'In-stock',
    tag: 'Recommended',
    statusColor: '#D9FAD7',
    dot: '#28A745',
    image: require('../../../../../assets/pizza.png'),
  },
  {
    id: 3,
    name: 'Diamond Ring',
    price: '₹45,000',
    sku: 'SKU: JWL-DRG-003',
    lastUpdated: '12/18/2025',
    status: 'Out of stock',
    tag: 'Top Rated',
    statusColor: '#FFE2E2',
    dot: '#E53935',
    image: require('../../../../../assets/pizza.png'),
  },
  {
    id: 4,
    name: 'Silver Earrings',
    price: '₹2,500',
    sku: 'SKU: JWL-SER-004',
    lastUpdated: '12/22/2025',
    status: 'In-stock',
    tag: 'Trending Now',
    statusColor: '#D9FAD7',
    dot: '#28A745',
    image: require('../../../../../assets/pizza.png'),
  },
  {
    id: 5,
    name: 'Pearl Bracelet',
    price: '₹8,200',
    sku: 'SKU: JWL-PBR-005',
    lastUpdated: '12/19/2025',
    status: 'In-stock',
    tag: 'Bestseller',
    statusColor: '#D9FAD7',
    dot: '#28A745',
    image: require('../../../../../assets/pizza.png'),
  },
];

const AddPromo2 = () => {
  const navigation = useNavigation<any>();
  const [activeTab, setActiveTab] = useState('All');
  const [showItemDetailsPopup, setShowItemDetailsPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Filter items based on active tab
  const filteredItems = ITEMS.filter(item => {
    if (activeTab === 'All') return true;
    return item.name.toLowerCase().includes(activeTab.toLowerCase());
  });

  const handleItemPress = (item: any) => {
    setSelectedItem(item);
    setShowItemDetailsPopup(true);
  };

  const handleCloseItemDetailsPopup = () => {
    setShowItemDetailsPopup(false);
    setSelectedItem(null);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {/* ===== HEADER ===== */}
        <View style={styles.header}>
          <Image
            source={require('../../../../../assets/kyc2.png')}
            style={styles.progressImg}
          />

          <View style={styles.headerTextWrap}>
            <Text style={styles.headerTitle}>Apply to item’s</Text>
            <Text style={styles.headerSub}>Completed</Text>
          </View>
        </View>

        {/* ===== TITLE ===== */}
        <Text style={styles.sectionTitle}>Create promotional offer</Text>
        <Text style={styles.sectionDesc}>Select items for promotion</Text>

        {/* ===== TABS (SLIDER) ===== */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabsScroll}
          contentContainerStyle={styles.tabsContainer}
        >
          {TABS.map(tab => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabBtn, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ===== ITEMS ===== */}
        {filteredItems.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => handleItemPress(item)}
            activeOpacity={0.7}
          >
            <View style={styles.cardLeft}>
              <View
                style={[
                  styles.stockBadge,
                  { backgroundColor: item.statusColor },
                ]}
              >
                <View style={[styles.dot, { backgroundColor: item.dot }]} />
                <Text style={styles.stockText}>{item.status}</Text>
              </View>

              <Text style={styles.foodName}>{item.name}</Text>
              <Text style={styles.tag}>{item.tag}</Text>
              <Text style={styles.priceLabel}>
                Display price{'\n'}
                <Text style={styles.price}>{item.price}</Text>
              </Text>
              <Text style={styles.skuText}>{item.sku}</Text>
            </View>

            <View style={styles.cardRight}>
              <Image source={item.image} style={styles.foodImg} />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* ===== BOTTOM BUTTONS ===== */}
      <View style={styles.bottomBtns}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.85}
        >
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.nextBtn}
          onPress={() => navigation.navigate('AddPromo3')}
          activeOpacity={0.85}
        >
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
      </View>

      {/* Item Details Popup */}
      <ItemDetailsPopup
        visible={showItemDetailsPopup}
        onClose={handleCloseItemDetailsPopup}
        item={selectedItem}
      />
    </SafeAreaView>
  );
};

export default AddPromo2;

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },

  container: {
    paddingHorizontal: width * 0.05,
    paddingBottom: 140,
    paddingTop: Platform.OS === 'ios' ? 55 : 45,
  },

  /* Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },

  progressImg: {
    width: 54,
    height: 54,
    marginRight: 14,
  },

  headerTextWrap: {
    flex: 1,
    alignItems: 'flex-end',
  },

  headerTitle: {
    fontSize: 18,
    fontFamily: getFontFamily('SemiBold'),
    fontWeight: getFontWeight('SemiBold'),
    color: COLORS.text,
  },

  headerSub: {
    fontSize: 14,
    color: COLORS.muted,
    marginTop: 2,
    fontFamily: getFontFamily('Regular'),
  },

  /* Title */
  sectionTitle: {
    fontSize: 20,
    color: COLORS.primary,
    fontFamily: getFontFamily('Bold'),
    marginBottom: 4,
  },

  sectionDesc: {
    fontSize: 14,
    color: COLORS.muted,
    marginBottom: 24,
    fontFamily: getFontFamily('Regular'),
  },

  /* Tabs Slider */
  tabsScroll: {
    marginBottom: 20,
  },

  tabsContainer: {
    paddingHorizontal: width * 0.05,
  },

  tabBtn: {
    backgroundColor: COLORS.background,
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginRight: 12,
    minWidth: 100,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  activeTab: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  tabText: {
    fontSize: 14,
    color: COLORS.text,
    fontFamily: getFontFamily('Medium'),
  },

  activeTabText: {
    color: COLORS.secondary,
    fontFamily: getFontFamily('Bold'),
  },

  /* Card */
  card: {
    backgroundColor: COLORS.secondary,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },

  cardLeft: {
    flex: 1,
    paddingRight: 12,
  },

  stockBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 8,
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },

  stockText: {
    fontSize: 12,
    fontFamily: getFontFamily('Medium'),
    color: COLORS.text,
  },

  foodName: {
    fontSize: 16,
    fontFamily: getFontFamily('SemiBold'),
    color: COLORS.text,
    marginBottom: 4,
  },

  tag: {
    fontSize: 13,
    color: COLORS.primary,
    marginBottom: 8,
    fontFamily: getFontFamily('Medium'),
  },

  priceLabel: {
    fontSize: 12,
    color: COLORS.muted,
  },

  price: {
    fontSize: 16,
    fontFamily: getFontFamily('Bold'),
    color: COLORS.text,
  },

  skuText: {
    fontSize: 12,
    color: COLORS.muted,
    marginTop: 4,
    fontFamily: getFontFamily('Medium'),
  },

  cardRight: {
    alignItems: 'center',
  },

  foodImg: {
    width: 90,
    height: 75,
    borderRadius: 14,
  },

  /* Bottom Buttons - Solid Opaque */
  bottomBtns: {
    position: 'absolute',
    bottom: 24,
    left: width * 0.05,
    right: width * 0.05,
    flexDirection: 'row',
    backgroundColor: COLORS.secondary,
    padding: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },

  backBtn: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginRight: 10,
  },

  backText: {
    fontSize: 16,
    color: COLORS.primary,
    fontFamily: getFontFamily('SemiBold'),
  },

  nextBtn: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },

  nextText: {
    fontSize: 16,
    color: COLORS.secondary,
    fontFamily: getFontFamily('SemiBold'),
  },
});
