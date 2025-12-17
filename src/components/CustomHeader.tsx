import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { ThemeContext } from '../theme/ThemeContext';

export default function CustomHeader({ title }) {
  const { colors } = useContext(ThemeContext);

  return (
    <View style={{ padding: 15, backgroundColor: colors.card }}>
      <Text style={{ color: colors.text, fontSize: 18 }}>{title}</Text>
    </View>
  );
}
