import styled from '@emotion/native';
import { Image, ImageBackground, View } from 'react-native';
import { StyleProps } from '@tecsinapse/react-core';

export const StyledAvatar = styled(Image)<Partial<StyleProps>>`
  border-radius: 16px;
  resize-mode: contain;
  overflow: hidden;
  width: ${({ theme }) => theme.iconSize.mega};
  height: ${({ theme }) => theme.iconSize.mega};
`;

export const StyledBackground = styled(ImageBackground)<Partial<StyleProps>>`
  border-radius: 16px;
  resize-mode: contain;
  overflow: hidden;
  width: ${({ theme }) => theme.iconSize.mega};
  height: ${({ theme }) => theme.iconSize.mega};
`;

export const StyledContainerText = styled(View)<Partial<StyleProps>>`
  width: ${({ theme }) => theme.iconSize.mega};
  height: ${({ theme }) => theme.iconSize.mega};
  display: flex;
  justify-content: center;
  align-items: center;
`;
