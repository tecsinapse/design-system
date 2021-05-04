import styled from '@emotion/native';
import { TouchableHighlight } from 'react-native';

export const StyledButton = styled(TouchableHighlight)`
  padding: 10px;
  background-color: ${({ theme }) => theme.primary.medium};
  border-radius: 4px;
  ${({ style }) => style}
`;
