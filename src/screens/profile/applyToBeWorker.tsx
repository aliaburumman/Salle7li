import React from 'react';
import {Clipboard, Alert} from 'react-native';
import {Box, Button, HStack, Text, View} from 'native-base';
import {useAppSelector} from '../../app/hooks';
import {bgColorMain} from '../getStarted/started';
import Icon from 'react-native-vector-icons/FontAwesome';
import { t } from 'i18next';

const ApplyToBeWorker = () => {
  const themeCheck = useAppSelector(state => state.user.theme);

  const copyToClipboard = (text: string) => {
    Clipboard.setString(text);
    Alert.alert('Copied!', `Copied ${text} to clipboard.`);
  };

  return (
    <View
      flex={1}
      bgColor={themeCheck=='bright' ? 'white' : bgColorMain}
      alignItems="center"
      justifyContent="space-evenly">
        <Text color={'white'}  fontSize={'3xl'}>{t('contact')}</Text>
        <View>
      <HStack space={3} alignItems={'center'} >
        <View>
      <Text color={!themeCheck?'white':bgColorMain}>{t('email')}</Text>
      </View>
      <View>
        <Text color={themeCheck=='dark' ? 'white' : bgColorMain}>
        Salle7li@gmail.com
        </Text>
        </View>
        <View>
        <Button
          onPress={() => copyToClipboard('Salle7li@gmail.com')}
          bgColor={themeCheck=='dark' ? 'white' : bgColorMain}
          size="sm">
          <Icon
            name="copy"
            size={30}
            color={themeCheck=='bright' ? 'white' : bgColorMain}
          />
          
        </Button>
        </View>
      </HStack>
      <HStack space={3} alignItems="center" marginTop={4}>
        <Text color={themeCheck=='dark' ? 'white' : bgColorMain}>
        {t('num')}
        </Text>

        <Text color={themeCheck=='dark' ? 'white' : bgColorMain}>
          0790927552
        </Text>
        <Button
          onPress={() => copyToClipboard('0790927552')}
          bgColor={themeCheck=='dark' ? 'white' : bgColorMain}
          size="sm">
          <Icon
            name="copy"
            color={themeCheck=='bright' ? 'white' : bgColorMain}
            size={30}
          />
        </Button>
      </HStack>
      </View>
    </View>
  );
};

export default ApplyToBeWorker;
