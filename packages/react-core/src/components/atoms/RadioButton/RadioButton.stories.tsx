import React, { useState } from 'react';
import { RadioButtonProps, default as RadioButton } from './RadioButton';
import { Story } from '@storybook/react';

export default {
  title: 'RadioButton',
  component: RadioButton,
};

const Template: Story<RadioButtonProps> = args => {
  const [checked, setChecked] = useState(false);
  return (
    <RadioButton value={args.value} checked={checked} onChange={setChecked} />
  );
};

export const Base = Template.bind({});

Base.args = {
  value: 'Checkbox',
};
