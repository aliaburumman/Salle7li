import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/homeScreen';
import OrderService from '../screens/reservation/orderService';
import Profile from '../screens/profile/profile';
import { Icon, SunIcon } from 'native-base';
import MapScreen from '../screens/location/setLocation';

const Tab = createBottomTabNavigator();

const BottomTabBar = () => (
  <Tab.Navigator>
    
    <Tab.Screen
      name="Reserve"
      component={MapScreen}
      options={{
        tabBarIcon: () => (
          <SunIcon />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={Profile}
      options={{
        tabBarIcon: () => (
          <SunIcon/>
        ),
      }}
    />
  </Tab.Navigator>
);

export default BottomTabBar;
