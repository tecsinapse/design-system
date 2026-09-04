import { Dimensions, Platform } from 'react-native';
import {
  getBottomSpace,
  getStatusBarHeight,
  ifIphoneX,
  isIphoneX,
} from './IPhoneXHelper';

const IPHONE_X = { width: 375, height: 812, scale: 2, fontScale: 2 };
const REGULAR = { width: 375, height: 667, scale: 2, fontScale: 2 };

describe('IPhoneXHelper', () => {
  let dimsSpy: jest.SpyInstance;

  beforeEach(() => {
    dimsSpy = jest.spyOn(Dimensions, 'get').mockReturnValue(IPHONE_X);
    try {
      jest.replaceProperty(Platform, 'OS', 'ios');
      jest.replaceProperty(Platform, 'isPad', false);
      jest.replaceProperty(Platform, 'isTV', false);
    } catch {
      // Platform.OS may be a read-only getter in some RN versions.
    }
  });

  afterEach(() => {
    dimsSpy.mockRestore();
    jest.restoreAllMocks();
  });

  it('isIphoneX returns true for iPhone X dimensions on iOS', () => {
    expect(isIphoneX()).toBe(true);
  });

  it('isIphoneX returns false for non-X dimensions', () => {
    dimsSpy.mockReturnValue(REGULAR);
    expect(isIphoneX()).toBe(false);
  });

  it('ifIphoneX returns the iphoneX style when on an iPhone X', () => {
    expect(ifIphoneX('x-style', 'regular-style')).toBe('x-style');
  });

  it('ifIphoneX returns the regular style off an iPhone X', () => {
    dimsSpy.mockReturnValue(REGULAR);
    expect(ifIphoneX('x-style', 'regular-style')).toBe('regular-style');
  });

  it('getStatusBarHeight returns 44 safe / 30 unsafe on iPhone X iOS', () => {
    expect(getStatusBarHeight(true)).toBe(44);
    expect(getStatusBarHeight(false)).toBe(30);
  });

  it('getStatusBarHeight returns 20 safe on iOS non-X', () => {
    dimsSpy.mockReturnValue(REGULAR);
    expect(getStatusBarHeight(true)).toBe(20);
  });

  it('getBottomSpace returns 34 on iPhone X and 0 otherwise', () => {
    expect(getBottomSpace()).toBe(34);
    dimsSpy.mockReturnValue(REGULAR);
    expect(getBottomSpace()).toBe(0);
  });
});
