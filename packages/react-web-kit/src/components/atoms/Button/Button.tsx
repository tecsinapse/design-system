import { ButtonProps } from '@tecsinapse/react-core';
import React, { FC } from 'react';
import { useMouseHover } from './hooks/useMouseHover';
import { useMousePressed } from './hooks/useMousePressed';
import { StyledWebButton } from './styled';

/**
 * TODO: Add a property 'defaultElement' to render a default
 * component and provide some button's state to it.
 */
export type WebButtonProps = ButtonProps & {
  onMouseOver?: () => void;
  onMouseOut?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
};

const Button: FC<WebButtonProps> = ({
  children,
  disabled,
  frozen,
  state,
  variant,
  onMouseOut,
  onMouseOver,
  onPressIn,
  onPressOut,
  ...rest
}): React.ReactElement => {
  const _frozen = frozen || state === 'loading';
  const { mouseOver, handleMouseOut, handleMouseOver } = useMouseHover(
    !disabled && !_frozen,
    onMouseOut,
    onMouseOver
  );
  const { pressed, handlePressIn, handlePressOut } = useMousePressed(
    !disabled && !_frozen,
    onPressIn,
    onPressOut
  );

  return (
    <StyledWebButton
      {...rest}
      disabled={disabled}
      frozen={_frozen}
      state={state}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      mouseOver={mouseOver}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      pressed={pressed}
      variant={variant}
    >
      {children}
    </StyledWebButton>
  );
};

export default Button;
