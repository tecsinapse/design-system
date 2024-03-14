import { IconProps } from '../../atoms/Icon';
import { TextProps } from '../../atoms/Text';
import { ButtonProps } from '../../atoms/Button';

export type IconPositionOptions = 'left' | 'right';

export interface IconTextButtonProps extends ButtonProps {
  iconProps?: IconProps;
  iconPosition?: IconPositionOptions;
  textProps?: TextProps;
  label?: string;
}
