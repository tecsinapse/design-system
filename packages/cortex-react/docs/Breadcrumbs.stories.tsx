import { Meta, StoryObj } from '@storybook/react';
import React, { ElementType } from 'react';
import { Breadcrumbs } from '../src';
import { BreadcrumbItem } from '../src/components/Breadcrumbs/BreadcrumbItem';

export default {
  title: 'Cortex/Breadcrumbs',
  component: Breadcrumbs,
  subcomponents: { BreadcrumbItem }
} as Meta<typeof Breadcrumbs>;

export const Default: StoryObj<typeof Breadcrumbs> = ({
  args: {
    breadcrumbs: [
      {
        title: 'Início',
        Component: 'a' as ElementType,
        componentProps: {
          href: 'https://www.tecsinapse.com.br/br',
        },
      },
      {
        title: 'Carteira de clientes',
        Component: 'a' as ElementType,
        componentProps: {
          href: 'https://www.tecsinapse.com.br/',
        },
      },
      {
        title: 'Minha carteira',
        Component: 'a' as ElementType,
      },
    ]
  },
  render: (args) => <Breadcrumbs breadcrumbs={args.breadcrumbs}/>
})

export const Item: StoryObj<typeof BreadcrumbItem> = ({
  args: {
    Component: 'a' as ElementType,
    title: 'Início',
    componentProps: {
      href: 'https://www.tecsinapse.com.br/br',
    },
    isLast: false
  },
  render: (args) => <BreadcrumbItem title={args.title}  componentProps={args.componentProps} Component={args.Component} isLast={args.isLast}/>
})
