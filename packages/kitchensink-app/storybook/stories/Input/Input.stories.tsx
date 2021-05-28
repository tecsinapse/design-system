import { storiesOf } from '@storybook/react-native';
import { Input } from '@tecsinapse/react-native-kit';
import React, { useState } from 'react';
import { ArtBoard } from '../ArtBoard';

storiesOf('Input', module)
  .addDecorator(getStory => <ArtBoard>{getStory()}</ArtBoard>)
  .add('Input', () => {
    return <Component />;
  });

const Component = () => {
  const [value, setValue] = useState<string>('email@email.com');
  return (
    <Input
      label="Say something"
      placeholder="Nop!"
      value={value}
      onChange={setValue}
    />
  );
};
