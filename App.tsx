import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import i18n from './src/i18n/i18n';
import regist from './src/app/regist';
import AppLoader, { navigationRef } from './AppLoader';

const App = () => {
  return (
    <Provider store={regist}>
      <NativeBaseProvider>
        <I18nextProvider i18n={i18n}>
          <NavigationContainer ref={navigationRef}>
            <AppLoader />
          </NavigationContainer>
        </I18nextProvider>
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
