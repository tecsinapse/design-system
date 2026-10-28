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

  it('lets a consumer margin win over a custom-scale base margin', () => {
    expect(cn('mr-mili', 'mr-0')).toBe('mr-0');
  });

  it('lets a consumer padding win over a custom-scale base padding', () => {
    expect(cn('p-centi', 'p-4')).toBe('p-4');
  });

  it('lets a consumer radius win over a custom-scale base radius', () => {
    expect(cn('rounded-mili', 'rounded-full')).toBe('rounded-full');
  });

  it('still resolves conflicts within the standard numeric scale', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4');
  });

  it('lets a consumer border win over a custom-scale base border width', () => {
    expect(cn('border-nano', 'border-2')).toBe('border-2');
  });

  it('lets a consumer side border win over a custom-scale base side border width', () => {
    expect(cn('border-t-nano', 'border-t-0')).toBe('border-t-0');
  });

  it('still resolves conflicts within the standard border-width scale', () => {
    expect(cn('border-2', 'border-4')).toBe('border-4');
  });
});
