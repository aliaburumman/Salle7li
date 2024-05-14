import React, {useRef, useState} from 'react';
import {
  Box,
  Button,
  Text,
  AlertDialog,
  useTheme,
  ScrollView,
  Stack,
} from 'native-base';
import {bgColorMain} from '../screens/getStarted/started';
import {useAppSelector} from '../app/hooks';
import {useTranslation} from 'react-i18next';

interface Props {
  closeAlertDialog: () => void;
  approveAlertDialog?: () => void;
  title: string;
  bodyTitle: string;
  isAlertDialogVisible: boolean;
  price?: string;
  time?: string;
  rating?: string;
}
const getIcon: (icon: (props: any) => JSX.Element) => JSX.Element = Icon => {
  return <Icon alignItems={'center'} alignSelf={'center'} color={'red'} />;
};
const AlertDialogComponent: React.FC<Props> = ({
  bodyTitle,
  isAlertDialogVisible,
  price,
  closeAlertDialog,
  approveAlertDialog,
  time,
  rating,
  title,
}) => {
  const cancelRef = useRef(null);
  const themeCheck = useAppSelector(state => state.theme.lightMode);
  const {t, i18n} = useTranslation();
  return (
    <AlertDialog
      isOpen={isAlertDialogVisible}
      onClose={closeAlertDialog}
      leastDestructiveRef={cancelRef}>
      <AlertDialog.Content
        backgroundColor={!themeCheck ? 'white' : bgColorMain}
        width={350}
        height={350}
        borderRadius={16}
        justifyContent="space-around"
        alignItems="center"
        marginRight={5}
        marginLeft={5}
        paddingTop={5}
        paddingBottom={5}
        paddingLeft={3}
        paddingRight={3}>
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
          <Text color={themeCheck ? 'white' : bgColorMain}>{bodyTitle}</Text>
        </Box>
        <Box
          width="100%"
          flexDirection="row"
          justifyContent="flex-end"
          marginRight={'5'}>
          <Text color={'green.400'}>{price}</Text>
          <Text color={themeCheck ? 'white' : bgColorMain}>
            {time ? time : rating}
          </Text>
        </Box>
        <Box width={'100%'}>
          <Stack space={5}>
          <Button
            alignSelf={'center'}
            width={'5/6'}
            bgColor={themeCheck ? 'white' : bgColorMain}
            onPress={closeAlertDialog}>
            <Text color={'red.400'}>{t('close')}</Text>
          </Button>
          {approveAlertDialog&&<Button
            alignSelf={'center'}
            width={'5/6'}
            bgColor={'red.400'}
            onPress={approveAlertDialog}>
            <Text color={'white'}>{t('3abbi hon')}</Text>
          </Button>}
          </Stack>
        </Box>
      </AlertDialog.Content>
    </AlertDialog>
  );
};

export default AlertDialogComponent;
