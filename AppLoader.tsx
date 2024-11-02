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
import {useAppDispatch, useAppSelector} from './src/app/hooks';
import Started, {bgColorMain} from './src/screens/getStarted/started';
import Notifications from './src/screens/home/notifications';
import ChangePassword from './src/screens/profile/changePassword';
import PersonalInformation from './src/screens/profile/personalInformation';
import ApplyToBeWorker from './src/screens/profile/applyToBeWorker';
import Login from './src/screens/login/login';
import Register from './src/screens/register/register';
import {ZohoSalesIQ} from 'react-native-zohosalesiq-mobilisten';
import {useCallback, useEffect} from 'react';
import VerifyOtp from './src/screens/otp/verifyOtp';
import {
  ParamListBase,
  createNavigationContainerRef,
} from '@react-navigation/native';
import UpdateInformation from './src/screens/profile/updateInformation';
import {
  AppLanguage,
  ZohoAndroidAccessKey,
  ZohoAppKey,
  ZohoIOSAccessKey,
} from './src/constants/storageKeys';
import {I18nManager, Platform} from 'react-native';
import ChooseWorker from './src/screens/reservation/chooseWorker';
import OrderSummary from './src/screens/reservation/orderSummary';
import SetNewPassword from './src/screens/resetPassword/setNewPassword';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Locale} from './src/data/user';
import {setLanguage} from './src/app/slices/slice';
import {t} from 'i18next';
import ServiceHistory from './src/screens/profile/serviceHistory';
import OrderConfirmation from './src/screens/reservation/orderConfirmation';

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
      name="setNewPassword"
      component={SetNewPassword}
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
      options={{headerShown: true, title: t('appearance')}}
    />

    <ProfileStack.Screen
      name="changePassword"
      component={ChangePassword}
      options={{headerShown: true, title: t('profile:changePass')}}
    />

    <ProfileStack.Screen
      name="OTP"
      component={VerifyOtp}
      options={{headerShown: true, title: t('otp')}}
    />

    <ProfileStack.Screen
      name="setNewPassword"
      component={SetNewPassword}
      options={{headerShown: true, title: t('newPass')}}
    />

    <ProfileStack.Screen
      name="personalInformation"
      component={PersonalInformation}
      options={{headerShown: true, title: t('profile:personalInfo')}}
    />

    <ProfileStack.Screen
      name="updateInfo"
      component={UpdateInformation}
      options={{headerShown: true, title: t('update')}}
    />
    <ProfileStack.Screen
      name="applyToBeWorker"
      component={ApplyToBeWorker}
      options={{headerShown: true, title: t('profile:applyWorker')}}
    />
    <ProfileStack.Screen
      name="ServiceHistory"
      component={ServiceHistory}
      options={{headerShown: true, title: t('profile:serviceHistory')}}
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

    <ReserveStack.Screen
      name="chooseWorker"
      component={ChooseWorker}
      options={{headerShown: false}}
    />

    <ReserveStack.Screen
      name="orderSummary"
      component={OrderSummary}
      options={{headerShown: false}}
    />

<ReserveStack.Screen
      name="OrderConfirmation"
      component={OrderConfirmation}
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
  const LightModeCheck = useAppSelector(state => state.user.theme);
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
              color={LightModeCheck == 'dark' ? bgColorMain : color}
            />
          );
        },
        tabBarStyle: {
          backgroundColor: LightModeCheck == 'bright' ? bgColorMain : 'white',
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          headerShown: false,
          title: t('common:home'),
          tabBarActiveTintColor:
            LightModeCheck == 'bright' ? 'white' : bgColorMain,
        }}
      />
      <Tab.Screen
        name="Reserve"
        component={ReserveStackScreen}
        options={{
          headerShown: false,
          title: t('common:reserve'),
          tabBarActiveTintColor:
            LightModeCheck == 'bright' ? 'white' : bgColorMain,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          headerShown: false,
          title: t('common:profile'),
          tabBarActiveTintColor:
            LightModeCheck == 'bright' ? 'white' : bgColorMain,
        }}
      />
    </Tab.Navigator>
  );
};

const AppLoader = () => {
  const Language = useAppSelector(state => state.user.language);
  const userToken = useAppSelector(state => state.user.token);
  const dispatch = useAppDispatch();
  const getLang = useCallback(async () => {
    let lang = await AsyncStorage.getItem(AppLanguage);
    if (lang != null) {
      i18n.changeLanguage(lang).then();
      if (lang === 'en') {
        I18nManager.forceRTL(false);
      }

      dispatch(setLanguage(lang as Locale));
    } else {
      i18n.changeLanguage('en').then();
    }
  }, [dispatch]);

  useEffect(() => {
    getLang().then();
  }, [getLang]);

  const initializeZoho = () => {
    ZohoSalesIQ.setThemeColorforiOS('red');
    ZohoSalesIQ.initWithCallback(
      ZohoAppKey,
      Platform.OS === 'ios' ? ZohoIOSAccessKey : ZohoAndroidAccessKey,
      success => {
        console.log('checkZoho', success);
        if (success) {
          console.log('trueZoho', success);
          ZohoSalesIQ.setLauncherVisibility(true);
          ZohoSalesIQ.Launcher.show(ZohoSalesIQ.Launcher.VisibilityMode.ALWAYS);
          ZohoSalesIQ.setLanguage(Language);
        }
      },
    );
  };

  useEffect(() => {
    setTimeout(() => {
      initializeZoho();
    }, 3000);
  }, [Language]);

  return <>{userToken ? <MainStackScreen /> : <AuthStackScreen />}</>;
};

export default AppLoader;
