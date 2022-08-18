import { IconComponent, IconTextButtonProps } from '@tecsinapse/react-core';
import React from 'react';
import { WebButtonProps } from '../../atoms/Button';
import useIconTextButton from './hooks/useIconTextButton';
import { StyledIconTextButton } from './styled';
import TextComponent from './TextComponent';

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
      {iconPosition === 'left' ? (
        <IconComponent
          iconProps={iconProps}
          size={size}
          defaultFontColor={defaultFontColor}
        />
      ) : (
        <></>
      )}
      <TextComponent
        label={label}
        defaultFontColor={defaultFontColor}
        hasIcon={!!iconProps}
        iconPosition={iconPosition}
        textProps={textProps}
        size={size}
      />
      {iconPosition === 'right' ? (
        <IconComponent
          iconProps={iconProps}
          size={size}
          defaultFontColor={defaultFontColor}
        />
      ) : (
        <></>
      )}
    </StyledIconTextButton>
  );
};

export default IconTextButton;
