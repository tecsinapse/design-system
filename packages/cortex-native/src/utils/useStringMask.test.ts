import { getMask, mergeMask, Masks } from '@tecsinapse/cortex-core';

describe('mergeMask', () => {
  it('formats digits with a fixed string mask', () => {
    const mask = getMask(Masks.CPF, '12345678909');
    const { formatted, raw } = mergeMask('12345678909', mask);
    expect(formatted).toBe('123.456.789-09');
    expect(raw).toBe('12345678909');
  });

  it('stops at mask end when value is longer than mask', () => {
    const mask = getMask(Masks.CPF, '12345678909123');
    const { formatted } = mergeMask('12345678909123', mask);
    expect(formatted).toBe('123.456.789-09');
  });

  it('keeps raw digits only for matched positions', () => {
    const mask = getMask(Masks.DATE, '12/34/5678');
    const { formatted, raw } = mergeMask('12/34/5678', mask);
    expect(formatted).toBe('12/34/5678');
    expect(raw).toBe('12345678');
  });

  it('keeps a matching literal character present in the value', () => {
    const mask = getMask(Masks.PHONE, '(11) 9123-');
    const { formatted, raw } = mergeMask('(11) 9123-', mask);
    expect(formatted).toBe('(11) 9123-');
    expect(raw).toBe('119123');
  });
});

describe('getMask', () => {
  it('expands digits (9), letters (a) and fixed chars', () => {
    const mask = getMask(['99a-99'], '');
    expect(mask).toEqual([/\d/, /\d/, /[a-zA-Z]/, '-', /\d/, /\d/]);
  });

  it('expands escaped characters literally', () => {
    const mask = getMask(['\\9 99'], '');
    expect(mask).toEqual(['9', ' ', /\d/, /\d/]);
  });

  it('supports regex array entries', () => {
    const mask = getMask(['(', /[0-9]/, ')'], '');
    expect(mask).toEqual(['(', /[0-9]/, ')']);
  });
});
