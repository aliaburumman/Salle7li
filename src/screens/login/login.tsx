import React, {useEffect, useState} from 'react';
import {Image, Pressable, Text, TextInput, View} from 'react-native';
import {bgColorMain, salle7liLogo} from '../getStarted/started';
import {Formik} from 'formik';
import PasswordInput from '../../inputs/passwordInput';
import TextModifiedInput from '../../inputs/textInput';
import {LoginRequest, validationSchema} from './type/loginType';
import {Button, ScrollView} from 'native-base';
import {useTranslation} from 'react-i18next';
import '../../i18n/i18n.ts';
import {useSendOtpMutation} from '../../data/auth/auth.ts';
import Loading from '../../components/Loading/Loading.tsx';
import { useAppSelector } from '../../app/hooks.ts';

const Login = ({navigation}: any) => {
  const {t} = useTranslation();
  const [sendOtp] = useSendOtpMutation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState('');

  const language = useAppSelector(state=>state.user.language);


  useEffect(() => {
    let timer: any;
    if (errorMessage) {
      timer = setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [errorMessage]);

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
  if (isLoading) {
    return <Loading />;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',

        backgroundColor: bgColorMain,
      }}>
      <Formik
        initialValues={LoginRequest}
        onSubmit={async (values, {setSubmitting, setErrors}) => {
          console.log('Submit started');
          console.log('response', values);
          try {
            setIsLoading(true);
            const response = await sendOtp({
              Email: values.email,
              Password: values.password,
            }).unwrap();

            if (response && response.success) {
              console.log('Navigation to OTP');
              navigation.navigate('OTP', {customerEmail: values.email,isResetPassword:false});
            } else {
              console.error('Mutation unsuccessful');
              showError('Login failed. Please check your details.');
            }
            setIsLoading(false);
          } catch (error: unknown) {
            console.error('Error:', error);
            showError(error);
          } finally {
            setIsLoading(false);
            setSubmitting(false);
            console.log('Submit finished');
          }
        }}
        validateOnChange={false}
        validationSchema={validationSchema}>
        {({handleChange, handleBlur, handleSubmit, values, errors}) => (
          <ScrollView>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <View>
                <Image
                  source={salle7liLogo}
                  style={{width: 100, height: 200}}
                />
              </View>

              <View>
                <Text
                  style={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginBottom: 30,
                    color: 'white',
                    fontSize: 25,
                  }}>
                  {t('login:title')}
                </Text>

                <Text
                  style={{
                    textAlign: 'center',
                    marginBottom: 30,
                    marginTop: 30,
                    color: 'white',
                  }}>
                  {t('login:description')}
                </Text>
              </View>
              <TextModifiedInput
                handleChange={value => handleChange('email')(value)}
                placeholder={t('login:email')}
                value={values.email}
                error={errors.email}
                width={330}
              />
              <PasswordInput
                handleChange={value => handleChange('password')(value)}
                placeholder={t('login:password')}
                value={values.password}
                error={errors.password}
              />
              <View>
                <Text
                  style={{
                    textAlign: 'center',

                    marginTop: 30,
                    color: 'white',
                    fontSize: 18,
                  }}>
                  {t('login:forgotPass')}
                </Text>
                <Button
                  onPress={() => navigation.navigate('resetPassword')}
                  bgColor={'red.500'}
                  width={'1/3'}
                  marginTop={'4'}
                  alignSelf={'center'}>
                  {t('login:resetPass')}
                </Button>
              </View>

              <View
                style={{
                  marginTop: 50,
                  backgroundColor: 'white',
                  width: 250,
                  padding: 15,
                  borderRadius: 20,
                }}>
                <Pressable onPress={() => handleSubmit()}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: 'darkblue',
                      fontSize: 18,
                    }}>
                    {t('login:buttonText')}
                  </Text>
                </Pressable>
              </View>
              <View style={{marginTop: 25, width: 250, borderRadius: 20}}>
                <Button
                  onPress={() => navigation.navigate('Register')}
                  bgColor={bgColorMain}
                  width={'full'}>
                  <View style={{alignSelf:'center'}}>
                    <Text>{t('login:or')}</Text>
                  </View>
                  <Text style={{fontSize: 20, color: '#96C8E9'}}>
                    {t('login:noAccount')}
                  </Text>
                </Button>
              </View>
            </View>
          </ScrollView>
        )}
      </Formik>
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

export default Login;
