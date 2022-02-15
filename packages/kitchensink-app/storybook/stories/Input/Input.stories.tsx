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
  const form = useForm<{
    email: string;
    price: number;
    phone: string;
    cpfCnpj: string;
  }>({
    mode: 'onChange',
  });

  useEffect(() => {
    form.setValue('email', 'email@email.com');
    form.setValue('price', 1135.6);
    form.setValue('cpfCnpj', '458.473.111-39');
    form.setValue('phone', '(67)99626-8684');
  }, []);

  return (
    <Grid spacing={'mili'} layout={[[12], [12], [12], [12]]}>
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
      <View>
        <Controller
          name={'phone'}
          control={form.control}
          render={({ field: { value, onChange } }) => {
            return (
              <Input
                label={'Phone'}
                value={value}
                onChange={onChange}
                placeholder={'Type your phone'}
                mask={Masks.COMBINED_PHONE}
              />
            );
          }}
        />
      </View>
      <View>
        <Controller
          name={'cpfCnpj'}
          control={form.control}
          render={({ field: { value, onChange } }) => {
            return (
              <Input
                label={'Cpf/Cnpj'}
                value={value}
                onChange={onChange}
                placeholder={'Type your cpf/cnpj'}
                mask={Masks.COMBINED_CPF_CNPJ}
              />
            );
          }}
        />
      </View>
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
