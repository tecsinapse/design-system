import { MenuItem, MostUsedItemProps } from '../src';

export interface MenuCategory {
  title: string;
  items: MenuItem[];
}
export const EXAMPLE_MENU: MenuCategory[] = [
  {
    title: 'Categoria do menu 1',
    items: [
      {
        title: 'Item de menu 1 Item de menu 1',
        anchorProps: {
          href: '#',
        },
      },
      {
        title: 'Item de menu 2 Item de menu 2',
        anchorProps: {
          href: '#',
        },
      },
      {
        title: 'Item de menu 3 Item de menu 3',
        anchorProps: {
          href: '#',
        },
      },
      {
        title: 'Item de menu 4 Item de menu 4',
        anchorProps: {
          href: '#',
        },
      },
      {
        title: 'Item de menu 5 Item de menu 5',
        anchorProps: {
          href: '#',
        },
      },
    ],
  },
  {
    title: 'Categoria do menu 2',
    items: [
      {
        title: 'Item menu 1 Item menu 1',
        items: [
          {
            title: 'Item menu 1 Item menu 1.1',
            anchorProps: {
              href: '#',
            },
          },
          {
            title: 'Item menu 1 Item menu 1.2',
            anchorProps: {
              href: '#',
            },
          },
        ],
      },
      {
        title: 'Item menu 2 Item menu 2',
        items: [
          {
            title: 'Item menu 2 Item menu 2.1',
            anchorProps: {
              href: '#',
            },
          },
          {
            title: 'Item menu 2 Item menu 2.2',
            anchorProps: {
              href: '#',
            },
          },
        ],
      },
    ],
  },
  {
    title: 'Categoria do menu 3',
    items: [
      {
        title: 'Item menu 1 Item menu 1',
        anchorProps: {
          href: '#',
        },
      },
      {
        title: 'Item menu 2 Item menu 2',
        anchorProps: {
          href: '#',
        },
      },
      {
        title: 'Item menu 3 Item menu 3',
        anchorProps: {
          href: '#',
        },
      },
    ],
  },
  {
    title: 'Categoria do menu 4',
    items: [
      {
        title: 'Item menu 1 Item menu 1',
        anchorProps: {
          href: '#',
        },
      },
      {
        title: 'Item menu 2 Item menu 2',
        anchorProps: {
          href: '#',
        },
      },
      {
        title: 'Item menu 3 Item menu 3',
        anchorProps: {
          href: '#',
        },
      },
    ],
  },
  {
    title: 'Categoria do menu 5',
    items: [
      {
        title: 'Item menu 1 Item menu 1',
        anchorProps: {
          href: '#',
        },
      },
      {
        title: 'Item menu 2 Item menu 2',
        anchorProps: {
          href: '#',
        },
      },
      {
        title: 'Item menu 3 Item menu 3',
        anchorProps: {
          href: '#',
        },
      },
    ],
  },
  {
    title: 'Categoria do menu 6',
    items: [
      {
        title: 'Item menu 1 Item menu 1',
        anchorProps: {
          href: '#',
        },
      },
      {
        title: 'Item menu 2 Item menu 2',
        anchorProps: {
          href: '#',
        },
      },
      {
        title: 'Item menu 3 Item menu 3',
        anchorProps: {
          href: '#',
        },
      },
      {
        title: 'Item menu 4 Item menu 4',
        anchorProps: {
          href: '#',
        },
      },
    ],
  },
];

export const MOST_USED: MostUsedItemProps[] = [
  {
    title: 'Item de menu 1 Item de menu 1',
    category: 'Categoria de menu 1',
    anchorProps: {
      href: '#',
    },
  },
  {
    title: 'Item de menu 2 Item de menu 2',
    category: 'Categoria de menu 2',
    anchorProps: {
      href: '#',
    },
  },
  {
    title: 'Item de menu 3 Item de menu 3',
    category: 'Categoria de menu 3',
    anchorProps: {
      href: '#',
    },
  },
  {
    title: 'Item de menu 4 Item de menu 4',
    category: 'Categoria de menu 4',
    anchorProps: {
      href: '#',
    },
  },
];
