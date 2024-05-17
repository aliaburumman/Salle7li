import React from 'react';
import { View, Text, VStack, Box, HStack, Icon, Divider } from 'native-base';
import { bgColorMain } from '../getStarted/started';
import { useAppSelector } from '../../app/hooks';
import { useGetWorkerQuery } from '../../data/home/home';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import IconEntypo from 'react-native-vector-icons/Entypo';

import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconAntDesign from 'react-native-vector-icons/AntDesign';


const OrderSummary = ({ route }: any) => {
  const { values, worker } = route.params;
  const { data: workerData, isLoading } = useGetWorkerQuery({ workerId: worker });
  const themeCheck = useAppSelector(state => state.user.theme);

  if (isLoading) {
    return <View flex={1} bgColor={themeCheck=='dark' ? 'white' : bgColorMain} alignItems="center" justifyContent="center">
      <Text>Loading...</Text>
    </View>;
  }

  return (
    <View flex={1} p="5" bgColor={themeCheck=='dark' ? 'white' : bgColorMain}>
      <VStack space={5}>

        <Box bg={themeCheck=='bright' ? 'blueGray.50' : 'blueGray.700'} p="4" rounded="md">
          <Text fontSize="xl" bold color={themeCheck=='bright' ? 'coolGray.900' : 'white'}>Order Details</Text>
          <Divider my="2" />
          <HStack space={2} alignItems="center">
            <IconFontisto name="date" color={themeCheck=='bright' ? 'coolGray.900' : 'white'} />
            <Text color={themeCheck=='bright' ? 'coolGray.600' : 'coolGray.200'}>Date: {values.date}</Text>
          </HStack>
          <HStack space={2} alignItems="center" mt="2">
            <IconEntypo name="time-slot" color={themeCheck=='bright' ? 'coolGray.800' : 'white'} />
            <Text color={themeCheck=='bright' ? 'coolGray.600' : 'coolGray.200'}>
              Service Time: {values.startTime} to {values.endTime}
            </Text>
          </HStack>
          <HStack space={2} alignItems="center" mt="2">
            <IconMaterialIcons name="settings-suggest" color={themeCheck=='bright' ? 'coolGray.800' : 'white'} />
            <Text color={themeCheck=='bright' ? 'coolGray.600' : 'coolGray.200'}>Service: {values.service}</Text>
          </HStack>
          <HStack space={2} alignItems="center" mt="2">
            <IconMaterialIcons name="payment" color={themeCheck=='bright' ? 'coolGray.800' : 'white'} />
            <Text color={themeCheck=='bright' ? 'coolGray.600' : 'coolGray.200'}>Payment Method: {values.paymentMethod}</Text>
          </HStack>
          <HStack space={2} alignItems="center" mt="2">
            <IconMaterialIcons name="details" color={themeCheck=='bright'? 'coolGray.800' : 'white'} />
            <Text color={themeCheck=='bright' ? 'coolGray.600' : 'coolGray.200'}>Problem Details: {values.problemDetails}</Text>
          </HStack>
        </Box>

        <Box bg={themeCheck=='bright' ? 'blueGray.50' : 'blueGray.700'} p="4" rounded="md">
          <Text fontSize="xl" bold color={themeCheck=='bright' ? 'coolGray.800' : 'white'}>Worker Details</Text>
          <Divider my="2" />
          <HStack space={2} alignItems="center">
            <IconAntDesign name="user" color={themeCheck=='dark' ? 'coolGray.800' : 'white'} />
            <Text color={themeCheck=='bright' ? 'coolGray.600' : 'coolGray.200'}>
              Name: {workerData.firstName} {workerData.lastName}
            </Text>
          </HStack>
        </Box>

      </VStack>
    </View>
  );
};

export default OrderSummary;