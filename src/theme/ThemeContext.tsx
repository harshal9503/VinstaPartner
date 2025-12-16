import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LightColors, DarkColors } from './colors';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    AsyncStorage.getItem('THEME').then(t => {
      if (t) setTheme(t);
    });
  }, []);

  const toggleTheme = async () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    await AsyncStorage.setItem('THEME', next);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        colors: theme === 'light' ? LightColors : DarkColors,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
