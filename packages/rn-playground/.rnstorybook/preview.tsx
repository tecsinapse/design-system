import { withBackgrounds } from '@storybook/addon-ondevice-backgrounds';
import type { Decorator } from '@storybook/react-native';
import { useTheme } from '@tecsinapse/cortex-native';
import { useEffect } from 'react';
import { addons } from 'storybook/manager-api';
import { withView } from './withView';

/**
 * Mirrors the private `UPDATE_BACKGROUND` event of
 * `@storybook/addon-ondevice-backgrounds`: its container keeps the current
 * color in local state and only ever changes it through this channel event.
 */
const UPDATE_BACKGROUND = 'storybook-addon-background:update';

/** `--color-surface-base` of `@tecsinapse/cortex-core`, per theme. */
const THEME_BACKGROUND = {
  light: '#f8f7f7',
  dark: '#1e1e1e',
} as const;

/**
 * Keeps the story canvas on the theme picked by the playground header toggle.
 * `withBackgrounds` is the innermost decorator, so it reads the patched
 * `default` while mounting (story switches remount it) and the channel event
 * covers theme toggles, which re-render the canvas without remounting it.
 */
const withThemedBackground: Decorator = (Story, context) => {
  const { resolvedTheme } = useTheme();
  const name = resolvedTheme === 'dark' ? 'dark' : 'light';

  context.parameters.backgrounds.default = name;

  useEffect(() => {
    addons.getChannel().emit(UPDATE_BACKGROUND, THEME_BACKGROUND[name]);
  }, [name, context.id]);

  return <Story {...context} />;
};

export const decorators = [withBackgrounds, withView, withThemedBackground];

export const parameters = {
  backgrounds: {
    default: 'light',
    values: [
      { name: 'light', value: THEME_BACKGROUND.light },
      { name: 'dark', value: THEME_BACKGROUND.dark },
      { name: 'white', value: '#fff' },
      { name: 'medium', value: '#85807a' },
    ],
  },
};
