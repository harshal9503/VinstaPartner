import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { getFontFamily } from '../../../utils/fontHelper';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../../theme/colors';


const UnderShipmentCard = ({ item }) => {
  const navigation = useNavigation<any>();

  return (
    <ScrollView
  showsVerticalScrollIndicator={false}
  contentContainerStyle={
    { 
      
    }
    }
>
    <View style={styles.card}>
      <View style={styles.row}>
        <Image source={item.image} style={styles.image} />

        <View style={styles.info}>
          <Text style={styles.orderId}>#{item.id}</Text>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.meta}>
            {item.date} · {item.items} Items
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.trackBtn}
        onPress={() =>
          navigation.navigate('TrackOrder', { order: item })
        }
      >
        <Text style={styles.trackText}>TRACK ORDER</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
};

export default UnderShipmentCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginHorizontal: 16,
    marginBottom: 14,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  image: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 12,
  },

  info: {
    flex: 1,
  },

  orderId: {
    fontSize: 12,
    color: COLORS.primary,
    fontFamily: getFontFamily('Medium'),
  },

  title: {
    fontSize: 15,
    fontFamily: getFontFamily('SemiBold'),
    color: '#111827',
    marginTop: 2,
  },

  meta: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },

  trackBtn: {
    marginTop: 12,
    alignSelf: 'flex-end',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 10,
  },

  trackText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: getFontFamily('SemiBold'),
  },
});
