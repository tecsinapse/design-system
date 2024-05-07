import { action } from '@storybook/addon-actions';
import IconTextButton from './IconTextButton';

export default {
  title: 'Web/IconTextButton',
  component: IconTextButton,
};

export const BaseIcon = {
  args: {
    onPress: e => action('onPress')(e),
    iconProps: {
      name: 'rocket',
      type: 'font-awesome',
    },
  },
};

export const BaseIconText = {
  args: {
    onPress: e => action('onPress')(e),
    variant: 'outlined',
    iconProps: {
      name: 'rocket',
      type: 'font-awesome',
    },
    label: 'Rocket Icon!',
  },
};

export const BaseText = {
  args: {
    onPress: e => action('onPress')(e),
    variant: 'text',
    label: 'No rocket icon :(',
  },
};
