import styled from '@emotion/native';
import { Image, View } from 'react-native';
import { Text } from '@tecsinapse/react-core';
import { StyleProps } from '@tecsinapse/react-core';

export const StyledAvatar = styled(Image)<Partial<StyleProps>>`
  border-radius: 16px;
  resize-mode: contain;
  overflow: hidden;
  width: ${({ theme }) => theme.iconSize.mega};
  height: ${({ theme }) => theme.iconSize.mega};
`;

export const StyledBackground = styled(View)<Partial<StyleProps>>`
  border-radius: 16px;
  background-color: ${({ theme }) => theme.color.secondary.dark};
  width: ${({ theme }) => theme.iconSize.mega};
  height: ${({ theme }) => theme.iconSize.mega};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const StyledText = styled(Text)<Partial<StyleProps>>`
  text-align: center;
  align-self: center;
  flex: 1;
  text-transform: uppercase;
`;
