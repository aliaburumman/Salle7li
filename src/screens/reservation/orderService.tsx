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
import {useState} from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import MapScreen from '../location/setLocation';

dayjs.extend(utc);
dayjs.extend(timezone);
export interface CurrentLocationCoords {
  longitude: number;
  latitude: number;
}

const OrderService = ({navigation, route}: any) => {
  const {longitude, latitude} = route.params;
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [openTimePicker, setOpenTimePicker] = useState(false);
  const [openTimePicker2, setOpenTimePicker2] = useState(false);

  console.log('asdasdas', longitude, '   ', latitude);
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

  return (
    <View flex={1} bgColor={bgColorMain}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Formik
            initialValues={{
              ...initialValuesForReservation,
              location: {
                longitude: longitude || null,
                latitude: latitude || null,
              },
             
            }}
            onSubmit={values => navigation.navigate('ChooseWorker')}
          validateOnChange={false}
          validationSchema={validationSchemaForReservation}
          >
          {({handleChange, handleSubmit, values, errors}) => (
            <Stack space={2}>
              <View alignItems={'center'}>
                <Text color={'white'} fontSize={'4xl'}>
                  Order service
                </Text>
              </View>
              <View>
                <Text color={'white'}>Select your service:</Text>
                <View alignItems={'center'}>
                  <Select
                    width="5/6"
                    bgColor={'white'}
                    borderRadius={'lg'}
                    accessibilityLabel="Choose"
                    placeholder="Choose"
                    padding={'4'}
                    onValueChange={value => handleChange('service')(value)}
                    selectedValue={values.service}
                    _selectedItem={{
                      bg: 'blue.200',
                      endIcon: <CheckIcon size={5} />,
                    }}>
                    <Select.Item label="Blacksmith" value="blacksmith" />
                    <Select.Item label="Cleaning" value="cleaning" />
                    <Select.Item label="Landscaping" value="landscaping" />
                    <Select.Item label="Maintenance" value="maintenance" />
                    <Select.Item label="Renovation" value="renovation" />
                  </Select>
                  {errors.service && (
                    <Text color={'red.500'}>{errors.service}</Text>
                  )}
                </View>
              </View>

              <View>
                <Text color={'white'}>Select date:</Text>
                <Button
                  onPress={openPickerDate}
                  width={'5/6'}
                  alignSelf={'center'}
                  padding={'5'}
                  bgColor={'white'}
                  borderRadius={'lg'}>
                  <Text color={'darkBlue.700'}>
                    {values.date
                      ? dayjs(values.date).format('YYYY-MM-DD')
                      : 'Date'}
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
                <Text color={'white'}>Select your Availability Time:</Text>
                <View flexDirection={'row'} justifyContent={'space-evenly'}>
                  <Button
                    onPress={openPickerTime}
                    width={'2/6'}
                    padding={'5'}
                    bgColor={'white'}
                    borderRadius={'lg'}>
                    <Text color={'darkBlue.700'}>
                      {values.startTime
                        ? dayjs.utc(values.startTime).local().format('hh:mm A')
                        : 'Start time'}
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
                          handleChange('startTime')(time);
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
                    bgColor={'white'}
                    borderRadius={'lg'}>
                    <Text color={'darkBlue.700'}>
                      {values.endTime
                        ? dayjs.utc(values.endTime).local().format('hh:mm A')
                        : 'End time'}
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
                          handleChange('endTime')(time);
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
                <Text color={'white'}>Select your Worker Gender:</Text>
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
                      <Text color={'white'}> Male </Text>
                    </Radio>
                    <Radio value="female" colorScheme={'pink'} my={1}>
                      <Text color={'white'}> Female </Text>
                    </Radio>
                    <Radio value="any" colorScheme={'yellow'} my={1}>
                      <Text color={'white'}> Any </Text>
                    </Radio>
                  </Stack>
                </Radio.Group>
              </View>

              <View>
                <Text color={'white'}>Select Payment Method:</Text>
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
                      <Text color={'white'}> Cash </Text>
                    </Radio>
                    <Radio value="visa" colorScheme={'pink'} my={1}>
                      <Text color={'white'}> Visa </Text>
                    </Radio>
                  </Stack>
                </Radio.Group>
              </View>
              {values.paymentMethod === 'visa' && (
                <View>
                  <Text color={'white'}>Visa Card Details:</Text>
                  <View
                    borderWidth={'2'}
                    borderColor={'white'}
                    borderRadius={'2xl'}
                    padding={'4'}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 10,
                      }}>
                      <Text color={'white'} style={{marginBottom: 5}}>
                        Card Number:
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
                        <Text color={'white'} style={{marginBottom: 5}}>
                          Cardholder Name
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
                        <Text color={'white'} style={{marginBottom: 5}}>
                          CVV
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
                <Text color={'white'}>Problem Details:</Text>
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
                  backgroundColor={'white'}
                  padding={4}
                  borderRadius={'lg'}>
                  <Text style={{color: 'darkblue'}}> Next </Text>
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
