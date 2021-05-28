// NOTE: Add here all individually masks, then you can use it on input components everywhere.
export const CPF = '999.999.999-99';
export const CNPJ = '99.999.999/9999-99';
export const DATE = '99/99/9999';
export const MONTH_YEAR = '99/9999';
export const CEP = '88888-888';
export const PHONE = '(99) 9999-9999';
export const PHONE_EXTENDED = '(99) 99999-9999';
export const COMBINED_PHONE = (value: string) => value.length <= 10 ? PHONE : PHONE_EXTENDED
