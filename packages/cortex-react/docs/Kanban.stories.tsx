import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Card } from '../src';
import { Kanban } from '../src/components/Kanban';

export default {
  title: 'Cortex/ContainerKanban',
  component: Kanban.Root,
} as Meta<typeof Kanban.Root>;

export const Default: StoryObj<typeof Kanban.Root> = {
  render: () => {
    const fakeList = new Array(10).fill(0).map((_, i) => i);

    return (
      <Kanban.Root>
        <Kanban.Header>
          <p className={'font-bold text-h3'}>Title Column</p>
        </Kanban.Header>
        <Kanban.Body>
          <Kanban.ContainerList className={'space-y-deca max-h-[400px]'}>
            {fakeList.map((_, i) => (
              <Card key={i} className={'w-[300px]'}>
                <p className={'font-bold text-h3'}>Title Card</p>
                <p className={'text-base text-secondary-medium'}>
                  Description Card
                </p>
              </Card>
            ))}
          </Kanban.ContainerList>
        </Kanban.Body>
      </Kanban.Root>
    );
  },
};
