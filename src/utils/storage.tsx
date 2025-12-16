import AsyncStorage from '@react-native-async-storage/async-storage';

export const setLogin = async () => {
  await AsyncStorage.setItem('IS_LOGGED_IN', 'true');
};

export const getLogin = async () => {
  const value = await AsyncStorage.getItem('IS_LOGGED_IN');
  return value === 'true';
};

export const logout = async () => {
  await AsyncStorage.removeItem('IS_LOGGED_IN');
};
