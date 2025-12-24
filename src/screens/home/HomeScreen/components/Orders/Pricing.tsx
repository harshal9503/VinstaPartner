import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { COLORS } from '../../../../../theme/colors';
import { getFontFamily } from '../../../../../utils/fontHelper';

/* ---------- MOCK DATA ---------- */
const days = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
const weeklyOrders = [120, 180, 220, 500, 280, 150, 210];
const avgMarginData = [3, 5, 8, 7, 6, 9, 8, 5, 6];
const activePromosData = [4, 6, 5, 7, 8, 6, 9, 8, 7];

/* ---------- MINI WAVE GRAPH FOR STAT BOX ---------- */
interface StatBoxSparklineProps {
  data: number[];
  color: string;
}

function StatBoxSparkline({ data, color }: StatBoxSparklineProps) {
  const width = 160;
  const height = 70;
  
  const areaPath = 'M0 45 C20 20, 40 30, 60 25 C80 20, 100 35, 120 28 C140 22, 150 35, 160 45 L160 70 L0 70 Z';
  const linePath = 'M0 45 C20 20, 40 30, 60 25 C80 20, 100 35, 120 28 C140 22, 150 35, 160 45';

  return (
    <View style={styles.sparkWrap}>
      <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <Defs>
          <LinearGradient id="fadeStat" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor={color} stopOpacity="0.25" />
            <Stop offset="100%" stopColor={color} stopOpacity="0" />
          </LinearGradient>
        </Defs>
        <Path d={areaPath} fill="url(#fadeStat)" />
        <Path
          d={linePath}
          stroke={color}
          strokeWidth={4}
          fill="none"
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
}

/* ---------- WEEKLY ORDERS BIG CARD (MATCHING MONTHLY EARNINGS SIZE/STYLE) ---------- */
function WeeklyOrdersCard() {
  const maxOrders = Math.max(...weeklyOrders);

  return (
    <View style={styles.weeklyCard}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.cardTitle}>Total orders this week</Text>
          <Text style={styles.cardDate}>Thursday, Nov 4, 2024</Text>
        </View>
        <Image
          source={require('../../../../../assets/dots.png')}
          style={styles.dots}
        />
      </View>

      <View style={styles.graphContainer}>
        <View style={styles.yAxis}>
          {[0, 100, 200, 300, 400, 500].map((value) => (
            <Text key={value} style={styles.yAxisText}>
              {value === 0 ? '0' : `${value}`}
            </Text>
          ))}
        </View>

        <View style={styles.barsContainer}>
          {/* Grid lines */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <View
              key={`line-${i}`}
              style={[styles.gridLine, { top: `${(i / 5) * 100}%` }]}
            />
          ))}

          {/* Bars */}
          {weeklyOrders.map((value, index) => {
            const percentage = (value / maxOrders) * 100;
            return (
              <View key={index} style={styles.barColumn}>
                <View
                  style={[
                    styles.bar,
                    {
                      height: `${percentage}%`,
                      backgroundColor: '#E5752F',
                    },
                  ]}
                />
                <Text style={styles.dayLabel}>{days[index]}</Text>
              </View>
            );
          })}
        </View>
      </View>

     
    </View>
  );
}

/* ---------- STAT BOX COMPONENT ---------- */
interface StatBoxProps {
  title: string;
  value: string | number;
  percent: string;
  data: number[];
  color: string;
  trend: 'up' | 'down';
}

function StatBox({
  title,
  value,
  percent,
  data,
  color,
  trend,
}: StatBoxProps) {
  const isUp = trend === 'up';

  return (
    <View style={styles.statBox}>
      <View style={styles.statBoxDots}>
        <Image
          source={require('../../../../../assets/dots.png')}
          style={styles.dotsIcon}
        />
      </View>

      <View style={styles.statBoxLeft}>
        <View style={styles.statTitleRow}>
          <View style={styles.plusCircle}>
            <Image
              source={require('../../../../../assets/plus.png')}
              style={styles.plusIcon}
            />
          </View>
          <Text style={styles.statBoxTitle}>{title}</Text>
        </View>

        <Text style={styles.statBoxValue}>{value}</Text>

        <View style={styles.percentPill}>
          <Text
            style={[
              styles.percentText,
              { color: isUp ? '#16A34A' : '#EF4444' },
            ]}
          >
            %{percent}
          </Text>
          <Text
            style={[
              styles.arrow,
              { color: isUp ? '#16A34A' : '#EF4444' },
            ]}
          >
            {isUp ? '↗' : '↘'}
          </Text>
        </View>
      </View>

      <StatBoxSparkline data={data} color={color} />
    </View>
  );
}

/* ---------- MAIN SCREEN ---------- */
export default function PricingScreen() {
  const navigation = useNavigation();

  const handleBrowsePress = () => {
    navigation.navigate('PricingBrowse' as never);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Weekly orders chart */}
        <WeeklyOrdersCard />

        {/* Stat boxes */}
        <View style={styles.statsColumn}>
          <StatBox
            title="Avg margin"
            value="28 %"
            percent="8.13"
            data={avgMarginData}
            color="#22C55E"
            trend="up"
          />

          <StatBox
            title="Active promos"
            value={8}
            percent="8.13"
            data={activePromosData}
            color="#22C55E"
            trend="up"
          />
        </View>

        {/* Browse Button */}
        <TouchableOpacity
          style={styles.browseButton}
          onPress={handleBrowsePress}
          activeOpacity={0.9}
        >
          <Text style={styles.browseButtonText}>Browse</Text>
        </TouchableOpacity>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 20,
    paddingBottom: 100,
  },

  /* Browse Button */
  browseButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginHorizontal: 24,
    marginTop: 24,
    marginBottom: 16,
    alignItems: 'center',
  },
  browseButtonText: {
    fontSize: 16,
    fontFamily: getFontFamily('SemiBold'),
    color: '#FFFFFF',
  },

  /* Bottom spacer */
  bottomSpacer: {
    height: 90,
  },

  /* Weekly orders card - MATCHING MONTHLY EARNINGS STYLE */
  weeklyCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: getFontFamily('SemiBold'),
    color: '#111827',
  },
  cardDate: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
    fontFamily: getFontFamily('Regular'),
    marginBottom:15,
  },
  dots: {
    width: 24,
    height: 24,
  },
  graphContainer: {
    flexDirection: 'row',
    height: 140,
    marginBottom: 20,
  },
  yAxis: {
    justifyContent: 'space-between',
    marginRight: 10,
    paddingVertical: 8,
    width: 40,
  },
  yAxisText: {
    fontSize: 10,
    color: '#9CA3AF',
    fontFamily: getFontFamily('Medium'),
  },
  barsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    position: 'relative',
  },
  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#F3F4F6',
  },
  barColumn: {
    alignItems: 'center',
    width: '12%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  bar: {
    width: '70%',
    borderRadius: 4,
    marginBottom: 8,
    minHeight: 4,
  },
  dayLabel: {
    fontSize: 10,
    color: '#9CA3AF',
    fontFamily: getFontFamily('Medium'),
    marginTop: 4,
  },
  cardAmount: {
    fontSize: 28,
    fontFamily: getFontFamily('Bold'),
    color: '#111827',
    marginTop: 8,
  },

  /* Stat boxes */
  statsColumn: {
    paddingHorizontal: 24,
    gap: 16,
  },
  statBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    elevation: 2,
  },
  statBoxDots: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FAFAFA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statBoxLeft: {
    flex: 1,
  },
  statTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  statBoxTitle: {
    fontSize: 16,
    fontFamily: getFontFamily('SemiBold'),
    color: '#6B7280',
  },
  statBoxValue: {
    fontSize: 28,
    fontFamily: getFontFamily('Bold'),
    color: '#111827',
    marginBottom: 12,
  },
  percentPill: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  percentText: {
    fontSize: 14,
    fontFamily: getFontFamily('SemiBold'),
    marginRight: 4,
  },
  arrow: {
    fontSize: 16,
    fontFamily: getFontFamily('Bold'),
  },
  sparkWrap: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  plusCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F0FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  plusIcon: {
    width: 16,
    height: 16,
    tintColor: '#6D28D9',
  },
  dotsIcon: {
    width: 18,
    height: 18,
  },
});
