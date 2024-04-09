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
  cleaning,
  homeImage,
  landscape,
  renovation,
  salle7liLogo,
} from '../getStarted/started';
import {ImageBackground} from 'react-native';
import CardComp from '../../components/card';

const HomeScreen = () => {
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
                <Button bgColor={'white'} borderRadius={'full'}>
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
                  Welcome Ali
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
                Service Category
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
                <CardComp text={'Cleaning'} imageSrc={cleaning} />
                <CardComp text={'Landscape'} imageSrc={landscape} />
                <CardComp text={'Renovation'} imageSrc={renovation} />
                <CardComp text={'Carpenter'} imageSrc={carpenter} />
                <CardComp text={'Blacksmith'} imageSrc={blacksmith} />
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
                <CardComp text={'Cleaning'} imageSrc={cleaning} />
                <CardComp text={'Landscape'} imageSrc={landscape} />
                <CardComp text={'Renovation'} imageSrc={renovation} />
                <CardComp text={'Carpenter'} imageSrc={carpenter} />
                <CardComp text={'Blacksmith'} imageSrc={blacksmith} />
              </ScrollView>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
