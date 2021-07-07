import React, { FC } from 'react';
import {
  ContainerButtonAvatar,
  StyledAvatar,
  StyledBackground,
  StyledText,
} from './styled';
import { IconSize } from '@tecsinapse/react-core';

import { getIniciais } from './helpers';

export type SizeAvatar = Omit<IconSize, 'centi' | 'deca'>;

export interface AvatarProps {
  srcImage?: string;
  name: string;
  onPress?: () => void;
  size?: keyof SizeAvatar;
}

const Avatar: FC<AvatarProps> = ({
  srcImage,
  name,
  onPress,
  size = 'mega',
}) => {
  return (
    <ContainerButtonAvatar onPress={onPress} size={size}>
      {srcImage ? (
        <StyledAvatar source={{ uri: srcImage }} />
      ) : (
        <StyledBackground>
          <StyledText fontWeight="bold" fontColor="light">
            {getIniciais(name)}
          </StyledText>
        </StyledBackground>
      )}
    </ContainerButtonAvatar>
  );
};

export default Avatar;
