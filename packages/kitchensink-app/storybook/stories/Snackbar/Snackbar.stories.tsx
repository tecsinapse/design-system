import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { Snackbar } from '@tecsinapse/react-native-kit';
import { ArtBoard } from '../ArtBoard';

storiesOf('Snackbar', module)
  .addDecorator(getStory => <ArtBoard>{getStory()}</ArtBoard>)

  .add('Snackbar', () => (
    <Component
      timeout={undefined}
      value={'Enviado com sucesso!'}
      color={'success'}
    />
  ))
  .add('Timeout', () => (
    <Component timeout={5000} value={'Falha no envio'} color={'error'} />
  ));

const Component = ({ timeout, value, color }) => {
  const [open, setOpen] = React.useState(true);

  return (
    <Snackbar
      open={open}
      dismissable
      value={value}
      timeout={timeout}
      colorVariant={color}
      colorTone="xlight"
      textProps={{
        colorVariant: color,
        colorTone: 'medium',
      }}
      leftIcon={{
        name: 'alert-circle-outline',
        type: 'material-community',
        colorVariant: color,
        colorTone: 'medium',
      }}
      rightIcon={{
        colorTone: 'medium',
        colorVariant: color,
      }}
      onClose={() => {
        alert('Close callback');
        setOpen(false);
      }}
    />
  );
};
