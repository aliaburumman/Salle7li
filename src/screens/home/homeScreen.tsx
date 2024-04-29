import {
  ArrowBackIcon,
  Button,
  Card,
  Image,
  InfoOutlineIcon,
  ScrollView,
  Text,
  ThreeDotsIcon,
  View,
} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
import {
  bgColorMain,
  blacksmith,
  carpenter,
  electrician,
  homeImage,
  plumber,
  salle7liLogo,
} from '../getStarted/started';
import {ImageBackground} from 'react-native';
import CardComp from '../../components/card';
import BottomTabBar from '../../navigation/BottomTabBar';
import Icon from 'react-native-vector-icons/Ionicons.js';

import {useTranslation} from 'react-i18next';
import '../../i18n/i18n.ts';
import i18n from '../../i18n/i18n.ts';
import {useAppSelector} from '../../app/hooks.ts';
import AlertDialogComponent from '../../components/alertDialog.tsx';

const HomeScreen = ({navigation}: any) => {
  const themeCheck = useAppSelector(state => state.theme.lightMode);
  const [isAlertDialogPlumberVisible, setAlertIsDialogPlumberVisible] =
    useState(false);
  const [isAlertDialogCarpenterVisible, setAlertIsDialogCarpenterVisible] =
    useState(false);
  const [isAlertDialogBlackSmithVisible, setAlertIsDialogBlackSmithVisible] =
    useState(false);
  const [isAlertDialogElectricianVisible, setAlertIsDialogElectricianVisible] =
    useState(false);

  const [isAlertDialogForWorker1, setIsDialogForWorker1] = useState(false);
  const [isAlertDialogForWorker2, setIsDialogForWorker2] = useState(false);
  const [isAlertDialogForWorker3, setIsDialogForWorker3] = useState(false);
  const [isAlertDialogForWorker4, setIsDialogForWorker4] = useState(false);
  const [isAlertDialogForWorker5, setIsDialogForWorker5] = useState(false);

  const [isNewNotifications, setIsNewNotifications] = useState(true);
  const [notificationColor, setNotificationColor] = useState('#900');
  const [flashing, setFlashing] = useState(true);
  const flashInterval = useRef<NodeJS.Timeout | null>(null);

  const {t} = useTranslation();
  useEffect(() => {
    if (isNewNotifications && flashing) {
      flashInterval.current = setInterval(() => {
        setNotificationColor(prevColor =>
          prevColor === '#900' ? 'white' : '#900',
        );
      }, 1000);
    }

    return () => {
      if (flashInterval.current) {
        clearInterval(flashInterval.current);
      }
    };
  }, [isNewNotifications, flashing]);

  useEffect(() => {
    return () => {
      if (flashInterval.current) {
        clearInterval(flashInterval.current);
      }
    };
  }, []);
  return (
    <View bgColor={themeCheck ? 'white' : bgColorMain} flex={1}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View flex={1} flexDirection={'column'}>
          <View>
            <ImageBackground
              source={homeImage}
              style={{height: 300, borderRadius: 20, overflow: 'hidden'}}
              blurRadius={3}>
              <View
                flexDirection={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
                marginLeft={'2'}
                marginRight={'2'}>
                <View style={{borderRadius: 20}}>
                  <Image source={salle7liLogo} width={60} height={95} />
                </View>

                <Button
                  bgColor={notificationColor}
                  borderRadius={'full'}
                  onPress={() => {
                    setIsNewNotifications(false);
                    setFlashing(false);
                    if (flashInterval.current) {
                      clearInterval(flashInterval.current);
                    }
                    navigation.navigate('Notifications');
                  }}>
                  <Icon
                    name="notifications"
                    size={30}
                    color={notificationColor == 'white' ? '#900' : 'white'}
                  />
                </Button>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text fontSize={'4xl'} color={'white'} fontWeight={'bold'}>
                  {t('homeScreen:welcome')}
                </Text>
              </View>
            </ImageBackground>
          </View>

          <View marginTop={'10'} justifyContent={'space-evenly'}>
            <View
              flexDirection={'row'}
              paddingLeft={'1.5'}
              paddingRight={'1.5'}>
              <Text color={themeCheck ? bgColorMain : 'white'} fontSize={'2xl'}>
                {t('homeScreen:services')}
              </Text>
              <View
                bgColor={themeCheck ? bgColorMain : 'white'}
                height={'1'}
                flex={1}
                alignSelf={'center'}
                marginLeft={'2'}
                borderRadius={'full'}
              />
            </View>
            <View flexDirection={'row'} marginTop={'5'}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <Button
                  bgColor={!themeCheck ? bgColorMain : 'white'}
                  onPress={() => {
                    setAlertIsDialogPlumberVisible(true);
                  }}>
                  <CardComp text={t('plumber')} imageSrc={plumber} />
                </Button>
                <Button
                  bgColor={!themeCheck ? bgColorMain : 'white'}
                  onPress={() => {
                    setAlertIsDialogElectricianVisible(true);
                  }}>
                  <CardComp text={t('electrician')} imageSrc={electrician} />
                </Button>
                <Button
                  bgColor={!themeCheck ? bgColorMain : 'white'}
                  onPress={() => {
                    setAlertIsDialogBlackSmithVisible(true);
                  }}>
                  <CardComp text={t('blacksmiths')} imageSrc={blacksmith} />
                </Button>
                <Button
                  bgColor={!themeCheck ? bgColorMain : 'white'}
                  onPress={() => {
                    setAlertIsDialogCarpenterVisible(true);
                  }}>
                  <CardComp text={t('carpenter')} imageSrc={carpenter} />
                </Button>
              </ScrollView>
            </View>
          </View>

          <View marginTop={'10'} justifyContent={'space-evenly'}>
            <View
              flexDirection={'row'}
              paddingLeft={'1.5'}
              paddingRight={'1.5'}>
              <Text color={themeCheck ? bgColorMain : 'white'} fontSize={'2xl'}>
                Our Top Rated Workers
              </Text>
              <View
                bgColor={themeCheck ? bgColorMain : 'white'}
                height={'1'}
                flex={1}
                alignSelf={'center'}
                marginLeft={'2'}
                borderRadius={'full'}
              />
            </View>
            <View flexDirection={'row'} marginTop={'5'}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <Button
                  bgColor={!themeCheck ? bgColorMain : 'white'}
                  onPress={() => {
                    setIsDialogForWorker1(true);
                  }}>
                  <CardComp text={'Sweilem'} imageSrc={carpenter} />
                </Button>
                <Button
                  bgColor={!themeCheck ? bgColorMain : 'white'}
                  onPress={() => {
                    setIsDialogForWorker2(true);
                  }}>
                  <CardComp text={t('Nawwaf')} imageSrc={blacksmith} />
                </Button>
                <Button
                  bgColor={!themeCheck ? bgColorMain : 'white'}
                  onPress={() => {
                    setIsDialogForWorker3(true);
                  }}>
                  <CardComp text={t('Saleem')} imageSrc={blacksmith} />
                </Button>
                <Button
                  bgColor={!themeCheck ? bgColorMain : 'white'}
                  onPress={() => {
                    setIsDialogForWorker4(true);
                  }}>
                  <CardComp text={t('Yasmine')} imageSrc={blacksmith} />
                </Button>
                <Button
                  bgColor={!themeCheck ? bgColorMain : 'white'}
                  onPress={() => {
                    setIsDialogForWorker5(true);
                  }}>
                  <CardComp text={t('Leen')} imageSrc={blacksmith} />
                </Button>
              </ScrollView>
            </View>
          </View>
        </View>
      </ScrollView>
      <BottomTabBar />
      <AlertDialogComponent
        isAlertDialogVisible={isAlertDialogPlumberVisible}
        closeAlertDialog={() => {
          setAlertIsDialogPlumberVisible(false);
        }}
        title={t('plumber')}
        bodyTitle={t('plumdesc')}
        price={t('price')}
        time={t('time')}

      />
      <AlertDialogComponent
        isAlertDialogVisible={isAlertDialogElectricianVisible}
        closeAlertDialog={() => {
          setAlertIsDialogElectricianVisible(false);
        }}
        title={t('electrician')}
        bodyTitle={t('electdesc')}
        price={t('price')}
        time={t('time')}

      />
      <AlertDialogComponent
        isAlertDialogVisible={isAlertDialogBlackSmithVisible}
        closeAlertDialog={() => {
          setAlertIsDialogBlackSmithVisible(false);
        }}
        title={t('blacksmiths')}
        bodyTitle={t('blacksmithsdesc')}
        price={t('price')}
        time={t('time')}

      />
      <AlertDialogComponent
        isAlertDialogVisible={isAlertDialogCarpenterVisible}
        closeAlertDialog={() => {
          setAlertIsDialogCarpenterVisible(false);
        }}
        title={t('carpenter')}
        bodyTitle={t('carpdesc')}
        time={t('time')}
        price={t('price')}
      />
      <AlertDialogComponent
        isAlertDialogVisible={isAlertDialogForWorker1}
        closeAlertDialog={() => {
          setIsDialogForWorker1(false);
        }}
        title={"etrokeh fadi"}
        bodyTitle={"etrokeh fadi"}
        rating='Rating: 4.8'
      />
    </View>
  );
};

export default HomeScreen;
