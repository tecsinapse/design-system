import React, { useState } from 'react';
import { RadioButtonProps, RadioButton } from './RadioButton';
import { Story } from '@storybook/react';

export default {
  title: 'RadioButton',
  component: RadioButton,
};

const Template: Story<RadioButtonProps> = args => {
  const [selected, setSelected] = useState(1);
  return (
    <RadioButton
      orientation={args.orientation}
      options={args.options}
      selected={selected}
      onChangeSelect={(opt, i) => {
        setSelected(i);
      }}
    />
  );
};

export const Base = Template.bind({});

Base.args = {
  options: [
    'Option 1',
    'Option 2',
    'Option 3',
    'Option 4',
    'Option 5',
    'Option 6',
  ],
  orientation: 'vertical',
};
