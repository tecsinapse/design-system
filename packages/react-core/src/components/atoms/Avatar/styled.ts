import styled from '@emotion/native';
import { FC } from 'react';
import { Image, View } from 'react-native';
import { StyleProps } from '../../../types/defaults';
import { PressableSurface } from '../PressableSurface';
import { TextProps } from '../Text';
import { AvatarProps } from './Avatar';

export const ContainerButtonAvatar = styled(PressableSurface)<
  Partial<StyleProps & AvatarProps>
>`
  width: ${({ theme, size = 'mega' }: StyleProps & Partial<AvatarProps>) =>
    theme.iconSize[size]};
  height: ${({ theme, size = 'mega' }: StyleProps & Partial<AvatarProps>) =>
    theme.iconSize[size]};
`;

export const StyledAvatar = styled(Image)<Partial<StyleProps>>`
  border-radius: ${({ theme }: StyleProps) => theme.borderRadius.pill};
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

export const StyledBackground = styled(View)<Partial<StyleProps>>`
  border-radius: ${({ theme }: StyleProps) => theme.borderRadius.pill};
  background-color: ${({ theme }: StyleProps) => theme.color.secondary.dark};
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const getStyledTextComponent = (component: FC<TextProps>) => {
  return styled(component)`
    text-transform: uppercase;
    text-align: center;
    align-self: center;
    flex: 1;
  `;
};
