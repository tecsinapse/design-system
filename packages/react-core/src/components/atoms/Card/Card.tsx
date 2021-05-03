import React from 'react';
import { View } from 'react-native';
import { default as CardStyle, TextInfo, TextTitle } from './styled';

export interface CardProps {
  children: JSX.Element;
}

const Card = ({ children }: CardProps): JSX.Element => {
  return (
    <CardStyle>
      <View>
        <TextTitle>Title</TextTitle>
        <TextInfo>
          Text description Text description Text description Text description
          Text description Text description Text description Text description
        </TextInfo>
      </View>
    </CardStyle>
  );
};

export default Card;
