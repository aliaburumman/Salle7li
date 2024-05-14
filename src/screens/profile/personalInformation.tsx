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

const PersonalInformation = ({navigation}: any) => {
  const themeCheck = useAppSelector(state => state.theme.lightMode);
  const user = useAppSelector(state => state.user.userId);
  const {data, isLoading, error} = useGetUserProfileQuery({userId: user});
  if (isLoading) return <Loading />;

  return (
    <VStack
      flex={1}
      bgColor={!themeCheck ? bgColorMain : 'white'}
      space={4}
      px={4}
      py={2}
      justifyContent="center">
      {data && (
        <>
          <InfoItem
            icon="person"
            label="First Name"
            checkTheme
            value={data.firstName}
          />
          <InfoItem
            icon="person-outline"
            label="Last Name"
            checkTheme
            value={data.lastName}
          />
          <InfoItem icon="mail" label="Email" checkTheme value={data.email} />
          <InfoItem
            icon="phone"
            label="Phone Number"
            checkTheme
            value={data.phoneNumber}
          />
          <InfoItem
            icon="gender"
            label="Gender"
            checkTheme
            value={data.gender}
          />
          <InfoItem
            icon="location-city"
            label="City"
            checkTheme
            value={data.city}
          />
        </>
      )}
      <Button
        bgColor={!themeCheck ? 'white' : bgColorMain}
        onPress={() => navigation.navigate('updateInfo', {userData: data})}>
        <Text color={'red.600'}>Change Info</Text>
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
        color={!checkTheme ? bgColorMain : 'white'}>
        {label}:
      </Text>
      <Text color={'red.500'} flex={1} textAlign="right">
        {value}
      </Text>
    </HStack>
  );
};

export default PersonalInformation;
