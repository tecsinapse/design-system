import { ColorValue, StyleProp, TextProps, TextStyle } from 'react-native';
import { IconSizeType } from '../../../types/defaults';

export interface IconRNVIProps extends TextProps {
  /**
   * Name of the icon to show
   *
   * See Icon Explorer app
   * {@link https://github.com/oblador/react-native-vector-icons/tree/master/Examples/IconExplorer}
   */
  name: string;

  /**
   * Color of the icon
   *
   */
  color?: ColorValue | number | undefined;
}

export interface IconInternalProps {
  size: IconSizeType;
  color: string;
  name: string;
  style?: StyleProp<TextStyle>;
}
