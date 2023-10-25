import { IconSize } from '../../../types/defaults';
import { ImageSourcePropType } from 'react-native';
import { FC } from 'react';
import { TextProps } from '../Text';

export type SizeAvatar = Omit<IconSize, 'centi' | 'deca'>;

export interface AvatarProps {
  /** This property should follow react-native spec. If the asset is remote, use `{ uri: 'https://example.com/logo.png' }`.
   * For local assets, you shold use `require('./logo.png')`. */
  source?: ImageSourcePropType;
  name: string;
  onPress?: () => void;
  size?: keyof SizeAvatar;
  TextComponent?: FC<TextProps>;
}
