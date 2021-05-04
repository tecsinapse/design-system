import styled from '@emotion/native';
import { Text as RNText } from 'react-native';

export const StyledText = styled(RNText)`
  color: ${({ theme, contrast }) =>
    contrast ? theme.colors.text.contrast : theme.colors.text.main};
  ${({ style }) => style}
`;
