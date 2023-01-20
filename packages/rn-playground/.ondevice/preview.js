import { withBackgrounds } from '@storybook/addon-ondevice-backgrounds';
import { withThemeProvider } from './withProvider';

export const decorators = [withBackgrounds, withThemeProvider];

export const parameters = {
  backgrounds: {
    default: 'light',
    values: [
      {
        name: 'white',
        value: '#fff',
      },
      {
        name: 'light',
        value: '#f8f7f7',
      },
      {
        name: 'medium',
        value: '#85807a',
      },
      {
        name: 'dark',
        value: '#5d5955',
      },
    ],
  },
  // controls: {
  //   matchers: {
  //     color: /(background|color)$/i,
  //     date: /Date$/,
  //   },
  // },
};
