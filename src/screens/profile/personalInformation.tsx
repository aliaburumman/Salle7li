import {
  Box,
  HStack,
  VStack,
  Text,
  useColorModeValue,
  Image,
  Button,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react';
import {useAppSelector} from '../../app/hooks';
import {useGetUserProfileQuery} from '../../data/profile/profile';
import Loading from '../../components/Loading/Loading';
import {bgColorMain, salle7liLogo} from '../getStarted/started';
import { t } from 'i18next';


const PersonalInformation = ({navigation}: any) => {
  const themeCheck = useAppSelector(state => state.user.theme);
  const user = useAppSelector(state => state.user.userId);
  const {data, isLoading, error} = useGetUserProfileQuery({userId: user});
  if (isLoading) return <Loading />;

  return (
    <VStack
      flex={1}
      bgColor={themeCheck=='dark' ? bgColorMain : 'white'}
      space={4}
      px={4}
      py={2}
      justifyContent="center">
      {data && (
        <>
          <InfoItem
            icon="person"
            label={t("fname")}
            checkTheme='bright'
            value={data.firstName}
          />
          <InfoItem
            icon="person-outline"
            label={t("lname")}
            checkTheme='bright'
            value={data.lastName}
          />
          <InfoItem icon="mail" label={t("email")} checkTheme='bright' value={data.email} />
          <InfoItem
            icon="phone"
            label={t("num")}
            checkTheme='bright'
            value={data.phoneNumber}
          />
          <InfoItem
            icon="gender"
            label={t("login:selectGender")}
            checkTheme='bright'
            value={data.gender}
          />
          <InfoItem
            icon="location-city"
            label={t("city")}
            checkTheme='bright'
            value={data.city}
          />
        </>
      )}
      <Button
        bgColor={themeCheck=='dark' ? 'white' : bgColorMain}
        onPress={() => navigation.navigate('updateInfo', {userData: data})}>
        <Text color={'red.600'}>{t("changeInfo")}</Text>
      </Button>
      <Image
        source={salle7liLogo}
        alignSelf={'center'}
        marginTop={'1/5'}
        alt=""
        width={'1/4'}
        height={'1/4'}
      />
    </VStack>
  );
};

const InfoItem = ({checkTheme, label, value}: any) => {
  const textColor = useColorModeValue('blueGray.800', 'white');
  const borderColor = useColorModeValue('coolGray.300', 'coolGray.600');

  return (
    <HStack
      alignItems="center"
      borderWidth={1}
      borderColor={borderColor}
      p={3}
      rounded="md"
      space={3}>
      <Icon name="circle" size={20} color={'red.600'} />
      <Text
        fontSize="sm"
        fontWeight="bold"
        color={checkTheme=='dark' ? bgColorMain : 'white'}>
        {label}:
      </Text>
      <Text color={'red.500'} flex={1} textAlign="right">
        {value}
      </Text>
    </HStack>
  );
};

export default PersonalInformation;
