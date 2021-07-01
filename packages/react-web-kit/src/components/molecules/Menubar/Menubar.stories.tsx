import React from 'react';
import Menubar, { MenubarProps } from './Menubar';
import { Story } from '@storybook/react';

export default {
  title: 'Components/Menubar',
  component: Menubar,
  parameters: {
    layout: 'fullscreen',
  },
};

// Import type manually
const Template: Story<MenubarProps> = args => {
  return (
    <Menubar
      leftComponents={
        <img
          src="https://www.tecsinapse.com.br/wp-content/themes/tecsinapse/img/logo.svg"
          alt="TecSinapse"
          height={35}
          style={{ marginRight: 35 }}
        />
      }
      {...args}
    />
  );
};

export const Base = Template.bind({});
