import {
  fontColorVC,
  IconComponent,
  IconTextButtonProps,
  TextComponent,
} from '@tecsinapse/react-core';
import React from 'react';
import { ButtonNativeProps } from '../../atoms/Button';
import { StyledIconTextButton } from './styled';

export type NativeIconTextButtonProps = IconTextButtonProps &
  Omit<ButtonNativeProps, 'ButtonProps'>;

const IconTextButton: React.FC<NativeIconTextButtonProps> = ({
  iconProps,
  iconPosition = 'left',
  textProps,
  label,
  variant = 'filled',
  size = 'default',
  ...rest
}) => {
  const iconComponent = (
    <IconComponent
      iconProps={iconProps}
      size={size}
      defaultFontColor={fontColorVC[variant]}
    />
  );

  const textComponent = (
    <TextComponent
      label={label}
      defaultFontColor={fontColorVC[variant]}
      hasIcon={!!iconProps}
      iconPosition={iconPosition}
      textProps={textProps}
      size={size}
    />
  );

  return (
    <StyledIconTextButton boxed={!label} variant={variant} {...rest}>
      {iconPosition === 'left' ? iconComponent : <></>}
      {textComponent}
      {iconPosition === 'right' ? iconComponent : <></>}
    </StyledIconTextButton>
  );
};

export default IconTextButton;
