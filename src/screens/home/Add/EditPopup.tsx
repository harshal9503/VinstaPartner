// EditPopup.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  Modal,
  Platform,
  StatusBar,
  FlatList,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { COLORS } from '../../../theme/colors';
import { getFontFamily, getFontWeight } from '../../../utils/fontHelper';

const { width, height } = Dimensions.get('window');

const H_PADDING = width * 0.05;
const RADIUS = 14;

interface Props {
  visible: boolean;
  onClose: () => void;
  onSave: () => void;
}

interface ImageItem {
  id: string;
  label: string;
  uri?: string;
}

interface DropdownItem {
  label: string;
  value: string;
}

const EditPopup: React.FC<Props> = ({ visible, onClose, onSave }) => {
  // State for dropdowns
  const [selectedValues, setSelectedValues] = useState<Record<string, string>>({
    'Food type': 'Vegetarian',
    'Regional cuisine': 'Italian',
    'Food category': 'Fast food',
    'Subcategory': 'Paneer Pizza',
    'Cooking Style': 'Fried',
    'Label': 'Bestseller',
    'Status': 'In-stock',
  });

  // State for dropdown visibility
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // State for uploaded images
  const [uploadedImages, setUploadedImages] = useState<ImageItem[]>([
    { id: '1', label: 'Main', uri: undefined },
    { id: '2', label: 'Middle', uri: undefined },
    { id: '3', label: 'Left', uri: undefined },
    { id: '4', label: 'Right', uri: undefined },
  ]);

  // State for image change popup
  const [imagePickerVisible, setImagePickerVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Static dropdown options
  const dropdownOptions: Record<string, DropdownItem[]> = {
    'Food type': [
      { label: 'Vegetarian', value: 'Vegetarian' },
      { label: 'Non-Vegetarian', value: 'Non-Vegetarian' },
      { label: 'Vegan', value: 'Vegan' },
    ],
    'Regional cuisine': [
      { label: 'Italian', value: 'Italian' },
      { label: 'Indian', value: 'Indian' },
      { label: 'Chinese', value: 'Chinese' },
      { label: 'Mexican', value: 'Mexican' },
      { label: 'Japanese', value: 'Japanese' },
    ],
    'Food category': [
      { label: 'Fast food', value: 'Fast food' },
      { label: 'Main Course', value: 'Main Course' },
      { label: 'Appetizer', value: 'Appetizer' },
      { label: 'Dessert', value: 'Dessert' },
      { label: 'Beverage', value: 'Beverage' },
    ],
    'Subcategory': [
      { label: 'Paneer Pizza', value: 'Paneer Pizza' },
      { label: 'Margherita', value: 'Margherita' },
      { label: 'Pepperoni', value: 'Pepperoni' },
      { label: 'Veg Supreme', value: 'Veg Supreme' },
    ],
    'Cooking Style': [
      { label: 'Fried', value: 'Fried' },
      { label: 'Grilled', value: 'Grilled' },
      { label: 'Baked', value: 'Baked' },
      { label: 'Steamed', value: 'Steamed' },
      { label: 'Raw', value: 'Raw' },
    ],
    'Label': [
      { label: 'Bestseller', value: 'Bestseller' },
      { label: 'New', value: 'New' },
      { label: 'Chef Special', value: 'Chef Special' },
      { label: 'Healthy', value: 'Healthy' },
    ],
    'Status': [
      { label: 'In-stock', value: 'In-stock' },
      { label: 'Out of stock', value: 'Out of stock' },
      { label: 'Coming soon', value: 'Coming soon' },
    ],
  };

  // Handle dropdown selection
  const handleSelectOption = (field: string, value: string) => {
    setSelectedValues(prev => ({ ...prev, [field]: value }));
    setActiveDropdown(null);
  };

  // Open image picker for specific image
  const openImagePicker = (index: number) => {
    setCurrentImageIndex(index);
    setImagePickerVisible(true);
  };

  // Close image picker
  const closeImagePicker = () => {
    setImagePickerVisible(false);
  };

  // Handle image response from camera or gallery
  const handleImageResponse = (response: any) => {
    if (!response) return;
    if (response.didCancel) {
      return;
    }
    if (response.errorCode) {
      console.log('ImagePicker Error: ', response.errorMessage);
      return;
    }

    const asset = response.assets && response.assets[0];
    if (asset?.uri) {
      const newImages = [...uploadedImages];
      newImages[currentImageIndex] = {
        ...newImages[currentImageIndex],
        uri: asset.uri,
      };
      setUploadedImages(newImages);
    }
    closeImagePicker();
  };

  // Handle take photo
  const handleTakePhoto = async () => {
    try {
      const result = await launchCamera({
        mediaType: 'photo',
        quality: 0.8,
        saveToPhotos: false,
      });
      handleImageResponse(result);
    } catch (error) {
      console.log('launchCamera error', error);
    }
  };

  // Handle choose from gallery
  const handleChooseFromLibrary = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
      });
      handleImageResponse(result);
    } catch (error) {
      console.log('launchImageLibrary error', error);
    }
  };

  // Render dropdown component
  const renderDropdown = (label: string, value: string) => {
    const isActive = activeDropdown === label;
    
    return (
      <View style={styles.field}>
        <Text style={styles.label}>{label}</Text>
        <TouchableOpacity
          style={styles.inputBox}
          onPress={() => setActiveDropdown(isActive ? null : label)}
        >
          <Text style={styles.inputText}>{value}</Text>
          <Image
            source={require('../../../assets/dropdown.png')}
            style={[styles.dropdownIcon, isActive && { transform: [{ rotate: '180deg' }] }]}
          />
        </TouchableOpacity>
        
        {/* Dropdown Options */}
        {isActive && (
          <View style={styles.dropdownOptions}>
            {dropdownOptions[label]?.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dropdownOption,
                  index === dropdownOptions[label].length - 1 && { borderBottomWidth: 0 }
                ]}
                onPress={() => handleSelectOption(label, option.value)}
              >
                <Text style={styles.dropdownOptionText}>{option.label}</Text>
                {value === option.value && (
                  <Image
                    source={require('../../../assets/tick.png')}
                    style={styles.tickIcon}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  };

  // Render input component
  const renderInput = (label: string, value: string) => (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputBox}>
        <Text style={styles.inputText}>{value}</Text>
      </View>
    </View>
  );

  // Render image slider item
  const renderImageItem = ({ item, index }: { item: ImageItem; index: number }) => (
    <TouchableOpacity 
      style={styles.imageBox}
      onPress={() => openImagePicker(index)}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        {item.uri ? (
          <Image source={{ uri: item.uri }} style={styles.uploadImage} />
        ) : (
          <Image
            source={require('../../../assets/pizza.png')}
            style={styles.uploadImage}
          />
        )}
        <View style={styles.imageOverlay}>
          <Text style={styles.imageLabel}>{item.label}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <Modal animationType="slide" transparent visible={visible}>
        <StatusBar backgroundColor="rgba(0,0,0,0.4)" />

        <View style={styles.overlay}>
          <View style={styles.container}>

            {/* ================= HEADER ================= */}
            <View style={styles.header}>
              <TouchableOpacity onPress={onClose} style={styles.backBtn}>
                <Image
                  source={require('../../../assets/back.png')}
                  style={styles.backIcon}
                />
              </TouchableOpacity>

              <Text style={styles.headerTitle}>Edit</Text>
              <View style={{ width: 24 }} />
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            >
              {/* ================= BASIC INFO ================= */}
              <Text style={styles.sectionTitle}>Basic information</Text>

              {renderDropdown('Food type', selectedValues['Food type'])}
              {renderDropdown('Regional cuisine', selectedValues['Regional cuisine'])}
              {renderDropdown('Food category', selectedValues['Food category'])}
              {renderDropdown('Subcategory', selectedValues['Subcategory'])}

              <View style={styles.row}>
                <View style={styles.half}>
                  {renderDropdown('Cooking Style', selectedValues['Cooking Style'])}
                </View>
                <View style={styles.half}>
                  {renderDropdown('Label', selectedValues['Label'])}
                </View>
              </View>

              {renderDropdown('Status', selectedValues['Status'])}

              {/* ================= ADDITIONAL DETAILS ================= */}
              <Text style={styles.sectionTitle}>Additional details</Text>

              <View style={styles.row}>
                <View style={styles.half}>
                  {renderInput('Calories', '55 kcal')}
                </View>
                <View style={styles.half}>
                  {renderInput('Protein (g)', '10 gm')}
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.half}>
                  {renderInput('Cholesterol (mg)', '15 mg')}
                </View>
                <View style={styles.half}>
                  {renderInput('Add-ons', 'Extra cheese')}
                </View>
              </View>

              {/* ================= UPLOADED IMAGES ================= */}
              <View style={styles.uploadHeader}>
                <Text style={styles.uploadTitle}>Uploaded images</Text>
                <TouchableOpacity onPress={() => openImagePicker(0)}>
                  <Text style={styles.changeText}>Change</Text>
                </TouchableOpacity>
              </View>

              {/* Image Slider */}
              <FlatList
                data={uploadedImages}
                renderItem={renderImageItem}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.imageSlider}
                snapToInterval={84} // width + margin
                decelerationRate="fast"
              />

              {/* Spacer for footer */}
              <View style={{ height: 120 }} />
            </ScrollView>

            {/* ================= FOOTER ================= */}
            <View style={styles.footer}>
              <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.saveBtn} onPress={onSave}>
                <Text style={styles.saveText}>Save changes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Image Picker Modal */}
      <Modal
        transparent
        animationType="slide"
        visible={imagePickerVisible}
        onRequestClose={closeImagePicker}
      >
        <View style={styles.imagePickerOverlay}>
          <TouchableOpacity
            style={styles.imagePickerOverlayTouchable}
            activeOpacity={1}
            onPress={closeImagePicker}
          />
          <View style={styles.imagePickerContainer}>
            <View style={styles.imagePickerHandle} />
            <Text style={styles.imagePickerTitle}>Change Image</Text>
            <Text style={styles.imagePickerSubtitle}>
              Choose how you want to upload your image.
            </Text>

            <TouchableOpacity
              style={styles.imagePickerOption}
              onPress={handleTakePhoto}
              activeOpacity={0.9}
            >
              <Text style={styles.imagePickerOptionText}>Take photo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.imagePickerOption}
              onPress={handleChooseFromLibrary}
              activeOpacity={0.9}
            >
              <Text style={styles.imagePickerOptionText}>Choose from Photos</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.imagePickerCancel}
              onPress={closeImagePicker}
              activeOpacity={0.9}
            >
              <Text style={styles.imagePickerCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },

  container: {
    backgroundColor: COLORS.secondary,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: height * 0.92,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: H_PADDING,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: '#EEE',
    justifyContent: 'space-between',
  },

  backBtn: { padding: 6 },
  backIcon: { width: 20, height: 20 },

  headerTitle: {
    fontSize: 18,
    fontFamily: getFontFamily('SemiBold'),
    fontWeight: getFontWeight('SemiBold'),
    color: COLORS.text,
  },

  scrollContent: {
    paddingHorizontal: H_PADDING,
  },

  sectionTitle: {
    fontSize: 16,
    fontFamily: getFontFamily('SemiBold'),
    fontWeight: getFontWeight('SemiBold'),
    color: COLORS.text,
    marginTop: 24,
    marginBottom: 16,
  },

  field: {
    marginBottom: 18,
    position: 'relative',
    zIndex: 1,
  },

  label: {
    fontSize: 14,
    fontFamily: getFontFamily('Medium'),
    fontWeight: getFontWeight('Medium'),
    color: COLORS.text,
    marginBottom: 6,
  },

  inputBox: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: RADIUS,
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
  },

  inputText: {
    fontSize: 14,
    fontFamily: getFontFamily('Regular'),
    fontWeight: getFontWeight('Regular'),
    color: '#666',
  },

  dropdownIcon: {
    width: 14,
    height: 14,
    tintColor: '#777',
  },

  dropdownOptions: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: RADIUS,
    marginTop: 4,
    zIndex: 1000,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  dropdownOption: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  dropdownOptionText: {
    fontSize: 14,
    fontFamily: getFontFamily('Regular'),
    fontWeight: getFontWeight('Regular'),
    color: '#666',
  },

  tickIcon: {
    width: 14,
    height: 14,
    tintColor: COLORS.primary,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  half: {
    width: '48%',
  },

  uploadHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 12,
  },

  uploadTitle: {
    fontSize: 14,
    fontFamily: getFontFamily('Medium'),
    fontWeight: getFontWeight('Medium'),
    color: COLORS.text,
  },

  changeText: {
    fontSize: 14,
    color: COLORS.primary,
    fontFamily: getFontFamily('Medium'),
    fontWeight: getFontWeight('Medium'),
  },

  imageSlider: {
    paddingVertical: 8,
  },

  imageBox: {
    marginRight: 12,
  },

  imageContainer: {
    position: 'relative',
  },

  uploadImage: {
    width: 72,
    height: 72,
    borderRadius: 12,
  },

  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    paddingVertical: 4,
    alignItems: 'center',
  },

  imageLabel: {
    fontSize: 12,
    color: '#FFF',
    fontFamily: getFontFamily('Medium'),
    fontWeight: getFontWeight('Medium'),
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    paddingHorizontal: H_PADDING,
    paddingVertical: Platform.OS === 'ios' ? 22 : 18,
    borderTopWidth: 1,
    borderColor: '#EEE',
    backgroundColor: COLORS.secondary,
  },

  cancelBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: RADIUS,
    paddingVertical: 14,
    alignItems: 'center',
    marginRight: 12,
  },

  cancelText: {
    fontSize: 15,
    fontFamily: getFontFamily('SemiBold'),
    fontWeight: getFontWeight('SemiBold'),
    color: '#666',
  },

  saveBtn: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS,
    paddingVertical: 14,
    alignItems: 'center',
  },

  saveText: {
    fontSize: 15,
    fontFamily: getFontFamily('SemiBold'),
    fontWeight: getFontWeight('SemiBold'),
    color: '#fff',
  },

  // Image Picker Styles
  imagePickerOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.35)',
  },

  imagePickerOverlayTouchable: {
    flex: 1,
  },

  imagePickerContainer: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: H_PADDING,
    paddingTop: 18,
    paddingBottom: Platform.OS === 'ios' ? 28 : 22,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },

  imagePickerHandle: {
    alignSelf: 'center',
    width: 52,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#E0E0E0',
    marginBottom: 12,
  },

  imagePickerTitle: {
    fontSize: 18,
    fontFamily: getFontFamily('SemiBold'),
    fontWeight: getFontWeight('SemiBold'),
    color: COLORS.text,
    marginBottom: 4,
  },

  imagePickerSubtitle: {
    fontSize: 14,
    fontFamily: getFontFamily('Regular'),
    fontWeight: getFontWeight('Regular'),
    color: '#666',
    marginBottom: 18,
  },

  imagePickerOption: {
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginBottom: 10,
  },

  imagePickerOptionText: {
    fontSize: 16,
    fontFamily: getFontFamily('Medium'),
    fontWeight: getFontWeight('Medium'),
    color: COLORS.text,
    textAlign: 'center',
  },

  imagePickerCancel: {
    marginTop: 4,
    borderRadius: 14,
    paddingVertical: 14,
    backgroundColor: COLORS.primary,
  },

  imagePickerCancelText: {
    fontSize: 16,
    fontFamily: getFontFamily('SemiBold'),
    fontWeight: getFontWeight('SemiBold'),
    color: '#fff',
    textAlign: 'center',
  },
});

export default EditPopup;