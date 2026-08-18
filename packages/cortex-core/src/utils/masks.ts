import { extractDigitsFromString } from './extractNumbersFromString';

const alfaNum = /[a-zA-Z0-9]/;

export const Masks = {
  CPF: ['999.999.999-99'],
  CNPJ: [
    alfaNum,
    alfaNum,
    '.',
    alfaNum,
    alfaNum,
    alfaNum,
    '.',
    alfaNum,
    alfaNum,
    alfaNum,
    '/',
    alfaNum,
    alfaNum,
    alfaNum,
    alfaNum,
    '-',
    '9',
    '9',
  ],
  DATE: ['99/99/9999'],
  HOUR: ['99:99'],
  MONTH_YEAR: ['99/9999'],
  CEP: ['99999-999'],
  PHONE: ['(99) 9999-9999'],
  PHONE_EXTENDED: ['(99) 99999-9999'],
  COMBINED_PHONE: (value: string) => {
    const onlyNumbers = extractDigitsFromString(value);
    const isCellPhoneExtended = onlyNumbers.length === 11;

    return value?.length <= 14 && !isCellPhoneExtended
      ? Masks.PHONE
      : Masks.PHONE_EXTENDED;
  },
  COMBINED_CPF_CNPJ: (value: string) => {
    const onlyNumbers = extractDigitsFromString(value);
    return onlyNumbers.length <= 11 && !/[a-zA-Z]/.test(value)
      ? Masks.CPF
      : Masks.CNPJ;
  },
};

export const BRLMask = {
  symbol: 'R$ ',
  separator: '.',
  decimal: ',',
  precision: 2,
};

export const PercentageMask = {
  symbol: '',
  separator: '.',
  decimal: ',',
  precision: 2,
};
