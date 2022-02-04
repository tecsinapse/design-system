import {
  MaskType,
  useStringMask,
  CurrencyOptions,
  useNumberMask,
} from '../components/atoms/Input';

export const formatWithMask = (
  mask: MaskType[] | CurrencyOptions,
  value: string | number
): string => {
  const [maskValue] =
    Array.isArray(mask) || typeof mask === 'function'
      ? useStringMask(mask, String(value))
      : useNumberMask(mask, value);

  return maskValue.formatted || '';
};
