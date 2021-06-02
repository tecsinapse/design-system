import { ButtonProps } from '@tecsinapse/react-core';
import React, { FC } from 'react';
import { useMouseHover } from './hooks/useMouseHover';
import { StyledWebButton } from './styled';

export interface WebButtonProps extends ButtonProps {
  onMouseOver?: () => void;
  onMouseOut?: () => void;
}

const Button: FC<ButtonProps> = ({
  children,
  disabled,
  frozen,
  state,
  ...rest
}): JSX.Element => {
  const _frozen = frozen || state === 'loading';
  const { mouseOver, handleMouseOut, handleMouseOver } = useMouseHover(
    !disabled && !_frozen
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
    >
      {children}
    </StyledWebButton>
  );
};

export default Button;
