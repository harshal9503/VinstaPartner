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
  Alert,
} from 'react-native';
import DocumentPicker, { isCancel, types } from 'react-native-document-picker';
import { COLORS } from '../theme/colors';
import { getFontFamily } from '../utils/fontHelper';

const { width } = Dimensions.get('window');

const CatelogSetup = ({ navigation }: any) => {
  const [method, setMethod] = useState<'csv' | 'manual'>('manual');
  const [csvFile, setCsvFile] = useState<any>(null);
  const [showPicker, setShowPicker] = useState(false);

  const pickCSV = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [types.csv],
        copyTo: 'cachesDirectory',
      });
      setCsvFile(res);
    } catch (err) {
      if (!isCancel(err)) {
        Alert.alert('Error', 'Unable to pick CSV file');
      }
    } finally {
      setShowPicker(false);
    }
  };

  return (
    <View style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={require('../assets/back.png')}
            style={styles.backIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>CatLog setup</Text>
        <View style={{ width: 44 }} />
      </View>

      {/* Page Title */}
      <Text style={styles.pageTitle}>Catlog setup</Text>
      <Text style={styles.pageDesc}>
        Add your product for start selling
      </Text>

      {/* Method Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Choose setup method</Text>

        <View style={styles.methodsRow}>
          <TouchableOpacity
            style={[
              styles.methodBox,
              method === 'csv' && styles.methodActive,
            ]}
            onPress={() => setMethod('csv')}
          >
            <View style={styles.methodIconWrap}>
              <Image
                source={require('../assets/csv.png')}
                style={styles.methodIcon}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.methodTitle}>CSV Import</Text>
            <Text style={styles.methodDesc}>
              Upload csv file with product catalog
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.methodBox,
              method === 'manual' && styles.methodActive,
            ]}
            onPress={() => setMethod('manual')}
          >
            <View style={styles.methodIconWrap}>
              <Image
                source={require('../assets/mannual.png')}
                style={styles.methodIcon}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.methodTitle}>Manually</Text>
            <Text style={styles.methodDesc}>
              Upload csv file with product catalog
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* CSV Upload */}
      {method === 'csv' && (
        <TouchableOpacity
          style={styles.uploadBox}
          onPress={() => setShowPicker(true)}
          activeOpacity={0.85}
        >
          <View style={styles.uploadCircle}>
            <Image
              source={require('../assets/csv.png')}
              style={styles.uploadIcon}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.uploadText}>
            {csvFile ? csvFile.name : 'Select CSV file'}
          </Text>
        </TouchableOpacity>
      )}

      {/* Select Button */}
      <TouchableOpacity
        style={styles.selectBtn}
        onPress={() => navigation.navigate('Food1')}
      >
        <Text style={styles.selectText}>Select</Text>
      </TouchableOpacity>

      {/* Bottom Sheet */}
      <Modal transparent animationType="slide" visible={showPicker}>
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => setShowPicker(false)}
          />
          <View style={styles.modalContainer}>
            <View style={styles.modalHandle} />

            <Text style={styles.modalTitle}>Upload CSV file</Text>
            <Text style={styles.modalSubtitle}>
              Choose CSV file from your device
            </Text>

            <TouchableOpacity style={styles.modalOption} onPress={pickCSV}>
              <Text style={styles.modalOptionText}>Choose from device</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalCancel}
              onPress={() => setShowPicker(false)}
            >
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const commonText = {
  allowFontScaling: false,
  includeFontPadding: false,
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    paddingHorizontal: width * 0.06,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 70 : 55,
    marginBottom: 24,
  },

  backBtn: {
    width: 46,
    height: 46,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  backIcon: {
    width: 22,
    height: 22,
  },

  headerTitle: {
    ...commonText,
    fontSize: 18,
    fontFamily: getFontFamily('Bold'),
    color: COLORS.text,
  },

  pageTitle: {
    ...commonText,
    fontSize: 26,
    color: COLORS.primary,
    fontFamily: getFontFamily('Bold'),
    marginBottom: 6,
  },

  pageDesc: {
    ...commonText,
    fontSize: 15,
    color: COLORS.muted,
    fontFamily: getFontFamily('Regular'),
    marginBottom: 24,
  },

  card: {
    backgroundColor: '#FFF5EC',
    borderRadius: 18,
    padding: 18,
    marginBottom: 26,
  },

  cardTitle: {
    ...commonText,
    fontSize: 18,
    color: COLORS.primary,
    fontFamily: getFontFamily('Bold'),
    marginBottom: 16,
  },

  methodsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  methodBox: {
    width: '48%',
    backgroundColor: '#FFF0E2',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },

  methodActive: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    backgroundColor: '#FFF7EF',
  },

  methodIconWrap: {
    width: 44,
    height: 44,
    marginBottom: 10,
  },

  methodIcon: {
    width: '100%',
    height: '100%',
  },

  methodTitle: {
    ...commonText,
    fontSize: 16,
    fontFamily: getFontFamily('Medium'),
  },

  methodDesc: {
    ...commonText,
    fontSize: 13,
    color: COLORS.muted,
    textAlign: 'center',
    fontFamily: getFontFamily('Regular'),
  },

  uploadBox: {
    backgroundColor: '#F2F2F2',
    borderRadius: 18,
    alignItems: 'center',
    paddingVertical: 36,
    marginBottom: 30,
  },

  uploadCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#D9D9D9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },

  uploadIcon: {
    width: 40,
    height: 40,
  },

  uploadText: {
    ...commonText,
    fontSize: 15,
    color: COLORS.muted,
    fontFamily: getFontFamily('Medium'),
  },

  selectBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 18,
    borderRadius: 18,
    alignItems: 'center',
  },

  selectText: {
    ...commonText,
    fontSize: 18,
    color: COLORS.secondary,
    fontFamily: getFontFamily('Bold'),
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.35)',
  },

  modalContainer: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: width * 0.06,
    paddingTop: 18,
    paddingBottom: 24,
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

  modalTitle: {
    ...commonText,
    fontSize: 18,
    fontFamily: getFontFamily('SemiBold'),
    marginBottom: 4,
  },

  modalSubtitle: {
    ...commonText,
    fontSize: 14,
    color: COLORS.muted,
    fontFamily: getFontFamily('Regular'),
    marginBottom: 18,
  },

  modalOption: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingVertical: 14,
    marginBottom: 10,
  },

  modalOptionText: {
    ...commonText,
    fontSize: 16,
    textAlign: 'center',
    fontFamily: getFontFamily('Medium'),
  },

  modalCancel: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 14,
  },

  modalCancelText: {
    ...commonText,
    color: COLORS.secondary,
    fontSize: 16,
    textAlign: 'center',
    fontFamily: getFontFamily('SemiBold'),
  },
});

export default CatelogSetup;
