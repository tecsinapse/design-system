import styled, { css } from '@emotion/native';
import { StyleProps } from '@tecsinapse/react-core';
import { DividerProps } from './Divider';

const topLine = ({ theme, linePosition }: DividerProps & StyleProps) =>
  linePosition === 'top' &&
  css`
    border-top-width: ${theme.borderWidth.pico};
  `;

const bottomLine = ({ theme, linePosition }: DividerProps & StyleProps) =>
  linePosition === 'bottom' &&
  css`
    border-bottom-width: ${theme.borderWidth.pico};
  `;

const StyledDividerBase = styled.View<Partial<StyleProps>>`
  border-color: ${({ theme }) => theme.color.secondary.xlight};
`;

export const StyledDivider = styled(StyledDividerBase)<
  DividerProps & Partial<StyleProps>
>(
  props => css`
    ${topLine(props)}
    ${bottomLine(props)}
  `
);
