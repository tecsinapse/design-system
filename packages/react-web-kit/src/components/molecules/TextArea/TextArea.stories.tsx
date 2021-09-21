import React from 'react';
import { Story } from '@storybook/react';
import TextArea, { TextAreaProps } from './TextArea';

export default {
  title: 'Hybrid/Text Area',
  component: TextArea,
};

const Template: Story<TextAreaProps> = ({ value: _value, ...args }) => {
  const [value, setValue] = React.useState(_value);
  return <TextArea {...args} value={value} onChange={arg => setValue(arg)} />;
};

export const Base = Template.bind({});

Base.args = {
  value:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam pulvinar leo vel est egestas laoreet. Nam facilisis, dui vitae convallis convallis, erat felis ornare massa, non auctor libero tortor eu nisi.',
  numberOfLines: 3,
  maxLength: 255,
  label: 'Label',
  placeholder: 'Placeholder',
};
