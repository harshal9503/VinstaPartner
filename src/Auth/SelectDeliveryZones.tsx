import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
  Platform,
  ScrollView,
} from 'react-native';
import { COLORS } from '../theme/colors';
import { getFontFamily, getFontWeight } from '../utils/fontHelper';

const { width } = Dimensions.get('window');

const zonesData = [
  {
    id: 0,
    title: 'Zone 0 (Radius 2 k.m.)',
    desc: 'Best for ultra-fast nearby deliveries',
  },
  {
    id: 1,
    title: 'Zone 1 (Radius 5 k.m.)',
    desc: 'Ideal for quick orders within 2–3 km',
  },
  {
    id: 2,
    title: 'Zone 2 (Radius 10 k.m.)',
    desc: 'Good for regular customer within 3–6 km',
  },
  {
    id: 3,
    title: 'Zone 3 (Radius 15 k.m.)',
    desc: 'Covers customers outside your zone 6–10 km',
  },
];

const SelectDeliveryZones = ({ navigation }: any) => {
  // ✅ No zone selected by default
  const [selectedZones, setSelectedZones] = useState<number[]>([]);

  const toggleZone = (id: number) => {
    setSelectedZones(prev =>
      prev.includes(id)
        ? prev.filter(z => z !== id)
        : [...prev, id],
    );
  };

  return (
    <View style={styles.root}>
      <ImageBackground
        source={require('../assets/mapbg.png')}
        style={styles.map}
        resizeMode="cover"
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <Image
              source={require('../assets/back.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Delivery Zones</Text>
          <View style={{ width: 46 }} />
        </View>

        {/* Radar */}
        <View style={styles.radarSection}>
          <Image
            source={require('../assets/radar.png')}
            style={styles.radar}
          />

          <View style={styles.centerInfo}>
            <Text style={styles.rangeText}>2–3 k.m.</Text>
            <Image
              source={require('../assets/location1.png')}
              style={styles.shopIcon}
            />
          </View>
        </View>

        {/* Bottom Container */}
        <View style={styles.bottomContainer}>
          <Text style={styles.bottomTitle}>Select Delivery Zones</Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            {zonesData.map(zone => {
              const checked = selectedZones.includes(zone.id);

              return (
                <TouchableOpacity
                  key={zone.id}
                  style={styles.zoneCard}
                  activeOpacity={0.85}
                  onPress={() => toggleZone(zone.id)}
                >
                  <Image
                    source={require('../assets/location1.png')}
                    style={styles.zoneIcon}
                  />

                  <View style={styles.zoneTextWrap}>
                    <Text style={styles.zoneTitle}>{zone.title}</Text>
                    <Text style={styles.zoneDesc}>{zone.desc}</Text>
                  </View>

                  <View style={styles.checkbox}>
                    {checked && (
                      <Image
                        source={require('../assets/tick.png')}
                        style={styles.tickIcon}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* ✅ Next always navigates */}
          <TouchableOpacity
            style={styles.nextBtn}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('DeliveryCharges')}
          >
            <Text style={styles.nextText}>Next</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1 },
  map: { flex: 1 },

  /* Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.05,
     paddingTop: Platform.OS === 'ios' ? 10 : 30,

  },

  backBtn: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  backIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },

  headerTitle: {
    fontSize: 18,
    color: COLORS.text,
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },

  /* Radar */
  radarSection: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },

  radar: {
    width: 260,
    height: 260,
    tintColor: COLORS.primary,
    resizeMode: 'contain',
  },

  centerInfo: {
    position: 'absolute',
    alignItems: 'center',
  },

  rangeText: {
    backgroundColor: COLORS.primary,
    color: COLORS.secondary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
    fontSize: 14,
    fontFamily: getFontFamily('Medium'),
    marginBottom: 8,
  },

  shopIcon: {
    width: 30,
    height: 30,
    tintColor: COLORS.primary,
    resizeMode: 'contain',
  },

  /* Bottom */
  bottomContainer: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    padding: 20,
  },

  bottomTitle: {
    fontSize: 18,
    color: COLORS.text,
    textAlign: 'center',
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
    marginBottom: 18,
  },

  zoneCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 14,
  },

  zoneIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginRight: 12,
  },

  zoneTextWrap: {
    flex: 1,
  },

  zoneTitle: {
    fontSize: 16,
    color: COLORS.text,
    fontFamily: getFontFamily('Medium'),
    fontWeight: getFontWeight('Medium'),
  },

  zoneDesc: {
    fontSize: 13,
    color: COLORS.muted,
    marginTop: 4,
    fontFamily: getFontFamily('Regular'),
  },

  /* Checkbox */
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.secondary,
  },

  tickIcon: {
    width: 16,
    height: 16,
    tintColor: COLORS.primary,
    resizeMode: 'contain',
  },

  /* Next */
  nextBtn: {
    marginTop: 10,
    backgroundColor: COLORS.primary,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
  },

  nextText: {
    fontSize: 18,
    color: COLORS.secondary,
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },
});

export default SelectDeliveryZones;
