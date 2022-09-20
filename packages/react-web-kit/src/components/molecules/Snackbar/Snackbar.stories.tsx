import React from 'react';
import { Story } from '@storybook/react';
import { default as Snackbar, SnackbarWebProps } from './Snackbar';

export default {
  title: 'Hybrid/Snackbar',
  component: Snackbar,
};

const Template: Story<SnackbarWebProps> = ({ open: _open, ...args }) => {
  const [open, isOpen] = React.useState(_open);

  React.useEffect(() => {
    isOpen(_open);
  }, [_open]);

  return <Snackbar {...args} open={open} onClose={() => isOpen(false)} />;
};

export const Base = Template.bind({});
export const Timeout = Template.bind({});

Base.args = {
  value: 'Enviado com sucesso!',
  dismissable: true,
  colorVariant: 'success',
  colorTone: 'xlight',
  textProps: {
    colorVariant: 'success',
    colorTone: 'medium',
  },
  leftIcon: {
    name: 'alert-circle-outline',
    type: 'material-community',
    colorVariant: 'success',
    colorTone: 'medium',
  },
  rightIcon: {
    colorTone: 'medium',
    colorVariant: 'success',
  },
};

Timeout.args = {
  value: 'Falha no envio!',
  dismissable: true,
  timeout: 5000,
  colorVariant: 'error',
  colorTone: 'xlight',
  textProps: {
    colorVariant: 'error',
    colorTone: 'medium',
  },
  leftIcon: {
    name: 'alert-circle-outline',
    type: 'material-community',
    colorVariant: 'error',
    colorTone: 'medium',
  },
  rightIcon: {
    colorTone: 'medium',
    colorVariant: 'error',
  },
};
