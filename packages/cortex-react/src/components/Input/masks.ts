export const ExpressionMasks = {
  CPF: '000.000.000-00',
  CNPJ: '00.000.000/0000-00',
  PHONE: '(00) 0000-0000',
  PHONE_EXTENDED: '(00) 00000-0000',
  DATE: '00/00/0000',
  CEP: '00000-000',
};

export const NumberIMask = { mask: Number, scale: 2 };

export const CurrencyIMask = {
  mask: 'R$ num',
  blocks: {
    num: {
      mask: Number,
      scale: 2,
      thousandsSeparator: '.',
      padFractionalZeros: true,
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
      padFractionalZeros: true,
      radix: ',',
      mapToRadix: ['.'],
    },
  },
};
