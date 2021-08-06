import { Story } from '@storybook/react';
import React, { ElementType } from 'react';
import { StyleProps } from '@tecsinapse/react-core';

import BreadCrumbs from './BreadCrumbs';
import styled from '@emotion/styled';

export default {
  title: 'Components/BreadCrumbs',
  component: BreadCrumbs,
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
      <ContainerBreadCrumb>
        <BreadCrumbs breadcrumbs={breadcrumbs} />
      </ContainerBreadCrumb>
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

const ContainerBreadCrumb = styled('div')`
  width: 90%;
`;

export const Base = Template.bind({});
