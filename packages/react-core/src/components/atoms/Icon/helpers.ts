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
        require('react-native-vector-icons/Zocial').default,
        size
      );
    case 'octicon':
      return getStyledIcon(
        require('react-native-vector-icons/Octicons').default,
        size
      );
    case 'material':
      return getStyledIcon(
        require('react-native-vector-icons/MaterialIcons').default,
        size
      );
    case 'material-community':
      return getStyledIcon(
        require('react-native-vector-icons/MaterialCommunityIcons').default,
        size
      );
    case 'ionicon':
      return getStyledIcon(
        require('react-native-vector-icons/Ionicons').default,
        size
      );
    case 'foundation':
      return getStyledIcon(
        require('react-native-vector-icons/Foundation').default,
        size
      );
    case 'evilicon':
      return getStyledIcon(
        require('react-native-vector-icons/EvilIcons').default,
        size
      );
    case 'entypo':
      return getStyledIcon(
        require('react-native-vector-icons/Entypo').default,
        size
      );
    case 'font-awesome':
      return getStyledIcon(
        require('react-native-vector-icons/FontAwesome').default,
        size
      );
    case 'font-awesome-5':
      return getStyledIcon(
        require('react-native-vector-icons/FontAwesome5').default,
        size
      );
    case 'simple-line-icon':
      return getStyledIcon(
        require('react-native-vector-icons/SimpleLineIcons').default,
        size
      );
    case 'feather':
      return getStyledIcon(
        require('react-native-vector-icons/Feather').default,
        size
      );
    case 'antdesign':
    case 'ant-design':
      return getStyledIcon(
        require('react-native-vector-icons/AntDesign').default,
        size
      );
    case 'fontisto':
      return getStyledIcon(
        require('react-native-vector-icons/Fontisto').default,
        size
      );
    default:
      if (Object.prototype.hasOwnProperty.call(customIcons, type)) {
        return getStyledIcon(customIcons[type], size);
      }
      return getStyledIcon(
        require('react-native-vector-icons/MaterialIcons').default,
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
