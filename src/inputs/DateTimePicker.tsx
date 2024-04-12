import RNDateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import {Button, Text, View} from 'native-base';
import React, {useState} from 'react';
type Iprops = {
  values: string | Date;
  handleDateChange: (event: any, selectedTime: any) => void;
  mode: 'date' | 'time' | 'datetime';
  title: string;
  label: string;
};

const DateTimePicker = (props: Iprops) => {
  const [openDatePicker, setOpenDatePicker] = useState(false);

  const openPicker = () => {
    setOpenDatePicker(true);
  };

  const closePicker = () => {
    setOpenDatePicker(false);
  };

  return (
    <View>
      <Text color={'white'}>{props.label}</Text>
      <Button
        onPress={openPicker}
        width={'5/6'}
        alignSelf={'center'}
        padding={'5'}
        bgColor={'white'}
        borderRadius={'lg'}>
        <Text color={'darkBlue.700'}>
          {props.values
            ? dayjs(props.values).format('YYYY-MM-DD')
            : props.title}
        </Text>
      </Button>
      {openDatePicker && (
        <RNDateTimePicker
          value={props.values ? new Date(props.values) : new Date()}
          mode={props.mode == 'date' ? 'date' : 'time'}
          display="spinner"
          onChange={props.handleDateChange}
        />
      )}
    </View>
  );
};

export default DateTimePicker;
