import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../Auth/Splash';
import Login from '../Auth/Login';
import AppStack from './AppStack';
import OtpVerificationScreen from '../Auth/OtpVerificationScreen';
import KYC1 from '../Auth/KYC1';
import KYC2 from '../Auth/KYC2';
import KYC3 from '../Auth/KYC3';
import SelectLocation from '../Auth/SelectLocation';
import StoreHours from '../Auth/StoreHours';
import SelectDeliveryZones from '../Auth/SelectDeliveryZones';
import DeliveryCharges from '../Auth/DeliveryCharges';
import CatelogSetup from '../Auth/CatelogSetup';
import Food1 from '../Auth/Food1';
import Food2 from '../Auth/Food2';
import Food3 from '../Auth/Food3';
import Food4 from '../Auth/Food4';




const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={AppStack} />
      <Stack.Screen name="OtpVerification" component={OtpVerificationScreen} />
      <Stack.Screen name="KYC1" component={KYC1} />
      <Stack.Screen name="KYC2" component={KYC2} />
      <Stack.Screen name="KYC3" component={KYC3} />
      <Stack.Screen name="SelectLocation" component={SelectLocation} />
      <Stack.Screen name="StoreHours" component={StoreHours} />
      <Stack.Screen name="SelectDeliveryZones" component={SelectDeliveryZones} />
      <Stack.Screen name="DeliveryCharges" component={DeliveryCharges} />
      <Stack.Screen name="CatelogSetup" component={CatelogSetup} />
      <Stack.Screen name="Food1" component={Food1} />
      <Stack.Screen name="Food2" component={Food2} />
      <Stack.Screen name="Food3" component={Food3} />
      <Stack.Screen name="Food4" component={Food4} />
    </Stack.Navigator>
  );
}
