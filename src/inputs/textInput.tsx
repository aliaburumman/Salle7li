import React from "react";
import { DimensionValue, KeyboardTypeOptions, Text, TextInput, View } from "react-native";
export type Iprops = {
  handleChange: (text: string) => void;
  value?: string;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  error?:string;
  width:DimensionValue;
  marginRight?:DimensionValue;
};

const TextModifiedInput = (props: Iprops) => {
  return (
    <View>
      <TextInput
          
          style={{
            width: props.width,
            padding: 10,
            color:'darkblue',
            backgroundColor:'white',
            borderRadius:10,
            marginRight:props.marginRight? props.marginRight:0,
            height:60
           
          }}
          onChangeText={props.handleChange}
          value={props.value}
          placeholder={props.placeholder}
          keyboardType={props.keyboardType}
          placeholderTextColor="grey"
        />
        <Text style={{color:'red',fontSize:12}}>{props.error}</Text>
    </View>
  );
};

export default TextModifiedInput;
