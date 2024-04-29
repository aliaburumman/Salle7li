import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {NativeBaseProvider} from 'native-base';
import {I18nextProvider} from 'react-i18next';
import i18n from './src/i18n/i18n';

import HomeScreen from './src/screens/home/homeScreen';
import Profile from './src/screens/profile/profile';
import MapScreen from './src/screens/location/setLocation';
import OrderService from './src/screens/reservation/orderService';
import AppearenceSettings from './src/screens/profile/appearenceSettings';
import {useAppSelector} from './src/app/hooks';
import {Provider} from 'react-redux';
import regist from './src/app/regist';
import {bgColorMain} from './src/screens/getStarted/started';
import Notifications from './src/screens/home/notifications';
import ChangePassword from './src/screens/profile/changePassword';
import PersonalInformation from './src/screens/profile/personalInformation';
import ApplyToBeWorker from './src/screens/profile/applyToBeWorker';

const Tab = createBottomTabNavigator();
const ProfileStack = createNativeStackNavigator();
const ReserveStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();

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
      options={{headerShown: true, title:"3abbi hoon"}}
    />

    <ProfileStack.Screen
      name="changePassword"
      component={ChangePassword}
      options={{headerShown: true, title:"3abbi hoon"}}
    />

    <ProfileStack.Screen
      name="personalInformation"
      component={PersonalInformation}
      options={{headerShown: true, title:"3abbi hoon"}}
    />
    <ProfileStack.Screen
      name="applyToBeWorker"
      component={ApplyToBeWorker}
      options={{headerShown: true, title:"3abbi hoon"}}
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
    {/* Add more screens to Reserve stack as needed */}
  </ReserveStack.Navigator>
);

const HomeStackScreen = () => (
  <HomeStack.Navigator>
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
    {/* Add more screens to Reserve stack as needed */}
  </HomeStack.Navigator>
);
const AppLoader = () => {
  const LanguageCheck = useAppSelector(state => state.language.isArabic);
  const LightModeCheck = useAppSelector(state => state.theme.lightMode);
  if (LanguageCheck) {
    i18n.changeLanguage('ar');
  } else {
    i18n.changeLanguage('en');
  }
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
          title:"3abbi this",
          tabBarActiveTintColor: LightModeCheck ? 'white' : bgColorMain,
        }}
      />
      <Tab.Screen
        name="Reserve"
        component={ReserveStackScreen}
        options={{
          headerShown: false,
          title:"3abbi this",
          tabBarActiveTintColor: LightModeCheck ? 'white' : bgColorMain,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          headerShown: false,
          title:"3abbi this",
          tabBarActiveTintColor: LightModeCheck ? 'white' : bgColorMain,
        }}
      />
    </Tab.Navigator>
  );
};

export default AppLoader;
