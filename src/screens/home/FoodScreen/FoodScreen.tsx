import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Dimensions,
  StatusBar,
  Platform,
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { COLORS } from '../../../theme/colors';
import {
  getFontFamily,
  getFontWeight,
} from '../../../utils/fontHelper';

const { width } = Dimensions.get('window');

/* ================= FILTER OPTIONS ================= */

const MEAL_TYPES = ['All', 'Breakfast', 'Lunch', 'Dinner'];
const FOOD_TYPES = ['All', 'Veg', 'Non-Veg', 'Jain'];

/* ================= FOOD DATA ================= */

const FOOD_ITEMS = [
  {
    id: 1,
    name: 'Margherita Pizza',
    price: '₹199',
    mealType: 'Lunch',
    foodType: 'Veg',
    sku: 'SKU-001',
    image: require('../../../assets/pizza.png'),
  },
  {
    id: 2,
    name: 'Paneer Paratha',
    price: '₹149',
    mealType: 'Breakfast',
    foodType: 'Jain',
    sku: 'SKU-002',
    image: require('../../../assets/pizza.png'),
  },
  {
    id: 3,
    name: 'Chicken Biryani',
    price: '₹299',
    mealType: 'Dinner',
    foodType: 'Non-Veg',
    sku: 'SKU-003',
    image: require('../../../assets/pizza.png'),
  },
  {
    id: 4,
    name: 'Veg Thali',
    price: '₹219',
    mealType: 'Lunch',
    foodType: 'Veg',
    sku: 'SKU-004',
    image: require('../../../assets/pizza.png'),
  },
];

/* ================= SCREEN ================= */

export default function FoodScreen() {
  const [searchText, setSearchText] = useState('');
  const [selectedMeal, setSelectedMeal] = useState('All');
  const [selectedFoodType, setSelectedFoodType] = useState('All');

  const STATUS_BAR_HEIGHT = getStatusBarHeight();
  const BOTTOM_SPACE = Platform.OS === 'ios' ? 90 : 80;

  const filteredItems = FOOD_ITEMS.filter(item => {
    const matchSearch = item.name
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchMeal =
      selectedMeal === 'All' || item.mealType === selectedMeal;
    const matchFoodType =
      selectedFoodType === 'All' || item.foodType === selectedFoodType;

    return matchSearch && matchMeal && matchFoodType;
  });

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      {/* HEADER */}
      <View style={[styles.headerWrapper, { paddingTop: STATUS_BAR_HEIGHT }]}>
        <Text style={styles.headerTitle}>Food Items</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: BOTTOM_SPACE }}
      >
        {/* SEARCH */}
        <View style={styles.searchBox}>
          <Image
            source={require('../../../assets/search.png')}
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search food item"
            placeholderTextColor="#9E9E9E"
            value={searchText}
            onChangeText={setSearchText}
            style={styles.searchInput}
          />
        </View>

        <Text style={styles.filterTitle}>Meal Type</Text>

        <View style={styles.filterRow}>
          {MEAL_TYPES.map(type => (
            <TouchableOpacity
              key={type}
              style={[
                styles.filterBtn,
                selectedMeal === type && styles.activeFilter,
              ]}
              onPress={() => setSelectedMeal(type)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedMeal === type && styles.activeFilterText,
                ]}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.filterTitle}>Food Type</Text>

        <View style={styles.filterRow}>
          {FOOD_TYPES.map(type => (
            <TouchableOpacity
              key={type}
              style={[
                styles.filterBtn,
                selectedFoodType === type && styles.activeFilter,
              ]}
              onPress={() => setSelectedFoodType(type)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedFoodType === type && styles.activeFilterText,
                ]}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.totalText}>
          Total items ({filteredItems.length})
        </Text>

        <View style={styles.foodListContainer}>
          {filteredItems.map(item => (
            <View key={item.id} style={styles.card}>
              <Image source={item.image} style={styles.foodImg} />

              <View style={styles.cardInfo}>
                <Text style={styles.foodName}>{item.name}</Text>
                <Text style={styles.meta}>
                  {item.mealType} • {item.foodType}
                </Text>
                <Text style={styles.sku}>{item.sku}</Text>
              </View>

              <Text style={styles.price}>{item.price}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },

  headerWrapper: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 18,
    color: COLORS.text,
    fontFamily: getFontFamily('SemiBold'),
    fontWeight: getFontWeight('SemiBold'),
  },

  /* SEARCH (IOS + ANDROID SAME) */
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
    marginHorizontal: width * 0.05,
    marginTop: width * 0.05,
    borderRadius: 12,
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

  filterTitle: {
    marginHorizontal: width * 0.05,
    marginTop: 20,
    fontSize: 14,
    fontFamily: getFontFamily('SemiBold'),
    fontWeight: getFontWeight('SemiBold'),
  },

  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: width * 0.05,
    marginTop: 10,
  },
  filterBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#EAEAEA',
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  activeFilter: {
    backgroundColor: COLORS.primary,
  },
  filterText: {
    fontSize: 13,
    fontFamily: getFontFamily('Medium'),
    fontWeight: getFontWeight('Medium'),
    color: COLORS.text,
  },
  activeFilterText: {
    color: '#fff',
  },

  totalText: {
    marginHorizontal: width * 0.05,
    marginTop: 16,
    fontSize: 15,
    fontFamily: getFontFamily('SemiBold'),
    fontWeight: getFontWeight('SemiBold'),
  },

  foodListContainer: {
    alignItems: 'center',
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: width * 0.9,
    marginTop: 14,
    borderRadius: 18,
    padding: 14,
  },
  foodImg: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  cardInfo: {
    flex: 1,
    marginLeft: 12,
  },
  foodName: {
    fontSize: 15,
    fontFamily: getFontFamily('SemiBold'),
    fontWeight: getFontWeight('SemiBold'),
  },
  meta: {
    fontSize: 12,
    color: '#777',
    fontFamily: getFontFamily('Regular'),
    fontWeight: getFontWeight('Regular'),
  },
  sku: {
    fontSize: 11,
    color: '#999',
    fontFamily: getFontFamily('Regular'),
    fontWeight: getFontWeight('Regular'),
  },
  price: {
    fontSize: 15,
    fontFamily: getFontFamily('SemiBold'),
    fontWeight: getFontWeight('SemiBold'),
  },
});
