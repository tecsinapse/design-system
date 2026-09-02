import { cn } from '@tecsinapse/cortex-core';

describe('cn', () => {
  it('lets the consumer class win over a conflicting base class', () => {
    expect(cn('bg-surface-overlay rounded-mili', 'bg-red-500')).toBe(
      'rounded-mili bg-red-500'
    );
  });

  it('keeps custom typography sizes alongside a color class', () => {
    expect(cn('text-h1', 'text-success-medium')).toBe(
      'text-h1 text-success-medium'
    );
  });

  it('resolves conflicts within a single argument', () => {
    expect(cn('p-2 p-4')).toBe('p-4');
  });

  it('drops falsy values and accepts objects and nested arrays', () => {
    expect(cn(undefined, false, null, 'flex-1')).toBe('flex-1');
    expect(cn('flex-1', { 'bg-red-500': true, 'bg-blue-500': false })).toBe(
      'flex-1 bg-red-500'
    );
    expect(cn(['border-t', undefined], 'border-t-0')).toBe('border-t-0');
  });

  it('returns an empty string when given nothing', () => {
    expect(cn()).toBe('');
  });
});
