import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../../theme/ThemeContext';
import { getFontFamily, getFontWeight } from '../../../utils/fontHelper';
import { COLORS } from '../../../theme/colors';

const { width } = Dimensions.get('window');
const rs = (size: number) => (width / 375) * size;

const ANDROID_STATUS_BAR = StatusBar.currentHeight ?? 0;

interface HeaderProps {
  title: string;
  navigateTo?: string; // optional navigation
}

const Header = ({ title, navigateTo }: HeaderProps) => {
  const { theme, colors } = useContext(ThemeContext);
  const navigation = useNavigation<any>();

  return (
    <View style={{ backgroundColor: colors.background }}>
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
            
            backgroundColor: colors.headerBg,
          },
        ]}
      >
        {/* LEFT SPACE */}
        <View style={{ width: rs(22) }} />

        {/* TITLE (clickable if navigation provided) */}
        <TouchableOpacity
          disabled={!navigateTo}
          onPress={() => navigateTo && navigation.navigate(navigateTo)}
        >
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Your Orders
          </Text>
        </TouchableOpacity>

        {/* RIGHT SPACE */}
        <View style={{ width: rs(22) }} />
      </View>
    </View>
  );
};

export default Header;
const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: rs(16),
    paddingTop:rs(8),
    paddingBottom: rs(44),
    //backgroundColor:COLORS.background,
   // borderBottomWidth: 1,
   // borderBottomColor: '#ccc',
  },

  headerTitle: {
    fontSize: 18,
        fontFamily: getFontFamily('SemiBold'),
        color: COLORS.text,
  },
});
