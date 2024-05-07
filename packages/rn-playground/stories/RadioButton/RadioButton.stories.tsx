import { RadioButton, Text } from '@tecsinapse/react-native-kit';
import React, { useState } from 'react';
import { Meta } from '@storybook/react';

const StoryMeta: Meta<typeof RadioButton> = {
  title: 'RadioButton',
  component: RadioButton,
};

export default StoryMeta;

export const Base = () => {
  const [check, setCheck] = useState(0);
  return (
    <>
      <RadioButton checked={check === 0} onChange={() => setCheck(0)}>
        <Text>I'm a radio button</Text>
      </RadioButton>
      <RadioButton checked={check === 1} onChange={() => setCheck(1)}>
        <Text>I'm a radio button</Text>
      </RadioButton>
    </>
  );
};
