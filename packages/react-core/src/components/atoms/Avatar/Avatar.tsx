import React, { FC } from 'react';
import { IconSize } from '@tecsinapse/react-core';
import {
  ContainerButtonAvatar,
  StyledAvatar,
  StyledBackground,
  StyledText,
} from './styled';

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
  const [hasError, setHasError] = React.useState<boolean>(false);

  // If the srcImage changes in runtime, this prevents error from being true always (fallback)
  React.useEffect(() => {
    setHasError(false);
  }, [srcImage]);

  return (
    <ContainerButtonAvatar onPress={onPress} size={size}>
      {srcImage && !hasError ? (
        <StyledAvatar
          source={{ uri: srcImage }}
          onError={() => setHasError(true)}
        />
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
