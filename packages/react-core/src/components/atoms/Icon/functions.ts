import { ComponentType } from 'react';
import {
  ColorGradationType,
  ColorType,
  FontColorType,
  IconType,
  ThemeProp,
} from '@tecsinapse/react-core';
import { IconInternalProps } from './types';
import Material from './Material';
import Fontisto from './Fontisto';
import AntDesign from './AntDesign';
import Feather from './Feather';
import SimpleLine from './SimpleLine';
import FontAwesomeFive from './FontAwesomeFive';
import FontAwesome from './FontAwesome';
import Entypo from './Entypo';
import Evil from './Evil';
import Foundation from './Foundation';
import Ionicon from './Ionicon';
import MaterialCommunity from './MaterialCommunity';
import Octicon from './Octicon';
import Zocial from './Zocial';

/* eslint-disable */
const customIcons: any = {};

export const registerCustomIconType = (id: string, customIcon: any) => {
  customIcons[id] = customIcon;
};

export const getIconComponent = (
  type: IconType
): ComponentType<IconInternalProps> => {
  switch (type) {
    case 'zocial':
      return Zocial;
    case 'octicon':
      return Octicon;
    case 'material':
      return Material;
    case 'material-community':
      return MaterialCommunity;
    case 'ionicon':
      return Ionicon;
    case 'foundation':
      return Foundation;
    case 'evilicon':
      return Evil;
    case 'entypo':
      return Entypo;
    case 'font-awesome':
      return FontAwesome;
    case 'font-awesome-5':
      return FontAwesomeFive;
    case 'simple-line-icon':
      return SimpleLine;
    case 'feather':
      return Feather;
    case 'antdesign':
    case 'ant-design':
      return AntDesign;
    case 'fontisto':
      return Fontisto;
    default:
      if (Object.prototype.hasOwnProperty.call(customIcons, type)) {
        return customIcons[type];
      }
      return Material;
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
  return theme.font?.color[fontColor];
};
