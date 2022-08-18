import styled from '@emotion/native';
import { StyleProps } from '@tecsinapse/react-core';
import { Button } from '../../atoms/Button';

const boxedStyle = ({ theme }: Partial<StyleProps>) => `
    padding: ${theme?.spacing.centi};
    aspect-ratio: 1;
  `;

export const StyledIconTextButton = styled(Button)<
  Partial<StyleProps> & {
    boxed: boolean;
  }
>`
  ${({ boxed, theme }) => boxed && boxedStyle({ theme })};
`;
