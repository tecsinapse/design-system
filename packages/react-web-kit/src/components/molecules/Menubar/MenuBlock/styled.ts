import styled from '@emotion/styled';
import { hex2rgba, StyleProps } from '@tecsinapse/react-core';

export const StyledLeftComponent = styled('div')<Partial<StyleProps>>`
  margin-right: ${({ theme }) => theme.spacing.mili};
`;

export const StyledRightComponent = styled('div')<Partial<StyleProps>>`
  margin-left: ${({ theme }) => theme.spacing.mili};
`;

export const StyledContainerMenu = styled('div')<Partial<StyleProps>>`
  flex-direction: row;
  display: flex;
  align-items: center;
  border-bottom: ${({ theme }) =>
    `${theme.borderWidth.pico} solid ${hex2rgba(
      theme.miscellaneous.shadow,
      0.08
    )}`};
  width: 100%;
  padding-bottom: ${({ theme }) => theme.spacing.mili};
`;

export const StyledContainerItems = styled('div')<Partial<StyleProps>>`
  display: flex;
  flex-direction: column;
`;

export const StyledText = styled('span')<Partial<StyleProps>>`
  &:hover {
    color: ${({ theme }) => theme.font.color.orange};
  }
`;
