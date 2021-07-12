import React from 'react';
import { Story } from '@storybook/react';
import { default as Checkbox, CheckboxProps } from './Checkbox';
import { Text } from '../Text';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
};

const Template: Story<CheckboxProps> = ({ checked, ...args }) => {
  const [active, setActive] = React.useState(checked);

  React.useEffect(() => {
    setActive(checked);
  }, [checked]);

  return (
    <Checkbox {...args} checked={active} onChange={setActive}>
      <Text>Checkbox</Text>
    </Checkbox>
  );
};

export const Base = Template.bind({});

Base.args = {
  labelPosition: 'right',
  checked: true,
  color: 'primary',
  colorTone: 'medium',
};
