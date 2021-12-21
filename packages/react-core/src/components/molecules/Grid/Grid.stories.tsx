import React from 'react';
import { Story } from '@storybook/react';
import Grid, { IGrid } from './Grid';
import { GridItem } from './Item';
import { Text } from '@tecsinapse/react-core';
import { View } from 'react-native';
import styled from '@emotion/native';

export default {
  title: 'Hybrid/Grid',
  component: Grid,
  subcomponents: { GridItem },
};

const Container = styled(View)`
  background-color: orange;
  padding: 2px;
  border-width: 1px;
  border-color: white;
  border-style: solid;
  border-radius: 8px;
`;

const TemplateGrid: Story<IGrid> = args => {
  return (
    <Grid {...args}>
      <GridItem span={12}>
        <Container>
          <Text>Box</Text>
        </Container>
      </GridItem>

      <GridItem span={6}>
        <Container>
          <Text>Box</Text>
        </Container>
      </GridItem>
      <GridItem span={6}>
        <Container>
          <Text>Box</Text>
        </Container>
      </GridItem>

      <GridItem span={4} flexShrink={1}>
        <Container>
          <Text>Box</Text>
        </Container>
      </GridItem>
      <GridItem span={4} flexGrow={1}>
        <Container>
          <Text>Box</Text>
        </Container>
      </GridItem>
      <GridItem span={4} flexShrink={1}>
        <Container>
          <Text>Box</Text>
        </Container>
      </GridItem>

      <GridItem span={3}>
        <Container>
          <Text>Box</Text>
        </Container>
      </GridItem>
      <GridItem span={3}>
        <Container>
          <Text>Box</Text>
        </Container>
      </GridItem>
      <GridItem span={3}>
        <Container>
          <Text>Box</Text>
        </Container>
      </GridItem>
      <GridItem span={3}>
        <Container>
          <Text>Box</Text>
        </Container>
      </GridItem>
    </Grid>
  );
};

export const WithGridItem = TemplateGrid.bind({});

WithGridItem.args = {
  spacing: 'mili',
};

const TemplateLayout: Story<IGrid> = args => {
  return (
    <Grid {...args}>
      <Container>
        <Text>Box</Text>
      </Container>
      <Container>
        <Text>Box</Text>
      </Container>
      <Container>
        <Text>Box</Text>
      </Container>
      <Container>
        <Text>Box</Text>
      </Container>
      <Container>
        <Text>Box</Text>
      </Container>
      <Container>
        <Text>Box</Text>
      </Container>
      <Container>
        <Text>Box</Text>
      </Container>
      <Container>
        <Text>Box</Text>
      </Container>
      <Container>
        <Text>Box</Text>
      </Container>
      <Container>
        <Text>Box</Text>
      </Container>
    </Grid>
  );
};

export const WithLayout = TemplateLayout.bind({});

WithLayout.args = {
  layout: [[12], [6, 6], [4, 4, 4], [3, 3, 3, 3]],
  spacing: 'mili',
};
