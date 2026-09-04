import { act, renderHook } from '@testing-library/react-native';
import { useDebouncedState } from './useDebouncedState';

describe('useDebouncedState', () => {
  beforeEach(() => jest.useFakeTimers());

  afterEach(() => jest.useRealTimers());

  it('returns the initial state', () => {
    const { result } = renderHook(() => useDebouncedState('initial'));
    expect(result.current[0]).toBe('initial');
  });

  it('updates the state when the setter is called', () => {
    const { result } = renderHook(() => useDebouncedState('initial'));
    act(() => result.current[1]('next'));
    expect(result.current[0]).toBe('next');
  });

  it('calls the timeout callback after the debounce window', () => {
    const callback = jest.fn();
    const { result } = renderHook(() =>
      useDebouncedState('initial', callback, 166)
    );
    act(() => result.current[1]('next'));
    expect(callback).not.toHaveBeenCalled();
    act(() => {
      jest.advanceTimersByTime(166);
    });
    expect(callback).toHaveBeenCalledWith('next');
  });
});
