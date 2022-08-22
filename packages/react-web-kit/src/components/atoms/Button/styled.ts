import styled, { css } from '@emotion/native';
import {
  borderColorGradationVC,
  borderColorVC,
  Button,
  colorGradationVC,
  colorVC,
  StyleProps,
} from '@tecsinapse/react-core';
import { WebButtonProps } from './Button';

const webStyles = () => {
  return css`
    & * {
      user-select: none;
    }
  `;
};

const hoverStyles = ({
  mouseOver,
  pressed,
  theme,
  variant = 'filled',
  disabled,
}: { mouseOver: boolean; pressed: boolean } & WebButtonProps &
  Partial<StyleProps>) => {
  const variantColor = colorVC[variant];
  const variantColorGradation = colorGradationVC[variant];
  const variantBorderColor = borderColorVC[variant];
  const variantBorderColorGradation = borderColorGradationVC[variant];
  return (
    mouseOver &&
    !disabled &&
    !pressed &&
    css`
      background-color: ${theme?.color[variantColor][variantColorGradation]};
      border-color: ${theme?.color[variantBorderColor][
        variantBorderColorGradation
      ]};
    `
  );
};

export const StyledWebButton = styled(Button)<
  { mouseOver: boolean; pressed: boolean } & WebButtonProps &
    Partial<StyleProps>
>(webStyles, hoverStyles);
