import styled from '@emotion/native';
import { View } from 'react-native';
import { borderRadius, iconSize, spacing } from '../../styles';

export const Circle = styled(View)<{ color: string }>`
  background-color: ${({ color }) => color};
  width: ${iconSize.micro};
  height: ${iconSize.micro};
  border-radius: ${borderRadius.pill};
  justify-content: center;
  align-items: center;
  margin-right: ${spacing.centi};
`;

export const CircleDot = styled(View)`
  background-color: #fff;
  width: 4px;
  height: 4px;
  border-radius: ${borderRadius.pill};
`;
