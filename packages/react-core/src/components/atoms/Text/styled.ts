import styled from '@emotion/native';
import { StyleProps, TextProps } from '@tecsinapse/react-core';
import { Text as RNText } from 'react-native';

export const StyledText = styled(RNText)<TextProps & Partial<StyleProps>>`
  color: ${({ theme, color = 'dark' }) => theme.font.color[color]};
  font-weight: ${({ theme, fontWeight = 'regular' }) => theme.font.weight[fontWeight]};
  font-size: ${({ theme, typography = 'base' }) => theme.typography[typography].fontSize};
  line-height: ${({ theme, typography = 'base' }) => theme.typography[typography].lineHeight};
`;
