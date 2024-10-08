import { Meta, StoryObj } from '@storybook/react';
import React, { useRef } from 'react';
import { Button, Checkbox, CheckboxRef } from '../src/components';

export default {
  title: 'Cortex/Checkbox',
  component: Checkbox,
} as Meta<typeof Checkbox>;

export const Default: StoryObj<typeof Checkbox> = {
  render: () => <Checkbox />,
};

export const Indetermined: StoryObj<typeof Checkbox> = {
  render: () => {
    const checkboxRef = useRef<CheckboxRef>(null);

    return (
      <div>
        <Checkbox indeterminate={true} ref={checkboxRef} />
        <Button onClick={() => checkboxRef.current?.setIndeterminate(true)}>
          Set indeterminate
        </Button>
      </div>
    );
  },
};
