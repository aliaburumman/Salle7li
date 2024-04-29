import {Button, Text, View} from 'native-base';
import React from 'react';
import {useAppSelector} from '../../app/hooks';
import {bgColorMain, salle7liLogo} from '../getStarted/started';
import TextModifiedInput from '../../inputs/textInput';
import {Formik} from 'formik';
import {
  initialEmailForChangePassword,
  validationSchemaForChangePassword,
} from '../login/type/changePassword';
import { Image } from 'native-base';

const ChangePassword = () => {
  const themeCheck = useAppSelector(state => state.theme.lightMode);
  return (
    <View
      flex={1}
      bgColor={themeCheck ? 'white' : bgColorMain}
      justifyContent={'space-evenly'}> 
        <Text color={!themeCheck ? 'white' : bgColorMain} alignSelf={'center'} fontSize={'2xl'}>
        Please enter your email
      </Text>
        <Formik
          initialValues={initialEmailForChangePassword}
          onSubmit={values => console.log(values)}
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
                        <Button width={'2/6'} alignSelf={'center'} bgColor={'red.500'} onPress={()=>handleSubmit()}>Confirm</Button>

            </View>

          )}
          
        </Formik>
        <View><Image source={salle7liLogo} width={70} height={85} alignSelf={'center'}/></View>
    </View>
  );
};

export default ChangePassword;
