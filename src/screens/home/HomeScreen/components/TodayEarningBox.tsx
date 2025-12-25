import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { getFontFamily } from '../../../../utils/fontHelper';

interface Props {
  title: string;
  value: string;
  percent: string;
  trend: 'up' | 'down';
  waveColor: string;
}

export default function TodayEarningBox({
  title,
  value,
  percent,
  trend,
  waveColor,
}: Props) {
  const isUp = trend === 'up';

  return (
    <View style={styles.card}>
      {/* TOP RIGHT DOTS */}
      <View style={styles.dotsContainer}>
        <Image
          source={require('../../../../assets/dots.png')}
          style={styles.dotsIcon}
        />
      </View>

      {/* LEFT CONTENT */}
      <View style={styles.left}>
        <View style={styles.titleRow}>
          <View style={styles.iconWrap}>
            <Image
              source={require('../../../../assets/plus.png')}
              style={styles.icon}
            />
          </View>
          <Text style={styles.title}>{title}</Text>
        </View>

        <Text style={styles.value}>{value}</Text>

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

      {/* RIGHT GRAPH */}
      <View style={styles.graphWrap}>
        <Svg width={160} height={70} viewBox="0 0 160 70">
          <Defs>
            <LinearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0%" stopColor={waveColor} stopOpacity="0.25" />
              <Stop offset="100%" stopColor={waveColor} stopOpacity="0" />
            </LinearGradient>
          </Defs>

          <Path
            d="M0 45 C20 20, 40 30, 60 25 C80 20, 100 35, 120 28 C140 22, 150 35, 160 45 L160 70 L0 70 Z"
            fill="url(#fade)"
          />

          <Path
            d="M0 45 C20 20, 40 30, 60 25 C80 20, 100 35, 120 28 C140 22, 150 35, 160 45"
            stroke={waveColor}
            strokeWidth={4}
            fill="none"
            strokeLinecap="round"
          />
        </Svg>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    elevation: 2,
  },

  /* DOTS */
  dotsContainer: {
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
  dotsIcon: {
    width: 18,
    height: 18,
  
  },

  /* LEFT */
  left: { flex: 1 },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F0FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  icon: {
    width: 16,
    height: 16,
    tintColor: '#6D28D9',
  },
  title: {
    fontSize: 16,
    fontFamily: getFontFamily('SemiBold'),
    color: '#6B7280',
  },
  value: {
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

  /* RIGHT */
  graphWrap: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
