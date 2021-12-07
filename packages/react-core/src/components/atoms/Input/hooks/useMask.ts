import { useCallback, useState } from 'react';
import { extractDigitsFromString } from '@tecsinapse/react-core';

export interface IMaskValue {
  formatted?: string;
  raw?: any;
}

export interface IMask {
  converter?: (raw?: string) => IMaskValue;
  maskValue?: IMaskValue;
}

/**
 * TODO:
 * @param value
 * @param mask
 * @returns
 */
const mergeMask = (value = '', mask: string) => {
  const chars = '' + value;
  let formattedValue = '';

  for (
    let iMask = 0, iChars = 0;
    iMask < mask.length && iChars < chars.length;
    iMask++
  ) {
    formattedValue +=
      mask.charAt(iMask) === '9' ? chars.charAt(iChars++) : mask.charAt(iMask);
  }
  return formattedValue;
};

/**
 * TODO:
 * @param value
 * @param mask
 * @returns
 */
const getMask = (value = '', mask: ((raw: any) => string) | string): string => {
  if (typeof mask === 'function') {
    return mask(value);
  }
  return mask;
};

/**
 * TODO:
 * @param mask
 * @param defaultValue
 * @returns
 */
export const useMask = (
  mask: ((raw: any) => string) | string,
  defaultValue?: string
): [IMask, (text: string) => void] => {
  const applyMask = useCallback(
    (value = ''): IMaskValue => {
      const onlyNumbers = value ? extractDigitsFromString(value) : value;
      const selectedMask = getMask(onlyNumbers, mask);
      const formattedValue = mergeMask(onlyNumbers, selectedMask);

      return {
        raw: onlyNumbers,
        formatted: formattedValue,
      };
    },
    [mask]
  );

  const [value, setValue] = useState<IMask>({
    converter: applyMask,
    maskValue: applyMask(defaultValue),
  });

  const handleChangeValue = useCallback(
    (value: string) => {
      const { raw, formatted } = applyMask(value);
      setValue(oldValue => ({
        ...oldValue,
        maskValue: {
          raw,
          formatted,
        },
      }));
    },
    [applyMask, setValue]
  );

  return [value, handleChangeValue];
};
