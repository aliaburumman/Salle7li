import React, {useState} from 'react';
import { Image, ScrollView, Text, View} from 'react-native';
import {bgColorMain, jordanFlag, salle7liLogo} from '../getStarted/started';
import {Formik} from 'formik';
import PasswordInput from '../../inputs/passwordInput';
import TextModifiedInput from '../../inputs/textInput';
import {initialValues, validationSchema} from '../login/type/registerType';
import PhoneInput from '../../inputs/phoneInput';
import {Box, CheckIcon, Checkbox, HStack, Select,Button} from 'native-base';

const Register = () => {
  const [checked, setIsChecked] = useState<boolean>(false);
 

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <Formik
        initialValues={initialValues}
        onSubmit={values => console.log(values)}
        validateOnChange={false}
        validationSchema={validationSchema}>
        {({handleChange, handleBlur, handleSubmit, values, errors}) => (
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: bgColorMain,
            }}>
            <View>
              <Image source={salle7liLogo} style={{width: 200, height: 400}} />
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
                Salle7li Registration Form
              </Text>

              <Text
                style={{
                  textAlign: 'center',
                  marginBottom: 30,
                  marginTop: 30,
                  color: 'white',
                }}>
                Please fill out the form below to register
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <TextModifiedInput
                handleChange={handleChange('firstName')}
                placeholder="First Name"
                value={values.firstName}
                width={160}
                marginRight={10}
                error={errors.firstName}
              />

              <TextModifiedInput
                handleChange={handleChange('lastName')}
                placeholder="Last Name"
                value={values.lastName}
                width={160}
                error={errors.lastName}
              />
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
            <PasswordInput
              handleChange={handleChange('confirmPassword')}
              placeholder="Confirm Password"
              value={values.confirmPassword}
              error={errors.confirmPassword}
            />

            <PhoneInput
              handleChange={handleChange('phoneNumber')}
              keyboardType="numeric"
              error={errors.phoneNumber}
              placeholder="Phone Number"
              value={values.phoneNumber}
            />
            <View style={{marginBottom: 30}}>
              <Select
                minWidth="330"
                bgColor={'white'}
                borderRadius={'lg'}
                accessibilityLabel="Choose a city"
                placeholder="Choose a city"
                padding={'4'}
                onValueChange={value => handleChange('city')(value)}
                selectedValue={values.city}
                _selectedItem={{
                  bg: 'teal.600',
                  endIcon: <CheckIcon size={5} />,
                }}>
                <Select.Item label="Amman" value="amman" />
                <Select.Item label="Zarqa" value="zarqa" />
                <Select.Item label="Irbid" value="irbid" />
                <Select.Item label="Salt" value="salt" />
                <Select.Item label="Madaba" value="madaba" />
                <Select.Item label="Aqaba" value="aqaba" />
                <Select.Item label="Karak" value="karak" />
                <Select.Item label="Maan" value="maan" />
                <Select.Item label="Jerash" value="jerash" />
                <Select.Item label="Tafeleh" value="tafeleh" />
                <Select.Item label="Maadaba" value="maadaba" />
                <Select.Item label="Mafraq" value="mafraq" />
              </Select>
              <Text style={{color: 'red'}}>{errors.city}</Text>
            </View>

            <HStack space={2} marginBottom={5}>
              <Checkbox
                value="agree"
                accessibilityLabel="Agreement"
                colorScheme="danger"
                onChange={() => setIsChecked(!checked)}>
                <Text> Agree on terms and permissions of Salle7li </Text>
              </Checkbox>
            </HStack>

            {checked && (
              
                <Box alignItems="center">
                  <Button onPress={()=>handleSubmit()}
                  backgroundColor={"white"}
                  padding={4}
                  borderRadius={"lg"}
                  
                >
                  <Text style={{color:"darkblue"}}>  Create Account </Text>
                  </Button>
                </Box>
              
            )}
            <View style={{marginTop: 50, width: 250, borderRadius: 20}}></View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default Register;
