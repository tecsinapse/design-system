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
        require('react-native-vector-icons/dist/Zocial').default,
        size
      );
    case 'octicon':
      return getStyledIcon(
        require('react-native-vector-icons/dist/Octicons').default,
        size
      );
    case 'material':
      return getStyledIcon(
        require('react-native-vector-icons/dist/MaterialIcons').default,
        size
      );
    case 'material-community':
      return getStyledIcon(
        require('react-native-vector-icons/dist/MaterialCommunityIcons')
          .default,
        size
      );
    case 'ionicon':
      return getStyledIcon(
        require('react-native-vector-icons/dist/Ionicons').default,
        size
      );
    case 'foundation':
      return getStyledIcon(
        require('react-native-vector-icons/dist/Foundation').default,
        size
      );
    case 'evilicon':
      return getStyledIcon(
        require('react-native-vector-icons/dist/EvilIcons').default,
        size
      );
    case 'entypo':
      return getStyledIcon(
        require('react-native-vector-icons/dist/Entypo').default,
        size
      );
    case 'font-awesome':
      return getStyledIcon(
        require('react-native-vector-icons/dist/FontAwesome').default,
        size
      );
    case 'font-awesome-5':
      return getStyledIcon(
        require('react-native-vector-icons/dist/FontAwesome5').default,
        size
      );
    case 'simple-line-icon':
      return getStyledIcon(
        require('react-native-vector-icons/dist/SimpleLineIcons').default,
        size
      );
    case 'feather':
      return getStyledIcon(
        require('react-native-vector-icons/dist/Feather').default,
        size
      );
    case 'antdesign':
    case 'ant-design':
      return getStyledIcon(
        require('react-native-vector-icons/dist/AntDesign').default,
        size
      );
    case 'fontisto':
      return getStyledIcon(
        require('react-native-vector-icons/dist/Fontisto').default,
        size
      );
    default:
      if (Object.prototype.hasOwnProperty.call(customIcons, type)) {
        return getStyledIcon(customIcons[type], size);
      }
      return getStyledIcon(
        require('react-native-vector-icons/dist/MaterialIcons').default,
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
