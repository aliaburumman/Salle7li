import React from 'react';
import {Box, Spinner} from 'native-base';
import { bgColorMain } from '../../screens/getStarted/started';
import { useAppSelector } from '../../app/hooks';

const Loading = () => {
  const themeCheck = useAppSelector(state=> state.user.theme);
  return (
    <Box
      flex={1}
      backgroundColor={themeCheck=='bright'?"white":bgColorMain}
      justifyContent="center"
      alignItems="center">
      <Spinner size="sm" color={'red.500'} />
    </Box>
  );
};

export default Loading;
