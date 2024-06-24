import '@testing-library/jest-dom';
import { getNameInitials } from '../components/utils';
import { renderHook, act } from '@testing-library/react';
import { useDebouncedState } from '../hooks';

describe('GetNameInitials', () => {
  it('test getNameInitials single name', () => {
    const initials = getNameInitials('Usuario');

    expect(initials).toBe('U');
  });

  it('test getNameInitials full name', () => {
    const withoutMiddleName = getNameInitials('Usuario Teste');
    const withMiddleName = getNameInitials('Usuario Teste Junior');

    expect(withoutMiddleName).toBe('UT');
    expect(withMiddleName).toBe('UJ');
  });

  it('test getNameInitials empty name', () => {
    expect(getNameInitials('')).toBe(undefined);
  });
});

describe('useDeboundedState', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => jest.useRealTimers());

  it('Should initialize with the initial state', () => {
    const { result } = renderHook(() => useDebouncedState('initial'));

    const [state] = result.current;
    expect(state).toBe('initial');
  });

  it('Should update state immediately', () => {
    const timeoutCallback = jest.fn();

    const { result } = renderHook(() =>
      useDebouncedState<string>('initial', timeoutCallback, 0)
    );

    const [, setState] = result.current;

    act(() => {
      setState('updated');
    });

    const [state] = result.current;

    expect(state).toBe('updated');
  });

  it('Should call timeoutCallback after timeout', () => {
    const timeoutCallback = jest.fn();
    const { result } = renderHook(() =>
      useDebouncedState<string>('initial', timeoutCallback, 500)
    );

    const [, setState] = result.current;

    act(() => {
      setState('updated');
    });

    expect(timeoutCallback).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(timeoutCallback).toHaveBeenCalledWith('updated');
  });
});
