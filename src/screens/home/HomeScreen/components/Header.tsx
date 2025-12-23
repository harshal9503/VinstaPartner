import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { COLORS } from '../../../../theme/colors';
import { getFontFamily } from '../../../../utils/fontHelper';
import { Platform, StatusBar } from 'react-native';




export default function Header() {
  return (
    <View style={styles.header}>
      <View>
        <View style={styles.locationRow}>
          <Text style={styles.locationLabel}>Location</Text>
          <Image
            source={require('../../../../assets/dropdown.png')}
            style={styles.dropdownIcon}
          />
        </View>
        <Text style={styles.locationValue}>4102 Pretty View Lane</Text>
      </View>

      <View style={styles.userRow}>
        <View style={styles.userInfo}>
          <Text style={styles.greeting}>Hey Good Morning</Text>
          <Text style={styles.userName}>Ronak Sharma</Text>
        </View>
        <Image
          source={require('../../../../assets/user1.png')}
          style={styles.avatar}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 24,
   paddingTop: Platform.OS === 'ios'
  ? 10
  : (StatusBar.currentHeight || 0) * 0.4,

    paddingBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: COLORS.secondary || '#F8F9FA',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  locationLabel: {
    fontSize: 12,
    color: COLORS.muted || '#6B7280',
    fontFamily: getFontFamily('Regular'),
  },
  dropdownIcon: {
    width: 8,
    height: 7,
    marginLeft: 6,
    tintColor: COLORS.muted || '#6B7280',
  },
  locationValue: {
    fontSize: 14,
    fontFamily: getFontFamily('SemiBold'),
    color: COLORS.text || '#111827',
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  userInfo: {
    alignItems: 'flex-end',
    marginTop: 2,
  },
  greeting: {
    fontSize: 11,
    color: COLORS.muted || '#6B7280',
    fontFamily: getFontFamily('Regular'),
    marginBottom: 2,
  },
  userName: {
    fontSize: 13,
    fontFamily: getFontFamily('SemiBold'),
    color: COLORS.text || '#111827',
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    marginLeft: 8,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: '#E5E7EB',
  },
});
