import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  TextInput,
  Modal,
  Pressable,
  ScrollView,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { COLORS } from '../theme/colors';
import { getFontFamily, getFontWeight } from '../utils/fontHelper';

const { width } = Dimensions.get('window');

/* dropdown data */
const cookingStyles = ['Fried', 'Grilled', 'Baked'];
const labelTags = ['Recommended', 'Popular', 'Chef Special'];
const addOns = ['Extra cheese', 'Extra spicy', 'No onion'];

const Food2 = ({ navigation }: any) => {
  const [sheet, setSheet] = useState<null | 'style' | 'tag' | 'addon'>(null);

  const [style, setStyle] = useState('Fried');
  const [tag, setTag] = useState('Recommended');
  const [addon, setAddon] = useState('Extra cheese');

  /* image picker */
  const [foodImage, setFoodImage] = useState<string | null>(null);
  const [pickerVisible, setPickerVisible] = useState(false);

  const handleImage = (res: any) => {
    if (!res || res.didCancel || res.errorCode) return;
    const asset = res.assets?.[0];
    if (asset?.uri) setFoodImage(asset.uri);
  };

  const takePhoto = async () => {
    const res = await launchCamera({ mediaType: 'photo', quality: 0.8 });
    handleImage(res);
    setPickerVisible(false);
  };

  const chooseGallery = async () => {
    const res = await launchImageLibrary({ mediaType: 'photo', quality: 0.8 });
    handleImage(res);
    setPickerVisible(false);
  };

  const renderSheet = (data: string[], onSelect: (v: string) => void) => (
    <Modal transparent animationType="slide" visible>
      <Pressable style={styles.overlay} onPress={() => setSheet(null)} />
      <View style={styles.bottomSheet}>
        {data.map(item => (
          <TouchableOpacity
            key={item}
            style={styles.optionRow}
            onPress={() => {
              onSelect(item);
              setSheet(null);
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
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={require('../assets/f2.png')}
            style={styles.progressImg}
          />
          <View style={styles.headerTextWrap}>
            <Text style={styles.headerTitle}>Food details</Text>
            <Text style={styles.headerSubTitle}>
              Next step pricing details
            </Text>
          </View>
        </View>

        <Text style={styles.pageTitle}>Food details</Text>
        <Text style={styles.pageDesc}>Register your food</Text>

        {/* Cooking style */}
        <Text style={styles.label}>Cooking & Preparation Style</Text>
        <TouchableOpacity
          style={styles.inputBox}
          onPress={() => setSheet('style')}
        >
          <Text style={styles.inputText}>{style}</Text>
          <Image source={require('../assets/dropdown.png')} style={styles.icon} />
        </TouchableOpacity>

        {/* Label tags */}
        <Text style={styles.label}>Label Tags</Text>
        <TouchableOpacity
          style={styles.inputBox}
          onPress={() => setSheet('tag')}
        >
          <Text style={styles.inputText}>{tag}</Text>
          <Image source={require('../assets/dropdown.png')} style={styles.icon} />
        </TouchableOpacity>

        {/* Add-ons */}
        <Text style={styles.label}>Add-ons & Customizations</Text>
        <TouchableOpacity
          style={styles.inputBox}
          onPress={() => setSheet('addon')}
        >
          <Text style={styles.inputText}>{addon}</Text>
          <Image source={require('../assets/dropdown.png')} style={styles.icon} />
        </TouchableOpacity>

        {/* Dietary */}
        <Text style={styles.sectionTitle}>Dietary Information (Optional)</Text>

        <Text style={styles.label}>Calories</Text>
        <TextInput style={styles.input} placeholder="55 kcal" />

        <Text style={styles.label}>Protein (g)</Text>
        <TextInput style={styles.input} placeholder="10 gm" />

        <Text style={styles.label}>Cholesterol (mg)</Text>
        <TextInput style={styles.input} placeholder="15 mg" />

        {/* Image upload */}
        <Text style={styles.label}>Food Image</Text>
        <TouchableOpacity
          style={styles.uploadBox}
          onPress={() => setPickerVisible(true)}
        >
          {foodImage ? (
            <Image source={{ uri: foodImage }} style={styles.foodImage} />
          ) : (
            <>
              <Text style={styles.uploadText}>Image</Text>
              <Image
                source={require('../assets/upload.png')}
                style={styles.uploadIcon}
              />
            </>
          )}
        </TouchableOpacity>

        {/* Buttons — SAME FLOW AS FOOD1 */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.nextBtn}
            onPress={() => navigation.navigate('Food3')}
          >
            <Text style={styles.nextText}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Dropdown sheets */}
      {sheet === 'style' && renderSheet(cookingStyles, setStyle)}
      {sheet === 'tag' && renderSheet(labelTags, setTag)}
      {sheet === 'addon' && renderSheet(addOns, setAddon)}

      {/* Image picker sheet */}
      <Modal transparent animationType="slide" visible={pickerVisible}>
        <View style={styles.modalOverlay}>
          <Pressable style={{ flex: 1 }} onPress={() => setPickerVisible(false)} />
          <View style={styles.modalContainer}>
            <View style={styles.modalHandle} />
            <TouchableOpacity style={styles.modalOption} onPress={takePhoto}>
              <Text style={styles.modalOptionText}>Take photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption} onPress={chooseGallery}>
              <Text style={styles.modalOptionText}>Choose from gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalCancel}
              onPress={() => setPickerVisible(false)}
            >
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Food2;

/* styles */
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },

  container: {
    paddingHorizontal: width * 0.06,
    paddingTop: Platform.OS === 'ios' ? 95 : 75,
    paddingBottom: 60,
  },

  header: {
    flexDirection: 'row',
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

  sectionTitle: {
    marginTop: 28,
    fontSize: 18,
    color: COLORS.primary,
    fontFamily: getFontFamily('Bold'),
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

  inputText: { fontSize: 15 },

  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    padding: 16,
    backgroundColor: COLORS.secondary,
  },

  icon: { width: 14, height: 14 },

  uploadBox: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  uploadText: { color: COLORS.muted },

  uploadIcon: { width: 20, height: 20, tintColor: COLORS.primary },

  foodImage: { width: '100%', height: 120, borderRadius: 12 },

  /* BUTTONS — SAME AS FOOD1 */
  buttonRow: {
    flexDirection: 'row',
    marginTop: 40,
  },

  backBtn: {
    flex: 1,
    marginRight: 12,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },

  backText: { color: COLORS.primary, fontSize: 16 },

  nextBtn: {
    flex: 1,
    marginLeft: 12,
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
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
  },

  optionRow: {
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.35)',
  },

  modalContainer: {
    backgroundColor: COLORS.secondary,
    padding: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },

  modalHandle: {
    width: 52,
    height: 5,
    borderRadius: 3,
    backgroundColor: COLORS.border,
    alignSelf: 'center',
    marginBottom: 12,
  },

  modalOption: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingVertical: 14,
    marginBottom: 10,
  },

  modalOptionText: { textAlign: 'center', fontSize: 16 },

  modalCancel: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 14,
  },

  modalCancelText: {
    color: COLORS.secondary,
    textAlign: 'center',
    fontSize: 16,
  },
});
