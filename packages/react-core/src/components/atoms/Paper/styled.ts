import styled, { css } from '@emotion/native';
import { PaperProps, StyleProps } from '@tecsinapse/react-core';
import { View } from 'react-native';

const baseStyles = ({ theme }) => css`
  padding: ${theme.spacing.centi};
  border-radius: ${theme.borderRadius.micro};
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
		baseStyles({ theme })
  ];

export const StyledPaper = styled(View)<PaperProps & Partial<StyleProps>>(
  baseStyles,
  elevatedStyles
);
