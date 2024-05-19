import React from "react";
import { DimensionValue, I18nManager, KeyboardTypeOptions, Text, TextInput, View } from "react-native";
import { useAppSelector } from "../app/hooks";
import { bgColorMain } from "../screens/getStarted/started";
export type Iprops = {
  handleChange: (text: string) => void;
  value?: string;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  error?:string;
  width:DimensionValue;
  marginRight?:DimensionValue;
  height?:DimensionValue;
  multiLine?:boolean;
  max?:number;
  bgColor?:string
};

const TextModifiedInput = (props: Iprops) => {
  const themeCheck = useAppSelector(state=>state.user.theme) || 'dark';
console.log("adsas",themeCheck);

  return (
    <View>
      <TextInput
          
          style={{
            width: props.width,
            padding: 10,
            color:themeCheck=='bright'?'white':bgColorMain,
            backgroundColor:themeCheck=='dark'?'white':bgColorMain,
            borderRadius:10,
            marginRight:props.marginRight? props.marginRight:0,
            height:props.height?props.height:60,
            textAlign: I18nManager.isRTL ? 'right' : 'left',
            
           
          }}
          onChangeText={props.handleChange}
          value={props.value}
          placeholder={props.placeholder}
          keyboardType={props.keyboardType}
          placeholderTextColor={themeCheck=='bright'?'white':bgColorMain}
          multiline={props.multiLine?true:false}
          maxLength={props.max?props.max:undefined}
          
        
        />
        <Text style={{color:'red',fontSize:12}}>{props.error}</Text>
    </View>
  );
};

export default TextModifiedInput;
