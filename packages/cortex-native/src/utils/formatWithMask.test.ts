import { formatWithMask } from './formatWithMask';
import { getInternalNumberAndMask } from './useNumberMask';
import { Masks } from './masks';

describe('formatWithMask', () => {
  it('formats a CPF with a string mask', () => {
    expect(formatWithMask(Masks.CPF, '12345678909')).toBe('123.456.789-09');
  });

  it('formats a CEP with a string mask', () => {
    expect(formatWithMask(Masks.CEP, '12345678')).toBe('12345-678');
  });

  it('picks the combined phone mask by length', () => {
    expect(formatWithMask(Masks.COMBINED_PHONE, '(11) 9123-4567')).toBe(
      '(11) 9123-4567'
    );
    expect(formatWithMask(Masks.COMBINED_PHONE, '(11) 91234-5678')).toBe(
      '(11) 91234-5678'
    );
  });

  it('formats a currency amount with currency.js', () => {
    const options = {
      symbol: 'R$ ',
      separator: '.',
      decimal: ',',
      precision: 2,
    };
    expect(formatWithMask(options, '123456')).toBe('R$ 1.234,56');
  });
});

describe('getInternalNumberAndMask', () => {
  it('treats string input as integer digits', () => {
    const { internalNumber } = getInternalNumberAndMask('123456', {
      precision: 2,
    });
    expect(internalNumber).toBe(1234.56);
  });

  it('keeps number input as-is when no precision', () => {
    const { internalNumber } = getInternalNumberAndMask(42);
    expect(internalNumber).toBe(42);
  });

  it('clamps to MAX_SAFE_INTEGER', () => {
    const { internalNumber } = getInternalNumberAndMask('999999999999999999', {
      precision: 2,
    });
    expect(internalNumber).toBe(Number.MAX_SAFE_INTEGER);
  });
});