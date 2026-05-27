import { extractDigitsFromString } from '../../utils';

export const ExpressionMasks = {
  CPF: '000.000.000-00',
  CNPJ: {
    mask: '**.***.***/****-00',
    definitions: {
      '*': /[a-zA-Z0-9]/,
    },
    prepare: (str: string) => str.toUpperCase(),
  },
  PHONE: '(00) 0000-0000',
  PHONE_EXTENDED: '(00) 00000-0000',
  DATE: '00/00/0000',
  CEP: '00000-000',
};

const alfaNum = /[a-zA-Z0-9]/;

const extractAlphanumericFromString = (value: string) => {
  return value ? String(value).replace(/[^a-zA-Z0-9]/g, '') : '';
};

export const NumberIMask = { mask: Number, scale: 2 };

export const CurrencyIMask = {
  mask: 'R$ num',
  blocks: {
    num: {
      mask: Number,
      scale: 2,
      thousandsSeparator: '.',
      padFractionalZeros: false,
      radix: ',',
      mapToRadix: ['.'],
    },
  },
};

export const PercentageIMask = {
  mask: 'num %',
  lazy: false,
  blocks: {
    num: {
      mask: Number,
      scale: 2,
      thousandsSeparator: '.',
      padFractionalZeros: false,
      radix: ',',
      mapToRadix: ['.'],
    },
  },
};

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
    // Value is number extended, but without mask.
    const isCellPhoneExtended = onlyNumbers.length === 11;

    // Value in formatted mode
    return value?.length <= 14 && !isCellPhoneExtended
      ? Masks.PHONE
      : Masks.PHONE_EXTENDED;
  },
  COMBINED_CPF_CNPJ: (value: string) => {
    const cleanValue = extractAlphanumericFromString(value);
    return cleanValue.length <= 11 ? Masks.CPF : Masks.CNPJ;
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
