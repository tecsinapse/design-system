import styled from '@emotion/styled';
import { hex2rgba, StyleProps } from '@tecsinapse/react-core';

export const StyledContainerBreadcrumbs = styled('div')<Partial<StyleProps>>`
  background-color: ${({ theme }) => theme.miscellaneous.surfaceColor};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: ${({ theme }) => `${theme.spacing.mili} ${theme.spacing.deca}`};
  border-radius: ${({ theme }: StyleProps) => theme.borderRadius.mili};
  box-shadow: 0px 2px 8px
    ${({ theme }) => hex2rgba(theme.miscellaneous.shadow, 0.05)};
`;
