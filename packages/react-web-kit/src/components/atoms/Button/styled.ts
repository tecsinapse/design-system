import styled, { css } from '@emotion/native';
import { Button, StyleProps } from '@tecsinapse/react-core';
import { WebButtonProps } from './Button';

const webStyles = () => {
  return css`
    user-select: none;
  `;
};

const hoverStyles = ({
  mouseOver,
  theme,
  color = 'primary',
  disabled,
}: { mouseOver: boolean } & WebButtonProps & Partial<StyleProps>) => {
  return (
    mouseOver &&
    !disabled &&
    css`
      background-color: ${theme?.color[color].dark};
      border-color: ${theme?.color[color].dark};
    `
  );
};

export const StyledWebButton = styled(Button)<
  { mouseOver: boolean } & WebButtonProps & Partial<StyleProps>
>(webStyles, hoverStyles);
