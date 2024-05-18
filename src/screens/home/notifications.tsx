import React, { useEffect } from 'react';
import { Box, HStack, Stack, Text, View } from 'native-base';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { implementRead, setVisited } from '../../app/slices/notificationsSlice';
import { bgColorMain } from '../getStarted/started';
import { t } from 'i18next';

const Notifications = () => {
  
  const notifications = [
    {
      id: 1,
      title: t('notification:notif1'),
      message: t('notification:notif1desc'),
      time: t('notification:time1'),
    },
    {
      id: 2,
      title: t('notification:notif2'),
      message: t('notification:notif2desc'),
      time: t('notification:time2'),
    },
  ];

  const { theme, isRead } = useAppSelector(state => ({
    theme: state.user.theme,
    isRead: state.read.isRead,
  }));


  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isRead) {
      dispatch(implementRead(true));
    }
    dispatch(setVisited());
  }, [dispatch, isRead]);

  return (
    <View flex={1} bgColor={theme === 'dark' ? 'white' : bgColorMain}>
      <Stack space={4} p="5">
        {notifications.map(notification => (
          <Box key={notification.id} bgColor={theme === 'bright' ? 'white' : bgColorMain} p="4" rounded="md" shadow="3" borderRadius="xl">
            <Stack space={3}>
              <Text color={isRead ? 'gray.200' : 'red.400'} fontSize="md" bold>
                {notification.title}
              </Text>
              <Text color={isRead ? 'gray.200' : 'red.400'}>{notification.message}</Text>
              <HStack justifyContent="space-between" alignItems="center">
                <Text fontSize="xs" color={isRead ? 'gray.200' : 'red.400'}>
                  {notification.time}
                </Text>
              </HStack>
            </Stack>
          </Box>
        ))}
      </Stack>
    </View>
  );
};

export default React.memo(Notifications);
