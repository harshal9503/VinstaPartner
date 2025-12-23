import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Dimensions,
  StatusBar,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { COLORS } from '../../../../../theme/colors';
import { getFontFamily } from '../../../../../utils/fontHelper';
import ItemDetailsPopup from '../../../Add/ItemDetailsPopup';

const { width } = Dimensions.get('window');

const FILTERS = ['All', 'In-stock', 'Out of stock'];

const ITEMS = [
  {
    id: 1,
    status: 'In-stock',
    name: 'Gold Necklace Set',
    tag: 'Bestseller',
    price: '₹18,000',
    sku: 'SKU: JWL-GNS-001',
    lastUpdated: '12/15/2025',
    badgeBg: '#D9FAD7',
    dot: '#28A745',
  },
  {
    id: 2,
    status: 'In-stock',
    name: 'Diamond Ring',
    tag: 'Recommended',
    price: '₹45,000',
    sku: 'SKU: JWL-DRG-002',
    lastUpdated: '12/20/2025',
    badgeBg: '#D9FAD7',
    dot: '#28A745',
  },
  {
    id: 3,
    status: 'Out of stock',
    name: 'Silver Earrings',
    tag: 'Top Rated',
    price: '₹2,500',
    sku: 'SKU: JWL-SER-003',
    lastUpdated: '12/18/2025',
    badgeBg: '#FFE2E2',
    dot: '#E53935',
  },
  {
    id: 4,
    status: 'In-stock',
    name: 'Pearl Bracelet',
    tag: 'Trending Now',
    price: '₹8,200',
    sku: 'SKU: JWL-PBR-004',
    lastUpdated: '12/22/2025',
    badgeBg: '#D9FAD7',
    dot: '#28A745',
  },
];

const PricingBrowse = () => {
  const navigation = useNavigation();
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchText, setSearchText] = useState('');
  const [showItemDetailsPopup, setShowItemDetailsPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const statusBarHeight = getStatusBarHeight();
  const BOTTOM_NAV_HEIGHT = Platform.OS === 'ios' ? 90 : 70;

  const filteredItems = ITEMS.filter(item => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'In-stock') return item.status === 'In-stock';
    if (activeFilter === 'Out of stock') return item.status === 'Out of stock';
    return true;
  }).filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()));

  const handleAddPromoPress = () => {
    navigation.navigate('PricingAddPromo' as never);
  };

  const handleEditPress = (item: any) => {
    navigation.navigate('PricingEdit' as never, { item } as never);
  };

  const handleViewDetailsPress = (item: any) => {
    setSelectedItem(item);
    setShowItemDetailsPopup(true);
  };

  const handleCloseItemDetailsPopup = () => {
    setShowItemDetailsPopup(false);
    setSelectedItem(null);
  };

  const handleEditFromDetails = () => {
    setShowItemDetailsPopup(false);
    if (selectedItem) {
      navigation.navigate(
        'PricingEdit' as never,
        { item: selectedItem } as never,
      );
    }
  };

  const handlePrintLabel = () => {
    console.log('Print label for:', selectedItem);
  };

  const handleBackPress = () => {
    // Navigate to Home bottom tab
    navigation.navigate('Home' as never);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.secondary} />

      {/* ITEM DETAILS POPUP */}
      <ItemDetailsPopup
        visible={showItemDetailsPopup}
        onClose={handleCloseItemDetailsPopup}
        onEdit={handleEditFromDetails}
        onPrint={handlePrintLabel}
        item={selectedItem}
      />

      {/* HEADER */}
      <View style={[styles.headerWrapper, { paddingTop: statusBarHeight }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackPress} style={styles.backBtn}>
            <Image
              source={require('../../../../../assets/back.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Pricing</Text>
          <View style={{ width: 32 }} />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: BOTTOM_NAV_HEIGHT }}
      >
        {/* SEARCH */}
        <Text style={styles.searchTitle}>Search item</Text>

        <View style={styles.searchBox}>
          <Image
            source={require('../../../../../assets/search.png')}
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search jewellery items"
            placeholderTextColor={COLORS.placeholder}
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* ADD PROMO */}
        <TouchableOpacity style={styles.addBtn} onPress={handleAddPromoPress}>
          <Image
            source={require('../../../../../assets/plus.png')}
            style={styles.plusIcon}
          />
          <Text style={styles.addText}>Add Promo</Text>
        </TouchableOpacity>

        {/* FILTERS */}
        <View style={styles.filters}>
          {FILTERS.map(f => (
            <TouchableOpacity
              key={f}
              style={[
                styles.filterBtn,
                activeFilter === f && styles.activeFilter,
              ]}
              onPress={() => setActiveFilter(f)}
            >
              <Text
                style={[
                  styles.filterText,
                  activeFilter === f && styles.activeFilterText,
                ]}
              >
                {f}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* TOTAL */}
        <Text style={styles.totalText}>
          Total item's ({filteredItems.length})
        </Text>

        {/* CARDS */}
        {filteredItems.map(item => (
          <View key={item.id} style={styles.card}>
            <View style={styles.cardTop}>
              <Image
                source={require('../../../../../assets/pizza.png')}
                style={styles.foodImg}
              />

              <View style={styles.cardCenter}>
                <View style={[styles.badge, { backgroundColor: item.badgeBg }]}>
                  <View style={[styles.dot, { backgroundColor: item.dot }]} />
                  <Text style={styles.badgeText}>{item.status}</Text>
                </View>

                <Text style={styles.foodName}>{item.name}</Text>
                <Text style={styles.tag}>{item.tag}</Text>
              </View>

              <View style={styles.cardRight}>
                <TouchableOpacity
                  onPress={() => {
                    // delete or any action if required
                  }}
                >
                  <Image
                    source={require('../../../../../assets/delete.png')}
                    style={styles.deleteIcon}
                  />
                </TouchableOpacity>
                <Text style={styles.price}>{item.price}</Text>
              </View>
            </View>

            {/* META */}
            <View style={styles.metaRow}>
              <View>
                <Text style={styles.metaLabel}>SKU</Text>
                <Text style={styles.metaValue}>{item.sku}</Text>
              </View>

              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.metaLabel}>Last updated</Text>
                <Text style={styles.metaValue}>{item.lastUpdated}</Text>
              </View>
            </View>

            {/* BUTTONS */}
            <View style={styles.btnRow}>
              <TouchableOpacity
                style={styles.editBtn}
                onPress={() => handleEditPress(item)}
              >
                <Text style={styles.editText}>EDIT</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.viewBtn}
                onPress={() => handleViewDetailsPress(item)}
              >
                <Text style={styles.viewText}>VIEW DETAILS</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PricingBrowse;

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },

  headerWrapper: {
    backgroundColor: COLORS.secondary,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
    paddingBottom: 12,
    justifyContent: 'space-between',
  },

  backBtn: { padding: 6 },
  backIcon: { width: 22, height: 22 },

  headerTitle: {
    fontSize: 18,
    fontFamily: getFontFamily('SemiBold'),
    color: COLORS.text,
  },

  searchTitle: {
    marginHorizontal: width * 0.05,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
    fontFamily: getFontFamily('SemiBold'),
    color: COLORS.text,
  },

  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    marginHorizontal: width * 0.05,
    borderRadius: 26,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  searchIcon: {
    width: 18,
    height: 18,
    tintColor: COLORS.placeholder,
    marginRight: 10,
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: getFontFamily('Regular'),
    color: COLORS.text,
  },

  addBtn: {
    marginHorizontal: width * 0.05,
    marginTop: 18,
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  plusIcon: {
    width: 14,
    height: 14,
    tintColor: COLORS.secondary,
    marginRight: 8,
  },

  addText: {
    color: COLORS.secondary,
    fontSize: 15,
    fontFamily: getFontFamily('Bold'),
  },

  filters: {
    flexDirection: 'row',
    marginHorizontal: width * 0.05,
    marginTop: 18,
    backgroundColor: COLORS.background,
    borderRadius: 18,
    padding: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  filterBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 14,
  },

  activeFilter: {
    backgroundColor: COLORS.primary,
  },

  filterText: {
    fontSize: 14,
    fontFamily: getFontFamily('Medium'),
    color: COLORS.text,
  },

  activeFilterText: {
    color: COLORS.secondary,
    fontFamily: getFontFamily('Bold'),
  },

  totalText: {
    marginHorizontal: width * 0.05,
    marginTop: 20,
    fontSize: 15,
    fontFamily: getFontFamily('SemiBold'),
    color: COLORS.text,
  },

  card: {
    backgroundColor: COLORS.secondary,
    borderRadius: 20,
    marginHorizontal: width * 0.05,
    marginTop: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },

  cardTop: { flexDirection: 'row' },

  foodImg: {
    width: 68,
    height: 68,
    borderRadius: 14,
  },

  cardCenter: {
    flex: 1,
    marginLeft: 12,
  },

  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 6,
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },

  badgeText: {
    fontSize: 12,
    fontFamily: getFontFamily('Medium'),
    color: COLORS.text,
  },

  foodName: {
    fontSize: 15,
    fontFamily: getFontFamily('SemiBold'),
    color: COLORS.text,
  },

  tag: {
    fontSize: 13,
    color: COLORS.primary,
    fontFamily: getFontFamily('Medium'),
    marginTop: 2,
  },

  cardRight: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },

  deleteIcon: {
    width: 18,
    height: 18,
    tintColor: COLORS.muted,
  },

  price: {
    fontSize: 16,
    fontFamily: getFontFamily('SemiBold'),
    color: COLORS.text,
  },

  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  metaLabel: {
    fontSize: 12,
    color: COLORS.muted,
    fontFamily: getFontFamily('Regular'),
  },

  metaValue: {
    fontSize: 13,
    fontFamily: getFontFamily('Medium'),
    color: COLORS.text,
  },

  btnRow: {
    flexDirection: 'row',
    marginTop: 16,
  },

  editBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
    marginRight: 10,
  },

  editText: {
    fontSize: 14,
    fontFamily: getFontFamily('Bold'),
    color: COLORS.text,
  },

  viewBtn: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
  },

  viewText: {
    color: COLORS.secondary,
    fontSize: 14,
    fontFamily: getFontFamily('Bold'),
  },
});
