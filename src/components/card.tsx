import React from 'react';
import {View, Text, Image} from 'native-base';
import {bgColorMain} from '../screens/getStarted/started';
import {ImageSourcePropType} from 'react-native';
import {useAppSelector} from '../app/hooks';
import Icon from 'react-native-vector-icons/FontAwesome.js';

type Iprops = {
  text: String;
  rating?: number;
  imageSrc?: ImageSourcePropType;
};

const CardComp = (props: Iprops) => {
  const themeCheck = useAppSelector(state => state.user.theme);

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
          backgroundColor: themeCheck=='dark' ? bgColorMain : 'white',
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.5,
          shadowRadius: 2,
          elevation: 5,
          width: 130,
        }}>
        <View
          borderRadius={'15'}
          overflow={'hidden'}
          marginBottom={'10'}
          width={'full'}>
          <Image
            source={props.imageSrc}
            width={'5/6'}
            height={'90'}
            alignSelf={'center'}
            borderRadius={'15'}
          />
        </View>
        <View flexDirection={'row'} alignSelf={'center'}>
          {Array.from(
            {
              length: props.rating ?? 0,
            },
            (_, i) => (
              <Icon
                key={i}
                name="star"
                color={themeCheck=='dark' ? 'white' : bgColorMain}
                style={{marginRight: 6}}
              />
            ),
          )}
        </View>
        <Text
          color={themeCheck=='dark' ? 'white' : bgColorMain}
          fontWeight={'bold'}
          textAlign={'center'}
          width={'full'}>
          {props.text}
        </Text>
      </View>
    </View>
  );
};

export default CardComp;
