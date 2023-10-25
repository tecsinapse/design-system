import { Platform } from 'react-native';
import { fontStack, fontWeight, nativeFontStack } from './constants';
import { FontFamily, FontWeight } from '../types';

export const getFontFamilyAndWeight = (
  fontFamily: FontFamily | undefined,
  weight: FontWeight
): { fontFamily: string; fontWeight: string } =>
  Platform.OS === 'web'
    ? {
        fontFamily: fontFamily ? fontFamily[weight] : fontStack.default,
        fontWeight: fontWeight[weight],
      }
    : {
        fontFamily: fontFamily ? fontFamily[weight] : nativeFontStack[weight],
        fontWeight: fontWeight[weight],
      };
