import * as dateFnsLocales from 'date-fns/locale';
import { I18nManager } from 'react-native';

export const getLocale = (): Locale => {
  const locale = I18nManager.getConstants().localeIdentifier ?? 'pt_BR';
  const code = locale.replace('_', '');
  return dateFnsLocales[code];
};
