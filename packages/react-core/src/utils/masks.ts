// NOTE: Add here all individually utils, then you can use it on input components everywhere.
export const Masks = {
  CPF: ['999.999.999-99'],
  CNPJ: ['99.999.999/9999-99'],
  DATE: ['99/99/9999'],
  MONTH_YEAR: ['99/9999'],
  CEP: ['99999-999'],
  PHONE: ['(99) 9999-9999'],
  PHONE_EXTENDED: ['(99) 99999-9999'],
  COMBINED_PHONE: (value: string) =>
    // Value in formatted mode
    value?.length <= 14 ? Masks.PHONE : Masks.PHONE_EXTENDED,
};
