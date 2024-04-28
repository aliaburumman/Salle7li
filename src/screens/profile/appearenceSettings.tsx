import {Radio, Stack, Switch, Text, View} from 'native-base';
import React, {useEffect, useState} from 'react';
import {bgColorMain} from '../getStarted/started';
import {t} from 'i18next';
import i18n from '../../i18n/i18n';
import {useDispatch} from 'react-redux';
import {implementLanguage} from '../../app/slices/languageSlice';
import { isEnabled } from 'react-native/Libraries/Performance/Systrace';
import { useAppSelector } from '../../app/hooks';
import { implementTheme } from '../../app/slices/themeSlice';

const AppearenceSettings = () => {
    const LanguageCheck = useAppSelector(state => state.language.isArabic);
    const themeCheck = useAppSelector(state=>state.theme.lightMode)
    const dispatch = useDispatch();


  return (
    <View bgColor={themeCheck?'white':bgColorMain} flex={1} flexDirection={'column'}>
      <View>
        
          <Text color={!themeCheck?'white':bgColorMain}>{t('language')}</Text>
        
        <Radio.Group
                  name="myRadioGroup"
                  accessibilityLabel="favorite number"
                  defaultValue={LanguageCheck?"Arabic":"English"}
                  onChange={() => {
                    dispatch(implementLanguage(!LanguageCheck))
                  }}>
                  <Stack direction="row" alignSelf={'center'} space={4}>
                    <Radio value="English" colorScheme={'darkBlue'} my={1}>
                      <Text color={!themeCheck?'white':bgColorMain}> {t('english')} </Text>
                    </Radio>
                    <Radio value="Arabic" colorScheme={'pink'} my={1}>
                      <Text color={!themeCheck?'white':bgColorMain}> {t('arabic')}</Text>
                    </Radio>
                    
                  </Stack>
                </Radio.Group>
      </View>
      <View>
        
          <Text color={!themeCheck?'white':bgColorMain}>{t('appearance')}</Text>
        
        <Radio.Group
                  name="myRadioGroup2"
                  accessibilityLabel="favorite number"
                  defaultValue={themeCheck?"Light":"Dark"}
                  onChange={() => {
                    dispatch(implementTheme(!themeCheck))
                  }}>
                  <Stack direction="row" alignSelf={'center'} space={4}>
                    <Radio value="Dark" colorScheme={'darkBlue'} my={1}>
                      <Text color={!themeCheck?'white':bgColorMain}> {t('dark')} </Text>
                    </Radio> 
                    <Radio value="Light" colorScheme={'pink'} my={1}>
                      <Text color={!themeCheck?'white':bgColorMain}> {t('light')}</Text>
                    </Radio>
                    
                  </Stack>
                </Radio.Group>
      </View>
    </View>
  );
};

export default AppearenceSettings;
