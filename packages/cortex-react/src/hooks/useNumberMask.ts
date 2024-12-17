import currency from 'currency.js';
import { useCallback, useState } from 'react';
import { MaskValue } from '../components';
import { extractNumbersFromString } from '../utils';

export type CurrencyOptions = currency.Options;

const getRegex = (precision: number) =>
  new RegExp(`\\B(?=(\\d{${precision}})(?!\\d))`, 'g');

export const getInternalNumberAndMask = (
  value: string | number,
  options?: CurrencyOptions
): { internalNumber: number; mergedOptions: CurrencyOptions } => {
  const mergedOptions = { ...options };
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

export const applyNumberMask = (
  value?: string | number,
  options?: CurrencyOptions
) => {
  const { internalNumber, mergedOptions } = getInternalNumberAndMask(
    value ?? 0,
    options
  );

  return {
    raw: internalNumber,
    formatted: currency(internalNumber, mergedOptions).format(),
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
): [MaskValue, (value: string | number) => void] => {
  const [value, setValue] = useState<MaskValue>(
    applyNumberMask(defaultValue, options)
  );

  const handleChangeValue = useCallback(
    (formattedValue: string | number) => {
      const { raw, formatted } = applyNumberMask(formattedValue, options);
      setValue({
        raw,
        formatted,
      });
    },
    [setValue]
  );

  return [value, handleChangeValue];
};
