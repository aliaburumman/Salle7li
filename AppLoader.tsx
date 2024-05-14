import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import i18n from './src/i18n/i18n';
import HomeScreen from './src/screens/home/homeScreen';
import Profile from './src/screens/profile/profile';
import MapScreen from './src/screens/location/setLocation';
import OrderService from './src/screens/reservation/orderService';
import AppearenceSettings from './src/screens/profile/appearenceSettings';
import {useAppSelector} from './src/app/hooks';
import Started, {bgColorMain} from './src/screens/getStarted/started';
import Notifications from './src/screens/home/notifications';
import ChangePassword from './src/screens/profile/changePassword';
import PersonalInformation from './src/screens/profile/personalInformation';
import ApplyToBeWorker from './src/screens/profile/applyToBeWorker';
import Login from './src/screens/login/login';
import Register from './src/screens/register/register';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import VerifyOtp from './src/screens/otp/verifyOtp';
import {
  ParamListBase,
  createNavigationContainerRef,
} from '@react-navigation/native';
import UpdateInformation from './src/screens/profile/updateInformation';

const Tab = createBottomTabNavigator();
const ProfileStack = createNativeStackNavigator();
const ReserveStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

export const navigationRef = createNavigationContainerRef<ParamListBase>();

export function navigate<RouteName extends keyof ParamListBase>(
  name: RouteName,
  params?: ParamListBase[RouteName],
) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name as any, params as any);
  } else {
    console.error('Attempted to navigate without a ready navigation stack.');
  }
}

const AuthStackScreen = () => (
  <AuthStack.Navigator initialRouteName="getStarted">
    <AuthStack.Screen
      name="getStarted"
      component={Started}
      options={{headerShown: false}}
    />
    <AuthStack.Screen
      name="Login"
      component={Login}
      options={{headerShown: false}}
    />
    <AuthStack.Screen
      name="resetPassword"
      component={ChangePassword}
      options={{headerShown: false}}
    />
    <AuthStack.Screen
      name="OTP"
      component={VerifyOtp}
      options={{headerShown: false}}
    />
    <AuthStack.Screen
      name="Register"
      component={Register}
      options={{headerShown: false}}
    />
  </AuthStack.Navigator>
);

const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen
      name="ProfileMain"
      component={Profile}
      options={{headerShown: false}}
    />
    <ProfileStack.Screen
      name="AppearanceSettings"
      component={AppearenceSettings}
      options={{headerShown: true, title: '3abbi hoon'}}
    />

    <ProfileStack.Screen
      name="changePassword"
      component={ChangePassword}
      options={{headerShown: true, title: '3abbi hoon'}}
    />

    <ProfileStack.Screen
      name="personalInformation"
      component={PersonalInformation}
      options={{headerShown: true, title: '3abbi hoon'}}
    />

    <ProfileStack.Screen
      name="updateInfo"
      component={UpdateInformation}
      options={{headerShown: true, title: '3abbi hoon'}}
    />
    <ProfileStack.Screen
      name="applyToBeWorker"
      component={ApplyToBeWorker}
      options={{headerShown: true, title: '3abbi hoon'}}
    />
    {/* Add more screens to Profile stack as needed */}
  </ProfileStack.Navigator>
);

const ReserveStackScreen = () => (
  <ReserveStack.Navigator>
    <ReserveStack.Screen
      name="ReserveMain"
      component={MapScreen}
      options={{headerShown: false}}
    />
    <ReserveStack.Screen
      name="OrderService"
      component={OrderService}
      options={{headerShown: false}}
    />
  </ReserveStack.Navigator>
);

const HomeStackScreen = () => (
  <HomeStack.Navigator initialRouteName="HomeScreen">
    <HomeStack.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{headerShown: false}}
    />
    <HomeStack.Screen
      name="Notifications"
      component={Notifications}
      options={{headerShown: true}}
    />
  </HomeStack.Navigator>
);

const MainStackScreen = () => {
  const LightModeCheck = useAppSelector(state => state.theme.lightMode);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'user-circle' : 'user-circle-o';
          } else if (route.name === 'Reserve') {
            iconName = focused ? 'plus-square' : 'plus-square-o';
          }
          return (
            <Icon
              name={iconName ? iconName : ''}
              size={size}
              color={LightModeCheck ? 'white' : color}
            />
          );
        },
        tabBarStyle: {backgroundColor: LightModeCheck ? bgColorMain : 'white'},
      })}>
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          headerShown: false,
          title: '3abbi this',
          tabBarActiveTintColor: LightModeCheck ? 'white' : bgColorMain,
        }}
      />
      <Tab.Screen
        name="Reserve"
        component={ReserveStackScreen}
        options={{
          headerShown: false,
          title: '3abbi this',
          tabBarActiveTintColor: LightModeCheck ? 'white' : bgColorMain,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          headerShown: false,
          title: '3abbi this',
          tabBarActiveTintColor: LightModeCheck ? 'white' : bgColorMain,
        }}
      />
    </Tab.Navigator>
  );
};
const AppLoader = () => {
  const LanguageCheck = useAppSelector(state => state.language.isArabic);
  const userToken=useAppSelector(state =>state.user.token);

  if (LanguageCheck) {
    i18n.changeLanguage('ar');
  } else {
    i18n.changeLanguage('en');
  }

  return <>{userToken ? <MainStackScreen /> : <AuthStackScreen />}</>;
};

export default AppLoader;
