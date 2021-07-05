import React, { FC } from 'react';
import { StyledAvatar, StyledBackground, StyledContainerText } from './styled';
import { View, TouchableWithoutFeedback, ImageBackground } from 'react-native';
import { Text } from '@tecsinapse/react-core';
export interface AvatarProps {
  srcImage?: string;
  name: string;
  onPress?: () => void;
}

const Avatar: FC<AvatarProps> = ({ srcImage, name, onPress }) => {
  return (
    <View>
      <TouchableWithoutFeedback onPress={onPress}>
        {srcImage ? (
          <StyledAvatar source={{ uri: srcImage }} />
        ) : (
          <StyledBackground
            source={{
              uri:
                'https://cdn.awsli.com.br/600x450/549/549871/produto/29108392/60cdfb3799.jpg',
            }}
          >
            <StyledContainerText>
              <Text fontWeight="bold" fontColor="light">
                {name.toUpperCase()[0]}
              </Text>
            </StyledContainerText>
          </StyledBackground>
        )}
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Avatar;
