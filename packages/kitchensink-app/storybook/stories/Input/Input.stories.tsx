import { storiesOf } from '@storybook/react-native';
import { Button, Input, Masks, Text } from '@tecsinapse/react-native-kit';
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
  const [something, setSomething] = useState<string>('');
  const [dollarPrice, setDollarPrice] = useState<number>(0);

  const form = useForm<{
    email: string;
    price: number;
    phone: string;
    cpfCnpj: string;
    quantity: number;
  }>({
    mode: 'onChange',
    defaultValues: {
      quantity: 1,
    },
  });

  useEffect(() => {
    form.setValue('email', 'email@email.com');
    form.setValue('price', 1135.6);
    form.setValue('cpfCnpj', '458.473.111-39');
    form.setValue('phone', '(67)99626-8684');
  }, []);

  return (
    <>
      <Text>Outside controller</Text>
      <Grid spacing={'mili'} layout={[[12], [12]]}>
        <Input
          label="Say something"
          placeholder="Nop!"
          value={something}
          onChange={setSomething}
        />
        <Input
          label="Say a dollar price"
          placeholder="$ 1,500.00"
          value={dollarPrice}
          mask={{
            symbol: '$ ',
            separator: ',',
            decimal: '.',
            precision: 2,
          }}
          onChange={setDollarPrice}
        />
      </Grid>
      <Text>Inside controller</Text>
      <Grid spacing={'mili'} layout={[[12], [12], [12], [12], [12]]}>
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
        <View>
          <Controller
            control={form.control}
            name="quantity"
            render={({ field: { onChange, value } }) => {
              return (
                <Input
                  label={'Quantity'}
                  value={value}
                  placeholder={'Select quantity'}
                  focusable={false}
                  showSoftInputOnFocus={false}
                  onChange={onChange}
                  rightComponent={
                    <View>
                      <Button onPress={() => onChange(value - 1)}>
                        <Text>-</Text>
                      </Button>
                      <Button onPress={() => onChange(value + 1)}>
                        <Text>+</Text>
                      </Button>
                    </View>
                  }
                />
              );
            }}
          />
        </View>
      </Grid>
    </>
  );
};
