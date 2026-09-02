import React from 'react';
import { Image, ImageSourcePropType, View, type ViewProps } from 'react-native';
import { cn } from '@tecsinapse/cortex-core';
import PressableSurface from '../PressableSurface/PressableSurface';
import Text, { TextProps } from '../Text/Text';
import { getIniciais } from './helpers';

export type SizeAvatar = 'micro' | 'mili' | 'kilo' | 'mega';

export const AVATAR_SIZE_PX: Record<SizeAvatar, number> = {
  micro: 12,
  mili: 14,
  kilo: 24,
  mega: 32,
};

export interface AvatarProps extends ViewProps {
  /** This property should follow react-native spec. If the asset is remote, use `{ uri: 'https://example.com/logo.png' }`.
   * For local assets, you shold use `require('./logo.png')`. */
  source?: ImageSourcePropType;
  name: string;
  onPress?: () => void;
  size?: SizeAvatar;
  TextComponent?: React.ComponentType<TextProps>;
}

const Avatar: React.FC<AvatarProps> = ({
  source,
  name,
  onPress,
  size = 'mega',
  TextComponent = Text,
  className,
  style,
  ...rest
}) => {
  const [hasError, setHasError] = React.useState<boolean>(false);

  React.useEffect(() => {
    setHasError(false);
  }, [source]);

  const dimension = AVATAR_SIZE_PX[size];

  return (
    <PressableSurface
      effect="none"
      onPress={onPress}
      {...rest}
      className={cn(className)}
      style={[{ width: dimension, height: dimension }, style]}
    >
      {source && !hasError ? (
        <Image
          source={source}
          onError={() => setHasError(true)}
          className="w-full h-full rounded-pill overflow-hidden"
        />
      ) : (
        <View className="bg-secondary-dark w-full h-full rounded-pill items-center justify-center">
          <TextComponent
            fontWeight="bold"
            fontColor="light"
            textTransform="uppercase"
            style={{ textAlign: 'center' }}
          >
            {getIniciais(name)}
          </TextComponent>
        </View>
      )}
    </PressableSurface>
  );
};

export default Avatar;
