import React, { useState } from 'react';
import { RadioButtonProps, default as RadioButton } from './RadioButton';
import { Text } from '../Text/index';
import { Story } from '@storybook/react';
import styled from '@emotion/native';

export default {
  title: 'Components/RadioButton',
  component: RadioButton,
};

const Template: Story<RadioButtonProps> = ({ labelPositon }) => {
  const [checked, setChecked] = useState(false);
  return (
    <RadioButton
      checked={checked}
      onChange={setChecked}
      labelPositon={labelPositon}
    >
      <TextStyled>Radio Button</TextStyled>
    </RadioButton>
  );
};

export const Base = Template.bind({});

Base.args = {
  labelPositon: 'left',
};

const TextStyled = styled(Text)`
  padding-top: 10px;
`;
