// src/screens/Food1.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  Modal,
  Pressable,
} from 'react-native';
import { COLORS } from '../theme/colors';
import { getFontFamily, getFontWeight } from '../utils/fontHelper';

const { width } = Dimensions.get('window');

/* static options */
const productTypes = ['Food', 'Beverage'];
const regionalCuisine = ['Indian', 'Chinese', 'Italian'];
const foodCategories = ['Fast Food', 'Main Course'];
const subCategories = ['Burger', 'Pizza', 'Sandwich'];

const Food1 = ({ navigation }: any) => {
  const [foodType, setFoodType] = useState<'veg' | 'nonveg'>('veg');

  const [product, setProduct] = useState('Select product type');
  const [region, setRegion] = useState('Categories');
  const [category, setCategory] = useState('Fast Food');
  const [subCategory, setSubCategory] = useState('Burger');

  const [activeSheet, setActiveSheet] = useState<
    null | 'product' | 'region' | 'category' | 'sub'
  >(null);

  const renderSheet = (
    options: string[],
    onSelect: (v: string) => void,
  ) => (
    <Modal transparent animationType="slide" visible={!!activeSheet}>
      <Pressable style={styles.overlay} onPress={() => setActiveSheet(null)} />
      <View style={styles.bottomSheet}>
        {options.map(item => (
          <TouchableOpacity
            key={item}
            style={styles.optionRow}
            onPress={() => {
              onSelect(item);
              setActiveSheet(null);
            }}
          >
            <Text style={styles.optionText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </Modal>
  );

  return (
    <View style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../assets/f1.png')}
          style={styles.progressImg}
          resizeMode="contain"
        />
        <View style={styles.headerTextWrap}>
          <Text style={styles.headerTitle}>Food category</Text>
          <Text style={styles.headerSubTitle}>
            Next step food details
          </Text>
        </View>
      </View>

      <Text style={styles.pageTitle}>Food category</Text>
      <Text style={styles.pageDesc}>Register your food</Text>

      {/* Product type */}
      <Text style={styles.label}>Select food type</Text>
      <TouchableOpacity
        style={styles.inputBox}
        onPress={() => setActiveSheet('product')}
      >
        <Text style={styles.inputText}>{product}</Text>
        <Image source={require('../assets/dropdown.png')} style={styles.icon} />
      </TouchableOpacity>

      {/* Veg / Non-veg */}
      <Text style={styles.label}>Food categories</Text>
      <View style={styles.radioRow}>
        {['veg', 'nonveg'].map(v => (
          <TouchableOpacity
            key={v}
            style={styles.radioItem}
            onPress={() => setFoodType(v as any)}
          >
            <View style={styles.radioOuter}>
              {foodType === v && <View style={styles.radioInner} />}
            </View>
            <Text style={styles.radioText}>
              {v === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Regional cuisine */}
      <Text style={styles.label}>Regional cuisine</Text>
      <TouchableOpacity
        style={styles.inputBox}
        onPress={() => setActiveSheet('region')}
      >
        <Text style={styles.inputText}>{region}</Text>
        <Image source={require('../assets/dropdown.png')} style={styles.icon} />
      </TouchableOpacity>

      {/* Food category */}
      <Text style={styles.label}>Food category</Text>
      <TouchableOpacity
        style={styles.inputBox}
        onPress={() => setActiveSheet('category')}
      >
        <Text style={styles.inputText}>{category}</Text>
        <Image source={require('../assets/dropdown.png')} style={styles.icon} />
      </TouchableOpacity>

      {/* Sub category */}
      <Text style={styles.label}>Subcategory</Text>
      <TouchableOpacity
        style={styles.inputBox}
        onPress={() => setActiveSheet('sub')}
      >
        <Text style={styles.inputText}>{subCategory}</Text>
        <Image source={require('../assets/dropdown.png')} style={styles.icon} />
      </TouchableOpacity>

      {/* Next */}
      <TouchableOpacity
        style={styles.nextBtn}
        onPress={() => navigation.navigate('Food2')}
      >
        <Text style={styles.nextText}>Next</Text>
      </TouchableOpacity>

      {/* Sheets */}
      {activeSheet === 'product' &&
        renderSheet(productTypes, setProduct)}
      {activeSheet === 'region' &&
        renderSheet(regionalCuisine, setRegion)}
      {activeSheet === 'category' &&
        renderSheet(foodCategories, setCategory)}
      {activeSheet === 'sub' &&
        renderSheet(subCategories, setSubCategory)}
    </View>
  );
};

export default Food1;

/* styles */
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    paddingHorizontal: width * 0.06,
     paddingTop: Platform.OS === 'ios' ? 10 : 30,

  },

    header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 34,
    paddingRight: width * 0.06,
  },

  progressImg: { width: 64, height: 64, marginRight: 16 },

  headerTextWrap: { flex: 1, alignItems: 'flex-end' },

  headerTitle: {
    fontSize: 18,
    fontFamily: getFontFamily('SemiBold'),
    fontWeight: getFontWeight('SemiBold'),
  },

  headerSubTitle: {
    fontSize: 14,
    color: COLORS.muted,
    marginTop: 4,
  },

  pageTitle: {
    fontSize: 26,
    color: COLORS.primary,
    fontFamily: getFontFamily('Bold'),
  },

  pageDesc: {
    fontSize: 15,
    color: COLORS.muted,
    marginBottom: 26,
  },

  label: {
    fontSize: 15,
    marginTop: 18,
    marginBottom: 8,
    fontFamily: getFontFamily('Medium'),
  },

  inputBox: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    padding: 16,
    backgroundColor: COLORS.secondary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  inputText: {
    fontSize: 15,
    color: COLORS.text,
  },

  icon: { width: 14, height: 14 },

  radioRow: { flexDirection: 'row', marginTop: 6 },

  radioItem: { flexDirection: 'row', alignItems: 'center', marginRight: 24 },

  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },

  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },

  radioText: { fontSize: 15 },

  nextBtn: {
    marginTop: 20,
    alignSelf: 'flex-end',
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 14,
  },

  nextText: {
    color: COLORS.secondary,
    fontSize: 16,
    fontFamily: getFontFamily('Bold'),
  },

  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' },

  bottomSheet: {
    backgroundColor: COLORS.secondary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 30,
  },

  optionRow: {
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  optionText: { fontSize: 16 },
});
