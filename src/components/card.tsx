import React from 'react';
import {View, Text, Image} from 'native-base';
import {cleaning} from '../screens/getStarted/started';
import { ImageSourcePropType } from 'react-native';

type Iprops= {
  text:String;
  imageSrc?:ImageSourcePropType;

}

const CardComp = (props:Iprops) => {
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
          backgroundColor: '#f9f9f9',
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.5,
          shadowRadius: 2,
          elevation: 5,
        }}>
        <View borderRadius={'15'} overflow={'hidden'} marginBottom={'10'}>
          <Image
            source={props.imageSrc}
            width={'3/3'}
            height={'90'}
            borderRadius={'15'}
          />
        </View>
        <Text color={'darkblue'} fontWeight={'bold'} textAlign={'center'}>
          {props.text}
        </Text>
      </View>
    </View>
  );
};

export default CardComp;
