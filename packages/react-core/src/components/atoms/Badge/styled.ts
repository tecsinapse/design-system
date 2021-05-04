import styled from '@emotion/native';
import { borderRadius } from '../../../styles/definitions';
import { View } from 'react-native';

export const BadgeStyle = styled(View)`
  border-radius: ${borderRadius.pill};
  background-color: ${({ theme, variant }) => theme.colors[variant].main};
  width: 70px;
  align-items: center;
  ${({ style }) => style}
`;
