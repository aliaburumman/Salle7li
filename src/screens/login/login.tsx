import React from 'react';
import {Image, Pressable, Text, TextInput, View} from 'react-native';
import {bgColorMain, salle7liLogo} from '../getStarted/started';
import {Formik} from 'formik';
import PasswordInput from '../../inputs/passwordInput';
import TextModifiedInput from '../../inputs/textInput';
import {LoginRequest, validationSchema} from './type/loginType';

const Login = ({navigation}: any) => {
  return (
    <Formik
      initialValues={LoginRequest}
      onSubmit={values => console.log(values)}
      validateOnChange={false}
      validationSchema={validationSchema}>
      {({handleChange, handleBlur, handleSubmit, values,errors}) => (
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
              Log into Customer Panel
            </Text>

            <Text
              style={{
                textAlign: 'center',
                marginBottom: 30,
                marginTop: 30,
                color: 'white',
              }}>
              Please enter your email address to create an account or to log in
            </Text>
          </View>
          <TextModifiedInput
            handleChange={handleChange('email')}
            placeholder="Email"
            value={values.email}
            error={errors.email}
            width={330}
          />
          <PasswordInput
            handleChange={handleChange('password')}
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
              Can’t Remember Your Current Password?
            </Text>
            <Pressable>
              <Text
                style={{
                  textAlign: 'center',

                  color: 'grey',
                  fontSize: 18,
                }}>
                Reset Password
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
                Join Salle7li
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
                Don't Have An Account? Signup instead
              </Text>
            </Pressable>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default Login;
