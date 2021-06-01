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
  ...rest
}): JSX.Element => {
  const { mouseOver, handleMouseOut, handleMouseOver } = useMouseHover(
    !disabled
  );

  return (
    <StyledWebButton
      {...rest}
      disabled={disabled}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      mouseOver={mouseOver}
    >
      {children}
    </StyledWebButton>
  );
};

export default Button;
