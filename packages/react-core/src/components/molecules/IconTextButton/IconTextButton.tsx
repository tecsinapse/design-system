import { ButtonProps } from '../../atoms/Button';
import { IconProps } from '../../atoms/Icon';
import { TextProps } from '../../atoms/Text';

export type IconPositionOptions = 'left' | 'right';

export interface IconTextButtonProps extends ButtonProps {
  iconProps?: IconProps;
  iconPosition?: IconPositionOptions;
  textProps?: TextProps;
  label?: string;
}
