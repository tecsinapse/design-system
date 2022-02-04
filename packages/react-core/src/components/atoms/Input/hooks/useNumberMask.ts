import currency from 'currency.js';
import { useCallback, useState } from 'react';
import { extractNumbersFromString } from '../../../../utils';
import { MaskValue } from './useStringMask';

export type CurrencyOptions = currency.Options;

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
export const useNumberMask = (
  options?: CurrencyOptions,
  defaultValue?: string
): [MaskValue, (value: string) => void] => {
  const getRegex = useCallback(
    (precision: number) => new RegExp(`\\B(?=(\\d{${precision}})(?!\\d))`, 'g'),
    [options]
  );

  const applyMask = useCallback(
    (value = ''): MaskValue => {
      const mergedOptions = { ...DEFAULT_OPTIONS, ...options };
      const { precision = -1 } = mergedOptions;
      const onlyNumbers = String(extractNumbersFromString(value));
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

  const [value, setValue] = useState<MaskValue>(applyMask(defaultValue));

  const handleChangeValue = useCallback(
    (formattedValue: string) => {
      const { raw, formatted } = applyMask(formattedValue);
      setValue({
        raw,
        formatted,
      });
    },
    [applyMask, setValue]
  );

  return [value, handleChangeValue];
};
