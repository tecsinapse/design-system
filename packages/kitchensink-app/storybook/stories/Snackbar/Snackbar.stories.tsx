import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { Snackbar } from '@tecsinapse/react-native-kit';
import { ArtBoard } from '../ArtBoard';

storiesOf('Snackbar', module)
  .addDecorator(getStory => <ArtBoard>{getStory()}</ArtBoard>)

  .add('Snackbar', () => <Component />);

const Component = () => {
  const [open, setOpen] = React.useState(true);

  return (
    <Snackbar
      open={open}
      dismissable
      value="Enviado com sucesso!"
      colorVariant="success"
      colorTone="xlight"
      timeout={5000}
      textProps={{
        colorVariant: 'success',
        colorTone: 'medium',
      }}
      leftIcon={{
        name: 'alert-circle-outline',
        type: 'material-community',
        colorVariant: 'success',
        colorTone: 'medium',
      }}
      rightIcon={{
        colorTone: 'medium',
        colorVariant: 'success',
      }}
      onClose={() => {
        alert('Close callback');
        setOpen(false);
      }}
    />
  );
};
