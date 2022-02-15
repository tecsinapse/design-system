import { storiesOf } from '@storybook/react-native';
import { Input, Masks } from '@tecsinapse/react-native-kit';
import React, { useEffect, useState } from 'react';
import { ArtBoard } from '../ArtBoard';
import { Grid } from '@tecsinapse/react-core';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';

storiesOf('Input', module)
  .addDecorator(getStory => <ArtBoard>{getStory()}</ArtBoard>)
  .add('Input', () => {
    return <Component />;
  });

const Component = () => {
  const [phone, setPhone] = useState<string>('67996268684');

  const form = useForm<{ email: string; price: number }>({
    mode: 'onChange',
  });

  useEffect(() => {
    form.setValue('email', 'email@email.com');
    form.setValue('price', 1135.6);
  }, []);

  return (
    <Grid spacing={'mili'} layout={[[12], [12], [12]]}>
      <View>
        <Controller
          name={'email'}
          control={form.control}
          render={({ field: { value, onChange } }) => {
            return (
              <Input
                label="Say something"
                placeholder="Nop!"
                value={value}
                onChange={onChange}
              />
            );
          }}
        />
      </View>
      <Input
        label={'Phone'}
        value={phone}
        onChange={value => setPhone(value)}
        placeholder={'Type your phone'}
        mask={Masks.COMBINED_PHONE}
      />
      <View>
        <Controller
          name={'price'}
          control={form.control}
          render={({ field: { value, onChange } }) => {
            return (
              <Input
                label={'Price'}
                value={value}
                onChange={onChange}
                placeholder={'Type the price'}
                mask={{
                  symbol: 'R$ ',
                  separator: '.',
                  decimal: ',',
                  precision: 2,
                }}
              />
            );
          }}
        />
      </View>
    </Grid>
  );
};
