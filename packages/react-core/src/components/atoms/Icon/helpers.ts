import { lazy } from 'react';
import {
  ColorGradationType,
  ColorType,
  FontColorType,
  IconSizeType,
  IconType,
  ThemeProp,
} from '@tecsinapse/react-core';
import styled from '@emotion/native';

/* eslint-disable */
const customIcons: any = {};

export const registerCustomIconType = (id: string, customIcon: any) => {
  customIcons[id] = customIcon;
};

const getStyledIcon = (Component, size) => styled(Component)`
  font-size: ${({ theme }) => theme.iconSize[size]};
  text-align: center;
`;

export const getIconComponent = (type: IconType, size: IconSizeType): any => {
  switch (type) {
    case 'zocial':
      return getStyledIcon(
        lazy(() => import('react-native-vector-icons/dist/Zocial')),
        size
      );
    case 'octicon':
      return getStyledIcon(
        lazy(() => import('react-native-vector-icons/dist/Octicons')),
        size
      );
    case 'material':
      return getStyledIcon(
        lazy(() => import('react-native-vector-icons/dist/MaterialIcons')),
        size
      );
    case 'material-community':
      return getStyledIcon(
        lazy(
          () => import('react-native-vector-icons/dist/MaterialCommunityIcons')
        ),
        size
      );
    case 'ionicon':
      return getStyledIcon(
        lazy(() => import('react-native-vector-icons/dist/Ionicons')),
        size
      );
    case 'foundation':
      return getStyledIcon(
        lazy(() => import('react-native-vector-icons/dist/Foundation')),
        size
      );
    case 'evilicon':
      return getStyledIcon(
        lazy(() => import('react-native-vector-icons/dist/EvilIcons')),
        size
      );
    case 'entypo':
      return getStyledIcon(
        lazy(() => import('react-native-vector-icons/dist/Entypo')),
        size
      );
    case 'font-awesome':
      return getStyledIcon(
        lazy(() => import('react-native-vector-icons/dist/FontAwesome')),
        size
      );
    case 'font-awesome-5':
      return getStyledIcon(
        lazy(() => import('react-native-vector-icons/dist/FontAwesome5')),
        size
      );
    case 'simple-line-icon':
      return getStyledIcon(
        lazy(() => import('react-native-vector-icons/dist/SimpleLineIcons')),
        size
      );
    case 'feather':
      return getStyledIcon(
        lazy(() => import('react-native-vector-icons/dist/Feather')),
        size
      );
    case 'antdesign':
    case 'ant-design':
      return getStyledIcon(
        lazy(() => import('react-native-vector-icons/dist/AntDesign')),
        size
      );
    case 'fontisto':
      return getStyledIcon(
        lazy(() => import('react-native-vector-icons/dist/Fontisto')),
        size
      );
    default:
      if (Object.prototype.hasOwnProperty.call(customIcons, type)) {
        return getStyledIcon(customIcons[type], size);
      }
      return getStyledIcon(
        lazy(() => import('react-native-vector-icons/dist/MaterialIcons')),
        size
      );
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
