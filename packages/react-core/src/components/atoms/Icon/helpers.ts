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

/* eslint-disable */
const customIcons: any = {};

export const registerCustomIconType = (id: string, customIcon: any) => {
  customIcons[id] = customIcon;
};

export const getStyledIcon = (
  Component: ComponentType,
  size: IconSizeType
) => styled(Component)`
  font-size: ${({ theme }: StyleProps) => theme?.iconSize[size]};
  text-align: center;
`;

export const getIconComponent = (type: IconType): any => {
  switch (type) {
    case 'zocial':
      const Zocial = lazy(async () => await import('./Material'));
      return Zocial;
    case 'octicon':
      const Octicons = lazy(async () => await import('./Material'));
      return Octicons;
    case 'material':
      const Material = lazy(async () => await import('./Material'));
      return Material;
    case 'material-community':
      const MaterialCommunity = lazy(
        async () => await import('./MaterialCommunity')
      );
      return MaterialCommunity;
    case 'ionicon':
      const Ionicons = lazy(async () => await import('./Material'));
      return Ionicons;
    case 'foundation':
      const Foundation = lazy(async () => await import('./Material'));
      return Foundation;
    case 'evilicon':
      const EvilIcons = lazy(async () => await import('./Material'));
      return EvilIcons;
    case 'entypo':
      const Entypo = lazy(async () => await import('./Material'));
      return Entypo;
    case 'font-awesome':
      const FontAwesome = lazy(async () => await import('./FontAwesome'));
      console.log(FontAwesome);
      return FontAwesome;
    case 'font-awesome-5':
      const FontAwesome5 = lazy(async () => await import('./FontAwesome'));
      return FontAwesome5;
    case 'simple-line-icon':
      const SimpleLineIcons = lazy(async () => await import('./Material'));
      return SimpleLineIcons;
    case 'feather':
      const Feather = lazy(async () => await import('./Material'));
      return Feather;
    case 'antdesign':
    case 'ant-design':
      const AntDesign = lazy(async () => await import('./Material'));
      return AntDesign;
    case 'fontisto':
      const Fontisto = lazy(async () => await import('./Material'));
      return Fontisto;
    default:
      if (Object.prototype.hasOwnProperty.call(customIcons, type)) {
        return customIcons[type];
      }
      const MaterialIcons = lazy(async () => await import('./Material'));
      return MaterialIcons;
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
