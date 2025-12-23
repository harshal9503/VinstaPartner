import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';

const { width } = Dimensions.get('window');

const FOOD_DATA = [
  {
    id: '1',
    name: 'Spicy Paneer Burger',
    price: '₹120',
    status: 'In-stock',
    updated: '1/15/2024',
    image: require('../../../assets/pizza.png'),
    bestseller: true,
  },
  {
    id: '2',
    name: 'Veggie Pizza',
    price: '₹250',
    status: 'Out of stock',
    updated: '1/10/2024',
    image: require('../../../assets/pizza.png'),
    bestseller: false,
  },
   {
    id: '3',
    name: 'Corn Chesse Pizza',
    price: '₹250',
    status: 'Out of stock',
    updated: '1/10/2024',
    image: require('../../../assets/pizza.png'),
    bestseller: false,
  },
   {
    id: '4',
    name: 'Margereto Pizza',
    price: '₹250',
    status: 'Out of stock',
    updated: '1/10/2024',
    image: require('../../../assets/pizza.png'),
    bestseller: false,
  },
];

const FoodScreen = () => {
  const [activeTab, setActiveTab] = useState<'All' | 'In-stock' | 'Out'>('All');
  const [searchText, setSearchText] = useState('');

  const filteredData = FOOD_DATA.filter(item => {
    if (activeTab === 'All') return true;
    if (activeTab === 'In-stock') return item.status === 'In-stock';
    if (activeTab === 'Out') return item.status === 'Out of stock';
  }).filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.foodImg} />

      <View style={styles.info}>
        <Text style={styles.foodName}>{item.name}</Text>
        <Text style={styles.price}>{item.price}</Text>

        {item.bestseller && <Text style={styles.bestseller}>⭐ Bestseller</Text>}

        <Text style={[styles.status, item.status === 'In-stock' ? styles.inStock : styles.outStock]}>
          {item.status}
        </Text>

        <Text style={styles.updated}>Updated: {item.updated}</Text>

        <View style={styles.btnRow}>
          <TouchableOpacity style={styles.editBtn}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.viewBtn}>
            <Text style={styles.viewText}>Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* SEARCH */}
      <View style={styles.searchBox}>
        <TextInput
          placeholder="Search food"
          value={searchText}
          onChangeText={setSearchText}
          style={styles.searchInput}
        />
      </View>

      {/* TABS */}
      <View style={styles.tabs}>
        {['All', 'In-stock', 'Out'].map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab as any)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* LIST */}
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingVertical: 16 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default FoodScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFCF7',
    paddingHorizontal: 16,
  },

  searchBox: {
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 16,
    height: 44,
    justifyContent: 'center',
    marginVertical: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },

  searchInput: {
    fontSize: 14,
  },

  tabs: {
    flexDirection: 'row',
    marginVertical: 12,
    backgroundColor: '#FFF4E6',
    borderRadius: 30,
    padding: 4,
  },

  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 20,
  },

  activeTab: {
    backgroundColor: '#EA7B22',
  },

  tabText: {
    fontSize: 13,
    color: '#6B7280',
  },

  activeTabText: {
    color: '#fff',
    fontWeight: '600',
  },

  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 3,
  },

  foodImg: {
    width: 110,
    height: 110,
    resizeMode: 'cover',
  },

  info: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },

  foodName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },

  price: {
    fontSize: 14,
    fontWeight: '600',
    color: '#EA7B22',
    marginVertical: 4,
  },

  bestseller: {
    fontSize: 12,
    color: '#FFD700',
    marginBottom: 4,
  },

  status: {
    fontSize: 12,
    fontWeight: '500',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },

  inStock: {
    backgroundColor: '#D1FAE5',
    color: '#065F46',
  },

  outStock: {
    backgroundColor: '#FEE2E2',
    color: '#B91C1C',
  },

  updated: {
    fontSize: 11,
    color: '#6B7280',
  },

  btnRow: {
    flexDirection: 'row',
    marginTop: 6,
  },

  editBtn: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingVertical: 6,
    alignItems: 'center',
    borderRadius: 8,
    marginRight: 8,
  },

  editText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '600',
  },

  viewBtn: {
    flex: 1,
    backgroundColor: '#EA7B22',
    paddingVertical: 6,
    alignItems: 'center',
    borderRadius: 8,
  },

  viewText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
});
