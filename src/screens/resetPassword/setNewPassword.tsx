import { Formik } from 'formik';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react'
import { View, ScrollView, Image, Text, Button, Pressable } from 'react-native';
import PasswordInput from '../../inputs/passwordInput';
import TextModifiedInput from '../../inputs/textInput';
import { bgColorMain, salle7liLogo } from '../getStarted/started';
import { useTranslation } from 'react-i18next';
import Loading from '../../components/Loading/Loading';
import { useResetPasswordbeforeLoginMutation } from '../../data/auth/auth';
import { ResetPasswordRequest, validationSchemaForResetPassword } from '../login/type/changePassword';
import { logout } from '../../app/slices/slice';
import { useAppDispatch } from '../../app/hooks';

const SetNewPassword = ({navigation,route}:any) => {
  const {email}= route.params;
const dispatch=useAppDispatch();

    const {t} = useTranslation();
  const [resetPass] = useResetPasswordbeforeLoginMutation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
            initialValues={ResetPasswordRequest}
            onSubmit={async (values, {setSubmitting, setErrors}) => {
              console.log('Submit started');
              console.log('response', values);
              try {
                setIsLoading(true);
                const response = await resetPass
                ({
                  Email:email,
                  Password: values.password,
                }).unwrap();
    
                if (response && response.success) {
                  dispatch(logout())
                  navigation.navigate("Login")
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
            validationSchema={validationSchemaForResetPassword}>
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
                      {t('Set your new password')}
                    </Text>
    
                  
                  </View>
                  <PasswordInput
                    handleChange={value => handleChange('password')(value)}
                    placeholder={t('login:password')}
                    value={values.password}
                    error={errors.password} 
                  />
                  <PasswordInput
                    handleChange={value => handleChange('confirmPassword')(value)}
                    placeholder={t('login:confPass')}
                    value={values.confirmPassword}
                    error={errors.confirmPassword}
                  />
                  
    
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
                        {t('submit')}
                      </Text>
                    </Pressable>
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
}

export default SetNewPassword
