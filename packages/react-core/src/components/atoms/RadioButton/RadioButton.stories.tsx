import React, { useState } from 'react';
import { default as RadioButton, RadioButtonProps } from './RadioButton';
import { Text } from '../Text';
import { StoryFn } from '@storybook/react';

export default {
  title: 'Hybrid/Radio Button',
  component: RadioButton,
};

const Template: StoryFn<RadioButtonProps> = ({
  labelPosition,
  checked,
  ...args
}) => {
  const [active, setActive] = useState(checked);

  React.useEffect(() => {
    setActive(checked);
  }, [checked]);

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

export const Base = {
  render: Template,

  args: {
    labelPosition: 'right',
    checked: false,
  },
};
