import React, {useEffect, useState} from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import {bgColorMain, salle7liLogo} from '../getStarted/started';
import {Formik} from 'formik';
import PasswordInput from '../../inputs/passwordInput';
import TextModifiedInput from '../../inputs/textInput';
import {initialValues, validationSchema} from '../login/type/registerType';
import PhoneInput from '../../inputs/phoneInput';
import {
  Box,
  CheckIcon,
  Checkbox,
  Stack,
  Select,
  Button,
  Radio,
  HStack,
} from 'native-base';
import {useTranslation} from 'react-i18next';
import '../../i18n/i18n.ts';
import Loading from '../../components/Loading/Loading.tsx';
import {useSignUpMutation} from '../../data/auth/auth.ts';
import {useAppSelector} from '../../app/hooks.ts';

const Register = ({navigation}: any) => {
  const {t} = useTranslation();
  const [checked, setIsChecked] = useState<boolean>(false);
  const [isLoadinggg, setIsLoadinggg] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [signUp] = useSignUpMutation();

  const themeCheck = useAppSelector(state => state.user.theme);

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

  if (isLoadinggg) {
    return <Loading />;
  }

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, {setSubmitting, setErrors}) => {
          setIsLoadinggg(true);
          console.log('Submit started');
          try {
            const response = await signUp({
              Email: values.email,
              Password: values.password,
              PasswordConfirm: values.confirmPassword,
              FirstName: values.firstName,
              LastName: values.lastName,
              Gender: values.gender,
              City: values.city,
              PhoneNumber: values.phoneNumber,
            }).unwrap();
            console.log('Response received:');
            if (response && response.success) {
              console.log('Navigation to OTP');
              navigation.navigate('OTP', {customerEmail: values.email});
            } else {
              console.error('Mutation unsuccessful');
              showError('Registration failed. Please check your details.');
            }
            setIsLoadinggg(false);
          } catch (error: unknown) {
            // console.error('Error:', error);
            showError(error);
          } finally {
            setIsLoadinggg(false);
            setSubmitting(false);
            console.log('Submit finished');
          }
        }}
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
              <Image
                source={salle7liLogo}
                style={{width: 200, height: 400}}
                alt="salle7li"
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
                {t('signup:title')}
              </Text>

              <Text
                style={{
                  textAlign: 'center',
                  marginBottom: 30,
                  marginTop: 30,
                  color: 'white',
                }}>
                {t('signup:description')}
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
                <Select.Item label={t('signup:amman')} value="amman" />
                <Select.Item label={t('signup:zarqa')} value="zarqa" />
                <Select.Item label={t('signup:irbid')} value="irbid" />
                <Select.Item label={t('signup:salt')} value="salt" />
                <Select.Item label={t('signup:madaba')} value="madaba" />
                <Select.Item label={t('signup:aqaba')} value="aqaba" />
                <Select.Item label={t('signup:karak')} value="karak" />
                <Select.Item label={t('signup:maan')} value="maan" />
                <Select.Item label={t('signup:jerash')} value="jerash" />
                <Select.Item label={t('signup:tafeleh')} value="tafeleh" />
                <Select.Item label={t('signup:mafraq')} value="mafraq" />
              </Select>
              <Text style={{color: 'red'}}>{errors.city}</Text>
            </View>

            <View>
              
              <Radio.Group
                name="myRadioGroup"
                accessibilityLabel="favorite number"
                defaultValue="any"
                value={values.gender}
                onChange={nextValue => {
                  handleChange('gender')(nextValue);
                }}>
                <Stack direction="row" alignSelf={'center'} space={4}>
                  <Radio value="male" colorScheme={'darkBlue'} my={1}>
                    <Text style={{color: !themeCheck ? 'white' : bgColorMain}}>
                      {' '}
                      {t('male')}{' '}
                    </Text>
                  </Radio>
                  <Radio value="female" colorScheme={'pink'} my={1}>
                    <Text style={{color: !themeCheck ? 'white' : bgColorMain}}>
                      {' '}
                      {t('female')}
                    </Text>
                  </Radio>
                </Stack>
              </Radio.Group>
            </View>

            <HStack space={2} marginBottom={5}>
              <Checkbox
                value="agree"
                accessibilityLabel="Agreement"
                colorScheme="danger"
                onChange={() => setIsChecked(!checked)}>
                <Text> {t('signup:checkBox')} </Text>
              </Checkbox>
            </HStack>

            {checked && (
              <Box alignItems="center">
                <Button
                  onPress={() => handleSubmit()}
                  backgroundColor={'white'}
                  padding={4}
                  borderRadius={'lg'}>
                  <Text style={{color: 'darkblue'}}>
                    {' '}
                    {t('signup:button')}{' '}
                  </Text>
                </Button>
              </Box>
            )}
            <View style={{marginTop: 50, width: 250, borderRadius: 20}}></View>
          </View>
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
    </ScrollView>
  );
};

export default Register;
