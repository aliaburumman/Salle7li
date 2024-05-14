import {Box, Button, HStack, Stack, Text, VStack, View} from 'native-base';
import React, {SetStateAction, useEffect} from 'react';
import {bgColorMain} from '../getStarted/started';
import {useAppSelector} from '../../app/hooks';
import {useDispatch} from 'react-redux';
import {implementRead} from '../../app/slices/notificationsSlice';
import {useNavigation} from '@react-navigation/native';

const Notifications = () => {
  const themeCheck = useAppSelector(state => state.theme.lightMode);
  const isReadCheck = useAppSelector(state => state.read.isRead);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const notifications = [
    {
      id: 1,
      title: 'System Update',
      message: 'Your system will restart at 2:00 AM for updates.',
      time: 'Just now',
    },
    {
      id: 2,
      title: 'Welcome!',
      message: 'Thank you for joining our platform.',
      time: 'Yesterday',
    },
  ];
  useEffect(() => {
    if (!isReadCheck) {
      dispatch(implementRead(true));
    }
  }, []);
  return (
    <View flex={1} bgColor={themeCheck ? 'white' : bgColorMain}>
      <Stack space={4} p="5">
        {notifications.map(notification => (
          <Box
            key={notification.id}
            bgColor={!themeCheck ? 'white' : bgColorMain}
            p="4"
            rounded="md"
            shadow="3"
            borderRadius={'xl'}>
            <VStack space={3}>
              <Text
                color={isReadCheck ? 'gray.200' : 'red.400'}
                fontSize="md"
                bold>
                {notification.title}
              </Text>
              <Text color="red.400">{notification.message}</Text>
              <HStack justifyContent="space-between" alignItems="center">
                <Text fontSize="xs" color="red.400">
                  {notification.time}
                </Text>
              </HStack>
            </VStack>
          </Box>
        ))}
      </Stack>
    </View>
  );
};

export default Notifications;
