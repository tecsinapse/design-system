import currency from 'currency.js';
import {
  CurrencyOptions,
  getInternalNumberAndMask,
} from './useNumberMask';
import { MaskType, getMask, mergeMask } from './useStringMask';

export const formatWithMask = (
  mask: (MaskType[] | ((value: string) => MaskType[])) | CurrencyOptions,
  value: string | number
): string | number => {
  if (Array.isArray(mask) || typeof mask === 'function') {
    const selectedMask = getMask(mask, String(value));
    const { formatted } = mergeMask(String(value), selectedMask);
    return formatted || '';
  } else {
    const { internalNumber, mergedOptions } = getInternalNumberAndMask(
      value,
      mask
    );
    return currency(internalNumber).format(mergedOptions);
  }
};
