// ViewDetails.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../../theme/colors';
import { getFontFamily } from '../../../utils/fontHelper';

const { width } = Dimensions.get('window');
const PADDING = width * 0.05;

const ViewDetails = () => {
  const navigation = useNavigation();

  const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.secondary} />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Image source={require('../../../assets/back.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Item Details</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>

        {/* ITEM TOP CARD */}
        <View style={styles.topCard}>
          <Image
            source={require('../../../assets/pizza.png')}
            style={styles.itemImage}
          />

          <View style={{ flex: 1, marginLeft: 14 }}>
            <View style={styles.statusRow}>
              <View style={styles.statusBadge}>
                <View style={styles.dot} />
                <Text style={styles.statusText}>In-stock</Text>
              </View>
              <Text style={styles.price}>₹120</Text>
            </View>

            <Text style={styles.itemName}>Spicy paneer burger</Text>
            <Text style={styles.itemTag}>Bestseller</Text>
          </View>
        </View>

        {/* BASIC INFO */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Basic information</Text>
          <InfoRow label="Name" value="Spicy paneer burger" />
          <InfoRow label="SKU" value="SKU: FOD-SPB-01" />
          <InfoRow label="Category" value="Fast food" />
          <InfoRow label="Regional cuisine" value="Italian" />
          <InfoRow label="Subcategory" value="Paneer Pizza" />
        </View>

        {/* ADDITIONAL DETAILS */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Additional details</Text>
          <InfoRow label="Cooking Style" value="Fried" />
          <InfoRow label="Label" value="Bestseller" />
          <InfoRow label="Calories" value="55 kcal" />
          <InfoRow label="Protein (g)" value="10 gm" />
          <InfoRow label="Cholesterol (mg)" value="15 mg" />
        </View>

        {/* PRICING DETAILS */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Pricing details</Text>
          <InfoRow label="MRP" value="₹150" />
          <InfoRow label="Discount" value="20% off" />
          <InfoRow label="Tax Rate" value="18%" />
        </View>

        {/* UPLOADED IMAGES */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Uploaded images</Text>

          <View style={styles.imagesRow}>
            {['Main', 'Middle', 'Left', 'Right'].map((label, i) => (
              <View key={i} style={styles.imageBox}>
                <Image
                  source={require('../../../assets/pizza.png')}
                  style={styles.thumb}
                />
                <Text style={styles.thumbLabel}>{label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* BUTTONS */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.editBtn}>
            <Image
              source={require('../../../assets/edit.png')}
              style={styles.btnIcon}
            />
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.printBtn}>
            <Image
              source={require('../../../assets/print.png')}
              style={[styles.btnIcon, { tintColor: '#fff' }]}
            />
            <Text style={styles.printText}>Print Label</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewDetails;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: PADDING,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#EEE',
  },
  backBtn: { padding: 6 },
  backIcon: { width: 20, height: 20 },
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
    backgroundColor: '#DFF6DD',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#28A745',
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontFamily: getFontFamily('Medium'),
    color: '#28A745',
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

  imagesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageBox: {
    alignItems: 'center',
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
    flexDirection: 'row',
    marginHorizontal: PADDING,
    marginTop: 20,
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
});
