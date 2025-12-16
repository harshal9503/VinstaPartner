import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { getLogin } from '../utils/storage';

// use Splash.png from assets
const splashImage = require('../assets/Splash.png');

export default function Splash({ navigation }) {
  useEffect(() => {
    const checkLogin = async () => {
      const isLoggedIn = await getLogin();

      const timer = setTimeout(() => {
        if (isLoggedIn) {
          navigation.replace('Home');
        } else {
          navigation.replace('Login');
        }
      }, 2000);

      return () => clearTimeout(timer);
    };

    checkLogin();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={splashImage} style={styles.logo} resizeMode="contain" />
      <Text style={styles.title}>Vinsta Partner App</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // white background
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    width: '60%', // responsive width
    height: '30%', // responsive height
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    fontStyle: 'italic',
    color: '#000',
    textAlign: 'center',
  },
});
