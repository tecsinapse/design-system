import React from 'react';
import { Snackbar } from '@tecsinapse/react-native-kit';
import { ComponentMeta, ComponentStory } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';

const StoryMeta: ComponentMeta<typeof Snackbar> = {
  title: 'Snackbar',
  component: Snackbar,
  argTypes: {
    onClose: { action: 'close callback' },
  },
  args: {
    colorVariant: 'success',
    timeout: undefined,
    value: 'Enviado com sucesso!',
    dismissable: false,
    colorTone: 'xlight',
    open: true,
  },
};

export default StoryMeta;

type IStory = ComponentStory<typeof Snackbar>;

export const Base = (args: IStory) => {
  const [open, setOpen] = React.useState(args?.args?.open ?? true);

  const colorVariant = args?.args?.colorVariant;
  const colorTone = args?.args?.colorTone;

  return (
    <Snackbar
      {...args}
      value={args?.args?.value ?? 'Enviado com sucesso!'}
      open={open}
      textProps={{
        colorVariant,
        colorTone,
      }}
      leftIcon={{
        name: 'alert-circle-outline',
        type: 'material-community',
        colorVariant,
        colorTone,
      }}
      rightIcon={{
        colorTone,
        colorVariant,
      }}
      onClose={() => {
        action('onClose');
        setOpen(false);
      }}
    />
  );
};
