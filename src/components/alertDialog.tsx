import React, {useRef, useState} from 'react';
import {Box, Button, Text, AlertDialog, useTheme} from 'native-base';
import {bgColorMain} from '../screens/getStarted/started';
import { useAppSelector } from '../app/hooks';

interface Props {
  closeAlertDialog: () => void;
  title: string;
  bodyTitle: string;
  isAlertDialogVisible: boolean;
}
const getIcon: (icon: (props: any) => JSX.Element) => JSX.Element = Icon => {
  return <Icon alignItems={'center'} alignSelf={'center'} color={'red'} />;
};
const AlertDialogComponent: React.FC<Props> = ({

  bodyTitle,
  isAlertDialogVisible,

  closeAlertDialog,
  title,
}) => {
  const cancelRef = useRef(null);
  const themeCheck = useAppSelector(state => state.theme.lightMode);

  return (
    <AlertDialog
      isOpen={isAlertDialogVisible}
      onClose={closeAlertDialog}
      leastDestructiveRef={cancelRef}>
      <AlertDialog.Content
        backgroundColor={themeCheck ? 'white' : bgColorMain}
        width={300}
        height={300}
        borderRadius={16}
        justifyContent="space-around"
        alignItems="center"
        marginRight={5}
        marginLeft={5}
        paddingTop={5}
        paddingBottom={5}>
        <Text
          marginBottom={3}
          marginRight={10}
          marginLeft={10}
          fontWeight="500"
          textAlign="center"
          color={'red.400'}
          fontSize="2xl">
          {title}
        </Text>
        <Box
          width="100%"
          flexDirection="row"
          justifyContent="space-around"
          marginBottom={26}>
          <Text color={!themeCheck ? 'white' : bgColorMain}>{bodyTitle}</Text>
          
        </Box>
        <Box
          width="100%"
          flexDirection="row"
          justifyContent="flex-end"
          marginRight={'5'}>
            <Text color={'green.400'}>10 JOD </Text>
          <Text color={!themeCheck ? 'white' : bgColorMain}>/ hr</Text>
          
        </Box>
        <Box width={'100%'}>
            
          <Button alignSelf={'center'} width={'5/6'} bgColor={!themeCheck ? 'white' : bgColorMain} onPress={closeAlertDialog}>
            <Text color={'red.400'}>Close</Text>
          </Button>
        </Box>
      </AlertDialog.Content>
    </AlertDialog>
  );
};

export default AlertDialogComponent;
