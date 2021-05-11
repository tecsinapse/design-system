import styled from '@emotion/native';
import { Text as RNText } from 'react-native';
import { StyleProps, TextProps } from '@tecsinapse/react-core';

export const StyledText = styled(RNText)<TextProps & Partial<StyleProps>>`
  color: ${({ theme, variantColor }) =>
    variantColor && theme.font.color[variantColor]};
  font-weight: ${({ theme, fontWeight }) =>
    fontWeight && theme.font.weight[fontWeight]};
  font-size: ${({ theme, typography }) =>
    typography && theme.typography[typography].fontSize};
`;
