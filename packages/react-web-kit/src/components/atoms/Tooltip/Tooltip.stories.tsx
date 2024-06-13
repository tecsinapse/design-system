import React from 'react';
import { StoryFn } from '@storybook/react';
import Tooltip, { ITooltip } from './Tooltip';
import { Button } from '../Button';
import { Text } from '@tecsinapse/react-core';

export default {
  title: 'react-web-kit/Tooltip',
  component: Tooltip,
};

const Template: StoryFn<ITooltip> = args => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Tooltip {...args}>
        <Button>
          <Text fontColor="light" fontWeight="bold">
            Hover me
          </Text>
        </Button>
      </Tooltip>
    </div>
  );
};

export const Base = {
  render: Template,

  args: {
    title: 'Tooltip',
  },
};
