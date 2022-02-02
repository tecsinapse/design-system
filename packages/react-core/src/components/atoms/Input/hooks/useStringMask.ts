import { useCallback, useState } from 'react';

export interface IMaskValue {
  formatted?: string;
  raw?: any;
}

export interface IMask {
  converter?: (raw?: string) => IMaskValue;
  maskValue?: IMaskValue;
}

export type MaskType = string | RegExp | Array<RegExp>;

/**
 * TODO:
 * @param value
 * @param mask
 * @returns
 */
const mergeMask = (value = '', mask: Array<MaskType>) => {
  let masked = '';
  let unmasked = '';

  let maskCharIndex = 0;
  let valueCharIndex = 0;

  // eslint-disable-next-line no-constant-condition
  while (!(maskCharIndex === mask.length || valueCharIndex === value.length)) {
    const maskChar = mask[maskCharIndex];
    const valueChar = value[valueCharIndex];

    // value equals mask
    if (maskChar === valueChar) {
      masked += maskChar;

      valueCharIndex += 1;
      maskCharIndex += 1;
      continue;
    }

    const unmaskedValueChar = value[valueCharIndex];

    // Regex maskChar
    if (typeof maskChar === 'object') {
      valueCharIndex += 1;

      // Validate regex
      const maskCharRegex = Array.isArray(maskChar) ? maskChar[0] : maskChar;
      const matchRegex = RegExp(maskCharRegex).test(valueChar);

      // Match regex: add to masked and unmasked
      if (matchRegex) {
        masked += valueChar;
        unmasked += unmaskedValueChar;

        maskCharIndex += 1;
      }
    } else {
      // Fixed maskChar: add to masked
      masked += maskChar;

      maskCharIndex += 1;
    }
  }

  return { unmasked, masked };
};

/**
 * TODO:
 * @param mask
 * @param defaultValue
 * @returns
 */
export const useStringMask = (
  mask: MaskType,
  defaultValue?: string
): [IMask, (text: string) => void] => {
  const getMask = useCallback(
    (mask: MaskType): Array<MaskType> => {
      if (typeof mask !== 'string') {
        if (Array.isArray(mask)) return mask;
        else return [mask];
      } else {
        const regexArray: Array<MaskType> = [];

        for (let i = 0; i < mask.length; i++) {
          if (mask[i] === '\\') {
            regexArray.push(mask[i + 1]);
            i++;
          } else {
            if (mask[i] === '9') regexArray.push(/\d/);
            else if (mask[i] === 'a') regexArray.push(/[a-zA-Z]/);
            else regexArray.push(mask[i]);
          }
        }
        return regexArray;
      }
    },
    [mask]
  );

  const applyMask = useCallback(
    (value = ''): IMaskValue => {
      const selectedMask = getMask(mask);
      const { masked, unmasked } = mergeMask(value, selectedMask);

      return {
        raw: unmasked,
        formatted: masked,
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
