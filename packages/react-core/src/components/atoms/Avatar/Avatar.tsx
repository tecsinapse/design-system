import React from 'react';
import { Text } from '../Text';
import { getIniciais } from './helpers';
import {
  ContainerButtonAvatar,
  getStyledTextComponent,
  StyledAvatar,
  StyledBackground,
} from './styled';
import { AvatarProps } from './types';

const Avatar: React.FC<AvatarProps> = ({
  source,
  name,
  onPress,
  size = 'mega',
  TextComponent = Text,
}) => {
  const [hasError, setHasError] = React.useState<boolean>(false);

  // If the source changes in runtime, this prevents error from being true always (fallback)
  React.useEffect(() => {
    setHasError(false);
  }, [source]);

  const StyledText = getStyledTextComponent(TextComponent);

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
