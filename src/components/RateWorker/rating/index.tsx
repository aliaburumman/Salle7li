import React, {Dispatch, SetStateAction} from 'react';
import {HStack, Pressable} from 'native-base';
import BigStar from '../../../assets/icons/BigStar';
import BigStarFilled from '../../../assets/icons/BigStarFilled';

const array = [...Array(5)];

interface IProps {
  rating: number;
  setRating: Dispatch<SetStateAction<number>>;
}

const RatingStars = ({rating, setRating}: IProps) => {
  return (
    <HStack mt={7}>
      {array.map((_, index) => {
        const onPress = () => {
          index + 1 === rating ? setRating(0) : setRating(index + 1);
        };
        return (
          <Pressable key={index} onPress={onPress}>
            {index + 1 <= rating ? <BigStarFilled /> : <BigStar />}
          </Pressable>
        );
      })}
    </HStack>
  );
};

export default RatingStars;
