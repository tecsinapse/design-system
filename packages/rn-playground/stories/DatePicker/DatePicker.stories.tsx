import { DatePicker, DateRange } from '@tecsinapse/react-native-kit';
import React from 'react';
import { ComponentMeta } from '@storybook/react-native';

const StoryMeta: ComponentMeta<typeof DatePicker> = {
  title: 'DatePicker',
  component: DatePicker,
};

export default StoryMeta;

export const Base = () => {
  const [value, setValue] = React.useState<DateRange>();

  return <DatePicker value={value} type={'range'} onChange={setValue} />;
};
