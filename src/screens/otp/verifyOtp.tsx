
import React, {useEffect, useState} from 'react';
import {useAppSelector} from '../../app/hooks';
import {bgColorMain, salle7liLogo} from '../getStarted/started';
import {useVerifyOtpMutation} from '../../data/auth/auth';
import { navigate } from '../../../AppLoader';
import { useDispatch } from 'react-redux';
import { login, logout, setTokens } from '../../app/slices/slice';
import { Button, Image, Text, View } from 'native-base';
import Loading from '../../components/Loading/Loading';
import OtpInput from '../../inputs/otpInput';
import { useAppDispatch } from '../../app/regist';

const VerifyOtp = ({navigation, route}: any) => {
  const {customerEmail,isResetPassword} = route.params;
  const [code, setCode] = useState<string>('');
  const [remainingTime, setRemainingTime] = useState(35);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [reset, setReset] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let timer: any;
    if (errorMessage) {
      timer = setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [errorMessage]);
  useEffect(() => {
    if (reset) {
      setRemainingTime(35);
      setReset(false);
    }
    const timer = setInterval(() => {
      setRemainingTime(prev => {
        if (prev === 1) {
          clearInterval(timer);
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [reset]);

  const showError = (error: unknown) => {
    let message = 'An unexpected error occurred';
    if (error && typeof error === 'object' && 'data' in error) {
      const errorData = (error as any).data;
      message = errorData.message || JSON.stringify(errorData);
    } else if (error instanceof Error) {
      message = error.message;
    } else {
      message = String(error);
    }
    setErrorMessage(message);
  };

  const navigateToHome = () => {
    navigate('HomeScreen');
  };
  const navigateToResetPassword = (customerEmail:string) => {

    navigation.navigate('setNewPassword',{email:customerEmail});
  };

  const themeCheck = useAppSelector(state => state.user.theme);
  const [verifyOtp] = useVerifyOtpMutation();

  const dispatch =useDispatch();

  const onPressHandler = async () => {
    if (code.length == 4) {
      console.log('Submit started');
      console.log('code:', code, ' email:', customerEmail);
      setIsLoading(true)
      try {
        console.log('Final payload:', {otp: code, email: customerEmail});

        const response = await verifyOtp({
          Otp: code,
          Email: customerEmail,
        }).unwrap();
        console.log('Response received:', response);
        if (response.success && response) {
          if(!isResetPassword){
          dispatch(login(response.userId));
          dispatch(setTokens(response.token));
          
          navigateToHome();
          }
          else{
            dispatch(logout())
            navigateToResetPassword(customerEmail);
          }
        }
          
         else {
          console.error('Mutation unsuccessful');
         }
      } catch (error: unknown) {
        console.error('Error:', error);
        showError(error);
      } finally {
        setIsLoading(false)
        console.log('Submit finished');
      }
    }
  };


  if (isLoading) {
    return <Loading />;
  }
  return (
    <View
      flex={1}
      alignItems={'center'}
      bgColor={themeCheck=='bright' ? 'white' : bgColorMain}>
      <View flex={1} justifyContent={'space-evenly'}>
        <View alignItems={'center'}>
          <Image source={salle7liLogo} width={140} height={170} />
          <Text color={'red.500'} fontSize={'3xl'}>
            OTP Verification
          </Text>
        </View>
        <View>
          <View alignItems={'center'}>
            <Text
              color={themeCheck ? bgColorMain : 'white'}
              marginBottom={'15'}>
              Enter the OTP that has been sent to your email!{' '}
            </Text>
            <OtpInput
              value={code?.toString()}
              handleChange={value => setCode(value)}
              width={45}
              keyboardType='decimal-pad'
              max={4}
            />
            <Button bgColor={'red.500'} onPress={() => onPressHandler()}>
              Verify OTP
            </Button>
          </View>
        </View>
      </View>
      {errorMessage && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: 'red',
            padding: 10,
          }}>
          <Text style={{color: 'white', textAlign: 'center'}}>
            {errorMessage}
          </Text>
        </View>
      )}
    </View>
  );
};

export default VerifyOtp;
