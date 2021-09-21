import React from 'react';
import { Story } from '@storybook/react';
import TextArea, { TextAreaProps } from './TextArea';

export default {
  title: 'Native/Text Area',
  component: TextArea,
};

// Import type manually
const Template: Story<TextAreaProps> = args => {
  const [value, setValue] = React.useState('');
  return (
    <TextArea
      value={value}
      onChange={arg => setValue(arg)}
      numberOfLines={3}
      maxLength={255}
      label={'Apth'}
    />
  );
};

export const Base = Template.bind({});
