import { act, create } from 'react-test-renderer';

import { ThemeProvider, type ThemeName } from './ThemeProvider';
import { Uniwind } from 'uniwind';

jest.mock('uniwind', () => ({
  Uniwind: { setTheme: jest.fn() },
  useUniwind: jest.fn(() => ({ theme: 'light', hasAdaptiveThemes: false })),
}));

const mockedSetTheme = Uniwind.setTheme as jest.Mock;

describe('ThemeProvider', () => {
  beforeEach(() => {
    mockedSetTheme.mockClear();
  });

  it.each<ThemeName>(['light', 'dark', 'system'])(
    'calls Uniwind.setTheme(%s) when theme=%s',
    (theme) => {
      act(() => {
        create(<ThemeProvider theme={theme}>{null}</ThemeProvider>);
      });
      expect(mockedSetTheme).toHaveBeenCalledWith(theme);
    },
  );

  it('defaults to system when theme is undefined', () => {
    act(() => {
      create(<ThemeProvider>{null}</ThemeProvider>);
    });
    expect(mockedSetTheme).toHaveBeenCalledWith('system');
  });
});
