import {
  Box,
  Button,
  CheckIcon,
  Radio,
  ScrollView,
  Select,
  Stack,
  Text,
  View,
} from 'native-base';
import {bgColorMain} from '../getStarted/started';
import {Formik} from 'formik';

import {
  initialValuesForReservation,
  validationSchemaForReservation,
} from '../login/type/orderServiceType';
import TextModifiedInput from '../../inputs/textInput';
import {useEffect, useState} from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import MapScreen from '../location/setLocation';
import { useTranslation } from 'react-i18next';
import '../../i18n/i18n.ts';
import i18n from '../../i18n/i18n.ts';
import { useAppSelector } from '../../app/hooks.ts';

dayjs.extend(utc);
dayjs.extend(timezone);
export interface CurrentLocationCoords {
  longitude: number;
  latitude: number;
}

const OrderService = ({navigation}: any) => {
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [openTimePicker, setOpenTimePicker] = useState(false);
  const [openTimePicker2, setOpenTimePicker2] = useState(false);

  const openPickerDate = () => {
    setOpenDatePicker(true);
  };

  const closePickerDate = () => {
    setOpenDatePicker(false);
  };
  const openPickerTime = () => {
    setOpenTimePicker(true);
  };

  const closePickerTime = () => {
    setOpenTimePicker(false);
  };
  const openPickerTime2 = () => {
    setOpenTimePicker2(true);
  };

  const closePickerTime2 = () => {
    setOpenTimePicker2(false);
  };

  const maxSelectableDate = new Date();
  maxSelectableDate.setDate(maxSelectableDate.getDate() + 7);
  const minSelectableDate = new Date();
  minSelectableDate.setDate(minSelectableDate.getDate());
  const now = new Date();
  const minSelectableTime = new Date(now);
  minSelectableTime.setHours(now.getHours());
  const { t } = useTranslation();
  const themeCheck = useAppSelector(state=>state.theme.lightMode)

  return (
    <View flex={1} bgColor={themeCheck?'white':bgColorMain}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Formik
            initialValues={
              initialValuesForReservation
            }
            onSubmit={values => navigation.navigate('ChooseWorker')}
          validateOnChange={false}
          validationSchema={validationSchemaForReservation}
          >
          {({handleChange, handleSubmit, values, errors}) => (
            <Stack space={2}>
              <View alignItems={'center'}>
                <Text color={!themeCheck?'white':bgColorMain} fontSize={'4xl'}>
                  {t('order:title')}
                </Text>
              </View>
              <View>
                <Text color={!themeCheck?'white':bgColorMain}> {t('order:selectService')}</Text>
                <View alignItems={'center'}>
                  <Select
                    width="5/6"
                    bgColor={!themeCheck?'white':bgColorMain}
                    borderRadius={'lg'}
                    accessibilityLabel="Choose"
                    placeholder={t('order:selectService')}
                    placeholderTextColor={themeCheck?'white':bgColorMain}
                    padding={'4'}
                    onValueChange={value => handleChange('service')(value)}
                    selectedValue={values.service}
                    _selectedItem={{
                      bg: 'blue.200',
                      endIcon: <CheckIcon size={5} />,
                    }}>
                    <Select.Item label={t('blacksmiths')} value="blacksmith" />
                    <Select.Item label={t('plumber')} value="plumber" />
                    <Select.Item label={t('electrician')} value="electrician" />
                    <Select.Item label={t('carpenter')} value="carpenter" />
                   
                  </Select>
                  {errors.service && (
                    <Text color={'red.500'}>{errors.service}</Text>
                  )}
                </View>
              </View>

              <View>
                <Text color={!themeCheck?'white':bgColorMain}>{t('order:selectDate')}</Text>
                <Button
                  onPress={openPickerDate}
                  width={'5/6'}
                  alignSelf={'center'}
                  padding={'5'}
                  bgColor={!themeCheck?'white':bgColorMain}
                  borderRadius={'lg'}>
                  <Text color={themeCheck?'white':bgColorMain}>
                  {values.date ? dayjs(values.date).format('YYYY-MM-DD') : t('order:selectDate')}
                  </Text>
                </Button>
                {openDatePicker && (
                  <RNDateTimePicker
                    value={values.date ? new Date(values.date) : new Date()}
                    mode="date"
                    display="spinner"
                    maximumDate={maxSelectableDate}
                    minimumDate={minSelectableDate}
                    onChange={(event, selectedDate) => {
                      const date = dayjs(selectedDate).toISOString();
                      handleChange('date')(date);
                      closePickerDate();
                    }}
                  />
                )}
                {errors.date && (
                  <Text color={'red.500'} alignSelf={'center'}>
                    {errors.date}
                  </Text>
                )}
              </View>
              <View>
                <Text color={!themeCheck?'white':bgColorMain}>{t('order:selectTime')}</Text>
                <View flexDirection={'row'} justifyContent={'space-evenly'}>
                  <Button
                    onPress={openPickerTime}
                    width={'2/6'}
                    padding={'5'}
                    bgColor={!themeCheck?'white':bgColorMain}
                    borderRadius={'lg'}>
                    <Text color={themeCheck?'white':bgColorMain}>
                      {values.startTime
                        ? dayjs.utc(values.startTime).local().format('hh:mm A')
                        : t('order:start')}
                    </Text>
                  </Button>
                  {openTimePicker && (
                    <RNDateTimePicker
                      value={
                        values.startTime
                          ? new Date(values.startTime)
                          : new Date()
                      }
                      mode="time"
                      display="spinner"
                      minimumDate={minSelectableTime}
                      onChange={(event, selectedTime) => {
                        console.log(
                          'now:',
                          dayjs(minSelectableTime).format('hh:mm A'),
                          '  ',
                          'selected Time',
                          selectedTime?.getHours(),
                        );
                        if (selectedTime) {
                          const time = dayjs
                           .utc(selectedTime)
                             .local()
                            .toISOString();
                          handleChange(t('order:start'))(time);
                          closePickerTime();
                        } else {
                          closePickerTime();
                        }
                      }}
                    />
                  )}

                  <Button
                    onPress={openPickerTime2}
                    width={'2/6'}
                    padding={'5'}
                    bgColor={!themeCheck?'white':bgColorMain}
                    borderRadius={'lg'}>
                    <Text color={themeCheck?'white':bgColorMain}>
                      {values.endTime
                        ? dayjs.utc(values.endTime).local().format('hh:mm A')
                        : t('order:end')}
                    </Text>
                  </Button>
                  {openTimePicker2 && (
                    <RNDateTimePicker
                      value={
                        values.endTime ? new Date(values.endTime) : new Date()
                      }
                      mode="time"
                      display="spinner"
                      onChange={(event, selectedTime) => {
                        if (selectedTime) {
                         
                          const time = dayjs
                            .utc(selectedTime) 
                            .local()
                            .toISOString();
                          handleChange(t('order:end'))(time);
                          closePickerTime2();
                        } else {
                          closePickerTime2();
                        }
                      }}
                    />
                  )}
                </View>
                <View flexDirection={'row'} justifyContent={'space-evenly'}>
                  {errors.startTime && (
                    <Text color={'red.500'} fontSize={'11'}>{errors.startTime}</Text>
                  )}
                  {errors.endTime && (
                    <Text color={'red.500'} fontSize={'11'}>{errors.endTime}</Text>
                  )}
                </View>
              </View>
              <View>
                <Text color={!themeCheck?'white':bgColorMain}>{t('order:selectWorker')}</Text>
                <Radio.Group
                  name="myRadioGroup"
                  accessibilityLabel="favorite number"
                  defaultValue="any"
                  value={values.workerGender}
                  onChange={nextValue => {
                    handleChange('workerGender')(nextValue);
                  }}>
                  <Stack direction="row" alignSelf={'center'} space={4}>
                    <Radio value="male" colorScheme={'darkBlue'} my={1}>
                      <Text color={!themeCheck?'white':bgColorMain}> {t('male')} </Text>
                    </Radio>
                    <Radio value="female" colorScheme={'pink'} my={1}>
                      <Text color={!themeCheck?'white':bgColorMain}> {t('female')}</Text>
                    </Radio>
                    <Radio value="any" colorScheme={'yellow'} my={1}>
                      <Text color={!themeCheck?'white':bgColorMain}> {t('any')} </Text>
                    </Radio>
                  </Stack>
                </Radio.Group>
              </View>

              <View>
                <Text color={!themeCheck?'white':bgColorMain}>{t('order:selectPayement')}</Text>
                <Radio.Group
  name="paymentMethod"
  accessibilityLabel="paymentMethod"
  defaultValue="cash"
  value={values.paymentMethod}
  onChange={nextValue => {
    handleChange('paymentMethod')(nextValue);
  }}>
                  <Stack direction="row" alignSelf={'center'} space={4}>
                    <Radio value="cash" colorScheme={'darkBlue'} my={1}>
                      <Text color={!themeCheck?'white':bgColorMain}> {t('cash')} </Text>
                    </Radio>
                    <Radio value="visa" colorScheme={'pink'} my={1}>
                      <Text color={!themeCheck?'white':bgColorMain}> {t('visa')} </Text>
                    </Radio>
                  </Stack>
                </Radio.Group>
              </View>
              {values.paymentMethod === 'visa' && (
                <View>
                  <Text color={!themeCheck?'white':bgColorMain}>{t('order:cardOpt')}</Text>
                  <View
                    borderWidth={'2'}
                    borderColor={!themeCheck?'white':bgColorMain}
                    borderRadius={'2xl'}
                    padding={'4'}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 10,
                      }}>
                      <Text color={!themeCheck?'white':bgColorMain} style={{marginBottom: 5}}>
                      {t('order:cardNum')}
                      </Text>
                      <TextModifiedInput
                        handleChange={handleChange('visaDetails.cardNumber')}
                        width={220}
                        height={40}
                        placeholder="Enter card number"
                        keyboardType="numeric"
                      />
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View style={{flex: 1, marginRight: 10}}>
                        <Text color={!themeCheck?'white':bgColorMain} style={{marginBottom: 5}}>
                        {t('order:cardName')}
                        </Text>
                        <TextModifiedInput
                          handleChange={handleChange(
                            'visaDetails.cardHolderName',
                          )}
                          width={160}
                          height={40}
                          placeholder="Cardholder name"
                        />
                      </View>
                      <View style={{flex: 1}}>
                        <Text color={!themeCheck?'white':bgColorMain} style={{marginBottom: 5}}>
                        {t('order:cvv')}
                        </Text>
                        <TextModifiedInput
                          handleChange={handleChange('visaDetails.cvv')}
                          width={60}
                          height={40}
                          placeholder="CVV"
                          keyboardType="numeric"
                          max={3}
                        />
                      </View>
                    </View>
                  </View>
                  {values.paymentMethod === 'visa' && (
                    <Text color={'red.500'}>
                      {!(
                        values.visaDetails?.cardNumber &&
                        values.visaDetails?.cardHolderName &&
                        values.visaDetails?.cvv
                      )
                        ? 'Please check your visa information'
                        : null}
                    </Text>
                  )}
                </View>
              )}

              <View>
                <Text color={!themeCheck?'white':bgColorMain}>{t('order:probDet')}</Text>
                <View alignSelf={'center'}>
                  <TextModifiedInput
                    handleChange={handleChange('problemDetails')}
                    width={330}
                    multiLine
                    height={100}
                  />
                </View>
                {errors.problemDetails&&<Text color={'red.500'} alignSelf={'center'}>{errors.problemDetails}</Text>}
              </View>
              <Box alignItems="center">
                <Button
                  onPress={()=>handleSubmit()}
                  backgroundColor={!themeCheck?'white':bgColorMain}
                  padding={4}
                  borderRadius={'lg'}>
                  <Text style={{color: themeCheck?'white':bgColorMain}}> {t('order:button')} </Text>
                </Button>
              </Box>
            </Stack>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

export default OrderService;