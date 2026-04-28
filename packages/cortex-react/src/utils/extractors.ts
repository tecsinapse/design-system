export const extractNumbersFromString = (value: string): number =>
  Number(extractDigitsFromString(value));

export const extractDigitsFromString = (value: string): string =>
  value.replace(/[^a-zA-Z0-9]/g, '');
