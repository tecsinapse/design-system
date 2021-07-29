import {
  BorderRadiusType,
  ColorGradationType,
  ColorType,
  FontColorType,
  TextProps,
  VariantType
} from '@tecsinapse/react-core';
import React, { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { PressableSurfaceProps, SurfaceColor } from '../PressableSurface';
import { StyledButton } from './styled';

export type ButtonSizeType = 'small' | 'default';

export type ButtonStateType = 'loading' | 'error' | 'success' | 'default';

export interface ButtonStateProps {
  buttonSize?: ButtonSizeType;
  fontColor?: FontColorType;
  textComponent?: React.FC<TextProps>;
  text?: string;
}

export interface ButtonProps extends PressableSurfaceProps {
  style?: StyleProp<ViewStyle>;
  color?: ColorType;
  variant?: VariantType;
  tone?: ColorGradationType;
  frozen?: boolean | null;
  borderRadius?: BorderRadiusType;
  size?: ButtonSizeType;
  state?: ButtonStateType;
  loadingComponent?: JSX.Element;
  errorComponent?: JSX.Element;
  successComponent?: JSX.Element;
}

const Button: FC<ButtonProps> = ({
  children,
  style,
  color = 'primary',
  variant = 'filled',
  tone = 'medium',
  state = 'default',
  loadingComponent,
  errorComponent,
  successComponent,
  size,
  frozen,
  disabled,
  ...rest
}): JSX.Element => {
  const _frozen = frozen || state === 'loading';
  let _color: ColorType;
  switch (state) {
    case 'error':
      _color = 'error';
      break;

    case 'success':
      _color = 'success';
      break;

    default:
      _color = color;
      break;
  }

  let _surfaceColor: SurfaceColor | undefined = undefined
  if (variant === 'filled') {
    _surfaceColor = {
      color: _color,
      tone: tone
    }
  }

  if (disabled) {
    _surfaceColor = {
      color: _color,
      tone: 'light'
    }
  }

  return (
    <StyledButton
      {...rest}
      accessibilityRole="button"
      style={style}
      color={_color}
      tone={tone}
      surfaceColor={_surfaceColor}
      variant={variant}
      size={size}
      disabled={_frozen || disabled}
      frozen={disabled}
    >
      {state === 'loading' && loadingComponent}
      {state === 'error' && errorComponent}
      {state === 'success' && successComponent}
      {state === 'default' && children}
    </StyledButton>
  );
};

export default Button;
