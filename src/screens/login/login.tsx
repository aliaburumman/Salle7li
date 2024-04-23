import React from 'react';
import {Image, Pressable, Text, TextInput, View} from 'react-native';
import {bgColorMain, salle7liLogo} from '../getStarted/started';
import {Formik} from 'formik';
import PasswordInput from '../../inputs/passwordInput';
import TextModifiedInput from '../../inputs/textInput';
import {LoginRequest, validationSchema} from './type/loginType';
import { ScrollView } from 'native-base';
import { useTranslation } from 'react-i18next';
import '../../i18n/i18n.ts';

const Login = ({navigation}: any) => {
  const { t } = useTranslation();
  return (
    <Formik
      initialValues={LoginRequest}
      onSubmit={values => console.log(values)}
      validateOnChange={false}
      validationSchema={validationSchema}>
      {({handleChange, handleBlur, handleSubmit, values,errors}) => (
        <ScrollView>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: bgColorMain,
          }}>
          <View>
            <Image source={salle7liLogo} style={{width: 100, height: 200}} />
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
            handleChange={handleChange('Email')}
            placeholder="Email"
            value={values.email}
            error={errors.email}
            width={330}
          />
          <PasswordInput
            handleChange={handleChange('Password')}
            placeholder="Password"
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
            <Pressable>
              <Text
                style={{
                  textAlign: 'center',

                  color: 'grey',
                  fontSize: 18,
                }}>
                 {t('login:resetPass')}
              </Text>
            </Pressable>
          </View>

          <View
            style={{
              marginTop: 50,
              backgroundColor: 'white',
              width: 250,
              padding: 15,
              borderRadius: 20,
            }}>
            <Pressable onPress={()=>handleSubmit()}>
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
          <View style={{marginTop: 50, width: 250, borderRadius: 20}}>
            <Pressable onPress={() => navigation.navigate('Register')}>
              <Text
                style={{
                  textAlign: 'center',

                  color: 'white',
                  fontSize: 15,
                }}>
                {t('login:noAccount')}
              </Text>
            </Pressable>
          </View>
        </View>
        </ScrollView>
      )}
    </Formik>
  );
};

export default Login;
