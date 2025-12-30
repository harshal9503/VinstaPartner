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
  StatusBar,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { COLORS } from '../theme/colors';
import { getFontFamily, getFontWeight } from '../utils/fontHelper';

const { width } = Dimensions.get('window');
const CIRCLE_SIZE = 54;

const KYC1 = ({ navigation }: any) => {
  const [pan, setPan] = useState('');
  const [aadhaar, setAadhaar] = useState('');
  const [shopImage, setShopImage] = useState<string | null>(null);
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  const openPicker = () => {
    setIsPickerVisible(true);
  };

  const closePicker = () => {
    setIsPickerVisible(false);
  };

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
      setShopImage(asset.uri);
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
      closePicker();
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
      closePicker();
    }
  };

  const removeShopImage = () => {
    setShopImage(null);
  };

  const onContinue = () => {
    // If you want validation, add it here before navigating.
    // Example: if (!pan || !aadhaar || !shopImage) return;
    navigation.navigate('KYC2'); // <-- change to your next screen name
  };

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          {/* Progress Image */}
          <View style={styles.progressWrapper}>
            <Image
              source={require('../assets/kyc1.png')}
              style={styles.progressImage}
              resizeMode="contain"
            />
          </View>

          <View style={styles.headerTextWrap}>
            <Text style={styles.headerTitle}>KYC Upload</Text>
            <Text style={styles.headerSubTitle}>
              Next step business details
            </Text>
          </View>
        </View>

        {/* Section */}
        <Text style={styles.sectionTitle}>KYC Upload</Text>
        <Text style={styles.sectionDesc}>
         Next step business details
        </Text>

        {/* PAN */}
        <Text style={styles.label}>Pan Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter pan number"
          placeholderTextColor={COLORS.placeholder}
          value={pan}
          onChangeText={setPan}
          autoCapitalize="characters"
        />

        {/* Aadhaar */}
        <Text style={styles.label}>Aadhaar Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter aadhar number"
          placeholderTextColor={COLORS.placeholder}
          keyboardType="number-pad"
          value={aadhaar}
          onChangeText={setAadhaar}
          maxLength={12}
        />

        {/* Upload */}
        <Text style={styles.label}>Upload shop image</Text>
        <TouchableOpacity
          style={styles.uploadBox}
          activeOpacity={0.8}
          onPress={openPicker}
        >
          {shopImage ? (
            <>
              <Image
                source={{ uri: shopImage }}
                style={styles.shopImage}
                resizeMode="cover"
              />
              <TouchableOpacity
                style={styles.closeIconContainer}
                onPress={removeShopImage}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Text style={styles.closeIconText}>✕</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <View style={styles.uploadIconContainer}>
                <Image
                  source={require('../assets/upload.png')}
                  style={styles.uploadIcon}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.uploadText}>Upload Img.</Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>

      {/* Continue */}
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.85}
        onPress={onContinue}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

      {/* Bottom Popup */}
      <Modal
        transparent
        animationType="slide"
        visible={isPickerVisible}
        onRequestClose={closePicker}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalOverlayTouchable}
            activeOpacity={1}
            onPress={closePicker}
          />
          <View style={styles.modalContainer}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Upload shop image</Text>
            <Text style={styles.modalSubtitle}>
              Choose how you want to upload your shop image.
            </Text>

            <TouchableOpacity
              style={styles.modalOption}
              onPress={handleTakePhoto}
              activeOpacity={0.9}
            >
              <Text style={styles.modalOptionText}>Take photo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalOption}
              onPress={handleChooseFromLibrary}
              activeOpacity={0.9}
            >
              <Text style={styles.modalOptionText}>Choose from Photos</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalCancel}
              onPress={closePicker}
              activeOpacity={0.9}
            >
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  paddingTop: Platform.OS === 'ios' ? 10 : 30,

   // paddingBottom: 130,
  },

  /* Header */
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 34,
    paddingRight: width * 0.06,
  },

  progressWrapper: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  progressImage: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
  },

  headerTextWrap: {
    flex: 1,
    alignItems: 'flex-end',
  },

  headerTitle: {
    fontSize: 20,
    color: COLORS.text,
    fontFamily: getFontFamily('SemiBold'),
    fontWeight: getFontWeight('SemiBold'),
    textAlign: 'right',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },

  headerSubTitle: {
    fontSize: 15,
    color: COLORS.muted,
    marginTop: 4,
    fontFamily: getFontFamily('Regular'),
    fontWeight: getFontWeight('Regular'),
    textAlign: 'right',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },

  /* Section */
  sectionTitle: {
    fontSize: 22,
    color: COLORS.primary,
    marginBottom: 8,
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },

  sectionDesc: {
    fontSize: 16,
    color: COLORS.muted,
    marginBottom: 26,
    fontFamily: getFontFamily('Regular'),
    fontWeight: getFontWeight('Consistent'),
  },

  label: {
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 8,
    marginTop: 18,
    fontFamily: getFontFamily('Medium'),
    fontWeight: getFontWeight('Medium'),
  },

  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 18,
    fontSize: 16,
    color: COLORS.text,
    backgroundColor: COLORS.secondary,
    fontFamily: getFontFamily('Regular'),
    fontWeight: getFontWeight('Regular'),
  },

  /* Upload */
  uploadBox: {
    width: 140,
    height: 140,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    overflow: 'hidden',
  },

  uploadIconContainer: {
    width: 54,
    height: 54,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },

  uploadIcon: {
    width: 26,
    height: 26,
    tintColor: COLORS.secondary,
  },

  uploadText: {
    fontSize: 14,
    color: COLORS.muted,
    fontFamily: getFontFamily('Medium'),
    fontWeight: getFontWeight('Medium'),
  },

  shopImage: {
    width: '100%',
    height: '100%',
  },

  closeIconContainer: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  closeIconText: {
    color: COLORS.secondary,
    fontSize: 13,
    fontWeight: '600',
  },

  /* Button */
  button: {
    position: 'absolute',
    bottom: 24,
    left: width * 0.06,
    right: width * 0.06,
    backgroundColor: COLORS.primary,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 6,
  },

  buttonText: {
    fontSize: 18,
    color: COLORS.secondary,
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },

  /* Modal / Bottom Sheet */
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.35)',
  },

  modalOverlayTouchable: {
    flex: 1,
  },

  modalContainer: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: width * 0.06,
    paddingTop: 18,
    paddingBottom: Platform.OS === 'ios' ? 28 : 22,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },

  modalHandle: {
    alignSelf: 'center',
    width: 52,
    height: 5,
    borderRadius: 3,
    backgroundColor: COLORS.border,
    marginBottom: 12,
  },

  modalTitle: {
    fontSize: 18,
    color: COLORS.text,
    fontFamily: getFontFamily('SemiBold'),
    fontWeight: getFontWeight('SemiBold'),
    marginBottom: 4,
  },

  modalSubtitle: {
    fontSize: 14,
    color: COLORS.muted,
    fontFamily: getFontFamily('Regular'),
    fontWeight: getFontWeight('Regular'),
    marginBottom: 18,
  },

  modalOption: {
    backgroundColor: COLORS.secondary,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginBottom: 10,
  },

  modalOptionText: {
    fontSize: 16,
    color: COLORS.text,
    fontFamily: getFontFamily('Medium'),
    fontWeight: getFontWeight('Medium'),
    textAlign: 'center',
  },

  modalCancel: {
    marginTop: 4,
    borderRadius: 14,
    paddingVertical: 14,
    backgroundColor: COLORS.primary,
  },

  modalCancelText: {
    fontSize: 16,
    color: COLORS.secondary,
    fontFamily: getFontFamily('SemiBold'),
    fontWeight: getFontWeight('SemiBold'),
    textAlign: 'center',
  },
});

export default KYC1;
