import styled, { css } from '@emotion/native';
import { View } from 'react-native';
import { BadgeProps } from './Badge';
import { StyleProps } from '@tecsinapse/react-core';

const baseStyle = ({ theme, variant }: StyleProps & BadgeProps) => {
  return css`
    border-radius: ${theme.borderRadius.pill};
    background-color: ${theme.colors[variant].medium};
    width: 70px;
    align-items: center;
  `;
};

export const BadgeStyle = styled(View)<BadgeProps & Partial<StyleProps>>(
  baseStyle
);
