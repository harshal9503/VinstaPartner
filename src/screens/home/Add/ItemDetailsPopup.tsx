// ItemDetailsPopup.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Modal,
  StatusBar,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { COLORS } from '../../../theme/colors';
import { getFontFamily } from '../../../utils/fontHelper';

const { width } = Dimensions.get('window');
const PADDING = width * 0.05;

interface ItemDetailsPopupProps {
  visible: boolean;
  onClose: () => void;
  onEdit: () => void;
  onPrint?: () => void;
  item?: any;
}

const ItemDetailsPopup: React.FC<ItemDetailsPopupProps> = ({ visible, onClose, onEdit, onPrint, item }) => {
  const [activeImageTab, setActiveImageTab] = useState('Main');
  const [isImagePickerVisible, setIsImagePickerVisible] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<{[key: string]: string | null}>({
    Main: require('../../../assets/pizza.png'),
    Middle: require('../../../assets/pizza.png'),
    Left: require('../../../assets/pizza.png'),
    Right: require('../../../assets/pizza.png'),
  });

  // Get status color based on item status
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'In-stock': return { backgroundColor: '#DFF6DD', dotColor: '#28A745', textColor: '#28A745' };
      case 'Out of stock': return { backgroundColor: '#FFE2E2', dotColor: '#E53935', textColor: '#E53935' };
      default: return { backgroundColor: '#DFF6DD', dotColor: '#28A745', textColor: '#28A745' };
    }
  };

  const statusColors = item ? getStatusColor(item.status) : getStatusColor('In-stock');

  const handleImageResponse = (response: any) => {
    if (!response) return;
    if (response.didCancel) return;
    if (response.errorCode) {
      console.log('ImagePicker Error: ', response.errorMessage);
      return;
    }

    const asset = response.assets && response.assets[0];
    if (asset?.uri) {
      setUploadedImages(prev => ({
        ...prev,
        [activeImageTab]: asset.uri
      }));
    }
  };

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
    } finally {
      setIsImagePickerVisible(false);
    }
  };

  const handleChooseFromLibrary = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
      });
      handleImageResponse(result);
    } catch (error) {
      console.log('launchImageLibrary error', error);
    } finally {
      setIsImagePickerVisible(false);
    }
  };

  const InfoRow = ({ label, value, isDiscount = false }: { label: string; value: string; isDiscount?: boolean }) => (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={[styles.infoValue, isDiscount && styles.discountValue]}>{value}</Text>
    </View>
  );

  const renderImageThumbs = () => (
    <View style={styles.imagesRow}>
      {['Main', 'Middle', 'Left', 'Right'].map((label, i) => (
        <View
          key={i}
          style={styles.imageBox}
        >
          <Image
            source={
              uploadedImages[label] && typeof uploadedImages[label] === 'string'
                ? { uri: uploadedImages[label] as string }
                : uploadedImages[label] || require('../../../assets/pizza.png')
            }
            style={styles.thumb}
          />
          <Text style={styles.thumbLabel}>
            {label}
          </Text>
        </View>
      ))}
    </View>
  );

  const handlePrint = () => {
    if (onPrint) {
      onPrint();
    } else {
      console.log('Print label for:', item);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.secondary} />
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.backBtn}>
              <Image source={require('../../../assets/back.png')} style={styles.backIcon} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Item Details</Text>
            <View style={{ width: 24 }} />
          </View>

          <ScrollView 
            showsVerticalScrollIndicator={false} 
            style={styles.scrollView}
            contentContainerStyle={{ paddingBottom: 140 }}
          >
            {/* ITEM TOP CARD */}
            <View style={styles.topCard}>
              <TouchableOpacity
                onPress={() => setIsImagePickerVisible(true)}
              >
                <Image
                  source={
                    uploadedImages['Main'] && typeof uploadedImages['Main'] === 'string'
                      ? { uri: uploadedImages['Main'] as string }
                      : uploadedImages['Main']
                  }
                  style={styles.itemImage}
                />
              </TouchableOpacity>

              <View style={{ flex: 1, marginLeft: 14 }}>
                <View style={styles.statusRow}>
                  <View style={[styles.statusBadge, { backgroundColor: statusColors.backgroundColor }]}>
                    <View style={[styles.dot, { backgroundColor: statusColors.dotColor }]} />
                    <Text style={[styles.statusText, { color: statusColors.textColor }]}>
                      {item?.status || 'In-stock'}
                    </Text>
                  </View>
                  <Text style={styles.price}>{item?.price || '₹120'}</Text>
                </View>

                <Text style={styles.itemName}>{item?.name || 'Spicy paneer burger'}</Text>
                <Text style={styles.itemTag}>{item?.tag || 'Bestseller'}</Text>
                
              </View>
            </View>

            {/* BASIC INFO */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Basic information</Text>
              <InfoRow label="Name" value={item?.name || 'Spicy paneer burger'} />
              <InfoRow label="SKU" value={item?.sku || 'SKU: FOD-SPB-01'} />
              <InfoRow label="Category" value="Fast food" />
              <InfoRow label="Regional cuisine" value="Italian" />
              <InfoRow label="Subcategory" value="Paneer Pizza" />
            </View>

            {/* ADDITIONAL DETAILS */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Additional details</Text>
              <InfoRow label="Cooking Style" value="Fried" />
              <InfoRow label="Label" value={item?.tag || 'Bestseller'} />
              <InfoRow label="Calories" value="55 kcal" />
              <InfoRow label="Protein (g)" value="10 gm" />
              <InfoRow label="Cholesterol (mg)" value="15 mg" />
            </View>

            {/* PRICING DETAILS */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Pricing details</Text>
              <InfoRow label="MRP" value={item?.price || '₹150'} />
              <InfoRow label="Discount" value="20% off" isDiscount={true} />
              <InfoRow label="Tax Rate" value="18%" />
            </View>

            {/* UPLOADED IMAGES */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Uploaded images</Text>
              {renderImageThumbs()}
            </View>
          </ScrollView>

          {/* Action Buttons */}
          <View style={styles.footer}>
            <TouchableOpacity 
              style={styles.editBtn}
              onPress={onEdit}
            >
              <Image source={require('../../../assets/edit.png')} style={styles.btnIcon} />
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.printBtn} onPress={handlePrint}>
              <Image source={require('../../../assets/print.png')} style={[styles.btnIcon, { tintColor: '#fff' }]} />
              <Text style={styles.printText}>Print Label</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Image Picker Modal */}
      <Modal
        transparent
        animationType="slide"
        visible={isImagePickerVisible}
        onRequestClose={() => setIsImagePickerVisible(false)}
      >
        <View style={styles.imagePickerOverlay}>
          <TouchableOpacity
            style={styles.imagePickerOverlayTouchable}
            activeOpacity={1}
            onPress={() => setIsImagePickerVisible(false)}
          />
          <View style={styles.imagePickerContainer}>
            <View style={styles.imagePickerHandle} />
            <Text style={styles.imagePickerTitle}>Upload image</Text>
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
              onPress={() => setIsImagePickerVisible(false)}
              activeOpacity={0.9}
            >
              <Text style={styles.imagePickerCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Modal>
  );
};

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.secondary,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
    minHeight: '85%',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: PADDING,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  backBtn: { 
    padding: 6 
  },
  backIcon: { 
    width: 20, 
    height: 20 
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontFamily: getFontFamily('SemiBold'),
    color: COLORS.text,
  },
  topCard: {
    flexDirection: 'row',
    margin: PADDING,
    padding: 16,
    backgroundColor: '#FFF',
    borderRadius: 16,
  },
  itemImage: {
    width: 72,
    height: 72,
    borderRadius: 14,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
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
  },
  price: {
    fontSize: 16,
    fontFamily: getFontFamily('SemiBold'),
    color: COLORS.text,
  },
  itemName: {
    fontSize: 16,
    fontFamily: getFontFamily('SemiBold'),
    color: COLORS.text,
    marginTop: 6,
  },
  itemTag: {
    fontSize: 13,
    fontFamily: getFontFamily('Medium'),
    color: COLORS.primary,
    marginTop: 2,
  },
  discountText: {
    fontSize: 13,
    fontFamily: getFontFamily('SemiBold'),
    color: '#28A745', // Green color for 20% Off
    marginTop: 2,
  },
  card: {
    backgroundColor: '#FFF',
    marginHorizontal: PADDING,
    marginBottom: 16,
    padding: 16,
    borderRadius: 16,
  },
  cardTitle: {
    fontSize: 15,
    fontFamily: getFontFamily('SemiBold'),
    color: COLORS.text,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 13,
    color: '#888',
    fontFamily: getFontFamily('Regular'),
  },
  infoValue: {
    fontSize: 13,
    fontFamily: getFontFamily('SemiBold'),
    color: COLORS.text,
  },
  discountValue: {
    color: '#28A745', // Green color for discount value
  },
  imagesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageBox: {
    alignItems: 'center',
    padding: 8,
  },
  thumb: {
    width: 64,
    height: 64,
    borderRadius: 14,
  },
  thumbLabel: {
    fontSize: 12,
    marginTop: 6,
    color: '#666',
    fontFamily: getFontFamily('Regular'),
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    paddingHorizontal: PADDING,
    paddingVertical: 20,
    backgroundColor: COLORS.secondary,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  editBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginRight: 12,
    backgroundColor: '#fff',
  },
  editText: {
    marginLeft: 6,
    fontSize: 15,
    fontFamily: getFontFamily('SemiBold'),
    color: COLORS.text,
  },
  printBtn: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  printText: {
    marginLeft: 6,
    fontSize: 15,
    fontFamily: getFontFamily('SemiBold'),
    color: '#FFF',
  },
  btnIcon: {
    width: 16,
    height: 16,
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
    paddingHorizontal: width * 0.06,
    paddingTop: 18,
    paddingBottom: 28,
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
    color: COLORS.text,
    fontFamily: getFontFamily('SemiBold'),
    marginBottom: 4,
  },
  imagePickerSubtitle: {
    fontSize: 14,
    color: '#666',
    fontFamily: getFontFamily('Regular'),
    marginBottom: 18,
  },
  imagePickerOption: {
    backgroundColor: COLORS.secondary,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  imagePickerOptionText: {
    fontSize: 16,
    color: COLORS.text,
    fontFamily: getFontFamily('Medium'),
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
    color: COLORS.secondary,
    fontFamily: getFontFamily('SemiBold'),
    textAlign: 'center',
  },
});

export default ItemDetailsPopup;
