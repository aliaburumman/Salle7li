import React from 'react'
import { jordanFlag } from '../screens/getStarted/started'
import { Image, KeyboardTypeOptions, Text, TextInput, View } from 'react-native'
export type Iprops = {
    handleChange: (text: string) => void;
    value?: string;
    placeholder?: string;
    keyboardType?: KeyboardTypeOptions;
    error?:string
  };
const PhoneInput = (props:Iprops) => {
  return (
    <View style={{display:"flex",flexDirection:"column"}}>
    <View style={{ 
        flexDirection:'row',
        alignItems:'center',
        borderWidth: 1, 
        borderColor: "black", 
        borderRadius: 10 ,
        backgroundColor:"white",
        width:330,
        height:60,
        
        
      }}>
<Image source={jordanFlag} style={{width: 30, height: 15,marginLeft:10}} />
<View style={{ width: 2, height: 25, backgroundColor: 'black',marginLeft:10,marginRight: 10 }} />
<Text style={{color:'red'}}>+962</Text>
<TextInput
          
          style={{
            width: 231,
            padding: 10,
            color:'darkblue',
            backgroundColor:'white',
            borderRadius:10,
            marginRight:10,
            height:58
            
           
          }}
          onChangeText={props.handleChange}
          value={props.value}
          placeholder={props.placeholder}
          keyboardType={props.keyboardType}
          placeholderTextColor="grey"
          maxLength={10}
        />
                  


          </View>
          <Text style={{color:'red',fontSize:12}}>{props.error}</Text>
          </View>
  )
}

export default PhoneInput
