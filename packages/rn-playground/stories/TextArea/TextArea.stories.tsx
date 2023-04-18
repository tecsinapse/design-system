import { TextArea, TextAreaProps } from '@tecsinapse/react-native-kit';
import React, { useState } from 'react';
import { ComponentMeta } from '@storybook/react-native';

const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce facilisis erat eget imperdiet efficitur. Pellentesque bibendum ipsum erat, at lobortis risus sollicitudin eu. Praesent quis ex nec arcu cursus egestas vel a velit. Suspendisse aliquam orci id nulla ullamcorper scelerisque a id sem. Morbi orci tortor, consectetur eu felis maximus, posuere congue erat. Etiam aliquam convallis elit et sodales. Sed porttitor purus non tortor pharetra pharetra. Donec luctus, eros ultrices luctus accumsan, nibh turpis condimentum ligula, et feugiat mauris elit eget enim. Sed vestibulum mi et tellus tempor fringilla. Mauris sit amet ornare dui. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.';

const StoryMeta: ComponentMeta<typeof TextArea> = {
  title: 'TextArea',
  component: TextArea,
  args: {
    label: 'Text Area',
    placeholder: 'Start typing',
    value: lorem,
    numberOfLines: 5,
    maxLength: 255,
    variant: 'default',
  },
};

export default StoryMeta;

export const Base = (args: TextAreaProps) => {
  const [value, setValue] = useState<string>(args?.value);
  return <TextArea {...args} value={value} onChange={setValue} />;
};

export const Variant = (args: TextAreaProps) => {
  const [value, setValue] = useState<string>(args?.value);
  return (
    <TextArea {...args} variant={'error'} value={value} onChange={setValue} />
  );
};
