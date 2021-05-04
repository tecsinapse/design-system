import styled from '@emotion/native';
import { Text } from '@tecsinapse/react-core';
import { View } from 'react-native';
import { spacings } from '../../styles/definitions';

export const ViewStyle = styled(View)`
  flex-direction: row;
  ${({ style }) => style}
`;

export const TextStyle = styled(Text)`
  margin-left: ${spacings.mili};
`;
