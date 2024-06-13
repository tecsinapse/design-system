import { StoryFn } from '@storybook/react';
import React from 'react';
import styled from '@emotion/styled';

import { Button, Icon, Text } from '@tecsinapse/react-core';
import { default as Drawer, DrawerProps } from './Drawer';

export default {
  title: 'react-web-kit/Drawer',
  component: Drawer,
};

const Template: StoryFn<DrawerProps> = ({ anchorPosition, open }) => {
  const [isOpen, setOpen] = React.useState<boolean>(open);

  const toggleOpen = () => {
    setOpen(!isOpen);
  };

  return (
    <>
      <Drawer
        open={isOpen}
        onClose={toggleOpen}
        anchorPosition={anchorPosition}
      >
        <StyledHeaderDrawerStory>
          <StyledTextHeader typography="h4">Design System</StyledTextHeader>
          <StyledHButtonHeaderStory>
            <Button size="small" onPress={toggleOpen} variant="text">
              <Icon name="close" type="material-community" />
            </Button>
          </StyledHButtonHeaderStory>
        </StyledHeaderDrawerStory>
      </Drawer>
      <Button onPress={toggleOpen}>
        <StyledTextButton fontColor="light">Open Drawer</StyledTextButton>
      </Button>
    </>
  );
};

export const Base = {
  render: Template,

  args: {
    anchorPosition: 'right',
    open: false,
  },
};

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

const StyledTextButton = styled(Text)`
  user-select: none;
`;

const StyledTextHeader = styled(Text)`
  white-space: nowrap;
`;
