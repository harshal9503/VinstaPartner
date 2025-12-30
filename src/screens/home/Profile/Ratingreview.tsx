import React, { useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Platform,
  StatusBar,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../../theme/ThemeContext';
import { COLORS } from '../../../theme/colors';
import { getFontFamily, getFontWeight } from '../../../utils/fontHelper';

const { width } = Dimensions.get('window');
const rs = (size: number) => (width / 375) * size;

const HEADER_HEIGHT = rs(56);
const ANDROID_STATUS_BAR = StatusBar.currentHeight ?? 0;

const RatingsReviews = () => {
  const { theme, colors } = useContext(ThemeContext);
  const navigation = useNavigation<any>();

  const reviewsData = [
    {
      name: 'Amit Sharma',
      rating: 5,
      review: 'Amazing food quality and fast delivery!',
    },
    {
      name: 'Neha Verma',
      rating: 4,
      review: 'Taste was good but packaging can improve.',
    },
    {
      name: 'Rahul Singh',
      rating: 3,
      review: 'Delivery was slightly delayed.',
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar
        translucent={Platform.OS === 'android'}
        backgroundColor="transparent"
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
      />

      {/* ---------- HEADER ---------- */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.background,
            paddingTop: Platform.OS === 'android' ? ANDROID_STATUS_BAR : rs(44),
            height:
              HEADER_HEIGHT +
              (Platform.OS === 'android' ? ANDROID_STATUS_BAR : rs(44)),
          },
        ]}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../../assets/back.png')}
            style={[styles.backIcon, { tintColor: colors.text }]}
          />
        </TouchableOpacity>

        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Ratings & Reviews
        </Text>

        <View style={{ width: rs(22) }} />
      </View>

      {/* ---------- CONTENT ---------- */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ---------- AVERAGE RATING ---------- */}
        <View
          style={[
            styles.summaryCard,
            {
              backgroundColor: theme === 'dark' ? '#1E1E1E' : '#fff',
            },
          ]}
        >
          <Text style={styles.avgRating}>4.3 ⭐</Text>
          <Text style={[styles.totalReviews, { color: colors.text }]}>
            Based on 128 customer ratings
          </Text>
        </View>

        {/* ---------- REVIEWS LIST ---------- */}
        {reviewsData.map((item, index) => (
          <View
            key={index}
            style={[
              styles.reviewCard,
              {
                backgroundColor: theme === 'dark' ? '#1E1E1E' : '#fff',
              },
            ]}
          >
            <View style={styles.reviewHeader}>
              <Text style={[styles.customerName, { color: colors.text }]}>
                {item.name}
              </Text>
              <Text style={styles.rating}>{item.rating} ⭐</Text>
            </View>

            <Text style={[styles.reviewText, { color: colors.text }]}>
              {item.review}
            </Text>

            <TouchableOpacity style={styles.replyBtn}>
              <Text style={styles.replyText}>Reply</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default RatingsReviews;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: rs(16),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  backIcon: {
    width: rs(22),
    height: rs(22),
    resizeMode: 'contain',
  },

  headerTitle: {
    fontSize: rs(18),
    fontFamily: getFontFamily('Poppins', 'SemiBold'),
    fontWeight: getFontWeight('600'),
  },

  scrollContent: {
    padding: rs(16),
    paddingBottom: rs(40),
  },

  /* ---------- SUMMARY ---------- */
  summaryCard: {
    padding: rs(20),
    borderRadius: rs(12),
    alignItems: 'center',
    marginBottom: rs(12),
  },

  avgRating: {
    fontSize: rs(32),
    color: COLORS.primary,
    fontFamily: getFontFamily('Poppins', 'Bold'),
    fontWeight: getFontWeight('700'),
  },

  totalReviews: {
    marginTop: rs(6),
    fontSize: rs(14),
    fontFamily: getFontFamily('Poppins', 'Medium'),
    fontWeight: getFontWeight('500'),
  },

  /* ---------- REVIEW CARD ---------- */
  reviewCard: {
    padding: rs(16),
    borderRadius: rs(12),
    marginBottom: rs(12),
  },

  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: rs(8),
  },

  customerName: {
    fontSize: rs(15),
    fontFamily: getFontFamily('Poppins', 'SemiBold'),
    fontWeight: getFontWeight('600'),
  },

  rating: {
    fontSize: rs(14),
    color: COLORS.primary,
    fontFamily: getFontFamily('Poppins', 'Medium'),
    fontWeight: getFontWeight('500'),
  },

  reviewText: {
    fontSize: rs(14),
    marginBottom: rs(12),
    fontFamily: getFontFamily('Poppins', 'Regular'),
  },

  replyBtn: {
    alignSelf: 'flex-end',
    paddingHorizontal: rs(14),
    paddingVertical: rs(6),
    borderRadius: rs(20),
    backgroundColor: COLORS.primary,
  },

  replyText: {
    color:'white',
    fontSize: rs(13),
    fontFamily: getFontFamily('Poppins', 'Medium'),
    fontWeight: getFontWeight('500'),
  },
});
