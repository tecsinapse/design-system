import { storiesOf } from '@storybook/react-native';
import { InputPassword } from '@tecsinapse/react-native-kit';
import React, { useState } from 'react';
import { ArtBoard } from '../ArtBoard';

storiesOf('InputPassword', module)
  .addDecorator(getStory => <ArtBoard>{getStory()}</ArtBoard>)
  .add('InputPassword', () => {
    return <Component />;
  });

const Component = () => {
  const [value, setValue] = useState<string>('password123');
  return (
    <InputPassword
      label="Password"
      placeholder="Type your password"
      value={value}
      onChange={setValue}
    />
  );
};