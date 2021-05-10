import React, { useState } from 'react';
import { RadioButtonProps, default as RadioButton } from './RadioButton';
import { Text } from '../Text/index';
import { Story } from '@storybook/react';
import styled from '@emotion/native';

export default {
  title: 'RadioButton',
  component: RadioButton,
};

const Template: Story<RadioButtonProps> = args => {
  const [checked, setChecked] = useState(false);
  return (
    <RadioButton checked={checked} onChange={setChecked}>
      <TextStyled>Radio Button</TextStyled>
    </RadioButton>
  );
};

export const Base = Template.bind({});

Base.args = {};

const TextStyled = styled(Text)`
  padding-top: 10px;
`;
