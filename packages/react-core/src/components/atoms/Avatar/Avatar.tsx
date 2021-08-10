import React from 'react';
import { IconSize } from '@tecsinapse/react-core';

import { ImageSourcePropType } from 'react-native';
import { getIniciais } from './helpers';
import {
  ContainerButtonAvatar,
  StyledAvatar,
  StyledBackground,
  StyledText,
} from './styled';

export type SizeAvatar = Omit<IconSize, 'centi' | 'deca'>;

export interface AvatarProps {
  /** This property should follow react-native spec. If the asset is remote, use `{ uri: 'https://example.com/logo.png' }`.
   * For local assets, you shold use `require('./logo.png')`. */
  source?: ImageSourcePropType;
  name: string;
  onPress?: () => void;
  size?: keyof SizeAvatar;
}

export const Avatar: React.FC<AvatarProps> = ({
  source,
  name,
  onPress,
  size = 'mega',
}) => {
  const [hasError, setHasError] = React.useState<boolean>(false);

  // If the source changes in runtime, this prevents error from being true always (fallback)
  React.useEffect(() => {
    setHasError(false);
  }, [source]);

  return (
    <ContainerButtonAvatar effect="none" onPress={onPress} size={size}>
      {source && !hasError ? (
        <StyledAvatar source={source} onError={() => setHasError(true)} />
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
