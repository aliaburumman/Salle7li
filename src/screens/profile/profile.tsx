import {
  Button,
  CircleIcon,
  CloseIcon,
  FavouriteIcon,
  HStack,
  Image,
  InfoIcon,
  MinusIcon,
  PlayIcon,
  QuestionIcon,
  ScrollView,
  Stack,
  Text,
  ThreeDotsIcon,
  View,
} from 'native-base';
import {
  bgColorMain,
  profilePicture,
  salle7liLogo,
} from '../getStarted/started.tsx';
import {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import '../../i18n/i18n.ts';
import {useAppSelector} from '../../app/hooks.ts';
import Icon from 'react-native-vector-icons/FontAwesome.js';

function Profile({navigation}: any) {
  const themeCheck = useAppSelector(state => state.theme.lightMode);

  const {t, i18n} = useTranslation();
  return (
    <View
      bgColor={themeCheck ? 'white' : bgColorMain}
      flex={1}
      flexDirection={'column'}
      justifyContent={'space-evenly'}>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View alignItems={'center'} width={'full'} justifyContent={'center'}>
          <Text
            color={!themeCheck ? 'white' : bgColorMain}
            fontWeight={'bold'}
            fontSize={'3xl'}>
            {t('profile:profile')}
          </Text>
          <View
            bgColor={!themeCheck ? 'white' : bgColorMain}
            paddingTop={'5'}
            paddingBottom={'5'}
            width={'full'}
            justifyContent={'space-evenly'}
            flexDirection={'row'}>
            <View
              width={'100'}
              height={'100'}
              borderRadius={'50'}
              overflow={'hidden'}
              borderWidth={2}
              borderColor={'black'}>
              <Image
                source={profilePicture}
                width={'100%'}
                height={'100%'}
                resizeMode={'cover'}
              />
            </View>
            <View justifyContent={'space-evenly'}>
              <Text color={themeCheck ? 'white' : bgColorMain}>
                Ali Aburumman
              </Text>
              <View flexDirection={'row'}>
                <View marginRight={'0.5'}>
                  <Icon
                    name="star"
                    color={themeCheck ? 'white' : bgColorMain}
                  />
                </View>
                <View marginRight={'0.5'}>
                  <Icon
                    name="star"
                    color={themeCheck ? 'white' : bgColorMain}
                  />
                </View>
                <View marginRight={'0.5'}>
                  <Icon
                    name="star"
                    color={themeCheck ? 'white' : bgColorMain}
                  />
                </View>
                <View marginRight={'0.5'}>
                  <Icon
                    name="star"
                    color={themeCheck ? 'white' : bgColorMain}
                  />
                </View>
                <View marginRight={'0.5'}>
                  <Icon
                    name="star"
                    color={themeCheck ? 'white' : bgColorMain}
                  />
                </View>
              </View>
            </View>
          </View>

          <Stack space={7} width={'5/6'} marginTop={'10'}>
            <Button
              borderRadius={'3xl'}
              bgColor={!themeCheck ? 'white' : bgColorMain}
              onPress={() => navigation.navigate('personalInformation')}>
              <View flexDirection={'row'} justifyContent={'space-between'}>
                <View width={'5/6'}>
                  <Text
                    color={themeCheck ? 'white' : bgColorMain}
                    alignSelf={'center'}
                    paddingLeft={'10'}>
                    {' '}
                    {t('profile:personalInfo')}
                  </Text>
                </View>
                <View
                  justifyContent={'center'}
                  alignItems={'flex-end'}
                  width={'1/6'}>
                  <Icon
                    name="info-circle"
                    color={themeCheck ? 'white' : bgColorMain}
                    size={20}
                  />
                </View>
              </View>
            </Button>
            <Button
              borderRadius={'3xl'}
              bgColor={!themeCheck ? 'white' : bgColorMain}
              onPress={() => navigation.navigate('AppearanceSettings')}>
              <View flexDirection={'row'} justifyContent={'space-between'}>
                <View width={'5/6'}>
                  <Text
                    color={themeCheck ? 'white' : bgColorMain}
                    alignSelf={'center'}
                    paddingLeft={'10'}>
                    {t('appsett')}
                  </Text>
                </View>
                <View
                  justifyContent={'center'}
                  alignItems={'flex-end'}
                  width={'1/6'}>
                  <Icon
                    name="exchange"
                    color={themeCheck ? 'white' : bgColorMain}
                    size={20}
                  />
                </View>
              </View>
            </Button>
            <Button
              borderRadius={'3xl'}
              bgColor={!themeCheck ? 'white' : bgColorMain}>
              <View flexDirection={'row'} justifyContent={'space-between'}>
                <View width={'5/6'}>
                  <Text
                    color={themeCheck ? 'white' : bgColorMain}
                    alignSelf={'center'}
                    paddingLeft={'10'}
                    onPress={() => {
                      navigation.navigate('changePassword');
                    }}>
                    {t('profile:changePass')}
                  </Text>
                </View>
                <View
                  justifyContent={'center'}
                  alignItems={'flex-end'}
                  width={'1/6'}>
                  <Icon
                    name="lock"
                    color={themeCheck ? 'white' : bgColorMain}
                    size={20}
                  />
                </View>
              </View>
            </Button>
            <Button
              borderRadius={'3xl'}
              bgColor={!themeCheck ? 'white' : bgColorMain}>
              <View flexDirection={'row'} justifyContent={'space-between'}>
                <View width={'5/6'}>
                  <Text
                    color={themeCheck ? 'white' : bgColorMain}
                    alignSelf={'center'}
                    paddingLeft={'10'}>
                    {t('profile:serviceHistory')}
                  </Text>
                </View>
                <View
                  justifyContent={'center'}
                  alignItems={'flex-end'}
                  width={'1/6'}>
                  <Icon
                    name="clock-o"
                    color={themeCheck ? 'white' : bgColorMain}
                    size={20}
                  />
                </View>
              </View>
            </Button>
            <Button
              borderRadius={'3xl'}
              bgColor={!themeCheck ? 'white' : bgColorMain}>
              <View flexDirection={'row'} justifyContent={'space-between'}>
                <View width={'5/6'}>
                  <Text
                    color={themeCheck ? 'white' : bgColorMain}
                    alignSelf={'center'}
                    paddingLeft={'10'}>
                    {t('profile:help')}
                  </Text>
                </View>
                <View
                  justifyContent={'center'}
                  alignItems={'flex-end'}
                  width={'1/6'}>
                  <Icon
                    name="question"
                    color={themeCheck ? 'white' : bgColorMain}
                    size={20}
                  />
                </View>
              </View>
            </Button>
            <Button
              borderRadius={'3xl'}
              bgColor={!themeCheck ? 'white' : bgColorMain}
              onPress={()=>{navigation.navigate('applyToBeWorker')}}>
              <View flexDirection={'row'} justifyContent={'space-between'}>
                <View width={'5/6'}>
                  <Text
                    color={themeCheck ? 'white' : bgColorMain}
                    alignSelf={'center'}
                    paddingLeft={'10'}>
                    {t('profile:applyWorker')}
                  </Text>
                </View>
                <View
                  justifyContent={'center'}
                  alignItems={'flex-end'}
                  width={'1/6'}>
                  <Icon
                    name="play"
                    color={themeCheck ? 'white' : bgColorMain}
                    size={20}
                  />
                </View>
              </View>
            </Button>
            <Button
              borderRadius={'3xl'}
              bgColor={!themeCheck ? 'white' : bgColorMain}>
              <View flexDirection={'row'} justifyContent={'space-between'}>
                <View width={'5/6'}>
                  <Text
                    color={themeCheck ? 'white' : bgColorMain}
                    alignSelf={'center'}
                    paddingLeft={'10'}>
                    {t('profile:logout')}
                  </Text>
                </View>
                <View
                  justifyContent={'center'}
                  alignItems={'flex-end'}
                  width={'1/6'}>
                  <Icon
                    name="close"
                    color={themeCheck ? 'white' : bgColorMain}
                    size={20}
                  />
                </View>
              </View>
            </Button>
          </Stack>
        </View>
        <View alignItems={'center'} marginTop={'10'}>
          <Image source={salle7liLogo} width={20} height={90} />
        </View>
      </ScrollView>
    </View>
  );
}

export default Profile;
