import React from 'react';
import { StoryFn } from '@storybook/react-vite';
import { CheckboxProps, default as Checkbox } from './Checkbox';
import { Text } from '../Text';

export default {
  title: 'react-core/Checkbox',
  component: Checkbox,
};

const Template: StoryFn<CheckboxProps> = ({ checked, ...args }) => {
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

export const Base = {
  render: Template,

  args: {
    labelPosition: 'right',
    checked: true,
    color: 'primary',
    colorTone: 'medium',
  },
};
