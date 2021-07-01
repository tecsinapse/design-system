import React from 'react';
import Menubar, { MenubarProps } from './Menubar';
import { Story } from '@storybook/react';
import styled from '@emotion/styled';

export default {
  title: 'Components/Menubar',
  component: Menubar,
  parameters: {
    layout: 'fullscreen',
  },
};

const StyledImage = styled('img')`
  width: auto;
  height: 35px;
  margin-right: 35px;
`;

// Import type manually
const Template: Story<MenubarProps> = args => {
  return (
    <Menubar
      leftComponents={
        <StyledImage
          src="https://www.tecsinapse.com.br/wp-content/themes/tecsinapse/img/logo.svg"
          alt="TecSinapse"
        />
      }
      {...args}
    />
  );
};

export const Base = Template.bind({});
