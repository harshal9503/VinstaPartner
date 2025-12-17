import AsyncStorage from '@react-native-async-storage/async-storage';

/* LOGIN */
export const setLogin = async () => {
  await AsyncStorage.setItem('IS_LOGGED_IN', 'true');
};

export const getLogin = async () => {
  const value = await AsyncStorage.getItem('IS_LOGGED_IN');
  return value === 'true';
};

/* REGISTRATION COMPLETE */
export const setRegistrationDone = async () => {
  await AsyncStorage.setItem('IS_REGISTRATION_DONE', 'true');
};

export const getRegistrationDone = async () => {
  const value = await AsyncStorage.getItem('IS_REGISTRATION_DONE');
  return value === 'true';
};

/* LOGOUT / RESET */
export const logout = async () => {
  await AsyncStorage.multiRemove([
    'IS_LOGGED_IN',
    'IS_REGISTRATION_DONE',
  ]);
};
