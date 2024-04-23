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
import React from 'react';
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
import { useTranslation } from 'react-i18next';
import '../../i18n/i18n.ts';
import i18n from '../../i18n/i18n.ts';

const HomeScreen = () => {
  const { t } = useTranslation();
  return (
    <View bgColor={bgColorMain} flex={1}>
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
                <Button bgColor={'white'} borderRadius={'full'}onPress={()=>i18n.changeLanguage('ar')}>
                  <ThreeDotsIcon />
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
              <Text color={'white'} fontSize={'2xl'}>
              {t('homeScreen:services')}
              </Text>
              <View
                bgColor={'white'}
                height={'1'}
                flex={1}
                alignSelf={'center'}
                marginLeft={'2'}
                borderRadius={'full'}
              />
            </View>
            <View flexDirection={'row'} marginTop={'5'}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <CardComp text={t('plumber')} imageSrc={plumber} />
                <CardComp text={t('electrician')} imageSrc={electrician}/>
                <CardComp text={t('blacksmiths')} imageSrc={blacksmith} />
                <CardComp text={t('carpenter')} imageSrc={carpenter} />
              </ScrollView>
            </View>
          </View>

          <View marginTop={'10'} justifyContent={'space-evenly'}>
            <View
              flexDirection={'row'}
              paddingLeft={'1.5'}
              paddingRight={'1.5'}>
              <Text color={'white'} fontSize={'2xl'}>
                Our Workers
              </Text>
              <View
                bgColor={'white'}
                height={'1'}
                flex={1}
                alignSelf={'center'}
                marginLeft={'2'}
                borderRadius={'full'}
              />
            </View>
            <View flexDirection={'row'} marginTop={'5'}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <CardComp text={t('homeScreen:carpenter')} imageSrc={carpenter} />
                <CardComp text={t('homeScreen:blacksmith')} imageSrc={blacksmith} />
              </ScrollView>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
