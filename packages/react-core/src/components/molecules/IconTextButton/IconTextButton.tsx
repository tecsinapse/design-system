import { ButtonProps, IconProps, TextProps } from '@tecsinapse/react-core';

export type IconPositionOptions = 'left' | 'right';

export interface IconTextButtonProps extends ButtonProps {
  iconProps?: IconProps;
  iconPosition?: IconPositionOptions;
  textProps?: TextProps;
  label?: string;
}
