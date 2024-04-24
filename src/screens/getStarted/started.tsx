import { Box } from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Image,
  Text,
  View,
  Pressable,
  Animated,
  SafeAreaView,
} from 'react-native';
export const salle7liLogo = require('../../assets/Salle7liLogo.png');
export const jordanFlag = require('../../assets/jordanFlag.png');
export const homeImage = require('../../assets/Maintenance2.jpg');
export const electrician = require('../../assets/electrician.jpg');
export const plumber = require('../../assets/plumber.jpg');
export const blacksmith = require('../../assets/Blacksmiths.jpg');
export const carpenter = require('../../assets/carpenter.jpg');
export const profilePicture = require('../../assets/Ali.jpg');
export const bgColorMain = '#0b104a';

const Started = ({navigation}:any) => {
  const fadeInAnim = useRef(new Animated.Value(0)).current;
  const fadeOutAnim = useRef(new Animated.Value(1)).current;

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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: bgColorMain,
      }}>
      <View>
        <Image source={salle7liLogo} style={{width: 300, height: 400}} alt='salle7li' />
      </View>

      <View>
        <SafeAreaView>
          <Animated.View
            style={{
              opacity: fadeOutAnim,
            }}>
            {
              <Text style={{color: 'white'}}>
                {t(`welcomeSalle7li`)}
              </Text>
            }
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
  );
};

export default Started;
