import { withBackgrounds } from '@storybook/addon-ondevice-backgrounds';
import { withView } from './withView';

export const decorators = [withBackgrounds, withView];

export const parameters = {
  backgrounds: {
    options: {
      white: {
        name: 'white',
        value: '#fff',
      },

      light: {
        name: 'light',
        value: '#f8f7f7',
      },

      medium: {
        name: 'medium',
        value: '#85807a',
      },

      dark: {
        name: 'dark',
        value: '#5d5955',
      },
    },
  },
  // controls: {
  //   matchers: {
  //     color: /(background|color)$/i,
  //     date: /Date$/,
  //   },
  // },
};

export const initialGlobals = {
  backgrounds: {
    value: 'light',
  },
};
