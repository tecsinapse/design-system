export const extractNumbersFromString = (value: string): number =>
  Number(value.replace(/[^0-9]/g, ''));
