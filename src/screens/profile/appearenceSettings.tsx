import React from 'react';
import { Radio, Stack, Text, Heading, Box } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome.js';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { t } from 'i18next';
import { bgColorMain } from '../getStarted/started';
import { implementLanguage } from '../../app/slices/languageSlice';
import { implementTheme } from '../../app/slices/themeSlice';

const AppearanceSettings = () => {
    const LanguageCheck = useAppSelector(state => state.language.isArabic);
    const themeCheck = useAppSelector(state => state.theme.lightMode);
    const dispatch = useAppDispatch();

    const bgColor = themeCheck ? 'white' : bgColorMain;
    const textColor = themeCheck ? bgColorMain : 'white';

    return (
        <Stack space={4} bgColor={bgColor} flex={1} px="4" py="3">
            
            <Box borderBottomWidth="1" borderColor="coolGray.200" pb="3">
                <Heading color={textColor} fontSize="md">
                    {t('language')}
                </Heading>
                <Radio.Group
                    name="languageGroup"
                    accessibilityLabel="language selection"
                    defaultValue={LanguageCheck ? "Arabic" : "English"}
                    onChange={(value) => {
                        dispatch(implementLanguage(!LanguageCheck))
                    }}
                >
                    <Stack direction="row" space={6} alignItems="center">
                        <Radio value="English" colorScheme="blue">
                            <Text color={!themeCheck?'white':bgColorMain}>{t('english')} </Text>
                        </Radio>
                        <Radio value="Arabic" colorScheme="blue">
                           <Text color={!themeCheck?'white':bgColorMain}> {t('arabic')}</Text>
                        </Radio>
                    </Stack>
                </Radio.Group>
            </Box>
            <Box>
                <Heading color={!themeCheck?'white':bgColorMain} fontSize="md">
                    {t('appearance')}
                </Heading>
                <Radio.Group
                    name="themeGroup"
                    accessibilityLabel="theme selection"
                    defaultValue={themeCheck ? "Light" : "Dark"}
                    onChange={(value) => {
                        dispatch(implementTheme(!themeCheck))
                    }}
                >
                    <Stack direction="row" space={6} alignItems="center">
                        <Radio value="Dark" colorScheme="blue">
                           <Text color={!themeCheck?'white':bgColorMain}> {t('dark')}</Text>
                        </Radio>
                        <Radio value="Light" colorScheme="blue">
                            <Text color={!themeCheck?'white':bgColorMain}>{t('light')}</Text>
                        </Radio>
                    </Stack>
                </Radio.Group>
            </Box>
        </Stack>
    );
};

export default AppearanceSettings;
