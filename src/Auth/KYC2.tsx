import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  Platform,
  Modal,
  Pressable,
} from 'react-native';
import { COLORS } from '../theme/colors';
import { getFontFamily, getFontWeight } from '../utils/fontHelper';

const { width } = Dimensions.get('window');
const ICON_SIZE = 54;

const radiusOptions = ['2 KM', '5 KM', '10 KM'];
const categoryOptions = ['Pure veg', 'Non veg', 'Both'];

const KYC2 = ({ navigation }: any) => {
  const [restaurantName, setRestaurantName] = useState('');
  const [gst, setGst] = useState('');

  const [radius, setRadius] = useState('radius');
  const [category, setCategory] = useState('Pure veg');

  const [showRadius, setShowRadius] = useState(false);
  const [showCategory, setShowCategory] = useState(false);

  const getCategoryIcon = (item: string) => {
    if (item === 'Pure veg') return require('../assets/veg.png');
    if (item === 'Non veg') return require('../assets/nonveg.png');
    return require('../assets/veg.png'); // Default fallback
  };

  const renderCategoryIcons = (item: string) => {
    if (item === 'Both') {
      return (
        <View style={styles.bothIconsContainer}>
          <Image
            source={require('../assets/veg.png')}
            style={styles.bothIcon}
            resizeMode="contain"
          />
          <Image
            source={require('../assets/nonveg.png')}
            style={styles.bothIcon}
            resizeMode="contain"
          />
        </View>
      );
    }
    return (
      <Image
        source={getCategoryIcon(item)}
        style={styles.optionIcon}
        resizeMode="contain"
      />
    );
  };

  const renderBottomSheet = (
    visible: boolean,
    onClose: () => void,
    options: string[],
    onSelect: (value: string) => void,
    type: 'radius' | 'category',
  ) => (
    <Modal 
      visible={visible} 
      transparent 
      animationType="slide"
      statusBarTranslucent={true}
    >
      <Pressable style={styles.overlay} onPress={onClose} />
      <View style={styles.bottomSheet}>
        {options.map(item => (
          <TouchableOpacity
            key={item}
            style={styles.optionRow}
            onPress={() => {
              onSelect(item);
              onClose();
            }}
          >
            {type === 'radius' ? (
              <Image
                source={require('../assets/location.png')}
                style={[styles.optionIcon, { tintColor: COLORS.primary }]}
                resizeMode="contain"
              />
            ) : (
              renderCategoryIcons(item)
            )}
            <Text style={styles.optionText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </Modal>
  );

  return (
    <View style={styles.root}>
      <ScrollView 
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={require('../assets/kyc2.png')}
            style={styles.progressImage}
            resizeMode="contain"
          />
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Restaurant registration</Text>
            <Text style={styles.headerSubTitle}>
              Next step bank details
            </Text>
          </View>
        </View>

        {/* Section */}
        <Text style={styles.sectionTitle}>Restaurant registration</Text>
        <Text style={styles.sectionDesc}>
          Please submit the following details to complete your Business Detail's
        </Text>

        {/* Inputs */}
        <Text style={styles.label}>Restaurant legal name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter restaurant name"
          placeholderTextColor={COLORS.placeholder}
          value={restaurantName}
          onChangeText={setRestaurantName}
        />

        <Text style={styles.label}>Gst-In number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter gst-in number"
          placeholderTextColor={COLORS.placeholder}
          value={gst}
          onChangeText={setGst}
          autoCapitalize="characters"
        />

        {/* Radius */}
        <Text style={styles.label}>Pickup radius</Text>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setShowRadius(true)}
        >
          <Text
            style={[
              styles.dropdownText,
              radius !== 'radius' && styles.activeText,
            ]}
          >
            {radius}
          </Text>
          <Image
            source={require('../assets/dropdown.png')}
            style={styles.dropdownIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* Category */}
        <Text style={styles.label}>Restaurant category</Text>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setShowCategory(true)}
        >
          <Text style={[styles.dropdownText, styles.activeText]}>
            {category}
          </Text>
          <Image
            source={require('../assets/dropdown.png')}
            style={styles.dropdownIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </ScrollView>

      {/* Continue */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('KYC3')}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

      {/* Bottom Sheets */}
      {renderBottomSheet(
        showRadius,
        () => setShowRadius(false),
        radiusOptions,
        setRadius,
        'radius',
      )}

      {renderBottomSheet(
        showCategory,
        () => setShowCategory(false),
        categoryOptions,
        setCategory,
        'category',
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },

  container: {
    paddingHorizontal: width * 0.06,
    paddingTop: Platform.OS === 'ios' ? 95 : 75,
    paddingBottom: 130,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 34,
    paddingRight: width * 0.06,
  },

  progressImage: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    marginRight: 16,
  },

  headerContent: {
    flex: 1,
    alignItems: 'flex-end',
  },

  headerTitle: {
    fontSize: 20,
    fontFamily: getFontFamily('SemiBold'),
    fontWeight: getFontWeight('SemiBold'),
    includeFontPadding: false,
    textAlign: 'right',
    textAlignVertical: 'center',
  },

  headerSubTitle: {
    fontSize: 15,
    color: COLORS.muted,
    marginTop: 4,
    fontFamily: getFontFamily('Regular'),
    includeFontPadding: false,
    textAlign: 'right',
    textAlignVertical: 'center',
  },

  sectionTitle: {
    fontSize: 22,
    color: COLORS.primary,
    marginBottom: 8,
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
    includeFontPadding: false,
    textAlignVertical: 'center',
  },

  sectionDesc: {
    fontSize: 16,
    color: COLORS.muted,
    marginBottom: 26,
    fontFamily: getFontFamily('Regular'),
    includeFontPadding: false,
    textAlignVertical: 'center',
    lineHeight: 24,
  },

  label: {
    fontSize: 16,
    marginTop: 18,
    marginBottom: 8,
    fontFamily: getFontFamily('Medium'),
    fontWeight: getFontWeight('Medium'),
    includeFontPadding: false,
    textAlignVertical: 'center',
  },

  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 16 : 14,
    fontSize: 16,
    fontFamily: getFontFamily('Regular'),
    includeFontPadding: false,
    textAlignVertical: 'center',
    backgroundColor: COLORS.secondary,
  },

  dropdown: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 16 : 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
  },

  dropdownText: {
    fontSize: 16,
    color: COLORS.placeholder,
    fontFamily: getFontFamily('Regular'),
    includeFontPadding: false,
    textAlignVertical: 'center',
  },

  activeText: {
    color: COLORS.text,
  },

  dropdownIcon: {
    width: 12,
    height: 12,
  },

  button: {
    position: 'absolute',
    bottom: 24,
    left: width * 0.06,
    right: width * 0.06,
    backgroundColor: COLORS.primary,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
  },

  buttonText: {
    fontSize: 18,
    color: COLORS.secondary,
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
    includeFontPadding: false,
    textAlignVertical: 'center',
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },

  bottomSheet: {
    backgroundColor: COLORS.secondary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: 300,
    paddingBottom: 30,
  },

  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  optionIcon: {
    width: 22,
    height: 22,
    marginRight: 14,
  },

  bothIcon: {
    width: 22,
    height: 22,
    marginRight: 8,
  },

  bothIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  optionText: {
    fontSize: 16,
    color: COLORS.text,
    fontFamily: getFontFamily('Regular'),
    includeFontPadding: false,
    textAlignVertical: 'center',
    flex: 1,
  },
});

export default KYC2;
