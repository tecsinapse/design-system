export type ColorType =
  | 'primary'
  | 'secondary'
  | 'info'
  | 'success'
  | 'warning'
  | 'error';

export type ColorGradationType = 'xlight' | 'light' | 'medium' | 'dark' | 'xdark';

export type FontColorType =
  | 'high'
  | 'medium'
  | 'low'
  | 'minimal'
  | 'inverse'
  | 'light'
  | 'orange';

export type IconSizeType = 'micro' | 'mili' | 'centi' | 'deca' | 'kilo' | 'mega';

export type IconType =
  | 'material'
  | 'material-community'
  | 'simple-line-icon'
  | 'zocial'
  | 'font-awesome'
  | 'font-awesome-5'
  | 'octicon'
  | 'ionicon'
  | 'foundation'
  | 'evilicon'
  | 'entypo'
  | 'antdesign'
  | 'ant-design'
  | 'feather'
  | 'fontisto';

export const ICON_SIZE_PX: Record<IconSizeType, number> = {
  micro: 12,
  mili: 14,
  centi: 16,
  deca: 18,
  kilo: 24,
  mega: 32,
};

export const iconColorVar = (
  colorVariant: ColorType | undefined,
  colorTone: ColorGradationType | undefined,
  fontColor: FontColorType = 'high',
): string => {
  if (colorVariant && colorTone) {
    return `--color-${colorVariant}-${colorTone}`;
  }
  return `--color-content-${fontColor}`;
};