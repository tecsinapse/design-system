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
  border-bottom: 1px solid
    ${({ theme }) => hex2rgba(theme.miscellaneous.shadow, 0.08)};
  width: 100%;
  padding-bottom: ${({ theme }) => theme.spacing.mili};
  margin-bottom: ${({ theme }) => theme.spacing.mili};
`;

export const StyledContainerItems = styled('div')<Partial<StyleProps>>`
  display: flex;
  flex-direction: column;
`;

export const StyledContainerItemText = styled('div')<Partial<StyleProps>>`
  margin-bottom: ${({ theme }) => theme.spacing.mili};
  display: flex;
  align-items: center;
`;

export const StyledText = styled('span')<Partial<StyleProps>>`
  &:hover {
    color: ${({ theme }) => theme.font.color.orange};
  }
`;

export const StyledSubButton = styled('span')<Partial<StyleProps>>`
  padding-top: ${({ theme }) => theme.spacing.nano} 0 0 0;
  margin-left: ${({ theme }) => theme.spacing.mili};
  cursor: pointer;
`;
