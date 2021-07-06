import React, { FC } from 'react';
import { StyledAvatar, StyledBackground, StyledText } from './styled';
import { PressableSurface } from '@tecsinapse/react-core';

import { getIniciais } from './helpers';

export interface AvatarProps {
  srcImage?: string;
  name: string;
  onPress?: () => void;
}

const Avatar: FC<AvatarProps> = ({ srcImage, name, onPress }) => {
  return (
    <PressableSurface onPress={onPress}>
      {srcImage ? (
        <StyledAvatar source={{ uri: srcImage }} />
      ) : (
        <StyledBackground>
          <StyledText fontWeight="bold" fontColor="light">
            {getIniciais(name)}
          </StyledText>
        </StyledBackground>
      )}
    </PressableSurface>
  );
};

export default Avatar;
