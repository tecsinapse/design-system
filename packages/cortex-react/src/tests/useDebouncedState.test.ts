import { renderHook, act } from '@testing-library/react';
import { useDebouncedState } from '../hooks';

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

  it('Dont Should call timeoutCallback after timeout', () => {
    const timeoutCallback = jest.fn();
    const { result } = renderHook(() =>
      useDebouncedState<string>('initial', timeoutCallback, 500)
    );

    const [, setState] = result.current;

    act(() => {
      setState('updated');
    });

    act(() => {
      jest.advanceTimersByTime(250);
    });

    expect(timeoutCallback).not.toHaveBeenCalledWith('updated');
  });
});
