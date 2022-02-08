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

const getRegex = (precision: number) =>
  new RegExp(`\\B(?=(\\d{${precision}})(?!\\d))`, 'g');

export const getInternalNumberAndMask = (
  value: string | number,
  options?: CurrencyOptions
): { internalNumber: number; mergedOptions: CurrencyOptions } => {
  const mergedOptions = { ...DEFAULT_OPTIONS, ...options };
  const { precision = -1 } = mergedOptions;

  let internalNumber;

  if (typeof value === 'number') {
    if (precision) {
      let stringValue = String(value);
      const decimalIndex = stringValue.indexOf('.');
      const currentPrecision = decimalIndex + precision;
      if (decimalIndex !== -1 && currentPrecision <= stringValue.length) {
        const zeros = stringValue.length + 1 - currentPrecision;
        for (let i = 0; i < zeros; i++) stringValue = stringValue + `0`;
      }
      internalNumber = Number(stringValue);
    } else {
      internalNumber = value;
    }
  } else {
    const onlyNumbers = String(extractNumbersFromString(value));
    const padZeros = String(onlyNumbers).padStart(precision + 1, '0');
    internalNumber = Number(padZeros.replace(getRegex(precision), '.'));
  }

  if (internalNumber > Number.MAX_SAFE_INTEGER) {
    internalNumber = Number.MAX_SAFE_INTEGER;
  }

  if (internalNumber < Number.MIN_SAFE_INTEGER) {
    internalNumber = Number.MIN_SAFE_INTEGER;
  }

  return {
    internalNumber,
    mergedOptions,
  };
};

/**
 * TODO:
 * @param options
 * @param defaultValue
 * @returns
 */
export const useNumberMask = (
  options?: CurrencyOptions,
  defaultValue?: string | number
): [MaskValue, (value: string) => void] => {
  const applyMask = useCallback(
    (value: string | number = 0): MaskValue => {
      const { internalNumber, mergedOptions } = getInternalNumberAndMask(
        value,
        options
      );

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
