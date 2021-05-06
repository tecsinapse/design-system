import styled from '@emotion/native';
import { Text as RNText } from 'react-native';
import { StyleProps, TextProps } from '@tecsinapse/react-core';

export const StyledText = styled(RNText)<TextProps & Partial<StyleProps>>`
  color: ${({ theme, contrast }) =>
    contrast ? theme.colors.text.contrast : theme.colors.text.main};
`;
