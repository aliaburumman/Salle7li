import {Box, Button} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Image,
  Text,
  View,
  Pressable,
  Animated,
  SafeAreaView,
  I18nManager,
} from 'react-native';
import RNRestart from 'react-native-restart';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import { setLanguage } from '../../app/slices/slice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppLanguage } from '../../constants/storageKeys';
export const salle7liLogo = require('../../assets/Salle7liLogo.png');
export const jordanFlag = require('../../assets/jordanFlag.png');
export const empty = require('../../assets/empty.png');
export const homeImage = require('../../assets/Maintenance2.jpg');
export const electrician = require('../../assets/electrician.jpg');
export const plumber = require('../../assets/plumber.jpg');
export const blacksmith = require('../../assets/Blacksmiths.jpg');
export const carpenter = require('../../assets/carpenter.jpg');
export const profilePicture = require('../../assets/Ali.jpg');
export const zaid = require('../../components/Loading/photos/zaid.jpg');
export const abd = require('../../components/Loading/photos/abd.jpg');
export const ziq = require('../../components/Loading/photos/ziq.jpg');
export const waleed = require('../../components/Loading/photos/waleed.jpg');
export const brother = require('../../components/Loading/photos/brother.jpg');
export const tema = require('../../components/Loading/photos/tema.jpg');
export const ahmad = require('../../components/Loading/photos/ahmad.jpg');
export const rania = require('../../components/Loading/photos/rania.jpg');
export const ghita = require('../../components/Loading/photos/ghita.jpg');
export const maria = require('../../components/Loading/photos/maria.jpg');
export const bgColorMain = '#0b104a';

export const wroker = [ahmad,waleed, ziq,brother, abd];
export const w0rker= [maria,rania,ghita,tema]
const Started = ({navigation}: any) => {
  const fadeInAnim = useRef(new Animated.Value(0)).current;
  const fadeOutAnim = useRef(new Animated.Value(1)).current;
  const language = useAppSelector(state => state.user.language);
  const dispatch =useAppDispatch();
  const fadeIn = () => {
    Animated.timing(fadeInAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeOutAnim, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      fadeIn();
    });
  };

  const onChange = async () => {
    const newLang = language === 'en' ? 'ar' : 'en';
    dispatch(setLanguage(newLang));
   
   
    await AsyncStorage.setItem(AppLanguage, newLang);
    const isRTL = newLang === 'ar';
    I18nManager.forceRTL(isRTL);
    RNRestart.Restart();
  };

  const {t} = useTranslation();
  console.log(t(`welcomeSalle7li`));

  const [isStarted, setIsStarted] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      fadeOut();
      setIsStarted(true);
    }, 5000);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',

        backgroundColor: bgColorMain,
      }}>
      <Button alignSelf="flex-end" margin="30" bgColor={'red.500'} onPress={()=>onChange()}>
        <Text style={{color: 'white'}}>
          {language == 'ar' ? 'English' : 'العربية'}
        </Text>
      </Button>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View>
          <Image
            source={salle7liLogo}
            style={{width: 300, height: 400}}
            alt="salle7li"
          />
        </View>

        <View>
          <SafeAreaView>
            <Animated.View
              style={{
                opacity: fadeOutAnim,
              }}>
              {<Text style={{color: 'white'}}>{t(`welcomeSalle7li`)}</Text>}
            </Animated.View>

            <Animated.View
              style={{
                opacity: fadeInAnim,
              }}>
              <Pressable
                style={{
                  backgroundColor: 'white',
                  padding: 10,
                  borderRadius: 20,
                  alignItems: 'center',
                }}
                onPress={() => navigation.navigate('Login')}>
                <Text style={{color: '#0b104a'}}>{t('getStarted')}</Text>
              </Pressable>
            </Animated.View>
          </SafeAreaView>
        </View>
      </View>
    </View>
  );
};

export default Started;
