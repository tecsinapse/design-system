import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Chip } from '../src';

export default {
  title: 'Cortex/Chip',
  component: Chip,
} as Meta<typeof Chip>;

export const Default: StoryObj<typeof Chip> = {
  render: () => {
    const [isSelected, setIsSelected] = useState(false);

    return (
      <Chip
        isSelected={isSelected}
        onSelect={() => setIsSelected(isSelected => !isSelected)}
      >
        My Chip
      </Chip>
    );
  },
};
