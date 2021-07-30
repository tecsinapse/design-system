import styled, { css } from '@emotion/native';
import { View } from 'react-native';
import { BadgeProps } from './Badge';
import { StyleProps } from '@tecsinapse/react-core';

const baseStyle = ({
     theme,
     color = 'primary',
     tone = 'medium'
   }: StyleProps & Partial<BadgeProps>) => {
  return css`
    border-radius: ${theme.borderRadius.pill};
    background-color: ${theme.color[color][tone]};
    position: absolute;
    align-items: center;
    display: flex;
    justify-content: center;
    height: 16px;
    width: 16px;
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