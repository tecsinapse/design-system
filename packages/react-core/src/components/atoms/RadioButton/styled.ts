import styled, { css } from '@emotion/native';
import { spacings, borderRadius } from '../../styles/definitions';

import { View, TouchableOpacity, Text } from 'react-native';

export const InnerCircle = styled(View)`
  width: 10px;
  height: 10px;
  border-radius: ${borderRadius.circle};
  background-color: ${({ theme }) => theme.primary.medium};
`;

export const TextStyle = styled(Text)`
  margin-left: ${spacings.mili};
`;

export const ButtonStyle = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
  margin-right: 5px;
`;

export const OutlineCircle = styled(View)`
  width: 20px;
  height: 20px;
  border-radius: ${borderRadius.circle};
  border-color: ${({ theme }) => theme.primary.medium};
  border-width: 2px;
  justify-content: center;
  align-items: center;
`;

export const ViewOrientation = styled(View)`
  ${({ orientation }) =>
    orientation === 'horizontal' &&
    css`
      flex-direction: row;
    `},
  ${({ style }) => style}
`;
