import { Story } from '@storybook/react';
import React, { ElementType } from 'react';
import { StyleProps } from '@tecsinapse/react-core';

import { default as Breadcrumbs } from './Breadcrumbs';
import styled from '@emotion/styled';

export default {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'fullscreen',
  },
};

const breadcrumbs = [
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
const Template: Story = () => {
  return (
    <Container>
      <ContainerBreadcrumb>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </ContainerBreadcrumb>
    </Container>
  );
};

const Container = styled('div')<Partial<StyleProps>>`
  width: 100%;
  background-color: ${({ theme }: StyleProps) => theme.miscellaneous.bodyColor};
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContainerBreadcrumb = styled('div')`
  width: 90%;
`;

export const Base = Template.bind({});
