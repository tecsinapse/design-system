import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/**
 * Minimum bottom safe-area used by bottom-anchored surfaces on Android.
 *
 * `useSafeAreaInsets().bottom` reports 0 inside a freshly opened RN `Modal`
 * (the modal window is created before the native insets are dispatched), so a
 * confirm button anchored to the bottom lands underneath the system gesture
 * bar. 24dp is the height of both the Android gesture bar and the 3-button
 * navigation bar, so it is a safe floor until the real inset arrives.
 */
export const MIN_ANDROID_BOTTOM_INSET = Platform.OS === 'android' ? 24 : 0;

/**
 * Bottom inset for content anchored to the bottom of the screen, never smaller
 * than {@link MIN_ANDROID_BOTTOM_INSET} on Android.
 */
export const useBottomSafeAreaInset = (): number => {
  const { bottom } = useSafeAreaInsets();

  return Math.max(bottom, MIN_ANDROID_BOTTOM_INSET);
};
