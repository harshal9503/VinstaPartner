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
import { useNavigation } from '@react-navigation/native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { COLORS } from '../../../theme/colors';
import { getFontFamily } from '../../../utils/fontHelper';

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
  const navigation = useNavigation<any>();

  const [searchText, setSearchText] = useState('');
  const [selectedMeal, setSelectedMeal] = useState('All');
  const [selectedFoodType, setSelectedFoodType] = useState('All');

  const STATUS_BAR_HEIGHT = getStatusBarHeight();
  const BOTTOM_SPACE = Platform.OS === 'ios' ? 90 : 80;

  /* ================= FILTER LOGIC ================= */

  const filteredItems = FOOD_ITEMS.filter(item => {
    const matchSearch =
      item.name.toLowerCase().includes(searchText.toLowerCase());

    const matchMeal =
      selectedMeal === 'All' || item.mealType === selectedMeal;

    const matchFoodType =
      selectedFoodType === 'All' || item.foodType === selectedFoodType;

    return matchSearch && matchMeal && matchFoodType;
  });

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      {/* ================= HEADER ================= */}
      <View style={[styles.headerWrapper, { paddingTop: STATUS_BAR_HEIGHT }]}>
        <View style={styles.header}>
          <View style={{ width: 24 }} />
          <Text style={styles.headerTitle}>Food Items</Text>
          <View style={{ width: 24 }} />
        </View>
      </View>

      {/* ================= CONTENT ================= */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: BOTTOM_SPACE }}
      >
        {/* SEARCH */}
        <View style={styles.searchBox}>
          <TextInput
            placeholder="Search food item"
            placeholderTextColor="#888"
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* MEAL TYPE FILTER */}
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

        {/* FOOD TYPE FILTER */}
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

        {/* TOTAL */}
        <Text style={styles.totalText}>
          Total items ({filteredItems.length})
        </Text>

        {/* FOOD LIST - CENTERED */}
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

          {/* EMPTY */}
          {filteredItems.length === 0 && (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>No food items found</Text>
            </View>
          )}
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
    backgroundColor: COLORS.secondary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
    paddingBottom: 12,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: getFontFamily('SemiBold'),
    color: COLORS.text,
  },

  searchBox: {
    backgroundColor: '#F3F3F3',
    margin: width * 0.05,
    borderRadius: 26,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  searchInput: {
    fontFamily: getFontFamily('Regular'),
  },

  filterTitle: {
    marginHorizontal: width * 0.05,
    marginTop: 10,
    fontFamily: getFontFamily('SemiBold'),
    fontSize: 14,
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
    fontFamily: getFontFamily('Medium'),
  },
  activeFilterText: {
    color: '#fff',
    fontFamily: getFontFamily('Bold'),
  },

  totalText: {
    marginHorizontal: width * 0.05,
    marginTop: 16,
    fontFamily: getFontFamily('SemiBold'),
  },

  // NEW CENTERED FOOD LIST CONTAINER
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
    alignSelf: 'center',
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
    fontFamily: getFontFamily('SemiBold'),
    fontSize: 15,
  },
  meta: {
    fontSize: 12,
    color: '#777',
    marginTop: 2,
  },
  sku: {
    fontSize: 11,
    color: '#999',
  },
  price: {
    fontFamily: getFontFamily('SemiBold'),
    fontSize: 15,
  },

  emptyBox: {
    alignItems: 'center',
    marginTop: 60,
  },
  emptyText: {
    fontFamily: getFontFamily('SemiBold'),
    fontSize: 16,
  },
});
