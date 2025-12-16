import React, { useContext } from 'react';
import { Image, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CurvedBottomBar } from 'react-native-curved-bottom-bar';
import { ThemeContext } from '../theme/ThemeContext';

import HomeScreen from '../screens/home/HomeScreen';
import FoodScreen from '../screens/home/FoodScreen';
import AddScreen from '../screens/home/AddScreen';
import BookingsScreen from '../screens/home/BookingsScreen';
import ProfileScreen from '../screens/home/ProfileScreen';

// PNG ICONS
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
          resizeMode="contain"
          style={[
            styles.tabIcon,
            {
              tintColor: focused ? colors.primary : colors.inactive,
            },
          ]}
        />
        <Text
          style={[
            styles.tabLabel,
            {
              color: focused ? colors.primary : colors.inactive,
              fontWeight: focused ? '600' : '400',
            },
          ]}
        >
          {routeName === 'Food'
            ? 'Food Items'
            : routeName === 'Bookings'
            ? 'Bookings'
            : routeName}
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
      renderCircle={({ selectedTab, navigate }) => {
        const isHomeFocused = selectedTab === 'Home';

        return (
          <TouchableOpacity
            onPress={() => navigate('Home')}
            style={[styles.circleButton, { borderColor: colors.primary }]}
          >
            <Image
              source={icons.Home}
              style={{
                width: 30,
                height: 30,
                // Home icon active only when Home is selected
                tintColor: isHomeFocused ? colors.primary : colors.inactive,
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        );
      }}
      tabBar={({ routeName, selectedTab, navigate }) => (
        <TouchableOpacity
          onPress={() => navigate(routeName)}
          style={styles.tabButton}
        >
          {renderTab(routeName, selectedTab)}
        </TouchableOpacity>
      )}
    >
      {/* LEFT SIDE: Food, Add */}
      <CurvedBottomBar.Screen
        name="Food"
        component={FoodScreen}
        position="LEFT"
      />
      <CurvedBottomBar.Screen
        name="Add"
        component={AddScreen}
        position="LEFT"
      />

      {/* CENTER: Home (circle button) */}
      <CurvedBottomBar.Screen
        name="Home"
        component={HomeScreen}
        position="CENTER"
      />

      {/* RIGHT SIDE: Bookings, Profile */}
      <CurvedBottomBar.Screen
        name="Bookings"
        component={BookingsScreen}
        position="RIGHT"
      />
      <CurvedBottomBar.Screen
        name="Profile"
        component={ProfileScreen}
        position="RIGHT"
      />
    </CurvedBottomBar.Navigator>
  );
}

const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
    alignItems: 'center',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  tabIcon: {
    width: 22,
    height: 22,
  },
  tabLabel: {
    marginTop: 4,
    fontSize: 12,
  },
  circleButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 35,
    borderWidth: 3,
    elevation: 8,
    marginTop: -30,
  },
});
