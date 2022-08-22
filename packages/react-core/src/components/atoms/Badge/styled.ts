import styled, { css } from '@emotion/native';
import { View } from 'react-native';
import { StyleProps } from '../../../types/defaults';
import { RFValue } from '../../../utils';
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
    top: ${`${RFValue(-4)}px`};
    right: ${`${RFValue(-4)}px`};
  `;
};

export const BadgeStyle =
  styled(View)<Partial<StyleProps & BadgeProps>>(baseStyle);

export const ViewStyled = styled(View)<Partial<StyleProps & BadgeProps>>`
  align-items: center;
  justify-content: center;
  position: relative;
  align-self: center;
`;
