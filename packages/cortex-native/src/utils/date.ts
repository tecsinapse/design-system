import { getLocale as getCoreLocale } from '@tecsinapse/cortex-core';
import { I18nManager } from 'react-native';

/**
 * Resolves the device locale (from RN `I18nManager`) into a date-fns v4
 * Locale object. The code→Locale mapping is shared with cortex-core; only the
 * RN locale detection lives here (cortex-core stays platform-agnostic).
 */
export const getLocale = () => {
  const code = I18nManager.getConstants().localeIdentifier ?? 'pt_BR';
  return getCoreLocale(code);
};
