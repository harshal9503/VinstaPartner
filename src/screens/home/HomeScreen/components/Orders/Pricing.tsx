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
import { COLORS } from '../../../../../theme/colors';
import { getFontFamily } from '../../../../../utils/fontHelper';

const days = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
// Updated to match the image: 500 for Thursday, others to create a realistic curve
const weeklyOrders = [120, 180, 220, 500, 280, 150, 210];

function WeeklyOrdersCard() {
  const maxOrders = Math.max(...weeklyOrders);

  return (
    <View style={styles.card}>
      {/* Card header */}
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Total orders this week</Text>
        <Image
          source={require('../../../../../assets/dots.png')}
          style={styles.dots}
        />
      </View>

      {/* Thursday order info */}
      <View style={styles.thursdayContainer}>
        <Text style={styles.thursdayDate}>Thursday, Nov 4, 2024</Text>
        <Text style={styles.thursdayValue}>500</Text>
      </View>

      {/* Days of week */}
      <View style={styles.daysRow}>
        {days.map((day, index) => (
          <Text key={index} style={styles.dayText}>{day}</Text>
        ))}
      </View>

      <View style={styles.separator} />

      {/* Graph */}
      <View style={styles.graphContainer}>
        {/* Y axis labels */}
        <View style={styles.yAxis}>
          {[0, 100, 200, 300, 400, 500].map((value) => (
            <Text key={value} style={styles.yAxisText}>
              {value === 0 ? '0' : `${value}`}
            </Text>
          ))}
        </View>

        {/* Graph area */}
        <View style={styles.graphArea}>
          {/* Horizontal grid lines */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <View
              key={`grid-${i}`}
              style={[styles.gridLine, { top: `${(i / 5) * 100}%` }]}
            />
          ))}

          <View style={styles.curveRow}>
            {/* Line graph path - simplified visual */}
            <View style={styles.lineGraph} />
            
            {/* Dots and day labels */}
            {weeklyOrders.map((value, index) => {
              const height = (value / maxOrders) * 100;
              return (
                <View key={index} style={styles.curveItem}>
                  <View
                    style={[
                      styles.curveDot,
                      {
                        bottom: `${height}%`,
                        backgroundColor: index === 3 ? '#22C55E' : '#F97316',
                      },
                    ]}
                  />
                </View>
              );
            })}

            {/* Tooltip for Thursday */}
            <View style={[styles.tooltipContainer, { bottom: `${(weeklyOrders[3] / maxOrders) * 100 + 10}%` }]}>
              <View style={styles.tooltipBubble}>
                <Text style={styles.tooltipValue}>500</Text>
              </View>
              <View style={styles.tooltipPointer} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

interface StatBoxProps {
  title: string;
  value: string | number;
  percent: string;
  data?: number[];
  color?: string;
  percentColor?: string;
  percentBgColor?: string;
}

function StatBox({ title, value, percent, data = [8, 5, 12, 10, 7, 9, 11, 8, 6], color = '#22C55E', percentColor = '#16A34A', percentBgColor = '#DCFCE7' }: StatBoxProps) {
  return (
    <View style={styles.statBox}>
      <View style={styles.statBoxHeader}>
        <Text style={styles.statBoxTitle}>{title}</Text>
        <Image
          source={require('../../../../../assets/dots.png')}
          style={styles.dotsSmall}
        />
      </View>

      <View style={styles.statBoxRow}>
        <Text style={styles.statBoxValue}>{value}</Text>
        <View style={[styles.percentChip, { backgroundColor: percentBgColor }]}>
          <Text style={[styles.percentChipText, { color: percentColor }]}>{percent}</Text>
        </View>
      </View>

      {/* Bar graph */}
      <View style={styles.graphContainerSmall}>
        <View style={styles.graph}>
          {data.map((value, index) => {
            const height = Math.min((value / 12) * 50, 50);
            return (
              <View 
                key={index} 
                style={[
                  styles.graphBar,
                  { height, backgroundColor: color }
                ]}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
}

export default function PricingScreen() {
  // Data for the bar graphs matching the image
  const avgMarginData = [3, 5, 8, 7, 6, 9, 8, 5, 6];
  const activePromosData = [4, 6, 5, 7, 8, 6, 9, 8, 7];
  const navigation = useNavigation();

  const handleBrowsePress = () => {
    // Navigate to your desired screen
    // navigation.navigate('YourScreenName');
    console.log('Browse button pressed');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 100 }} // Increased padding for browse button
        showsVerticalScrollIndicator={false}
      >
        {/* Weekly orders chart */}
        <WeeklyOrdersCard />

        {/* Stat boxes */}
        <View style={styles.statsRow}>
          <StatBox 
            title="Avg margin" 
            value="28%" 
            percent="+8.13%" 
            data={avgMarginData}
            color="#22C55E"
            percentColor="#16A34A"
            percentBgColor="#DCFCE7"
          />
          <StatBox 
            title="Active promos" 
            value={8} 
            percent="+8.13%" 
            data={activePromosData}
            color="#3B82F6"
            percentColor="#16A34A"
            percentBgColor="#DCFCE7"
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
  },

  /* Browse Button */
  browseButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginHorizontal: 24,
    marginTop: 24,
    marginBottom: 32,
    alignItems: 'center',
  },
  browseButtonText: {
    fontSize: 16,
    fontFamily: getFontFamily('SemiBold'),
    color: '#FFFFFF',
  },

  /* Card common */
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 18,
    marginHorizontal: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 14,
    fontFamily: getFontFamily('SemiBold'),
    color: '#111827',
  },
  dots: {
    width: 22,
    height: 22,
  },

  /* Thursday info */
  thursdayContainer: {
    marginBottom: 12,
  },
  thursdayDate: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: getFontFamily('Medium'),
    marginBottom: 4,
  },
  thursdayValue: {
    fontSize: 24,
    color: '#111827',
    fontFamily: getFontFamily('Bold'),
  },

  /* Days row */
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  dayText: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: getFontFamily('Medium'),
    flex: 1,
    textAlign: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginBottom: 16,
  },

  /* Weekly orders graph */
  graphContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  yAxis: {
    width: 40,
    justifyContent: 'space-between',
    paddingVertical: 4,
    marginRight: 6,
  },
  yAxisText: {
    fontSize: 9,
    color: '#9CA3AF',
    fontFamily: getFontFamily('Medium'),
  },
  graphArea: {
    flex: 1,
    height: 160,
    position: 'relative',
    paddingBottom: 10,
  },
  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#F3F4F6',
  },
  curveRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: '100%',
    position: 'relative',
  },
  lineGraph: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    height: 2,
    backgroundColor: '#F97316',
  },
  curveItem: {
    alignItems: 'center',
    width: `${100 / days.length}%`,
    position: 'relative',
    zIndex: 2,
  },
  curveDot: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  dayLabel: {
    fontSize: 10,
    color: '#9CA3AF',
    fontFamily: getFontFamily('Medium'),
    marginTop: 4,
    position: 'absolute',
    bottom: 0,
  },

  /* Tooltip */
  tooltipContainer: {
    position: 'absolute',
    left: `${(3 / days.length) * 100}%`,
    alignItems: 'center',
    zIndex: 10,
    transform: [{ translateX: -30 }],
  },
  tooltipBubble: {
    backgroundColor: '#22C55E',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  tooltipValue: {
    fontSize: 11,
    color: '#FFFFFF',
    fontFamily: getFontFamily('SemiBold'),
  },
  tooltipPointer: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#22C55E',
    marginTop: 2,
  },

  /* Stat small cards */
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginTop: 4,
  },
  statBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    width: '47%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  statBoxHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statBoxTitle: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: getFontFamily('Medium'),
  },
  dotsSmall: {
    width: 18,
    height: 18,
  },
  statBoxRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statBoxValue: {
    fontSize: 22,
    fontFamily: getFontFamily('Bold'),
    color: '#111827',
  },
  percentChip: {
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  percentChipText: {
    fontSize: 11,
    fontFamily: getFontFamily('SemiBold'),
  },
  graphContainerSmall: {
    height: 40,
    marginTop: 4,
  },
  graph: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: '100%',
    justifyContent: 'space-between',
  },
  graphBar: {
    width: 2,
    borderRadius: 1,
    marginHorizontal: 0.5,
  },
});
