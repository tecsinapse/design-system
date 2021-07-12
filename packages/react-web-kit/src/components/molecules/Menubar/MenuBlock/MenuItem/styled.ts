import styled from '@emotion/styled';
import { StyleProps } from '@tecsinapse/react-core';

export const StyledContainerItemText = styled('div')<Partial<StyleProps>>`
  margin-top: ${({ theme }) => theme.spacing.mili};
  display: flex;
  align-items: center;
`;

export const StyledSubButton = styled('span')<Partial<StyleProps>>`
  padding-top: ${({ theme }) => theme.spacing.nano} 0 0 0;
  margin-left: ${({ theme }) => theme.spacing.mili};
  cursor: pointer;
`;
