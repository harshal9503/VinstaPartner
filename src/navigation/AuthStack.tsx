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
import HelpandSupport from '../screens/home/Profile/HelpandSupport';
import RestroInfo from '../screens/home/Profile/RestroInfo';
import DeliveryPartners from '../screens/home/Profile/DeliveryPartner';
import OrderManagments from '../screens/home/Profile/OrderManagment';
import MenuManagements from '../screens/home/Profile/MenuManagement';
import Payoutsearning from '../screens/home/Profile/Payoutsearning';
/* Other */
import PricingScreen from '../screens/home/HomeScreen/components/Orders/Pricing';
import PricingBrowse from '../screens/home/HomeScreen/components/Orders/PricingBrowse';
import PricingAddPromo from '../screens/home/HomeScreen/components/Orders/PricingAddPromo';
import PricingEdit from '../screens/home/HomeScreen/components/Orders/PricingEdit';
import AddPromo2 from '../screens/home/HomeScreen/components/Orders/AddPromo2';
import AddPromo3 from '../screens/home/HomeScreen/components/Orders/AddPromo3';
import Orderdetail from '../screens/home/OrdersTab/Orderdetail';
import TrackOrder from '../screens/home/OrdersTab/TrackOrder';
import DeliveryPartner from '../screens/home/Profile/DeliveryPartner';
import OrderManagment from '../screens/home/Profile/OrderManagment';
import PayoutsEarning from '../screens/home/Profile/Payoutsearning';
import DeliverySetting from '../screens/home/Profile/DeliverySetting';
import Ratingreview from '../screens/home/Profile/Ratingreview';
import DocandVeri from '../screens/home/Profile/DocandVeri';
import NotiandPrefere from '../screens/home/Profile/NotiandPrefere';
import ProfileActions from '../screens/home/Profile/ProfileActions';
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
      <Stack.Screen
        name="SelectDeliveryZones"
        component={SelectDeliveryZones}
      />
      <Stack.Screen name="DeliveryCharges" component={DeliveryCharges} />
      <Stack.Screen name="CatelogSetup" component={CatelogSetup} />

      {/* Food */}
      <Stack.Screen name="Food1" component={Food1} />
      <Stack.Screen name="Food2" component={Food2} />
      <Stack.Screen name="Food3" component={Food3} />
      <Stack.Screen name="Food4" component={Food4} />

      {/* App */}
      <Stack.Screen name="Home" component={AppStack} />
      <Stack.Screen name="PricingScreen" component={PricingScreen} />
      <Stack.Screen name="PricingBrowse" component={PricingBrowse} />
      <Stack.Screen name="PricingAddPromo" component={PricingAddPromo} />
      <Stack.Screen name="PricingEdit" component={PricingEdit} />
      <Stack.Screen name="AddPromo2" component={AddPromo2} />
      <Stack.Screen name="AddPromo3" component={AddPromo3} />

      {/* Profile */}
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="HelpandSupport" component={HelpandSupport} />
      <Stack.Screen name="RestroInformation" component={RestroInfo} />
      <Stack.Screen name="DeliveryPartners" component={DeliveryPartner} />
      <Stack.Screen name="OrderManagements" component={OrderManagment} />
      <Stack.Screen name="MenuManagements" component={MenuManagements} />
      <Stack.Screen name="Payoutsearning" component={PayoutsEarning} />
      <Stack.Screen name="DeliverySetting" component={DeliverySetting} />
      <Stack.Screen name="Ratingreview" component={Ratingreview} />
      <Stack.Screen name="DocandVeri" component={DocandVeri} />
      <Stack.Screen name="NotiandPrefere" component={NotiandPrefere} />
      <Stack.Screen name="ProfileActions" component={ProfileActions} />
      <Stack.Screen
        name="OrderDetails"
        component={Orderdetail}
      />
      <Stack.Screen name="TrackOrder" component={TrackOrder} />


      {/* //Orders file  */}

    </Stack.Navigator>
  );
}
