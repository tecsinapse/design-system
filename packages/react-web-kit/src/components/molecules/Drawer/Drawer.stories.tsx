import { Story } from '@storybook/react';
import React from 'react';
import styled from '@emotion/styled';

import { Button, Icon, Text } from '@tecsinapse/react-core';
import { default as Drawer, DrawerProps } from './Drawer';

export default {
  title: 'Components/Drawer',
  component: Drawer,
  parameters: {
    layout: 'fullscreen',
  },
};

const Template: Story<DrawerProps> = ({ anchorPosition, open }) => {
  const [isOpen, setOpen] = React.useState<boolean>(open);

  const onClose = () => {
    setOpen(!isOpen);
  };

  return (
    <>
      <Drawer open={isOpen} onClose={onClose} anchorPosition={anchorPosition}>
        <StyledHeaderDrawerStory>
          <Text typography="h4">Design System</Text>
          <StyledHButtonHeaderStory>
            <Button size="small" onPress={onClose} variant="text">
              <Icon name="close" type="material-community" />
            </Button>
          </StyledHButtonHeaderStory>
        </StyledHeaderDrawerStory>
      </Drawer>
      <StyledContainerButtonStory>
        <Button onPress={onClose}>
          <Text fontColor="light">Open Drawer</Text>
        </Button>
      </StyledContainerButtonStory>
    </>
  );
};

export const Base = Template.bind({});

Base.args = {
  anchorPosition: 'right',
  open: false,
};

const StyledContainerButtonStory = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

const StyledHeaderDrawerStory = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
`;

const StyledHButtonHeaderStory = styled('div')`
  margin-left: 10px;
`;
