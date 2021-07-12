import { storiesOf } from '@storybook/react-native';
import React, { useState } from 'react';
import { ArtBoard } from '../ArtBoard';
import { Input, Select, SelectDate, Text } from '@tecsinapse/react-native-kit';
import { View } from 'react-native';

storiesOf('Input', module)
  .addDecorator(getStory => <ArtBoard>{getStory()}</ArtBoard>)
  .add('SelectDate', () => {
    return <Component />;
  });

const Component = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [month, setMonth] = useState<Date | undefined>(new Date());
  const [year, setYear] = useState<Date | undefined>(new Date());

  return (
    <>
      <SelectDate
        value={date}
        onSelect={setDate}
        granularity={'days'}
        format={'dd/MM/yyyy'}
        label={'Select Date'}
        // Only dates between now and next 6 days
        upperOffsetThreshold={6}
        // Only dates between past 6 days and now
        lowerOffsetThreshold={-6}
        style={{
          marginBottom: 10,
        }}
      />
      <SelectDate
        value={month}
        onSelect={setMonth}
        granularity={'months'}
        format={'MM/yyyy'}
        label={'Select Month'}
        // Any date from now
        upperDateThreshold={undefined}
        // Any date until now
        lowerDateThreshold={undefined}
        style={{
          marginBottom: 10,
        }}
      />
      <SelectDate
        value={year}
        onSelect={setYear}
        granularity={'years'}
        format={'yyyy'}
        label={'Select Year'}
        // Only dates between now and 2023
        upperDateThreshold={'2023'}
        // Only dates between 2010 and now
        // lowerDateThreshold={'2010'}
      />
    </>
  );
};
