import React from 'react';
import { Snackbar, SnackbarNativeProps } from '@tecsinapse/react-native-kit';
import { Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';

const StoryMeta: Meta<typeof Snackbar> = {
  title: 'Snackbar',
  component: Snackbar,
  argTypes: {
    onClose: { action: 'close callback' },
  },
  args: {
    colorVariant: 'success',
    timeout: undefined,
    value: 'Snackbar message',
    dismissable: false,
    open: true,
  },
};

export default StoryMeta;

export const Success = (args: SnackbarNativeProps) => {
  const [open, setOpen] = React.useState(args?.open ?? true);

  const colorVariant = args?.colorVariant;

  return (
    <Snackbar
      {...args}
      open={open}
      textProps={{
        colorVariant: colorVariant,
        colorTone: 'medium',
      }}
      leftIcon={{
        name: 'alert-circle-outline',
        type: 'material-community',
        colorVariant,
        colorTone: 'medium',
      }}
      rightIcon={{
        colorTone: 'medium',
        colorVariant,
      }}
      onClose={() => {
        action('onClose');
        setOpen(false);
      }}
    />
  );
};

export const Error = ({ colorVariant: _, ...args }: SnackbarNativeProps) => {
  const [open, setOpen] = React.useState(args?.open ?? true);

  const colorVariant = 'error';

  return (
    <Snackbar
      {...args}
      open={open}
      textProps={{
        colorVariant: colorVariant,
        colorTone: 'medium',
      }}
      leftIcon={{
        name: 'alert-circle-outline',
        type: 'material-community',
        colorVariant,
        colorTone: 'medium',
      }}
      rightIcon={{
        colorTone: 'medium',
        colorVariant,
      }}
      onClose={() => {
        action('onClose');
        setOpen(false);
      }}
    />
  );
};

export const Warning = ({ colorVariant: _, ...args }: SnackbarNativeProps) => {
  const [open, setOpen] = React.useState(args?.open ?? true);

  const colorVariant = 'warning';

  return (
    <Snackbar
      {...args}
      open={open}
      textProps={{
        colorVariant: colorVariant,
        colorTone: 'medium',
      }}
      leftIcon={{
        name: 'alert-circle-outline',
        type: 'material-community',
        colorVariant,
        colorTone: 'medium',
      }}
      rightIcon={{
        colorTone: 'medium',
        colorVariant,
      }}
      onClose={() => {
        action('onClose');
        setOpen(false);
      }}
    />
  );
};

export const Info = ({ colorVariant: _, ...args }: SnackbarNativeProps) => {
  const [open, setOpen] = React.useState(args?.open ?? true);

  const colorVariant = 'info';

  return (
    <Snackbar
      {...args}
      open={open}
      textProps={{
        colorVariant: colorVariant,
        colorTone: 'medium',
      }}
      leftIcon={{
        name: 'alert-circle-outline',
        type: 'material-community',
        colorVariant,
        colorTone: 'medium',
      }}
      rightIcon={{
        colorTone: 'medium',
        colorVariant,
      }}
      onClose={() => {
        action('onClose');
        setOpen(false);
      }}
    />
  );
};

export const Primary = ({ colorVariant: _, ...args }: SnackbarNativeProps) => {
  const [open, setOpen] = React.useState(args?.open ?? true);

  const colorVariant = 'primary';

  return (
    <Snackbar
      {...args}
      open={open}
      textProps={{
        colorVariant: colorVariant,
        colorTone: 'medium',
      }}
      leftIcon={{
        name: 'alert-circle-outline',
        type: 'material-community',
        colorVariant,
        colorTone: 'medium',
      }}
      rightIcon={{
        colorTone: 'medium',
        colorVariant,
      }}
      onClose={() => {
        action('onClose');
        setOpen(false);
      }}
    />
  );
};

export const Secondary = ({
  colorVariant: _,
  ...args
}: SnackbarNativeProps) => {
  const [open, setOpen] = React.useState(args?.open ?? true);

  const colorVariant = 'secondary';

  return (
    <Snackbar
      {...args}
      open={open}
      textProps={{
        colorVariant: colorVariant,
        colorTone: 'medium',
      }}
      leftIcon={{
        name: 'alert-circle-outline',
        type: 'material-community',
        colorVariant,
        colorTone: 'medium',
      }}
      rightIcon={{
        colorTone: 'medium',
        colorVariant,
      }}
      onClose={() => {
        action('onClose');
        setOpen(false);
      }}
    />
  );
};
