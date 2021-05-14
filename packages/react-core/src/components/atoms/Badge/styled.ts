import styled, { css } from '@emotion/native';
import { View } from 'react-native';
import { BadgeProps } from './Badge';
import { StyleProps } from '@tecsinapse/react-core';

const baseStyle = ({
  theme,
  color,
  tone = 'medium',
  variant = 'pill',
}: StyleProps & BadgeProps) => {
  return css`
    border-radius: ${theme.borderRadius[variant]};
    background-color: ${theme.color[color][tone]};
    align-items: center;
    padding: ${theme.spacing.micro};
    display: inline-block;
  `;
};

export const BadgeStyle = styled(View)<BadgeProps & Partial<StyleProps>>(
  baseStyle
);
