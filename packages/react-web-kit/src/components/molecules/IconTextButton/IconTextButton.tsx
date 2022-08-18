import {
  IconComponent,
  IconTextButtonProps,
  TextComponent,
} from '@tecsinapse/react-core';
import React from 'react';
import { WebButtonProps } from '../../atoms/Button';
import useIconTextButton from './hooks/useIconTextButton';
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
  const { handleHover, handlePressed, defaultFontColor } = useIconTextButton(
    variant
  );

  const iconComponent = (
    <IconComponent
      iconProps={iconProps}
      size={size}
      defaultFontColor={defaultFontColor}
    />
  );

  const textComponent = (
    <TextComponent
      label={label}
      defaultFontColor={defaultFontColor}
      hasIcon={!!iconProps}
      iconPosition={iconPosition}
      textProps={textProps}
      size={size}
    />
  );

  return (
    <StyledIconTextButton
      boxed={!label}
      variant={variant}
      size={size}
      onMouseOut={() => handleHover(true)}
      onMouseOver={() => handleHover(false)}
      onPressIn={() => handlePressed(true)}
      onPressOut={() => handlePressed(false)}
      {...rest}
    >
      {iconPosition === 'left' ? iconComponent : <></>}
      {textComponent}
      {iconPosition === 'right' ? iconComponent : <></>}
    </StyledIconTextButton>
  );
};

export default IconTextButton;
