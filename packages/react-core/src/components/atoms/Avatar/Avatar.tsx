import React, { FC } from 'react';
import { StyledAvatar, StyledBackground, StyledContainerText } from './styled';
import { View, TouchableWithoutFeedback, ImageBackground } from 'react-native';
import { Text } from '@tecsinapse/react-core';

import { getIniciais } from './helpers';

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
          <StyledBackground>
            <StyledContainerText>
              <Text fontWeight="bold" fontColor="light">
                {getIniciais(name)}
              </Text>
            </StyledContainerText>
          </StyledBackground>
        )}
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Avatar;
