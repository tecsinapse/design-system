import React from 'react';
import { Snackbar, type SnackbarProps, Text } from '@tecsinapse/cortex-native';
import { Meta } from '@storybook/react-vite';
import { action } from 'storybook/actions';

const StoryMeta: Meta<typeof Snackbar> = {
  title: 'Snackbar',
  component: Snackbar,
  argTypes: {
    onClose: { action: 'close callback' },
  },
  args: {
    timeout: undefined,
    dismissable: false,
    open: true,
  },
};

export default StoryMeta;

export const Success = (args: SnackbarProps) => {
  const [open, setOpen] = React.useState(args?.open ?? true);
  return (
    <Snackbar
      {...args}
      open={open}
      colorVariant="success"
      leftIcon={{
        name: 'alert-circle-outline',
        type: 'material-community',
        colorVariant: 'success',
        colorTone: 'medium',
      }}
      rightIcon={{ colorTone: 'medium', colorVariant: 'success' }}
      onClose={() => {
        action('onClose');
        setOpen(false);
      }}
    >
      <Text colorVariant="success" colorTone="medium">
        Snackbar message
      </Text>
    </Snackbar>
  );
};

export const Error = (args: SnackbarProps) => {
  const [open, setOpen] = React.useState(args?.open ?? true);
  return (
    <Snackbar
      {...args}
      open={open}
      colorVariant="error"
      leftIcon={{
        name: 'alert-circle-outline',
        type: 'material-community',
        colorVariant: 'error',
        colorTone: 'medium',
      }}
      rightIcon={{ colorTone: 'medium', colorVariant: 'error' }}
      onClose={() => {
        action('onClose');
        setOpen(false);
      }}
    >
      <Text colorVariant="error" colorTone="medium">
        Snackbar message
      </Text>
    </Snackbar>
  );
};

export const Warning = (args: SnackbarProps) => {
  const [open, setOpen] = React.useState(args?.open ?? true);
  return (
    <Snackbar
      {...args}
      open={open}
      colorVariant="warning"
      leftIcon={{
        name: 'alert-circle-outline',
        type: 'material-community',
        colorVariant: 'warning',
        colorTone: 'medium',
      }}
      rightIcon={{ colorTone: 'medium', colorVariant: 'warning' }}
      onClose={() => {
        action('onClose');
        setOpen(false);
      }}
    >
      <Text colorVariant="warning" colorTone="medium">
        Snackbar message
      </Text>
    </Snackbar>
  );
};

export const Info = (args: SnackbarProps) => {
  const [open, setOpen] = React.useState(args?.open ?? true);
  return (
    <Snackbar
      {...args}
      open={open}
      colorVariant="info"
      leftIcon={{
        name: 'alert-circle-outline',
        type: 'material-community',
        colorVariant: 'info',
        colorTone: 'medium',
      }}
      rightIcon={{ colorTone: 'medium', colorVariant: 'info' }}
      onClose={() => {
        action('onClose');
        setOpen(false);
      }}
    >
      <Text colorVariant="info" colorTone="medium">
        Snackbar message
      </Text>
    </Snackbar>
  );
};

export const Primary = (args: SnackbarProps) => {
  const [open, setOpen] = React.useState(args?.open ?? true);
  return (
    <Snackbar
      {...args}
      open={open}
      colorVariant="primary"
      leftIcon={{
        name: 'alert-circle-outline',
        type: 'material-community',
        colorVariant: 'primary',
        colorTone: 'medium',
      }}
      rightIcon={{ colorTone: 'medium', colorVariant: 'primary' }}
      onClose={() => {
        action('onClose');
        setOpen(false);
      }}
    >
      <Text colorVariant="primary" colorTone="medium">
        Snackbar message
      </Text>
    </Snackbar>
  );
};

export const Secondary = (args: SnackbarProps) => {
  const [open, setOpen] = React.useState(args?.open ?? true);
  return (
    <Snackbar
      {...args}
      open={open}
      colorVariant="secondary"
      leftIcon={{
        name: 'alert-circle-outline',
        type: 'material-community',
        colorVariant: 'secondary',
        colorTone: 'medium',
      }}
      rightIcon={{ colorTone: 'medium', colorVariant: 'secondary' }}
      onClose={() => {
        action('onClose');
        setOpen(false);
      }}
    >
      <Text colorVariant="secondary" colorTone="medium">
        Snackbar message
      </Text>
    </Snackbar>
  );
};
