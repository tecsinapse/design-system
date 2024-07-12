import { HTMLProps } from 'react';

export interface MenuItem extends HTMLProps<HTMLDivElement> {
  title: string;
  items?: MenuItem[];
}

export interface MenuCategory {
  title: string;
  items: MenuItem[];
}
export const EXAMPLE_MENU: MenuCategory[] = [
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
      },
    ],
  },
];

export const MOST_USED = [
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
