import { Story } from '@storybook/react';
import React from 'react';
import styled from '@emotion/native';

import { Button, Icon, StyleProps, Text } from '@tecsinapse/react-core';
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
    <StyledContainerStory>
      <Drawer open={isOpen} onClose={onClose} anchorPosition={anchorPosition}>
        <StyledHeaderDrawerStory>
          <Text typography="h4">Design System</Text>
          <StyledHButtonHeaderStory
            size="small"
            onPress={onClose}
            variant="text"
          >
            <Icon name="close" type="material-community" />
          </StyledHButtonHeaderStory>
        </StyledHeaderDrawerStory>
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
  open: false,
};

const StyledContainerStory = styled('div')`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
`;

const StyledContainerButtonStory = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: absolute;
`;

const StyledHeaderDrawerStory = styled(Card)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const StyledHButtonHeaderStory = styled(Button)<Partial<StyleProps>>`
  margin-left: ${({ theme }) => theme.spacing.mega};
`;
