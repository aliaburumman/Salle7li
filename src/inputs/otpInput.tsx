import React, { SetStateAction } from "react";
import { DimensionValue, KeyboardTypeOptions, Text, TextInput, View } from "react-native";
import { useAppSelector } from "../app/hooks";
import { bgColorMain } from "../screens/getStarted/started";
export type Iprops = {
  handleChange: (text: string|SetStateAction<string>) => void;
  value?: string;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  error?:string;
  width:DimensionValue;
  marginRight?:DimensionValue;
  height?:DimensionValue;
  multiLine?:boolean;
  max?:number;
};

const OtpInput = (props: Iprops) => {
  const themeCheck = useAppSelector(state=>state.theme.lightMode)

  return (
    <View>
      <TextInput
          
          style={{
            width: props.width,
           
            color:themeCheck?'white':bgColorMain,
            backgroundColor:!themeCheck?'white':bgColorMain,
            borderRadius:10,
            marginRight:props.marginRight? props.marginRight:0,
            height:props.height?props.height:60,
            // paddingHorizontal:100
           
          }}
          onChangeText={props.handleChange}
          value={props.value}
          placeholder={props.placeholder}
          keyboardType={props.keyboardType}
          placeholderTextColor="grey"
          multiline={props.multiLine?true:false}
          maxLength={props.max?props.max:undefined}
          
        
        />
        <Text style={{color:'red',fontSize:12}}>{props.error}</Text>
    </View>
  );
};

export default OtpInput;
