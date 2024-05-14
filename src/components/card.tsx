import React from 'react';
import {View, Text, Image} from 'native-base';
import {bgColorMain} from '../screens/getStarted/started';
import { ImageSourcePropType } from 'react-native';
import { useAppSelector } from '../app/hooks';

type Iprops= {
  text:String;
  imageSrc?:ImageSourcePropType;

}

const CardComp = (props:Iprops) => {
  const themeCheck = useAppSelector(state=>state.theme.lightMode)

  return (
    <View style={{flexDirection: 'row'}}>
      <View
        style={{
          flexDirection: 'column',
          marginRight: 5,
          borderWidth: 1,
          borderColor: 'gray',
          borderRadius: 15,
          padding: 15,
          backgroundColor: themeCheck?bgColorMain:'white',
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.5,
          shadowRadius: 2,
          elevation: 5,
          width:130
        }}>
        <View borderRadius={'15'} overflow={'hidden'} marginBottom={'10'} width={'full'}>
          <Image
            source={props.imageSrc}
            width={'5/6'}
            height={'90'}
            borderRadius={'15'}
          />
        </View>
        <Text color={themeCheck?'white':bgColorMain} fontWeight={'bold'} textAlign={'center'} width={'full'}>
          {props.text}
        </Text>
      </View>
    </View>
  );
};

export default CardComp;
