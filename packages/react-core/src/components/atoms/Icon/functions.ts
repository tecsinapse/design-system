import { ComponentType, lazy } from 'react';
import {
  ColorGradationType,
  ColorType,
  FontColorType,
  IconSizeType,
  IconType,
  StyleProps,
  ThemeProp,
} from '@tecsinapse/react-core';
import styled from '@emotion/native';
import { IconInternalProps, IconRNVIProps } from './types';

/* eslint-disable */
const customIcons: any = {};

export const registerCustomIconType = (id: string, customIcon: any) => {
  customIcons[id] = customIcon;
};

export const getStyledIcon = (
  Component: ComponentType<IconRNVIProps>,
  size: IconSizeType
) => styled(Component)<Partial<StyleProps>>`
  font-size: ${({ theme }: StyleProps) => theme?.iconSize[size]};
  text-align: center;
`;

export const getIconComponent = (
  type: IconType
): ComponentType<IconInternalProps> => {
  switch (type) {
    case 'zocial':
      return lazy(async () => await import('./Zocial'));
    case 'octicon':
      return lazy(async () => await import('./Octicon'));
    case 'material':
      return lazy(async () => await import('./Material'));
    case 'material-community':
      return lazy(async () => await import('./MaterialCommunity'));
    case 'ionicon':
      return lazy(async () => await import('./Ionicon'));
    case 'foundation':
      return lazy(async () => await import('./Foundation'));
    case 'evilicon':
      return lazy(async () => await import('./Evil'));
    case 'entypo':
      return lazy(async () => await import('./Entypo'));
    case 'font-awesome':
      return lazy(async () => await import('./FontAwesome'));
    case 'font-awesome-5':
      return lazy(async () => await import('./FontAwesomeFive'));
    case 'simple-line-icon':
      return lazy(async () => await import('./SimpleLine'));
    case 'feather':
      return lazy(async () => await import('./Feather'));
    case 'antdesign':
    case 'ant-design':
      return lazy(async () => await import('./AntDesign'));
    case 'fontisto':
      return lazy(async () => await import('./Fontisto'));
    default:
      if (Object.prototype.hasOwnProperty.call(customIcons, type)) {
        return customIcons[type];
      }
      return lazy(async () => await import('./Material'));
  }
};
/* eslint-enable */
export const getIconColor = (
  colorVariant: ColorType | undefined,
  colorGradation: ColorGradationType | undefined,
  fontColor: FontColorType,
  theme: ThemeProp
): string => {
  if (colorVariant && colorGradation) {
    return theme.color[colorVariant][colorGradation];
  }
  return theme.font.color[fontColor];
};
