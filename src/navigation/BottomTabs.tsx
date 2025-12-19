import React, { useContext } from 'react';
import { Image, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CurvedBottomBar } from 'react-native-curved-bottom-bar';
import { ThemeContext } from '../theme/ThemeContext';

import HomeScreen from '../screens/home/HomeScreen/HomeScreen';
import FoodScreen from '../screens/home/FoodScreen/FoodScreen';
import AddScreen from '../screens/home/Add/AddScreen';
import BookingsScreen from '../screens/home/Bookings/BookingsScreen';
import ProfileStack from './ProfileStack';

const icons = {
  Home: require('../assets/home.png'),
  Food: require('../assets/fooditem.png'),
  Bookings: require('../assets/booking.png'),
  Profile: require('../assets/profile.png'),
  Add: require('../assets/add.png'),
};

export default function BottomTabs() {
  const { colors } = useContext(ThemeContext);

  const renderTab = (routeName, selectedTab) => {
    const focused = routeName === selectedTab;

    return (
      <View style={styles.tabItem}>
        <Image
          source={icons[routeName]}
          style={[
            styles.tabIcon,
            { tintColor: focused ? colors.primary : colors.inactive },
          ]}
        />
        <Text
          style={[
            styles.tabLabel,
            { color: focused ? colors.primary : colors.inactive },
          ]}
        >
          {routeName}
        </Text>
      </View>
    );
  };

  return (
    <CurvedBottomBar.Navigator
      type="DOWN"
      height={75}
      circleWidth={65}
      bgColor={colors.tabBg}
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
      renderCircle={({ selectedTab, navigate }) => (
        <TouchableOpacity
          onPress={() => navigate('Home')}
          style={[styles.circleButton, { borderColor: colors.primary }]}
        >
          <Image
            source={icons.Home}
            style={{
              width: 30,
              height: 30,
              tintColor:
                selectedTab === 'Home'
                  ? colors.primary
                  : colors.inactive,
            }}
          />
        </TouchableOpacity>
      )}
      tabBar={({ routeName, selectedTab, navigate }) => (
        <TouchableOpacity
          onPress={() => navigate(routeName)}
          style={styles.tabButton}
        >
          {renderTab(routeName, selectedTab)}
        </TouchableOpacity>
      )}
    >
      <CurvedBottomBar.Screen name="Food" component={FoodScreen} position="LEFT" />
      <CurvedBottomBar.Screen name="Add" component={AddScreen} position="LEFT" />
      <CurvedBottomBar.Screen name="Home" component={HomeScreen} position="CENTER" />
      <CurvedBottomBar.Screen name="Bookings" component={BookingsScreen} position="RIGHT" />
      <CurvedBottomBar.Screen name="Profile" component={ProfileStack} position="RIGHT" />
    </CurvedBottomBar.Navigator>
  );
}

const styles = StyleSheet.create({
  tabButton: { flex: 1, alignItems: 'center' },
  tabItem: { alignItems: 'center', marginTop: 15 },
  tabIcon: { width: 22, height: 22, resizeMode: 'contain' },
  tabLabel: { fontSize: 12, marginTop: 4 },
  circleButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    elevation: 8,
    marginTop: -30,
  },
});
