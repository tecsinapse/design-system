import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

/**
 * @param initialState
 * @param timeoutCallback callback to be called after bouncing ends. Should be memoized.
 * @param timeoutMs
 */
export function useDebouncedState<S>(
  initialState: S | (() => S),
  timeoutCallback?: (state: S) => void,
  timeoutMs = 166
): [S, Dispatch<SetStateAction<S>>] {
  const timeoutId = useRef<number>();

  const [state, setState] = useState<S>(initialState);

  useEffect(() => {
    if (timeoutId.current) clearTimeout(timeoutId.current);
    if (timeoutCallback)
      timeoutId.current = setTimeout(() => timeoutCallback(state), timeoutMs);
  }, [state]);

  return [state, setState];
}
