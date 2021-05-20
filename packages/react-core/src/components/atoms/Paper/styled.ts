import styled, { css } from '@emotion/native';
import { PaperProps, StyleProps } from '@tecsinapse/react-core';
import { View } from 'react-native';

const baseStyles = ({ theme, elevated = false }: PaperProps & StyleProps) =>
  elevated &&
  css({
    shadowColor: theme.miscellaneous.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.4,
    elevation: 2,
  });

export const PaperStyled = styled(View)<PaperProps & Partial<StyleProps>>(
  baseStyles
);