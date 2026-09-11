import React, { useState } from 'react';
import { Checkbox, Text } from '@tecsinapse/cortex-native';
import { action } from 'storybook/actions';
import { Meta } from '@storybook/react-vite';

const StoryMeta: Meta<typeof Checkbox> = {
  title: 'Checkbox',
  component: Checkbox,
};

export default StoryMeta;

export const Base = () => {
  const [check, setCheck] = useState(false);
  return (
    <Checkbox
      checked={check}
      labelPosition="right"
      onChange={c => {
        action('onChange');
        setCheck(c);
      }}
    >
      <Text>I'm a checkbox</Text>
    </Checkbox>
  );
};
