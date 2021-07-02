import React from 'react';
import Menubar, { MenubarProps } from './Menubar';
import { Story } from '@storybook/react';
import styled from '@emotion/styled';
import { Icon } from '@tecsinapse/react-core/src';

export default {
  title: 'Components/Menubar',
  component: Menubar,
  parameters: {
    layout: 'fullscreen',
  },
};

const mockData = [
  {
    title: 'Categoria do menu',
    leftComponents: <Icon name="magnify" type="material-community" />,
    items: [
      {
        title: 'Item de menu 1',
        Component: 'a',
        props: { href: '/' },
        rightComponents: undefined,
      },
      {
        title: 'Item de menu 2',
        Component: 'a',
        props: { href: '/' },
        rightComponents: undefined,
      },
      {
        title: 'Item de menu 3',
        Component: 'a',
        props: { href: '/' },
        rightComponents: undefined,
      },
      {
        title: 'Item de menu 4',
        Component: 'a',
        props: { href: '/' },
        rightComponents: undefined,
      },
      {
        title: 'Item de menu 5',
        Component: 'a',
        props: { href: '/' },
        rightComponents: undefined,
      },
    ],
  },
  {
    title: 'Categoria do menu',
    items: [
      {
        title: 'Item menu 1',
        Component: 'a',
        props: { href: '/' },
        rightComponents: undefined,
      },
      {
        title: 'Item menu 2',
        Component: 'a',
        props: { href: '/' },
        rightComponents: undefined,
      },
    ],
  },
  {
    title: 'Categoria do menu',
    items: [
      {
        title: 'Item menu 1',
        Component: 'a',
        props: { href: '/' },
        rightComponents: undefined,
      },
      {
        title: 'Item menu 2',
        Component: 'a',
        props: { href: '/' },
        rightComponents: undefined,
      },
      {
        title: 'Item menu 3',
        Component: 'a',
        props: { href: '/' },
        rightComponents: undefined,
      },
    ],
  },
  {
    title: 'Categoria do menu',
    items: [
      {
        title: 'Item menu 1',
        Component: 'a',
        props: { href: '/' },
        rightComponents: undefined,
      },
      {
        title: 'Item menu 2',
        Component: 'a',
        props: { href: '/' },
        rightComponents: undefined,
      },
      {
        title: 'Item menu 3',
        Component: 'a',
        props: { href: '/' },
        rightComponents: undefined,
      },
    ],
  },
  {
    title: 'Categoria do menu',
    items: [
      {
        title: 'Item menu 1',
        Component: 'a',
        props: { href: '/' },
        rightComponents: undefined,
      },
      {
        title: 'Item menu 2',
        Component: 'a',
        props: { href: '/' },
        rightComponents: undefined,
      },
      {
        title: 'Item menu 3',
        Component: 'a',
        props: { href: '/' },
        rightComponents: undefined,
      },
    ],
  },
  {
    title: 'Categoria do menu',
    items: [
      {
        title: 'Item menu 1',
        Component: 'a',
        props: { href: '/' },
        rightComponents: undefined,
      },
      {
        title: 'Item menu 2',
        Component: 'a',
        props: { href: '/' },
        rightComponents: undefined,
      },
      {
        title: 'Item menu 3',
        Component: 'a',
        props: { href: '/' },
        rightComponents: undefined,
      },
      {
        title: 'Item menu 4',
        Component: 'a',
        props: { href: '/' },
        rightComponents: undefined,
      },
    ],
  },
];

const StyledImage = styled('img')`
  width: auto;
  height: 35px;
  margin-right: 35px;
`;

// Import type manually
const Template: Story<MenubarProps> = args => {
  return (
    <Menubar
      {...args}
      options={mockData}
      leftComponents={
        <StyledImage
          src="https://www.tecsinapse.com.br/wp-content/themes/tecsinapse/img/logo.svg"
          alt="TecSinapse"
        />
      }
    />
  );
};

export const Base = Template.bind({});
