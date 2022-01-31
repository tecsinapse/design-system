import React from 'react';
import { Story } from '@storybook/react';
import Tooltip, { ITooltip } from './Tooltip';
import { Button } from '../Button';
import { Text } from '@tecsinapse/react-core';

export default {
  title: 'Web/Tooltip',
  component: Tooltip,
};

const Template: Story<ITooltip> = args => {
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

export const Base = Template.bind({});

Base.args = {
  title: 'Tooltip',
};
