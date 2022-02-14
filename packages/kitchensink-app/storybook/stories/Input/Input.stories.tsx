import { storiesOf } from '@storybook/react-native';
import { Input, Masks } from '@tecsinapse/react-native-kit';
import React, { useState } from 'react';
import { ArtBoard } from '../ArtBoard';
import { Grid } from '@tecsinapse/react-core';

storiesOf('Input', module)
  .addDecorator(getStory => <ArtBoard>{getStory()}</ArtBoard>)
  .add('Input', () => {
    return <Component />;
  });

const Component = () => {
  const [value, setValue] = useState<string>('email@email.com');
  const [phone, setPhone] = useState<string>('');
  const [price, setPrice] = useState<number>(1135.6);

  return (
    <Grid spacing={'mili'} layout={[[12], [12], [12]]}>
      <Input
        label="Say something"
        placeholder="Nop!"
        value={value}
        onChange={setValue}
      />
      <Input
        label={'Phone'}
        value={phone}
        onChange={value => setPhone(value)}
        placeholder={'Type your phone'}
        mask={Masks.COMBINED_PHONE}
      />
      <Input
        label={'Price'}
        value={price}
        onChange={value => setPrice(value)}
        placeholder={'Type your phone'}
        mask={{
          symbol: 'R$ ',
          separator: '.',
          decimal: ',',
          precision: 2,
        }}
      />
    </Grid>
  );
};
