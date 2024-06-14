import React, { ElementType } from 'react';
import { StoryFn } from '@storybook/react';
import { Breadcrumbs, BreadcrumbType } from '../components';

export default {
  title: 'Cortex-React/Breadcrumbs',
  component: <div />,
  parameters: {
    layout: 'fullscreen',
  },
};

const breadcrumbs: BreadcrumbType[] = [
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
];

const Template: StoryFn = () => {
  return (
    <div className="p-giga">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
    </div>
  );
};

export const Base = {
  render: Template,
  args: {},
};
