import styled from '@emotion/native';
import { IconSizeType, StyleProps } from '@tecsinapse/react-core';
import { Button } from '../../atoms/Button';

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
  gap: ${({ theme }) => theme?.spacing.mili};
  ${({ boxed, theme, iconSize }) => boxed && boxedStyle({ theme, iconSize })};
`;
