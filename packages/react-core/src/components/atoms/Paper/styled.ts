import { Pressable } from 'react-native';
import styled, { css } from '@emotion/native';
import { PaperProps } from './Paper';
import { StyleProps } from '@tecsinapse/react-core';

const baseStyles = ({ theme }) => css`
  padding: ${theme.spacing.deca};
  border-radius: ${theme.borderRadius.mili};
  background-color: ${theme.miscellaneous.surfaceColor};
`;

const elevatedStyles = ({ theme, elevated = false }: PaperProps & StyleProps) =>
  elevated && [
    css({
      shadowColor: theme.miscellaneous.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 1.4,
      elevation: 2,
    }),
    baseStyles({ theme }),
  ];

export const StyledPaper = styled(Pressable)<PaperProps & Partial<StyleProps>>(
  baseStyles,
  elevatedStyles
);
