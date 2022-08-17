import React from 'react';
import { Story } from '@storybook/react';
import Grid, { IGridWeb } from './Grid';
import { GridItem } from './Item';
import { Text } from '@tecsinapse/react-web-kit';
import styled from '@emotion/styled';

export default {
  title: 'Web/Grid',
  component: Grid,
  subcomponents: { GridItem },
};

const Container = styled('div')`
  background-color: orange;
  padding: 8px;
  border-width: 1px;
  border-color: white;
  border-style: solid;
  border-radius: 8px;
`;

const TemplateGrid: Story<IGridWeb> = args => {
  return (
    <Grid {...args}>
      <GridItem wrapper span={12}>
        <Container>
          <Text>Box</Text>
        </Container>
      </GridItem>

      <GridItem wrapper span={6}>
        <Container>
          <Text>Box</Text>
        </Container>
      </GridItem>
      <GridItem wrapper span={6}>
        <Container>
          <Text>Box</Text>
        </Container>
      </GridItem>

      <GridItem wrapper span={4} flexShrink={1}>
        <Container>
          <Text>Box</Text>
        </Container>
      </GridItem>
      <GridItem wrapper span={4} flexGrow={1}>
        <Container>
          <Text>Box</Text>
        </Container>
      </GridItem>
      <GridItem wrapper span={4} flexShrink={1}>
        <Container>
          <Text>Box</Text>
        </Container>
      </GridItem>

      <GridItem wrapper span={3} flexBasis={'content'} flex={1}>
        {/** Width should consider component padding and grid spacing (8px left + 8px right + 2px grid for nano) */}
        <Container style={{ width: 'calc(100% - 18px)' }}>
          <Text>Box</Text>
        </Container>
      </GridItem>
      <GridItem wrapper span={3} flexBasis={'content'}>
        <Container>
          <Text>Box</Text>
        </Container>
      </GridItem>
      <GridItem wrapper span={3} flexBasis={'content'}>
        <Container>
          <Text>Box</Text>
        </Container>
      </GridItem>
      <GridItem wrapper span={3} flexBasis={'content'}>
        <Container>
          <Text>Box</Text>
        </Container>
      </GridItem>
    </Grid>
  );
};

export const WithGridItem = TemplateGrid.bind({});

WithGridItem.args = {
  spacing: 'nano',
};

const TemplateLayout: Story<IGridWeb> = args => {
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

const TemplateResponsive: Story<IGridWeb> = args => {
  return (
    <Grid {...args}>
      <GridItem wrapper span={{ sm: 12 }}>
        <Container>
          <Text>Box</Text>
        </Container>
      </GridItem>

      <GridItem wrapper span={{ sm: 6, md: 6 }}>
        <Container>
          <Text>Box</Text>
        </Container>
      </GridItem>
      <GridItem wrapper span={{ sm: 6, md: 6 }}>
        <Container>
          <Text>Box</Text>
        </Container>
      </GridItem>

      <GridItem wrapper span={{ sm: 12, md: 4 }} flexShrink={1}>
        <Container>
          <Text>Box</Text>
        </Container>
      </GridItem>
      <GridItem wrapper span={{ sm: 6, md: 4 }} flexGrow={1}>
        <Container>
          <Text>Box</Text>
        </Container>
      </GridItem>
      <GridItem wrapper span={{ sm: 6, md: 4 }} flexShrink={1}>
        <Container>
          <Text>Box</Text>
        </Container>
      </GridItem>

      <GridItem wrapper span={{ sm: 12, lg: 3 }}>
        <Container>
          <Text>Box</Text>
        </Container>
      </GridItem>
      <GridItem wrapper span={{ sm: 6, lg: 3 }}>
        <Container>
          <Text>Box</Text>
        </Container>
      </GridItem>
      <GridItem wrapper span={{ sm: 6, lg: 3 }}>
        <Container>
          <Text>Box</Text>
        </Container>
      </GridItem>
      <GridItem wrapper span={{ sm: 12, lg: 3 }}>
        <Container>
          <Text>Box</Text>
        </Container>
      </GridItem>
    </Grid>
  );
};

export const WithGridItemResponsive = TemplateResponsive.bind({});

WithGridItemResponsive.args = {
  spacing: 'nano',
};
