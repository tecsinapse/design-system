import { Story } from '@storybook/react';
import React from 'react';
import { Drawer } from '../Drawer/';
import { Button, Text } from '@tecsinapse/react-core';
import { DrawerProps } from './Drawer';
import { StyledContainerButtonStory, StyledContainerStory } from './styled';

export default {
  title: 'Components/Drawer',
  component: Drawer,
  parameters: {
    layout: 'fullscreen',
  },
};

const Template: Story<DrawerProps> = ({ anchorPosition }) => {
  const [open, setOpen] = React.useState<boolean>(false);

  const onClose = () => {
    setOpen(!open);
  };

  return (
    <StyledContainerStory anchorPosition={anchorPosition}>
      <Drawer open={open} onClose={onClose} anchorPosition={anchorPosition}>
        <div style={{ padding: 10 }}>
          <h1>Drawer Teste</h1>
        </div>
      </Drawer>
      <StyledContainerButtonStory>
        <Button onPress={onClose}>
          <Text>Open Drawer</Text>
        </Button>
      </StyledContainerButtonStory>
    </StyledContainerStory>
  );
};

export const Base = Template.bind({});

Base.args = {
  anchorPosition: 'right',
};
