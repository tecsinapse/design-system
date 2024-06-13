import React from 'react';
import { StoryFn } from '@storybook/react';
import TextArea, { TextAreaProps } from './TextArea';

export default {
  title: 'react-web-kit/Text Area',
  component: TextArea,
};

const Template: StoryFn<TextAreaProps> = ({ value: _value, ...args }) => {
  const [value, setValue] = React.useState(_value);
  return <TextArea {...args} value={value} onChange={arg => setValue(arg)} />;
};

export const Base = {
  render: Template,

  args: {
    value:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam pulvinar leo vel est egestas laoreet. Nam facilisis, dui vitae convallis convallis, erat felis ornare massa, non auctor libero tortor eu nisi.',
    numberOfLines: 3,
    maxLength: 255,
    label: 'Label',
    placeholder: 'Placeholder',
  },
};
