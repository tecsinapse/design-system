import React from 'react';
import { StoryFn } from '@storybook/react';
import Accordion, { AccordionProps } from './Accordion';
import { Text } from '@tecsinapse/react-core';

export default {
  title: 'react-web-kit/Accordion',
  component: Accordion,
  parameters: {
    backgrounds: {
      default: 'white',
    },
  },
};

const Template: StoryFn<AccordionProps> = args => {
  return (
    <div style={{ width: 600 }}>
      <Accordion {...args} title="Agreement terms">
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quis
          lorem sed felis pretium posuere quis ut quam. Nunc at mi quis urna
          maximus feugiat id et neque. Nunc sit amet leo magna. Quisque eu risus
          interdum, sagittis neque nec, ultrices ex.
        </Text>
      </Accordion>
    </div>
  );
};

export const Base = {
  render: Template,

  args: {
    title: 'Agreement terms',
  },
};
