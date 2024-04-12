import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Started, {bgColorMain} from './src/screens/getStarted/started';
import Login from './src/screens/login/login';
import {View} from 'react-native';
import {I18nextProvider} from 'react-i18next';
import i18n from './src/i18n/i18n';
import Register from './src/screens/register/register';
import {NativeBaseProvider} from 'native-base';
import HomeScreen from './src/screens/home/homeScreen';
import Profile from './src/screens/home/profile';
import OrderService from './src/screens/reservation/orderService';
import MapScreen from './src/screens/location/setLocation';
import ChooseWorker from './src/screens/reservation/chooseWorker';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <I18nextProvider i18n={i18n}>
          <Stack.Navigator initialRouteName="Started">
            <Stack.Screen
              name="started"
              component={MapScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="MapScreen"
              component={MapScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="OrderService"
              component={OrderService}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ChooseWorker"
              component={ChooseWorker}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </I18nextProvider>
      </NativeBaseProvider>
    </NavigationContainer>
  );
};

export default App;
