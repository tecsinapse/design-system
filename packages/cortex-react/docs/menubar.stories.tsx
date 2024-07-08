import React from 'react';
import { StoryFn } from '@storybook/react';
import { Menubar } from '../src/components/Menubar';
import { Avatar } from '../src';
import { EXAMPLE_MENU, MOST_USED } from './menuBarMocks';

export default {
  title: 'Cortex/Menu Bar',
  component: <div />,
  parameters: {
    layout: 'fullscreen',
  },
};

const Template: StoryFn = () => {
  return (
    <>
      <Menubar.Root>
        <Menubar.Header>
          <Menubar.HeaderLeft>
            <img
              src="https://www.tecsinapse.com.br/wp-content/themes/tecsinapse/img/logo.svg"
              alt="TecSinapse"
              className={'w-auto h-giga ml-kilo mr-tera'}
            />
          </Menubar.HeaderLeft>
          <Menubar.Search />
          <Menubar.HeaderRight>
            <Avatar name={'RC'} />
            <Avatar name={'RC'} />
            <Avatar name={'RC'} />
            <Avatar name={'RC'} />
          </Menubar.HeaderRight>
        </Menubar.Header>
        <Menubar.DropdownRoot
          options={EXAMPLE_MENU}
          mostUsed={MOST_USED}
          labelMostUsed={'Mais acessados'}
        />
      </Menubar.Root>
    </>
  );
};

export const Base = {
  render: Template,
};
