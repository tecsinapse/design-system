import { withBackgrounds } from '@storybook/addon-ondevice-backgrounds';
import { withView } from './withView';
import { useColorScheme } from 'react-native';

export const decorators = [withBackgrounds, withView, (Story, context) => {
  const isDark = useColorScheme() === 'dark';

  // Dynamically update storybook canvas parameters if your addon supports it
  context.parameters.backgrounds = {
    default: isDark ? 'dark' : 'light',
  };

  return <Story />
  );
},];

export const parameters = {
  backgrounds: {
    default: 'light',
    values: [
      { name: 'white', value: '#fff' },
      { name: 'light', value: '#f8f7f7' },
      { name: 'medium', value: '#85807a' },
      { name: 'dark', value: '#5d5955' },
    ],
  },
  // controls: {
  //   matchers: {
  //     color: /(background|color)$/i,
  //     date: /Date$/,
  //   },
  // },
};
