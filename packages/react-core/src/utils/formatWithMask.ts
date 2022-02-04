import {
  MaskType,
  useStringMask,
} from '../components/atoms/Input/hooks/useStringMask';
import {
  CurrencyOptions,
  useNumberMask,
} from '../components/atoms/Input/hooks/useNumberMask';

export const formatWithMask = (
  mask: MaskType[] | CurrencyOptions,
  value: string | number
): string => {
  const [maskValue, setMaskValue] =
    Array.isArray(mask) || typeof mask === 'function'
      ? useStringMask(mask, String(value))
      : useNumberMask(mask, value);

  return maskValue.formatted || '';
};
