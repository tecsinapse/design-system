import { fontColorVC, Icon, IconTextButtonProps } from '@tecsinapse/react-core';
import React, { useMemo } from 'react';
import { ButtonNativeProps } from '../../atoms/Button';
import { StyledIconTextButton, StyledText } from './styled';

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
  const iconComponent = useMemo(
    () =>
      iconProps ? (
        <Icon
          size={iconProps.size ?? size === 'small' ? 'deca' : 'kilo'}
          fontColor={iconProps.fontColor ?? fontColorVC[variant]}
          {...iconProps}
        />
      ) : (
        <></>
      ),
    [iconProps, variant, size]
  );

  const textComponent = useMemo(
    () =>
      label ? (
        <StyledText
          typography={
            textProps?.typography ?? size === 'small' ? 'sub' : 'base'
          }
          fontWeight={textProps?.fontWeight ?? 'bold'}
          fontColor={textProps?.fontColor ?? fontColorVC[variant]}
          iconPosition={iconPosition}
          hasIcon={!!iconProps}
          {...textProps}
        >
          {label}
        </StyledText>
      ) : (
        <></>
      ),
    [label, textProps, variant, size, iconPosition]
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
