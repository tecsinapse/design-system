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
  const [something, setSomething] = useState<string>();

  return (
    <>
      <Input
        label="Say something"
        placeholder="Nop!"
        value={something}
        onChange={setSomething}
      />
    </>
  );
};
