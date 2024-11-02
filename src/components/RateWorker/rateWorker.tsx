import React, {useState} from 'react';
import {
  Button,
  Divider,
  HStack,
  Image,
  Modal,
  Text,
  useTheme,
} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import RatingStars from './rating';
import Toast from 'react-native-toast-message';
import {useTranslation} from 'react-i18next';
import {SafeAreaView} from 'react-native';
import {useAppSelector} from '../../app/hooks';
import {bgColorMain} from '../../screens/getStarted/started';
import {useGetWorkerQuery, useRateWorkerMutation} from '../../data/home/home';
import Loading from '../Loading/Loading';

const RateWorker = () => {
  const {t} = useTranslation();
  const [rating, setRating] = useState(0);
  const [rateWorker] = useRateWorkerMutation();
  const {data,isLoading}=useGetWorkerQuery({workerId:1})

  const themeCheck = useAppSelector(state => state.user.theme);
  const onSubmitPress = async () => {
    
    try {
      const response =await rateWorker({
        workerId: 1,
        rating,
      });

      if(response)
        {
            console.log("asdasda",response)
        }
    } catch (e) {
      Toast.show({
        type: 'customError',
        text1: e,
      });
    }
  };

  const onCancelPress = async () => {
    try {
      await rateWorker({
        workerId: 1,
        rating: -1,
      });
    } catch (e) {
      Toast.show({
        type: 'customError',
        text1: e,
      });
    }
  };


  if(isLoading)
    {
        return <Loading/>
    }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: themeCheck == 'dark' ? bgColorMain : 'white',
      }}>
      <Modal isOpen onClose={onCancelPress} size={'full'}>
        <Modal.Content maxH="67%">
          <Text
            fontWeight={'bold'}
            fontSize={'15px'}
            mt={4}
            mx={4}
            textAlign={'left'}>
            {t('rateWorker')}
          </Text>
          <Modal.Body>
            <KeyboardAwareScrollView
              style={{backgroundColor:bgColorMain}}
              contentContainerStyle={{padding: 24, alignItems: 'center'}}>
              <Text
                mt={7}
                fontSize={24}
                fontWeight={700}
                textAlign="center"
                color={themeCheck == 'dark' ? bgColorMain : 'white'}>
                {t('question')}{' '}
                
                   {data.firstName}{""}{data.lastName}
                   
              </Text>
              <Text
                mt={7}
                fontSize={13}
                fontWeight={600}
                textAlign="center"
                color={themeCheck == 'dark' ? bgColorMain : 'white'}>
                {t('askForRating')}
              </Text>
              <RatingStars rating={rating} setRating={setRating} />
              <Divider marginY={4} />
            </KeyboardAwareScrollView>
            <HStack
              paddingY={7}
              paddingX={6}
              borderTopWidth={1}
              style={{gap:5}}
              borderTopColor={'lightBlue.200'}
              backgroundColor={themeCheck=='dark'?'white':bgColorMain}>
              <Button
                flex={1}
                fontWeight={700}
                onPress={onCancelPress}
                backgroundColor={'red.400'}>
                {t('cancel')}
              </Button>
              <Button
                isDisabled={rating < 1}
                flex={1}
                backgroundColor={themeCheck=='dark'?'white':bgColorMain}

                fontWeight={700}
                onPress={onSubmitPress}>
                {t('submit')}
              </Button>
            </HStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </SafeAreaView>
  );
};

export default RateWorker;
