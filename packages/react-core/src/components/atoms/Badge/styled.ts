import { View } from 'react-native';
import styled, { css } from '@emotion/native';
import { StyleProps } from '@tecsinapse/react-core';
import { BadgeProps } from './Badge';

const baseStyle = ({
  theme,
  color = 'primary',
  tone = 'medium',
}: StyleProps & Partial<BadgeProps>) => {
  return css`
    border-radius: ${theme.borderRadius.pill};
    background-color: ${theme.color[color][tone]};
    position: absolute;
    align-items: center;
    display: flex;
    justify-content: center;
    height: ${theme.iconSize.centi};
    width: ${theme.iconSize.centi};
    top: -4px;
    right: -4px;
  `;
};

export const BadgeStyle = styled(View)<Partial<StyleProps & BadgeProps>>(
  baseStyle
);

export const ViewStyled = styled(View)<Partial<StyleProps & BadgeProps>>`
  align-items: center;
  justify-content: center;
  position: relative;
  align-self: center;
`;
