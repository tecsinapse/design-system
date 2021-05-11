import React from 'react';
import { Story } from '@storybook/react';
import { default as Checkbox, CheckboxProps } from './Checkbox';
import { Text } from '../../../index';
import styled from '@emotion/native';

export default {
  title: 'Checkbox',
  component: Checkbox,
};

const Template: Story<CheckboxProps> = ({ labelPosition }) => (
  <Checkbox labelPosition={labelPosition}>
    <TextStyled>CheckBox</TextStyled>
  </Checkbox>
);

export const Base = Template.bind({});

Base.args = {
  labelPosition: 'left',
};

const TextStyled = styled(Text)`
  padding-top: 1px;
`;
