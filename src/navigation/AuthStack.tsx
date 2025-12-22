import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

/* Auth */
import Splash from '../Auth/Splash';
import Login from '../Auth/Login';
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

/* App */
import AppStack from './AppStack';

/* Profile */
import ProfileScreen from '../screens/home/Profile/ProfileScreen';
import Address from '../screens/home/Profile/Address';
import Orders from '../screens/home/Profile/Orders';
import Wallet from '../screens/home/Profile/Wallet';
import Setting from '../screens/home/Profile/Setting';
import MyProfile from '../screens/home/Profile/MyProfile';
import Favourite from '../screens/home/Profile/Favourite';
import Support from '../screens/home/Profile/Support';
import Help from '../screens/home/Profile/Help';
import Myoffer from '../screens/home/Profile/Myoffer';
import Refertoearn from '../screens/home/Profile/Refertoearn';
import Settings from '../screens/home/Profile/Settings';
import DarkMode from '../screens/home/Profile/DarkMode';

/* Other */
import PricingScreen from '../screens/home/HomeScreen/components/Orders/Pricing';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Auth Flow */}
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="OtpVerification" component={OtpVerificationScreen} />

      {/* KYC */}
      <Stack.Screen name="KYC1" component={KYC1} />
      <Stack.Screen name="KYC2" component={KYC2} />
      <Stack.Screen name="KYC3" component={KYC3} />

      {/* Store Setup */}
      <Stack.Screen name="SelectLocation" component={SelectLocation} />
      <Stack.Screen name="StoreHours" component={StoreHours} />
      <Stack.Screen name="SelectDeliveryZones" component={SelectDeliveryZones} />
      <Stack.Screen name="DeliveryCharges" component={DeliveryCharges} />
      <Stack.Screen name="CatelogSetup" component={CatelogSetup} />

      {/* Food */}
      <Stack.Screen name="Food1" component={Food1} />
      <Stack.Screen name="Food2" component={Food2} />
      <Stack.Screen name="Food3" component={Food3} />
      <Stack.Screen name="Food4" component={Food4} />
<<<<<<< HEAD
{/* Profile folder file navigation */}
      <Stack.Screen name="ProfileMain" component={ProfileScreen} />
=======

      {/* App */}
      <Stack.Screen name="Home" component={AppStack} />
      <Stack.Screen name="PricingScreen" component={PricingScreen} />

      {/* Profile */}
      <Stack.Screen name="ProfileMain" component={ProfileScreen} />
      <Stack.Screen name="ProfileEdit" component={MyProfile} />
>>>>>>> b76ca8843b7e33727820e55d04cab26c2f160e50
      <Stack.Screen name="Address" component={Address} />
      <Stack.Screen name="Orders" component={Orders} />
      <Stack.Screen name="Wallet" component={Wallet} />
      <Stack.Screen name="Setting" component={Setting} />
<<<<<<< HEAD
      <Stack.Screen name="ProfileEdit" component={MyProfile} />
=======
>>>>>>> b76ca8843b7e33727820e55d04cab26c2f160e50
      <Stack.Screen name="Favourite" component={Favourite} />
      <Stack.Screen name="Support" component={Support} />
      <Stack.Screen name="Help" component={Help} />
      <Stack.Screen name="Myoffer" component={Myoffer} />
<<<<<<< HEAD
      <Stack.Screen name="Refertoearn" component={Refertoearn} /> 
      <Stack.Screen name="bottomSettings" component={Settings} />
      <Stack.Screen name="DarkMode"component={DarkMode}/>
=======
      <Stack.Screen name="Refertoearn" component={Refertoearn} />
      <Stack.Screen name="bottomSettings" component={Settings} />
      <Stack.Screen name="DarkMode" component={DarkMode} />
>>>>>>> b76ca8843b7e33727820e55d04cab26c2f160e50
    </Stack.Navigator>
  );
}
