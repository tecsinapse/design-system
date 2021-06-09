import React, { useState } from 'react';
import { RadioButtonProps, default as RadioButton } from './RadioButton';
import { Text } from '../Text';
import { Story } from '@storybook/react';

export default {
  title: 'Components/Radio Button',
  component: RadioButton,
};

const Template: Story<RadioButtonProps> = ({
  labelPosition,
  checked,
  ...args
}) => {
  const [active, setActive] = useState(checked);
  return (
    <RadioButton
      {...args}
      checked={active}
      onChange={setActive}
      labelPosition={labelPosition}
    >
      <Text>Radio Button</Text>
    </RadioButton>
  );
};

export const Base = Template.bind({});

Base.args = {
  labelPosition: 'right',
  checked: false,
};
