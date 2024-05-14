import React, { useState } from "react";
import { KeyboardTypeOptions, Pressable, Text, TextInput, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons.js';
import { bgColorMain } from "../screens/getStarted/started";
export type Iprops = {
  handleChange: (text: string) => void;
  value?: string;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  error?:string
};

const PasswordInput = (props: Iprops) => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={{ position: "relative" }}>
      <View style={{ 
        position: "relative", 
        borderWidth: 1, 
        borderColor: "black", 
        borderRadius: 10 ,
        backgroundColor:"white",
        width:330,
        height:60
        
      }}>
        <TextInput
          secureTextEntry={!visible}
          style={{
            width: 250,
            paddingLeft: 10,
            paddingTop:15,
            color:'darkblue',
           
          }}
          onChangeText={props.handleChange}
          value={props.value}
          placeholder={props.placeholder}
          keyboardType={props.keyboardType}
          placeholderTextColor="grey"
        />
      </View>
      <Pressable
        onPress={() => {
          setVisible(!visible);
        }}
        style={{ position: "absolute", top: 20, right: 7, zIndex: 10 }}
      >
        <Icon name={!visible?"eye":"eye-off"} color={bgColorMain} size={25}/>
      </Pressable>
      <Text style={{color:'red',fontSize:12}}>{props.error}</Text>
    </View>
  );
};

export default PasswordInput;
