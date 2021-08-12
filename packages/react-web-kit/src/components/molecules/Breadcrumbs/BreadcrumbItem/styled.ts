import styled from '@emotion/styled';
import { StyleProps } from '@tecsinapse/react-core';

export const StyledContainerItem = styled('div')<Partial<StyleProps>>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-right: ${({ theme }) => theme.spacing.mili};
`;

export const StyledContainerIcon = styled('div')<Partial<StyleProps>>`
  margin-left: ${({ theme }) => theme.spacing.mili};
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
