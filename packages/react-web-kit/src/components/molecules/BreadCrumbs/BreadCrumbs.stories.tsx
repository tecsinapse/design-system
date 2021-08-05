import { Story } from '@storybook/react';
import React from 'react';

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
    title: 'Ryan',
    component: 'a',
    componentProps: {
      href: 'http://google.com.br',
    },
  },
  {
    title: 'Nauan',
    component: 'a',
    componentProps: {
      href: 'http://google.com.br',
    },
  },
  {
    title: 'João',
    component: 'a',
    componentProps: {
      href: 'http://google.com.br',
    },
  },
];
const Template: Story = () => {
  return (
    <Container>
      <BreadCrumbs breadcrumbs={breadcrumbs} />
    </Container>
  );
};

const Container = styled('div')`
  width: 100%;
  background-color: blue;
  height: 100vh;
  display: flex;
  justify-content: center;
  justify-self: center;
  align-self: center;
`;

export const Base = Template.bind({});

Base.args = {};
