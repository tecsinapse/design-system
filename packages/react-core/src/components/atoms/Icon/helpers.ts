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
      const Zocial = lazy(
        async () => await import('react-native-vector-icons/dist/Zocial')
      );
      return getStyledIcon(Zocial, size);
    case 'octicon':
      const Octicons = lazy(
        async () => await import('react-native-vector-icons/dist/Octicons')
      );
      return getStyledIcon(Octicons, size);
    case 'material':
      const Material = lazy(
        async () => await import('react-native-vector-icons/dist/MaterialIcons')
      );
      return getStyledIcon(Material, size);
    case 'material-community':
      const MaterialCommunity = lazy(
        async () =>
          await import('react-native-vector-icons/dist/MaterialCommunityIcons')
      );
      return getStyledIcon(MaterialCommunity, size);
    case 'ionicon':
      const Ionicons = lazy(
        async () => await import('react-native-vector-icons/dist/Ionicons')
      );
      return getStyledIcon(Ionicons, size);
    case 'foundation':
      const Foundation = lazy(
        async () => await import('react-native-vector-icons/dist/Foundation')
      );
      return getStyledIcon(Foundation, size);
    case 'evilicon':
      const EvilIcons = lazy(
        async () => await import('react-native-vector-icons/dist/EvilIcons')
      );
      return getStyledIcon(EvilIcons, size);
    case 'entypo':
      const Entypo = lazy(
        async () => await import('react-native-vector-icons/dist/Entypo')
      );
      return getStyledIcon(Entypo, size);
    case 'font-awesome':
      const FontAwesome = lazy(
        async () => await import('react-native-vector-icons/dist/FontAwesome')
      );
      return getStyledIcon(FontAwesome, size);
    case 'font-awesome-5':
      const FontAwesome5 = lazy(
        async () => await import('react-native-vector-icons/dist/FontAwesome5')
      );
      return getStyledIcon(FontAwesome5, size);
    case 'simple-line-icon':
      const SimpleLineIcons = lazy(
        async () =>
          await import('react-native-vector-icons/dist/SimpleLineIcons')
      );
      return getStyledIcon(SimpleLineIcons, size);
    case 'feather':
      const Feather = lazy(
        async () => await import('react-native-vector-icons/dist/Feather')
      );
      return getStyledIcon(Feather, size);
    case 'antdesign':
    case 'ant-design':
      const AntDesign = lazy(
        async () => await import('react-native-vector-icons/dist/AntDesign')
      );
      return getStyledIcon(AntDesign, size);
    case 'fontisto':
      const Fontisto = lazy(
        async () => await import('react-native-vector-icons/dist/Fontisto')
      );
      return getStyledIcon(Fontisto, size);
    default:
      if (Object.prototype.hasOwnProperty.call(customIcons, type)) {
        return getStyledIcon(customIcons[type], size);
      }
      const MaterialIcons = lazy(
        async () => await import('react-native-vector-icons/dist/MaterialIcons')
      );
      return getStyledIcon(MaterialIcons, size);
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
