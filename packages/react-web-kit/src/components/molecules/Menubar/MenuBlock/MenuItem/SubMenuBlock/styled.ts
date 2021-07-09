import styled from '@emotion/styled';
import { StyleProps } from '@tecsinapse/react-core';

export const StyledContainerItem = styled('div')<Partial<StyleProps>>`
  display: flex;
  align-items: center;
`;

export const DummyBorder = styled('div')<Partial<StyleProps>>`
  height: ${({ theme }) => theme.typography.sub.fontSize};
  border-left: ${({ theme }) =>
    `${theme.borderWidth.pico} solid ${theme.color.primary.medium}`};
  margin-right: ${({ theme }) => theme.spacing.mili};
`;
