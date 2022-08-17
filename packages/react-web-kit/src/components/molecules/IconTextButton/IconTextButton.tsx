import {
  fontColorVC,
  Icon,
  IconTextButtonProps,
  Text,
} from '@tecsinapse/react-core';
import React, { useMemo, useState } from 'react';
import { WebButtonProps } from '../../atoms/Button';
import { StyledIconTextButton } from './styled';

export type WebIconTextButtonProps = IconTextButtonProps &
  Omit<WebButtonProps, 'ButtonProps'>;

const IconTextButton: React.FC<WebIconTextButtonProps> = ({
  iconProps,
  iconPosition = 'left',
  textProps,
  label,
  variant = 'filled',
  size = 'default',
  ...rest
}): JSX.Element => {
  const [hover, setHover] = useState<boolean>(false);
  const [pressed, setPressed] = useState<boolean>(false);

  const defaultFontColor = !pressed && hover ? 'light' : fontColorVC[variant];

  const iconComponent = useMemo(
    () =>
      iconProps ? (
        <Icon
          size={iconProps.size ?? size === 'small' ? 'deca' : 'kilo'}
          fontColor={iconProps.fontColor ?? defaultFontColor}
          {...iconProps}
        />
      ) : (
        <></>
      ),
    [iconProps, variant, size, defaultFontColor]
  );

  const textComponent = useMemo(
    () =>
      label ? (
        <Text
          typography={
            textProps?.typography ?? size === 'small' ? 'sub' : 'base'
          }
          fontWeight={textProps?.fontWeight ?? 'bold'}
          fontColor={textProps?.fontColor ?? defaultFontColor}
          {...textProps}
        >
          {label}
        </Text>
      ) : (
        <></>
      ),
    [label, textProps, variant, size, defaultFontColor]
  );

  return (
    <StyledIconTextButton
      boxed={!label}
      variant={variant}
      size={size}
      onMouseOut={() => setHover(true)}
      onMouseOver={() => setHover(false)}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      {...rest}
    >
      {iconPosition === 'left' ? iconComponent : <></>}
      {textComponent}
      {iconPosition === 'right' ? iconComponent : <></>}
    </StyledIconTextButton>
  );
};

export default IconTextButton;
