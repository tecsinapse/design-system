import styled, { css } from '@emotion/native';
import { View, TouchableOpacity, Text } from 'react-native';
import { RadioButtonProps, StyleProps } from '@tecsinapse/react-core';

export const InnerCircle = styled(View)<Partial<StyleProps>>`
  width: 10px;
  height: 10px;
  border-radius: ${({ theme }) => theme.borderRadius.circle};
  background-color: ${({ theme }) => theme.colors.primary.medium};
`;

export const TextStyle = styled(Text)<Partial<StyleProps>>`
  margin-left: ${({ theme }) => theme.spacings.mili};
`;

export const ButtonStyle = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
  margin-right: 5px;
`;

export const OutlineCircle = styled(View)<Partial<StyleProps>>`
  width: 20px;
  height: 20px;
  border-radius: ${({ theme }) => theme.borderRadius.circle};
  border-color: ${({ theme }) => theme.colors.primary.medium};
  border-width: 2px;
  justify-content: center;
  align-items: center;
`;

export const ViewOrientation = styled(View)<RadioButtonProps>`
  ${({ orientation }) =>
    orientation === 'horizontal' &&
    css`
      flex-direction: row;
    `},
`;
