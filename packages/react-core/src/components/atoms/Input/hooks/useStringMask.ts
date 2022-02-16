import { useCallback, useState } from 'react';

export interface MaskValue {
  formatted?: string;
  raw?: string | number;
}

export type MaskType = string | RegExp | Array<RegExp>;

/**
 * TODO:
 * @param value
 * @param mask
 * @returns
 */
export const mergeMask = (value = '', mask: MaskType[]): MaskValue => {
  let formatted = '';
  let raw = '';
  let iMask = 0;
  let iChars = 0;

  while (!(iMask === mask.length || iChars === value.length)) {
    const maskChar = mask[iMask];
    const valueChar = value[iChars];

    if (maskChar === valueChar) {
      formatted += maskChar;
      iChars++;
      iMask++;
      continue;
    }

    const rawValueChar = value[iChars];

    if (typeof maskChar === 'object') {
      iChars++;

      const maskCharRegex = Array.isArray(maskChar) ? maskChar[0] : maskChar;
      const matchRegex = RegExp(maskCharRegex).test(valueChar);

      if (matchRegex) {
        formatted += valueChar;
        raw += rawValueChar;
        iMask++;
      }
    } else {
      formatted += maskChar;
      iMask++;
    }
  }

  return { raw, formatted };
};

export const getMask = (
  mask: MaskType[] | ((value: string) => MaskType[]),
  newValue: string
): MaskType[] => {
  let maskArray: MaskType[];
  const regexArray: MaskType[] = [];

  if (typeof mask === 'function') {
    maskArray = mask(newValue);
  } else {
    maskArray = mask;
  }

  maskArray.forEach(exp => {
    if (typeof exp !== 'string') {
      if (Array.isArray(exp)) regexArray.push(exp);
      else regexArray.push(exp);
    } else {
      for (let i = 0; i < exp.length; i++) {
        if (exp[i] === '\\') {
          regexArray.push(exp[i + 1]);
          i++;
        } else {
          if (exp[i] === '9') regexArray.push(/\d/);
          else if (exp[i] === 'a') regexArray.push(/[a-zA-Z]/);
          else regexArray.push(exp[i]);
        }
      }
    }
  });

  return regexArray;
};

/**
 * TODO:
 * @param mask
 * @param defaultValue
 * @returns
 */
export const useStringMask = (
  mask: MaskType[] | ((value: string) => MaskType[]),
  defaultValue?: string | number
): [MaskValue, (text: string | number) => void] => {
  const applyMask = useCallback(
    (value = ''): MaskValue => {
      const selectedMask = getMask(mask, value);
      const { formatted, raw } = mergeMask(value, selectedMask);

      return {
        raw,
        formatted,
      };
    },
    [mask]
  );

  const [value, setValue] = useState<MaskValue>(
    applyMask(defaultValue?.toString())
  );

  const handleChangeValue = useCallback(
    (formattedValue: string | number) => {
      const { raw, formatted } = applyMask(formattedValue?.toString());
      setValue({
        raw,
        formatted,
      });
    },
    [applyMask, setValue]
  );

  return [value, handleChangeValue];
};
