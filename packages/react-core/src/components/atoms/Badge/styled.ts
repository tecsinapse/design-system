import styled from '@emotion/native';
import { borderRadius, Text } from '@tecsinapse/react-core';
import { View } from 'react-native';

export const BadgeStyle = styled(View)`
  border-radius: ${borderRadius.pill};
  background-color: ${({ theme, variant }) => theme[variant].main};
  width: 70px;
  align-items: center;
`;
export const TextStyle = styled(Text)`
  color: ${({ theme }) => theme.success.contrast};
  font-weight: bold;
`;
