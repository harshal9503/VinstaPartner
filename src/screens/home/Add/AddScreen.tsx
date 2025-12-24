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
import { COLORS } from '../../../theme/colors';
import { getFontFamily, getFontWeight } from '../../../utils/fontHelper';
import EditPopup from './EditPopup';
import ItemDetailsPopup from './ItemDetailsPopup';

const { width, height } = Dimensions.get('window');

const FILTERS = ['All', 'In-stock', 'Out of stock'];

const ITEMS = [
  { id: 1, status: 'In-stock', tag: 'Bestseller', statusColor: '#D9FAD7', dot: '#28A745', name: 'Spicy paneer burger', price: '₹120', sku: 'SKU: FOD-SPB-01', lastUpdated: '1/15/2024' },
  { id: 2, status: 'Out of stock', tag: 'Recommended', statusColor: '#FFE2E2', dot: '#E53935', name: 'Margherita Pizza', price: '₹180', sku: 'SKU: FOD-MP-02', lastUpdated: '2/20/2024' },
  { id: 3, status: 'Out of stock', tag: 'Top Rated', statusColor: '#FFE2E2', dot: '#E53935', name: 'Paneer Tikka', price: '₹150', sku: 'SKU: FOD-PT-03', lastUpdated: '1/25/2024' },
  { id: 4, status: 'In-stock', tag: 'Trending Now', statusColor: '#D9FAD7', dot: '#28A745', name: 'Garlic Bread', price: '₹80', sku: 'SKU: FOD-GB-04', lastUpdated: '3/05/2024' },
];

export default function AddScreen() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showItemDetailsPopup, setShowItemDetailsPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();

  const statusBarHeight = getStatusBarHeight();
  const BOTTOM_NAV_HEIGHT = Platform.OS === 'ios' ? 83 : 70;

  const handleEditPress = (item: any) => {
    setSelectedItem(item);
    setShowEditPopup(true);
  };

  const handleViewDetailsPress = (item: any) => {
    setSelectedItem(item);
    setShowItemDetailsPopup(true);
  };

  const handleSaveChanges = () => {
    console.log('Save changes for:', selectedItem);
    setShowEditPopup(false);
    setSelectedItem(null);
  };

  const handleCloseEditPopup = () => {
    setShowEditPopup(false);
    setSelectedItem(null);
  };

  const handleCloseItemDetailsPopup = () => {
    setShowItemDetailsPopup(false);
    setSelectedItem(null);
  };

  const handleEditFromDetails = () => {
    setShowItemDetailsPopup(false);
    setShowEditPopup(true);
  };

  const handlePrintLabel = () => {
    console.log('Print label for:', selectedItem);
  };

  const handleDeleteItem = (itemId: number) => {
    console.log('Delete item:', itemId);
  };

  const handleAddFoodItem = () => {
    console.log('Add food item pressed');
  };

  const filteredItems = ITEMS.filter(item => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'In-stock') return item.status === 'In-stock';
    if (activeFilter === 'Out of stock') return item.status === 'Out of stock';
    return true;
  });

  const searchedItems = filteredItems.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase()) ||
    item.tag.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.secondary}
      />

      <EditPopup
        visible={showEditPopup}
        onClose={handleCloseEditPopup}
        onSave={handleSaveChanges}
        item={selectedItem}
      />

      <ItemDetailsPopup
        visible={showItemDetailsPopup}
        onClose={handleCloseItemDetailsPopup}
        onEdit={handleEditFromDetails}
        onPrint={handlePrintLabel}
        item={selectedItem}
      />

      {/* ===== HEADER - EXACTLY LIKE FOOD SCREEN ===== */}
      <View style={[styles.headerWrapper, { paddingTop: statusBarHeight }]}>
        <Text style={styles.headerTitle}>Shop menu</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scroll, { paddingBottom: BOTTOM_NAV_HEIGHT + 40 }]}
      >
        {/* SEARCH - EXACTLY LIKE FOOD SCREEN */}
        <View style={styles.searchBox}>
          <Image
            source={require('../../../assets/search.png')}
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search food"
            placeholderTextColor="#9E9E9E"
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        <TouchableOpacity style={styles.addFoodBtn} onPress={handleAddFoodItem}>
          <Image
            source={require('../../../assets/plus.png')}
            style={styles.plusIcon}
          />
          <Text style={styles.addFoodText}>Add food items</Text>
        </TouchableOpacity>

        <View style={styles.filters}>
          {FILTERS.map(item => (
            <TouchableOpacity
              key={item}
              style={[
                styles.filterBtn,
                activeFilter === item && styles.activeFilter,
              ]}
              onPress={() => setActiveFilter(item)}
            >
              <Text
                style={[
                  styles.filterText,
                  activeFilter === item && styles.activeFilterText,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.totalText}>Total item's ({searchedItems.length})</Text>

        {searchedItems.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.cardTop}>
              <Image
                source={require('../../../assets/pizza.png')}
                style={styles.foodImg}
              />

              <View style={styles.cardCenter}>
                <View style={[styles.statusBadge, { backgroundColor: item.statusColor }]}>
                  <View style={[styles.dot, { backgroundColor: item.dot }]} />
                  <Text style={styles.statusText}>{item.status}</Text>
                </View>

                <Text style={styles.foodName}>{item.name}</Text>
                <Text style={styles.tagText}>{item.tag}</Text>
              </View>

              <View style={styles.cardRight}>
                <TouchableOpacity onPress={() => handleDeleteItem(item.id)}>
                  <Image
                    source={require('../../../assets/delete.png')}
                    style={styles.deleteIcon}
                  />
                </TouchableOpacity>
                <Text style={styles.price}>{item.price}</Text>
              </View>
            </View>

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

            <View style={styles.cardBtns}>
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

        {searchedItems.length === 0 && (
          <View style={styles.emptyContainer}>
            <Image
              source={require('../../../assets/empty.png')}
              style={styles.emptyIcon}
            />
            <Text style={styles.emptyText}>No items found</Text>
            <Text style={styles.emptySubText}>Try changing your search or filter</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },

  scroll: {
    paddingHorizontal: 0,
    paddingTop: width * 0.03, // Matches FoodScreen scroll paddingTop
  },

  headerWrapper: {
    alignItems: 'center', // EXACTLY LIKE FOOD SCREEN
    paddingVertical: 0,  // EXACTLY LIKE FOOD SCREEN
    backgroundColor: COLORS.secondary,
  },

  headerTitle: {
    fontSize: 18,
    color: COLORS.text,
    fontFamily: getFontFamily('SemiBold'),
    fontWeight: getFontWeight('SemiBold'),
  },

  // SEARCH - EXACTLY LIKE FOOD SCREEN
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
    marginHorizontal: width * 0.05,
    marginTop: width * 0.0, // EXACTLY LIKE FOOD SCREEN
    borderRadius: 10,
    height: 52,
    paddingHorizontal: 16,
  },

  searchIcon: {
    width: 18,
    height: 18,
    tintColor: '#9E9E9E',
    marginRight: 10,
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.text,
    fontFamily: getFontFamily('Regular'),
    fontWeight: getFontWeight('Regular'),
    paddingVertical: 0,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },

  addFoodBtn: {
    marginHorizontal: width * 0.05,
    marginTop: 18,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  plusIcon: {
    width: 14,
    height: 14,
    tintColor: '#fff',
    marginRight: 8,
  },

  addFoodText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },

  filters: {
    flexDirection: 'row',
    marginHorizontal: width * 0.05,
    marginTop: 18,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 4,
  },

  filterBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },

  activeFilter: {
    backgroundColor: COLORS.primary,
  },

  filterText: {
    fontSize: 14,
    fontFamily: getFontFamily('Medium'),
    fontWeight: getFontWeight('Medium'),
    color: COLORS.text,
  },

  activeFilterText: {
    color: '#fff',
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },

  totalText: {
    marginHorizontal: width * 0.05,
    marginTop: 20,
    fontSize: 15,
    fontFamily: getFontFamily('SemiBold'),
    fontWeight: getFontWeight('SemiBold'),
    color: COLORS.text,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: width * 0.05,
    marginTop: 16,
    padding: 16,
  },

  cardTop: {
    flexDirection: 'row',
  },

  foodImg: {
    width: 68,
    height: 68,
    borderRadius: 10,
  },

  cardCenter: {
    flex: 1,
    marginLeft: 12,
  },

  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginBottom: 6,
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },

  statusText: {
    fontSize: 12,
    fontFamily: getFontFamily('Medium'),
    fontWeight: getFontWeight('Medium'),
  },

  foodName: {
    fontSize: 15,
    fontFamily: getFontFamily('SemiBold'),
    fontWeight: getFontWeight('SemiBold'),
  },

  tagText: {
    fontSize: 13,
    color: COLORS.primary,
    marginTop: 2,
    fontFamily: getFontFamily('Medium'),
    fontWeight: getFontWeight('Medium'),
  },

  cardRight: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },

  deleteIcon: {
    width: 18,
    height: 18,
  },

  price: {
    fontSize: 16,
    fontFamily: getFontFamily('SemiBold'),
    fontWeight: getFontWeight('SemiBold'),
  },

  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  metaLabel: {
    fontSize: 12,
    color: '#777',
    fontFamily: getFontFamily('Regular'),
    fontWeight: getFontWeight('Regular'),
  },

  metaValue: {
    fontSize: 13,
    fontFamily: getFontFamily('Medium'),
    fontWeight: getFontWeight('Medium'),
  },

  cardBtns: {
    flexDirection: 'row',
    marginTop: 16,
  },

  editBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginRight: 10,
  },

  editText: {
    fontSize: 14,
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },

  viewBtn: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },

  viewText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },

  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    paddingHorizontal: width * 0.05,
  },

  emptyIcon: {
    width: 120,
    height: 120,
    marginBottom: 20,
    opacity: 0.5,
  },

  emptyText: {
    fontSize: 18,
    fontFamily: getFontFamily('SemiBold'),
    fontWeight: getFontWeight('SemiBold'),
    color: COLORS.text,
    marginBottom: 8,
  },

  emptySubText: {
    fontSize: 14,
    fontFamily: getFontFamily('Regular'),
    fontWeight: getFontWeight('Regular'),
    color: '#666',
    textAlign: 'center',
  },
});
