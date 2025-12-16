import React, { useContext } from 'react';
import { View, Text, Switch, Button } from 'react-native';
import { ThemeContext } from '../../theme/ThemeContext';
import { logout } from '../../utils/storage';

export default function ProfileScreen({ navigation }) {
  const { theme, toggleTheme, colors } = useContext(ThemeContext);

  const handleLogout = async () => {
    await logout();
    navigation.replace('Splash');
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: 20 }}>
      <Text style={{ color: colors.text, fontSize: 20 }}>Profile</Text>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 20,
        }}
      >
        <Text style={{ color: colors.text }}>Dark Mode</Text>
        <Switch value={theme === 'dark'} onValueChange={toggleTheme} />
      </View>

      <Button title="LOGOUT" color="red" onPress={handleLogout} />
    </View>
  );
}
