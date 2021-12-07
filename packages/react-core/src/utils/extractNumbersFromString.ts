export const extractNumbersFromString = (value: string): number =>
  Number(value.replace(/[^0-9]/g, ''));

/*
 * implemented for the case: string numbers start with 0. Example: 012.345.678-91 Example: 012.345.678-91
 * */
export const extractDigitsFromString = (value: string): string =>
  value.replace(/[^0-9]/g, '');
