import styled, { css } from '@emotion/native';
import { View } from 'react-native';
import { PaperProps, StyleProps } from '@tecsinapse/react-core';

const baseStyles = ({ theme }) => css`
  padding: ${theme.spacing.centi};
  border-radius: ${theme.borderRadius.micro};
`;

const elevatedStyles = ({ theme, elevated = false }) =>
  elevated && [
    css({
      shadowColor: theme.miscellaneous.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 1.4,
      elevation: 2,
      borderWidth: 1,
      borderColor: theme.miscellaneous.bodyBg,
    }),
    baseStyles({ theme }),
  ];

export const StyledPaper = styled(View)<PaperProps & Partial<StyleProps>>(
  baseStyles,
  elevatedStyles
);
