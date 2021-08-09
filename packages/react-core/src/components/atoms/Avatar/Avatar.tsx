import React from 'react';
import { IconSize } from '@tecsinapse/react-core';

import { getIniciais } from './helpers';
import {
  ContainerButtonAvatar,
  StyledAvatar,
  StyledBackground,
  StyledText,
} from './styled';

export type SizeAvatar = Omit<IconSize, 'centi' | 'deca'>;

export interface AvatarProps {
  /** if your asset is remote, just provide http or https scheme, otherwise for
   *  local asset, provide relative or absolute path */
  srcImage?: string;
  name: string;
  onPress?: () => void;
  size?: keyof SizeAvatar;
  /** isAsset is a property for setting local assets with require under the hood */
  isAsset?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({
  srcImage,
  name,
  onPress,
  size = 'mega',
  isAsset = false,
}) => {
  const [hasError, setHasError] = React.useState<boolean>(false);

  // If the srcImage changes in runtime, this prevents error from being true always (fallback)
  React.useEffect(() => {
    setHasError(false);
  }, [srcImage]);

  return (
    <ContainerButtonAvatar effect="none" onPress={onPress} size={size}>
      {srcImage && !hasError ? (
        <StyledAvatar
          source={isAsset ? { uri: srcImage } : { uri: srcImage }}
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
