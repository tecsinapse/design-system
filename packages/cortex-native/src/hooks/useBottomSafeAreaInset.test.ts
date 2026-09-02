import { renderHook } from '@testing-library/react-native';

const mockInsets = jest.fn(() => ({ top: 0, bottom: 0, left: 0, right: 0 }));

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => mockInsets(),
}));

/**
 * `MIN_ANDROID_BOTTOM_INSET` is resolved at module load, so the platform has to
 * be set on a freshly required `react-native` before the hook is imported.
 */
const loadHook = (os: 'android' | 'ios') => {
  let hook: () => number = () => 0;
  jest.isolateModules(() => {
    require('react-native').Platform.OS = os;
    hook = require('./useBottomSafeAreaInset').useBottomSafeAreaInset;
  });
  return hook;
};

describe('useBottomSafeAreaInset', () => {
  afterEach(() => {
    mockInsets.mockReturnValue({ top: 0, bottom: 0, left: 0, right: 0 });
  });

  it('floors the inset at 24dp on android while the real inset is still 0', () => {
    const { result } = renderHook(loadHook('android'));
    expect(result.current).toBe(24);
  });

  it('prefers the reported inset when it is larger than the android floor', () => {
    mockInsets.mockReturnValue({ top: 0, bottom: 48, left: 0, right: 0 });
    const { result } = renderHook(loadHook('android'));
    expect(result.current).toBe(48);
  });

  it('does not apply a floor on ios', () => {
    const { result } = renderHook(loadHook('ios'));
    expect(result.current).toBe(0);
  });
});
