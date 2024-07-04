import React, { ElementType } from 'react';
import { StoryFn } from '@storybook/react';
import { Menubar } from '../src/components/Menubar';
import { Avatar } from '../src';

export default {
  title: 'Cortex/Menu Bar',
  component: <div />,
  parameters: {
    layout: 'fullscreen',
  },
};

const EXAMPLE_MENU = [
  {
    title: 'Categoria do menu 1',
    // leftComponents: <Icon name="magnify" type="material-community" />,
    items: [
      {
        title: 'Item de menu 1',
        Component: 'a' as ElementType,
        props: { href: '#' },
        rightComponents: undefined,
      },
      {
        title: 'Item de menu 2',
        Component: 'a' as ElementType,
        props: { href: '#' },
        rightComponents: undefined,
      },
      {
        title: 'Item de menu 3',
        Component: 'a' as ElementType,
        props: { href: '#' },
        rightComponents: undefined,
      },
      {
        title: 'Item de menu 4',
        Component: 'a' as ElementType,
        props: { href: '#' },
        rightComponents: undefined,
      },
      {
        title: 'Item de menu 5',
        Component: 'a' as ElementType,
        props: { href: '#' },
        rightComponents: undefined,
      },
    ],
  },
  {
    title: 'Categoria do menu 2',
    items: [
      {
        title: 'Item menu 1',
        Component: 'a' as ElementType,
        props: { href: '#' },
        rightComponents: undefined,
        items: [
          {
            title: 'Item menu 1.1',
            Component: 'a' as ElementType,
            props: { href: '#' },
            rightComponents: undefined,
          },
          {
            title: 'Item menu 1.2',
            Component: 'a' as ElementType,
            props: { href: '#' },
            rightComponents: undefined,
          },
        ],
      },
      {
        title: 'Item menu 2',
        Component: 'a' as ElementType,
        props: { href: '#' },
        rightComponents: undefined,
        items: [
          {
            title: 'Item menu 2.1',
            Component: 'a' as ElementType,
            props: { href: '#' },
            // rightComponents: (
            //   <div
            //     style={{
            //       display: 'flex',
            //       backgroundColor: '#2db783',
            //       borderRadius: '4px',
            //       padding: '3px',
            //     }}
            //   >
            //     <Text fontColor="light" typography="label">
            //       Novo
            //     </Text>
            //   </div>
            // ),
          },
          {
            title: 'Item menu 2.2',
            Component: 'a' as ElementType,
            props: { href: '#' },
            rightComponents: undefined,
          },
        ],
      },
    ],
  },
  {
    title: 'Categoria do menu 3',
    items: [
      {
        title: 'Item menu 1',
        Component: 'a' as ElementType,
        props: { href: '#' },
        rightComponents: undefined,
      },
      {
        title: 'Item menu 2',
        Component: 'a' as ElementType,
        props: { href: '#' },
        rightComponents: undefined,
      },
      {
        title: 'Item menu 3',
        Component: 'a' as ElementType,
        props: { href: '#' },
        rightComponents: undefined,
      },
    ],
  },
  {
    title: 'Categoria do menu 4',
    items: [
      {
        title: 'Item menu 1',
        Component: 'a' as ElementType,
        props: { href: '#' },
        rightComponents: undefined,
      },
      {
        title: 'Item menu 2',
        Component: 'a' as ElementType,
        props: { href: '#' },
        rightComponents: undefined,
      },
      {
        title: 'Item menu 3',
        Component: 'a' as ElementType,
        props: { href: '#' },
        rightComponents: undefined,
      },
    ],
  },
  {
    title: 'Categoria do menu 5',
    items: [
      {
        title: 'Item menu 1',
        Component: 'a' as ElementType,
        props: { href: '#' },
        rightComponents: undefined,
      },
      {
        title: 'Item menu 2',
        Component: 'a' as ElementType,
        props: { href: '#' },
        rightComponents: undefined,
      },
      {
        title: 'Item menu 3',
        Component: 'a' as ElementType,
        props: { href: '#' },
        rightComponents: undefined,
      },
    ],
  },
  {
    title: 'Categoria do menu 6',
    items: [
      {
        title: 'Item menu 1',
        Component: 'a' as ElementType,
        props: { href: '#' },
        rightComponents: undefined,
      },
      {
        title: 'Item menu 2',
        Component: 'a' as ElementType,
        props: { href: '#' },
        rightComponents: undefined,
      },
      {
        title: 'Item menu 3',
        Component: 'a' as ElementType,
        props: { href: '#' },
        rightComponents: undefined,
      },
      {
        title: 'Item menu 4',
        Component: 'a' as ElementType,
        props: { href: '#' },
        // rightComponents: (
        //   <div
        //     style={{
        //       display: 'flex',
        //       backgroundColor: '#2db783',
        //       borderRadius: '4px',
        //       padding: '3px',
        //     }}
        //   >
        //     <Text fontColor="light" typography="label">
        //       Novo
        //     </Text>
        //   </div>
        // ),
      },
    ],
  },
];

const MOST_USED = [
  {
    title: 'Item de menu 1',
    category: 'Categoria de menu 1',
    Component: 'a' as ElementType,
    props: { href: '#' },
  },
  {
    title: 'Item de menu 2',
    category: 'Categoria de menu 2',
    Component: 'a' as ElementType,
    props: { href: '#' },
  },
  {
    title: 'Item de menu 3',
    category: 'Categoria de menu 3',
    Component: 'a' as ElementType,
    props: { href: '#' },
  },
  {
    title: 'Item de menu 4',
    category: 'Categoria de menu 4',
    Component: 'a' as ElementType,
    props: { href: '#' },
  },
];

const Template: StoryFn = args => {
  return (
    <>
      <Menubar.Root>
        <Menubar.Header>
          <Menubar.Left>
            <img
              src="https://www.tecsinapse.com.br/wp-content/themes/tecsinapse/img/logo.svg"
              alt="TecSinapse"
              className={'w-auto h-giga ml-kilo mr-tera'}
            />
          </Menubar.Left>
          <Menubar.Search />
          <Menubar.Right>
            <Avatar name={'RC'} />
            <Avatar name={'RC'} />
            <Avatar name={'RC'} />
            <Avatar name={'RC'} />
          </Menubar.Right>
        </Menubar.Header>
        <Menubar.Dropdown>
          <Menubar.MostUsed label={'Mais acessados'}>
            {MOST_USED.map(item => (
              //TODO: O que faze nesse caso? para funcionar o estilo de MostUseditem foi necessário adicionar w-full no <a/>
              <a href={'test.com'} className={'w-full'}>
                <Menubar.MostUsedItem
                  title={item.title}
                  category={item.category}
                />
              </a>
            ))}
          </Menubar.MostUsed>
        </Menubar.Dropdown>
      </Menubar.Root>
    </>
  );
  // return <MenuBar options={EXAMPLE_MENU} />;
};

export const Base = {
  render: Template,
  // args: {
  //   src: 'https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png',
  //   name: 'Elon Musk',
  // },
};
