import {Button, Text, View} from 'native-base';
import React, { useState } from 'react';
import {useAppSelector} from '../../app/hooks';
import {bgColorMain, salle7liLogo} from '../getStarted/started';
import TextModifiedInput from '../../inputs/textInput';
import {Formik} from 'formik';
import {
  initialEmailForChangePassword,
  validationSchemaForChangePassword,
} from '../login/type/changePassword';
import {Image} from 'native-base';
import Loading from '../../components/Loading/Loading';
import { useSendOtpForResetPasswordMutation } from '../../data/auth/auth';
import { t } from 'i18next';

const ChangePassword = ({navigation}: any) => {
  const themeCheck = useAppSelector(state => state.user.theme);
  const [sendOtp] = useSendOtpForResetPasswordMutation();
  const [errorMessage, setErrorMessage] = useState('');



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



  const [isLoading, setIsLoading] = useState<boolean>(false);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <View
      flex={1}
      bgColor={themeCheck=='bright' ? 'white' : bgColorMain}
      justifyContent={'space-evenly'}>
      <Text
        color={themeCheck=='dark' ? 'white' : bgColorMain}
        alignSelf={'center'}
        fontSize={'2xl'}>
        {t('entemail')}
      </Text>
      <Formik
        initialValues={initialEmailForChangePassword}
        onSubmit={async (values, {setSubmitting, setErrors}) => {
          try {
            setIsLoading(true);
            console.log("values",values.email)
            const response = await sendOtp({
              email: values.email,
            }).unwrap();

            if (response && response.success) {
              console.log('Navigation to OTP');
              navigation.navigate('OTP', {customerEmail: values.email,isResetPassword:true});
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
        validationSchema={validationSchemaForChangePassword}>
        {({handleChange, handleBlur, handleSubmit, values, errors}) => (
          <View alignContent={'center'}>
            <TextModifiedInput
              handleChange={values => {
                handleChange('email')(values);
              }}
              error={errors.email}
              width={410}
            />
            <Button
              width={'2/6'}
              alignSelf={'center'}
              bgColor={'red.500'}
              marginTop={'4'}
              onPress={() => handleSubmit()}>
              {t('confirm')}</Button>
          </View>
        )}
      </Formik>
      <View>
        <Image
          source={salle7liLogo}
          width={70}
          height={85}
          alignSelf={'center'}
        />
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

export default ChangePassword;
