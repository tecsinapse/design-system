import styled, { css } from '@emotion/native';
import {
  IconPositionOptions,
  IconSizeType,
  StyleProps,
} from '@tecsinapse/react-core';
import { Button } from '../../atoms/Button';
import { Text } from '../../atoms/Text';

const boxedStyle = ({
  theme,
  iconSize,
}: Partial<StyleProps> & {
  iconSize?: IconSizeType;
}) =>
  `
    padding: ${iconSize ?? theme?.spacing.mili};
    aspect-ratio: 1;
  `;

export const StyledIconTextButton = styled(Button)<
  Partial<StyleProps> & {
    boxed: boolean;
    iconSize?: IconSizeType;
  }
>`
  ${({ boxed, theme, iconSize }) => boxed && boxedStyle({ theme, iconSize })};
`;

export const StyledText = styled(Text)<
  Partial<StyleProps> & {
    iconPosition: IconPositionOptions;
    hasIcon?: boolean;
  }
>`
  ${({ theme, iconPosition, hasIcon = false }) => {
    if (hasIcon && iconPosition === 'left')
      return css`
        margin-left: ${theme?.spacing.mili};
      `;
    else if (hasIcon && iconPosition === 'right')
      return css`
        margin-right: ${theme?.spacing.mili};
      `;
  }}
`;
