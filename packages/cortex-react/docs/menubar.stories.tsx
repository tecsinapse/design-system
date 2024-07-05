import React, { ElementType, HTMLProps } from 'react';
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

interface MenuItem extends HTMLProps<HTMLDivElement> {
  title: string;
  items?: MenuItem[];
}

interface MenuCategory {
  title: string;
  items: MenuItem[];
}
const EXAMPLE_MENU: MenuCategory[] = [
  {
    title: 'Categoria do menu 1',
    items: [
      {
        title: 'Item de menu 1',
        href: '#',
      },
      {
        title: 'Item de menu 2',
        href: '#',
      },
      {
        title: 'Item de menu 3',
        href: '#',
      },
      {
        title: 'Item de menu 4',
        href: '#',
      },
      {
        title: 'Item de menu 5',
        href: '#',
      },
    ],
  },
  {
    title: 'Categoria do menu 2',
    items: [
      {
        title: 'Item menu 1',
        items: [
          {
            title: 'Item menu 1.1',
            href: '#',
          },
          {
            title: 'Item menu 1.2',
            href: '#',
          },
        ],
      },
      {
        title: 'Item menu 2',
        items: [
          {
            title: 'Item menu 2.1',
            href: '#',
          },
          {
            title: 'Item menu 2.2',
            href: '#',
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
        href: '#',
      },
      {
        title: 'Item menu 2',
        href: '#',
      },
      {
        title: 'Item menu 3',
        href: '#',
      },
    ],
  },
  {
    title: 'Categoria do menu 4',
    items: [
      {
        title: 'Item menu 1',
        href: '#',
      },
      {
        title: 'Item menu 2',
        href: '#',
      },
      {
        title: 'Item menu 3',
        href: '#',
      },
    ],
  },
  {
    title: 'Categoria do menu 5',
    items: [
      {
        title: 'Item menu 1',
        href: '#',
      },
      {
        title: 'Item menu 2',
        href: '#',
      },
      {
        title: 'Item menu 3',
        href: '#',
      },
    ],
  },
  {
    title: 'Categoria do menu 6',
    items: [
      {
        title: 'Item menu 1',
        href: '#',
      },
      {
        title: 'Item menu 2',
        href: '#',
      },
      {
        title: 'Item menu 3',
        href: '#',
      },
      {
        title: 'Item menu 4',
        href: '#',

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
    href: '#',
  },
  {
    title: 'Item de menu 2',
    category: 'Categoria de menu 2',
    href: '#',
  },
  {
    title: 'Item de menu 3',
    category: 'Categoria de menu 3',
    href: '#',
  },
  {
    title: 'Item de menu 4',
    category: 'Categoria de menu 4',
    href: '#',
  },
];

const Template: StoryFn = args => {
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
        {/*  <Menubar.MostUsed label={'Mais acessados'} options={[]}>*/}
        {/*    {MOST_USED.map(item => (*/}
        {/*      //TODO: O que faze nesse caso? para funcionar o estilo de MostUseditem foi necessário adicionar w-full no <a/>*/}
        {/*      <Menubar.MostUsedItem*/}
        {/*        onClick={() => console.log('click')}*/}
        {/*        title={item.title}*/}
        {/*        category={item.category}*/}
        {/*      />*/}
        {/*    ))}*/}
        {/*  </Menubar.MostUsed>*/}
        {/*  <Menubar.Categories>*/}
        {/*    {EXAMPLE_MENU.map(item => (*/}
        {/*      <Menubar.Category*/}
        {/*        title={item.title}*/}
        {/*        options={item.items}*/}
        {/*        render={prop => {*/}
        {/*          return (*/}
        {/*            <Menubar.Item*/}
        {/*              subItems={prop?.items ?? []}*/}
        {/*              renderSubItems={item => {*/}
        {/*                return (*/}
        {/*                  <Menubar.SubItem>*/}
        {/*                    <a href={'teste2.com'}>{item.title}</a>*/}
        {/*                  </Menubar.SubItem>*/}
        {/*                );*/}
        {/*              }}*/}
        {/*            >*/}
        {/*              {prop.title}*/}
        {/*            </Menubar.Item>*/}
        {/*          );*/}
        {/*        }}*/}
        {/*      />*/}
        {/*    ))}*/}
        {/*  </Menubar.Categories>*/}
        {/*</Menubar.Dropdown>*/}
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
