import styled, { css } from '@emotion/native';
import { StyleProps, TextProps } from '@tecsinapse/react-core';
import { Text as RNText } from 'react-native';

export const StyledText = styled(RNText)<TextProps & Partial<StyleProps>>`
  color: ${({ theme, colorVariant = 'dark' }) =>
    theme.font.color[colorVariant]};
  font-weight: ${({ theme, fontWeight = 'regular' }) =>
    theme.font.weight[fontWeight]};
  font-size: ${({ theme, typography = 'base' }) =>
    theme.typography[typography].fontSize};
  line-height: ${({ theme, typography = 'base' }) =>
    theme.typography[typography].lineHeight};
`;

const colorStyles = ({ color, colorTone, theme }: TextProps & StyleProps) =>
  color &&
  colorTone &&
  css`
    color: ${theme.color[color][colorTone]};
  `;

export const StyledColoredText = styled(StyledText)<
  TextProps & Partial<StyleProps>
>(colorStyles);
