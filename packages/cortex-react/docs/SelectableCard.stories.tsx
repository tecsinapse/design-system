import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { SelectableCard } from '../src';

export default {
  title: 'Cortex/Selectable Card',
  component: SelectableCard,
} as Meta<typeof SelectableCard>;

export const Default: StoryObj<typeof SelectableCard> = {
  render: () => {
    const [isSelected, setIsSelected] = useState(false);

    return (
      <div className="w-80">
        <SelectableCard
          label="My Selectable Card"
          isSelected={isSelected}
          onSelect={() => setIsSelected(isSelected => !isSelected)}
        />
      </div>
    );
  },
};
