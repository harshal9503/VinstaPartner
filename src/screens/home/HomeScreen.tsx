import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { ThemeContext } from '../../theme/ThemeContext';

export default function HomeScreen() {
  const { colors } = useContext(ThemeContext);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ color: colors.text }}>Home Screen</Text>
    </View>
  );
}
