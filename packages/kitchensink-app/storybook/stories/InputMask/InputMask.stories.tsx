import { storiesOf } from '@storybook/react-native';
import {
  Button,
  InputMask,
  Masks,
  Text,
  Grid,
  formatWithMask,
} from '@tecsinapse/react-native-kit';
import React, { useEffect } from 'react';
import { ArtBoard } from '../ArtBoard';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';

const BRLMask = {
  symbol: 'R$ ',
  separator: '.',
  decimal: ',',
  precision: 2,
};

export const PercentageMask = {
  symbol: '%',
  separator: '.',
  decimal: ',',
  pattern: '#!',
};

storiesOf('Input', module)
  .addDecorator(getStory => <ArtBoard>{getStory()}</ArtBoard>)
  .add('InputMask', () => {
    return <Component />;
  });

const Component = () => {
  const totalValue = 1500;

  const form = useForm<{
    price: number;
    phone: string;
    cpfCnpj: string;
    quantity: number;
    value: number;
    percentage: number;
  }>({
    mode: 'onChange',
    defaultValues: {
      quantity: 1,
    },
  });

  useEffect(() => {
    form.setValue('price', 1135.6);
    form.setValue('cpfCnpj', '458.473.111-39');
    form.setValue('phone', '(67)99626-8684');
    form.setValue('value', totalValue);
  }, []);

  const calculateValue = (percent: number) => {
    form.setValue('value', (percent / 100) * totalValue);
  };

  const calculatePercentage = (value: number) => {
    form.setValue('percentage', (value * 100) / totalValue);
  };

  return (
    <>
      <Text>Total Value: {formatWithMask(BRLMask, totalValue)}</Text>
      <Grid spacing={'mili'} layout={[[6, 6]]}>
        <View>
          <Controller
            control={form.control}
            name="value"
            render={({ field: { onChange, value } }) => {
              return (
                <InputMask
                  label={'Value'}
                  value={value}
                  onChange={value => {
                    onChange(value);
                    calculatePercentage(value);
                  }}
                  mask={BRLMask}
                  keyboardType="numeric"
                />
              );
            }}
          />
        </View>
        <View>
          <Controller
            control={form.control}
            name="percentage"
            render={({ field: { onChange, value } }) => {
              return (
                <InputMask
                  label={'Percentage'}
                  value={value}
                  onChange={value => {
                    onChange(value);
                    calculateValue(value);
                  }}
                  mask={PercentageMask}
                  keyboardType="numeric"
                />
              );
            }}
          />
        </View>
      </Grid>
      <Grid spacing={'mili'} layout={[[12], [12], [12], [12]]}>
        <View>
          <Controller
            name={'phone'}
            control={form.control}
            render={({ field: { value, onChange } }) => {
              return (
                <InputMask
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
                <InputMask
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
                <InputMask
                  label={'Price'}
                  value={value}
                  onChange={onChange}
                  placeholder={'Type the price'}
                  mask={BRLMask}
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
                <InputMask
                  label={'Quantity'}
                  value={value ?? 1}
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
