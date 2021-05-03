import styled from '@emotion/native';
import { Text as RNText } from 'react-native';

export const StyledText = styled(RNText)`
  color: ${({ theme, contrast }) =>
    contrast ? theme.text.contrast : theme.text.main};
  ${({ style }) => style}
`;
