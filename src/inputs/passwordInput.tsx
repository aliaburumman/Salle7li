import React, { useState } from "react";
import { I18nManager, KeyboardTypeOptions, Pressable, Text, TextInput, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons.js';
import { bgColorMain } from "../screens/getStarted/started";
import { useAppSelector } from "../app/hooks";
export type Iprops = {
  handleChange: (text: string) => void;
  value?: string;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  error?:string
};

const PasswordInput = (props: Iprops) => {
  const [visible, setVisible] = useState(false);
const themeCheck = useAppSelector(state=>state.user.theme) || 'dark';
  return (
    <View >
      <View style={{ 
        borderWidth: 1, 
        borderColor: "black", 
        borderRadius: 10 ,
        backgroundColor:themeCheck=='bright'?bgColorMain:'white',
        width:330,
        height:60
        
      }}>
        <TextInput
          secureTextEntry={!visible}
          style={{
            width: 250,
            paddingLeft: 10,
            paddingTop:15,
            color:themeCheck=='dark'?bgColorMain:'white',
            textAlign: I18nManager.isRTL ? 'right' : 'left',
           
          }}
          onChangeText={props.handleChange}
          value={props.value}
          placeholder={props.placeholder}
          keyboardType={props.keyboardType}
          placeholderTextColor={themeCheck=='dark'?bgColorMain:'white'}
        />
        <View style={{width:30,alignSelf: 'flex-end'}}>
        <Pressable
        onPress={() => {
          setVisible(!visible);
        }}
        style={{ position: "relative", bottom: 38,  zIndex: 10}}
      >
        <Icon name={!visible?"eye":"eye-off"} color={themeCheck=='dark'?bgColorMain:'white'} size={25}/>
      </Pressable>
      </View>
      </View>
      
      <Text style={{color:'red',fontSize:12}}>{props.error}</Text>
    </View>
  );
};

export default PasswordInput;
