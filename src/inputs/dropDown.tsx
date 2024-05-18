import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { View, Text } from 'react-native';
import { t } from 'i18next';
export type Iprops = {
    handleChange: (text: string) => void;
    value?: string;
    placeholder?: string;
    error?:string;
    options:[{
        label:string,
        value:string,
    }

    ];
  };
const Dropdown = (props:Iprops) => {
  const [selectedValue, setSelectedValue] = useState(null);

 

//   const options = [
//     { label: 'Option 1', value: 'option1' },
//     { label: 'Option 2', value: 'option2' },
//     { label: 'Option 3', value: 'option3' },
//   ];

  return (
    <View>
      <Text>{t('selectOpt')}</Text>
      <RNPickerSelect
        placeholder={props.placeholder}
        items={props.options}
        onValueChange={(value) => {setSelectedValue(value)
        props.handleChange('city')}}
        value={selectedValue}
      />
      {selectedValue && <Text>Selected: {selectedValue}</Text>}
    </View>
  );
};

export default Dropdown;