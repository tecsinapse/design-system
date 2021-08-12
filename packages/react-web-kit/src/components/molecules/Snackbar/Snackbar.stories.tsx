import React from 'react';
import { Story } from '@storybook/react';
import { Snackbar, SnackbarWebProps } from './Snackbar';

export default {
  title: 'Components/Snackbar',
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

Base.args = {
  value: 'Enviado com sucesso!',
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
