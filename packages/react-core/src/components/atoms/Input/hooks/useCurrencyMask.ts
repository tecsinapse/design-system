import currency from 'currency.js';
import { useCallback, useState } from 'react';
import { Mask } from '..';
import { MaskValue } from './useMask';

type CurrencyOptions = currency.Options;

const DEFAULT_OPTIONS: CurrencyOptions = {
  symbol: 'R$ ',
  separator: '.',
  decimal: ',',
  precision: 2,
};

/**
 * TODO:
 * @param options
 * @param defaultValue
 * @returns
 */
export const useCurrencyMask = (
  options?: CurrencyOptions,
  defaultValue?: string
): [Mask, (value: string) => void] => {
  const getRegex = useCallback(
    (precision: number) => new RegExp(`\\B(?=(\\d{${precision}})(?!\\d))`, 'g'),
    [options]
  );

  const applyMask = useCallback(
    (value = ''): MaskValue => {
      const mergedOptions = { ...DEFAULT_OPTIONS, ...options };
      const { precision = -1 } = mergedOptions;
      const onlyNumbers = String(value).replace(/\D/g, '');
      const padZeros = String(onlyNumbers).padStart(precision + 1, '0');
      let internalNumber = Number(padZeros.replace(getRegex(precision), '.'));

      if (internalNumber > Number.MAX_SAFE_INTEGER) {
        internalNumber = Number.MAX_SAFE_INTEGER;
      }

      if (internalNumber < Number.MIN_SAFE_INTEGER) {
        internalNumber = Number.MIN_SAFE_INTEGER;
      }

      return {
        raw: internalNumber,
        formatted: currency(internalNumber).format(mergedOptions),
      };
    },
    [options, getRegex]
  );

  const [value, setValue] = useState<Mask>({
    converter: applyMask,
    maskValue: applyMask(defaultValue),
  });

  const handleChangeValue = useCallback(
    (formattedValue: string) => {
      const { raw, formatted } = applyMask(formattedValue);
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
