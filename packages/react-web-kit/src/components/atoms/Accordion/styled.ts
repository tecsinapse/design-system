import styled from '@emotion/styled';
import { StyleProps } from '@tecsinapse/react-core';

export const IconContainer = styled('div')<Partial<StyleProps>>`
  border-radius: ${({ theme }) => theme.borderRadius.mili};
  border: ${({ theme }) =>
    `${theme.borderWidth.pico} solid ${theme.color.secondary.light}`};
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

export const TitleContainer = styled('div')<Partial<StyleProps>>`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.kilo} 0;
`;

export const AccordionContainer = styled('div')<Partial<StyleProps>>`
  display: flex;
  flex-direction: column;
  border-bottom: ${({ theme }) =>
    `${theme.borderWidth.pico} solid ${theme.color.secondary.light}`};
  background-color: ${({ theme }) => theme.miscellaneous.surfaceColor};
`;

export const ContentContainer = styled('div')`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
