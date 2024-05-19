import {
  Box,
  Button,
  CheckIcon,
  Checkbox,
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
import {useState} from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {useTranslation} from 'react-i18next';
import '../../i18n/i18n.ts';
import {useAppSelector} from '../../app/hooks.ts';

dayjs.extend(utc);
dayjs.extend(timezone);
export interface CurrentLocationCoords {
  longitude: number;
  latitude: number;
}

const OrderService = ({navigation, route}: any) => {
  const {longitude, latitude} = route.params;
  const [selectedDate, setSelectedDate] = useState(null);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [serviceDuration, setServiceDuration] = useState('2');
  const genderCheck = useAppSelector(state => state.user.gender);
  const openPickerDate = () => {
    setOpenDatePicker(true);
  };

  const closePickerDate = () => {
    setOpenDatePicker(false);
  };

  const maxSelectableDate = new Date();
  maxSelectableDate.setDate(maxSelectableDate.getDate() + 7);
  const minSelectableDate = new Date();
  minSelectableDate.setDate(minSelectableDate.getDate());
  const now = new Date();
  const minSelectableTime = new Date(now);
  const getCurrentTime = () => {
    return dayjs().utc().add(13, 'hour');
  };
  minSelectableTime.setHours(now.getHours());
  const {t} = useTranslation();

  const themeCheck = useAppSelector(state => state.user.theme);
  const getCurrentTimeLocal = () => {
    return dayjs().utc().add(3, 'hour');
  };
  const disableTimeSlot = timeSlot => {
    if (!selectedDate) return false;

    const date = dayjs(selectedDate);
    const today = getCurrentTimeLocal();
    console.log('today', today);
    if (!date.isSame(today, 'day')) {
      return false;
    }

    const [startHour] = timeSlot.split('-')[0].split(' ');
    console.log('start', startHour);
    const slotDateTime = today
      .hour(parseInt(startHour, 10))
      .minute(0)
      .second(0)
      .millisecond(0);
    console.log('slot', slotDateTime, '----', slotDateTime.subtract(1, 'hour'));

    return (
      today.isAfter(slotDateTime) ||
      today.isAfter(slotDateTime.subtract(1, 'hour'))
    );
  };

  return (
    <View flex={1} bgColor={themeCheck == 'bright' ? 'white' : bgColorMain}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Formik
          initialValues={{
            ...initialValuesForReservation,
            location: {
              longitude: longitude || null,
              latitude: latitude || null,
            },
          }}
          onSubmit={(values, {setSubmitting}) => {
            navigation.navigate('chooseWorker', {values: values}),
              setSubmitting(false);
          }}
          validateOnChange={false}
          validationSchema={validationSchemaForReservation}>
          {({handleChange, handleSubmit, setFieldValue, values, errors}) => (
            <Stack space={2}>
              <View alignItems={'center'}>
                <Text
                  color={themeCheck == 'dark' ? 'white' : bgColorMain}
                  fontSize={'4xl'}>
                  {t('order:title')}
                </Text>
              </View>
              <View>
                <Text color={themeCheck == 'dark' ? 'white' : bgColorMain}>
                  {' '}
                  {t('order:selectService')}
                </Text>
                <View alignItems={'center'}>
                  <Select
                    width="5/6"
                    bgColor={themeCheck == 'dark' ? 'white' : bgColorMain}
                    borderRadius={'lg'}
                    accessibilityLabel="Choose"
                    placeholder={t('order:selectService')}
                    placeholderTextColor={
                      themeCheck == 'bright' ? 'white' : bgColorMain
                    }
                    padding={'4'}
                    color={themeCheck == 'bright' ? 'white' : bgColorMain}
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
                <Text color={themeCheck == 'dark' ? 'white' : bgColorMain}>
                  {t('order:selectDate')}
                </Text>
                <Button
                  onPress={openPickerDate}
                  width={'5/6'}
                  alignSelf={'center'}
                  padding={'5'}
                  bgColor={themeCheck == 'dark' ? 'white' : bgColorMain}
                  borderRadius={'lg'}>
                  <Text color={themeCheck == 'bright' ? 'white' : bgColorMain}>
                    {values.date
                      ? dayjs(values.date).format('YYYY-MM-DD')
                      : t('order:selectDate')}
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
                      const dateValue = selectedDate
                        ? dayjs(selectedDate).toISOString()
                        : null;
                      if (dateValue) {
                        setFieldValue('date', dateValue); 
                        setSelectedDate(dateValue);
                      }
                      closePickerDate();
                    }}
                  />
                )}
                {errors.date && (
                  <Text color={'red.500'} alignSelf={'center'}>
                    {errors?.date}
                  </Text>
                )}
              </View>
              <View>
                <Text color={themeCheck == 'dark' ? 'white' : bgColorMain}>
                  {t('order:selectDuration')}
                </Text>
                <View alignItems={'center'}>
                  <Select
                    width="5/6"
                    bgColor={themeCheck == 'dark' ? 'white' : bgColorMain}
                    borderRadius={'lg'}
                    accessibilityLabel="Choose Service Duration"
                    placeholder={t('order:selectDuration')}
                    placeholderTextColor={
                      themeCheck == 'bright' ? 'white' : bgColorMain
                    }
                    padding={'4'}
                    color={themeCheck == 'bright' ? 'white' : bgColorMain}
                    selectedValue={serviceDuration}
                    onValueChange={itemValue => setServiceDuration(itemValue)}
                    _selectedItem={{
                      bg: 'blue.200',
                      endIcon: <CheckIcon size={5} />,
                    }}>
                    <Select.Item label="2 hours" value="2" />
                    <Select.Item label="4 hours" value="4" />
                  </Select>
                </View>
              </View>
              {selectedDate && (
                <View>
                  <Text color={themeCheck == 'dark' ? 'white' : bgColorMain}>
                    {t('order:selectTime')}
                  </Text>
                  {serviceDuration == '2' ? (
                    <Radio.Group
                      name="myRadioGroup1"
                      accessibilityLabel="favorite number"
                      defaultValue=""
                      value={values.availabilityTime}
                      onChange={nextValue => {
                        handleChange('availabilityTime')(nextValue);
                      }}>
                      <Stack direction="row" alignSelf={'center'} space={4}>
                        <Radio
                          value="8AM-10AM"
                          isDisabled={disableTimeSlot('8AM-10PM')}
                          colorScheme={'darkBlue'}
                          my={4}>
                          <Text
                            color={
                              themeCheck == 'dark' ? 'white' : bgColorMain
                            }>
                            8 AM - 10 AM
                          </Text>
                        </Radio>
                        <Radio
                          value="10AM-12PM"
                          isDisabled={disableTimeSlot('10AM-12PM')}
                          colorScheme={'darkBlue'}
                          my={4}>
                          <Text
                            color={
                              themeCheck == 'dark' ? 'white' : bgColorMain
                            }>
                            10 AM - 12 PM
                          </Text>
                        </Radio>
                        <Radio
                          value="12PM-2PM"
                          isDisabled={disableTimeSlot('12PM-2PM')}
                          colorScheme={'darkBlue'}
                          my={4}>
                          <Text
                            color={
                              themeCheck == 'dark' ? 'white' : bgColorMain
                            }>
                            12 PM - 2 PM
                          </Text>
                        </Radio>
                      </Stack>
                      <Stack direction="row" alignSelf={'center'} space={4}>
                        <Radio
                          value="2PM-4PM"
                          isDisabled={disableTimeSlot('2PM-4PM')}
                          colorScheme={'darkBlue'}
                          my={4}>
                          <Text
                            color={
                              themeCheck == 'dark' ? 'white' : bgColorMain
                            }>
                            2 PM - 4 PM
                          </Text>
                        </Radio>
                        <Radio
                          value="4PM-6PM"
                          isDisabled={disableTimeSlot('4PM-6PM')}
                          colorScheme={'darkBlue'}
                          my={4}>
                          <Text
                            color={
                              themeCheck == 'dark' ? 'white' : bgColorMain
                            }>
                            4 PM - 6 PM
                          </Text>
                        </Radio>
                        <Radio
                          value="6PM-8PM"
                          isDisabled={disableTimeSlot('6PM-8PM')}
                          colorScheme={'darkBlue'}
                          my={4}>
                          <Text
                            color={
                              themeCheck == 'dark' ? 'white' : bgColorMain
                            }>
                            6 PM - 8 PM
                          </Text>
                        </Radio>
                      </Stack>
                      <Stack direction="row" alignSelf={'center'} space={4}>
                        <Radio
                          value="8PM-10PM"
                          isDisabled={disableTimeSlot('8PM-10PM')}
                          colorScheme={'darkBlue'}
                          my={4}>
                          <Text
                            color={
                              themeCheck == 'dark' ? 'white' : bgColorMain
                            }>
                            8 PM - 10 PM
                          </Text>
                        </Radio>
                      </Stack>
                    </Radio.Group>
                  ) : (
                    <Radio.Group
                      name="myRadioGroup2"
                      accessibilityLabel="favorite number"
                      defaultValue=""
                      value={values.availabilityTime}
                      onChange={nextValue => {
                        handleChange('availabilityTime')(nextValue);
                      }}>
                      <Stack direction="row" alignSelf={'center'} space={4}>
                        <Radio
                          value="8AM-12PM"
                          isDisabled={disableTimeSlot('8AM-12PM')}
                          colorScheme={'darkBlue'}
                          my={4}>
                          <Text
                            color={
                              themeCheck == 'dark' ? 'white' : bgColorMain
                            }>
                            8 AM - 12 PM
                          </Text>
                        </Radio>
                        <Radio
                          value="12PM-4PM"
                          isDisabled={disableTimeSlot('12PM-4PM')}
                          colorScheme={'darkBlue'}
                          my={4}>
                          <Text
                            color={
                              themeCheck == 'dark' ? 'white' : bgColorMain
                            }>
                            12 PM - 4 PM
                          </Text>
                        </Radio>
                        <Radio
                          value="4PM-8PM"
                          isDisabled={disableTimeSlot('4PM-8PM')}
                          colorScheme={'darkBlue'}
                          my={4}>
                          <Text
                            color={
                              themeCheck == 'dark' ? 'white' : bgColorMain
                            }>
                            4 PM - 8 PM
                          </Text>
                        </Radio>
                      </Stack>
                      <Stack direction="row" alignSelf={'center'} space={4}>
                        <Radio
                          value="10AM-2PM"
                          isDisabled={disableTimeSlot('10AM-2PM')}
                          colorScheme={'darkBlue'}
                          my={4}>
                          <Text
                            color={
                              themeCheck == 'dark' ? 'white' : bgColorMain
                            }>
                            10 AM - 2 PM
                          </Text>
                        </Radio>
                        <Radio
                          value="2PM-6PM"
                          isDisabled={disableTimeSlot('2PM-6PM')}
                          colorScheme={'darkBlue'}
                          my={4}>
                          <Text
                            color={
                              themeCheck == 'dark' ? 'white' : bgColorMain
                            }>
                            2 PM - 6 PM
                          </Text>
                        </Radio>
                        <Radio
                          value="6PM-10PM"
                          isDisabled={disableTimeSlot('6PM-10PM')}
                          colorScheme={'darkBlue'}
                          my={4}>
                          <Text
                            color={
                              themeCheck == 'dark' ? 'white' : bgColorMain
                            }>
                            6 PM - 10 PM
                          </Text>
                        </Radio>
                      </Stack>
                    </Radio.Group>
                  )}
                </View>
              )}
              <View>
                <Text color={themeCheck == 'dark' ? 'white' : bgColorMain}>
                  {t('order:selectWorker')}
                </Text>
                <Radio.Group
                  name="myRadioGroup3"
                  accessibilityLabel="favorite number"
                  defaultValue="male"
                  value={values.workerGender}
                  onChange={nextValue => {
                    handleChange('workerGender')(nextValue);
                  }}>
                  <Stack direction="row" alignSelf={'center'} space={4}>
                    <Radio value="male" colorScheme={'darkBlue'} my={1}>
                      <Text
                        color={themeCheck == 'dark' ? 'white' : bgColorMain}>
                        {' '}
                        {t('male')}{' '}
                      </Text>
                    </Radio>
                    <Radio
                      value="female"
                      isDisabled={genderCheck == 'male'}
                      colorScheme={'pink'}
                      my={1}>
                      <Text
                        color={themeCheck == 'dark' ? 'white' : bgColorMain}>
                        {' '}
                        {t('female')}
                      </Text>
                    </Radio>
                    <Radio
                      value="any"
                      isDisabled={genderCheck == 'male'}
                      colorScheme={'yellow'}
                      my={1}>
                      <Text
                        color={themeCheck == 'dark' ? 'white' : bgColorMain}>
                        {' '}
                        {t('any')}{' '}
                      </Text>
                    </Radio>
                  </Stack>
                </Radio.Group>
              </View>

              <View>
                <Text color={themeCheck == 'dark' ? 'white' : bgColorMain}>
                  {t('order:selectPayement')}
                </Text>
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
                      <Text
                        color={themeCheck == 'dark' ? 'white' : bgColorMain}>
                        {' '}
                        {t('cash')}{' '}
                      </Text>
                    </Radio>
                    <Radio value="visa" colorScheme={'pink'} my={1}>
                      <Text
                        color={themeCheck == 'dark' ? 'white' : bgColorMain}>
                        {' '}
                        {t('visa')}{' '}
                      </Text>
                    </Radio>
                  </Stack>
                </Radio.Group>
              </View>
              {values.paymentMethod === 'visa' && (
                <View>
                  <Text color={themeCheck == 'dark' ? 'white' : bgColorMain}>
                    {t('order:cardOpt')}
                  </Text>
                  <View
                    borderWidth={'2'}
                    borderColor={themeCheck == 'dark' ? 'white' : bgColorMain}
                    borderRadius={'2xl'}
                    padding={'4'}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 10,
                      }}>
                      <Text
                        color={themeCheck == 'dark' ? 'white' : bgColorMain}
                        style={{marginBottom: 5}}>
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
                        <Text
                          color={themeCheck == 'dark' ? 'white' : bgColorMain}
                          style={{marginBottom: 5}}>
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
                        <Text
                          color={themeCheck == 'dark' ? 'white' : bgColorMain}
                          style={{marginBottom: 5}}>
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
                <Text color={themeCheck == 'dark' ? 'white' : bgColorMain}>
                  {t('order:probDet')}
                </Text>
                <View alignSelf={'center'}>
                  <TextModifiedInput
                    handleChange={handleChange('problemDetails')}
                    width={330}
                    multiLine
                    height={100}
                  />
                </View>
                {errors.problemDetails && (
                  <Text color={'red.500'} alignSelf={'center'}>
                    {errors.problemDetails}
                  </Text>
                )}
              </View>
              <Box alignItems="center">
                <Button
                  onPress={() => handleSubmit()}
                  bgColor={themeCheck == 'dark' ? 'white' : bgColorMain}
                  padding={4}
                  borderRadius={'lg'}>
                  <Text
                    style={{
                      color: themeCheck == 'bright' ? 'white' : bgColorMain,
                    }}>
                    {' '}
                    {t('order:button')}{' '}
                  </Text>
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
