import styled from '@emotion/styled';
import { default as nativeStyled } from '@emotion/native';
import { hex2rgba, StyleProps, Text } from '@tecsinapse/react-core';

export const StyledSearchItemContainer = styled('div')<Partial<StyleProps>>`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => `${theme.spacing.mili} 0 ${theme.spacing.centi} 0`};
  border-top: ${({ theme }) =>
    `${theme.borderWidth.pico} solid ${hex2rgba(
      theme.miscellaneous.shadow,
      0.05
    )}`};
`;

export const HighlightText = nativeStyled(Text)<Partial<StyleProps>>`
  text-decoration: underline;
  text-decoration-color: ${({ theme }) => theme.font.color.orange};
`;
