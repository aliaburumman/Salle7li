import React from 'react';
import {Radio, Stack, Text, Heading, Box} from 'native-base';
import {useAppSelector, useAppDispatch} from '../../app/hooks';
import {t} from 'i18next';
import {bgColorMain} from '../getStarted/started';
import {implementTheme} from '../../app/slices/themeSlice';
import {setLanguage, setTheme} from '../../app/slices/slice';
import {AppLanguage} from '../../constants/storageKeys';
import {I18nManager} from 'react-native';
import RNRestart from 'react-native-restart';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppearanceSettings = () => {
  const language = useAppSelector(state => state.user.language);
  const themeCheck = useAppSelector(state => state.user.theme);
  const dispatch = useAppDispatch();

  const bgColor = themeCheck ? 'white' : bgColorMain;
  const textColor = themeCheck ? bgColorMain : 'white';

  const onChangeLanguage = async () => {
    const newLang = language === 'en' ? 'ar' : 'en';
    dispatch(setLanguage(newLang));

    await AsyncStorage.setItem(AppLanguage, newLang);
    const isRTL = newLang === 'ar';
    I18nManager.forceRTL(isRTL);
    RNRestart.Restart();
  };
  const onChangetheme = async () => {
    const newTheme = themeCheck === 'dark' ? 'bright' : 'dark';
    dispatch(setTheme(newTheme));

    await AsyncStorage.setItem('AppTheme', newTheme);

    RNRestart.Restart();
  };
  return (
    <Stack space={4} bgColor={bgColor} flex={1} px="4" py="3">
      <Box borderBottomWidth="1" borderColor="coolGray.200" pb="3">
        <Heading color={textColor} fontSize="md">
          {t('language')}
        </Heading>
        <Radio.Group
          name="languageGroup"
          accessibilityLabel="language selection"
          defaultValue={language == 'ar' ? 'Arabic' : 'English'}
          onChange={value => onChangeLanguage()}>
          <Stack direction="row" space={6} alignItems="center">
            <Radio value="English" colorScheme="blue">
              <Text color={themeCheck=='bright' ? 'white' : bgColorMain}>
                {t('english')}{' '}
              </Text>
            </Radio>
            <Radio value="Arabic" colorScheme="blue">
              <Text color={themeCheck=='bright' ? 'white' : bgColorMain}>
                {' '}
                {t('arabic')}
              </Text>
            </Radio>
          </Stack>
        </Radio.Group>
      </Box>
      <Box>
        <Heading color={themeCheck=='bright' ? 'white' : bgColorMain} fontSize="md">
          {t('appearance')}
        </Heading>
        <Radio.Group
          name="themeGroup"
          accessibilityLabel="theme selection"
          defaultValue={themeCheck=='dark' ? 'Light' : 'Dark'}
          onChange={value => onChangetheme()}>
          <Stack direction="row" space={6} alignItems="center">
            <Radio value="Dark" colorScheme="blue">
              <Text color={themeCheck=='bright' ? 'white' : bgColorMain}>
                {' '}
                {t('dark')}
              </Text>
            </Radio>
            <Radio value="Light" colorScheme="blue">
              <Text color={themeCheck=='bright' ? 'white' : bgColorMain}>
                {t('light')}
              </Text>
            </Radio>
          </Stack>
        </Radio.Group>
      </Box>
    </Stack>
  );
};

export default AppearanceSettings;
