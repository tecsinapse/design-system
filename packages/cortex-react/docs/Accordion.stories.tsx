import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Accordion } from '../src';

export default {
  title: 'Cortex/Accordion',
  component: Accordion.Root,
} as Meta<typeof Accordion.Root>;

export const Default: StoryObj<typeof Accordion.Root> = {
  args: {
    label: 'Root',
    defaultOpen: false,
    invertedArrow: false,
  },
  render: args => (
    <Accordion.Root
      label={args.label}
      defaultOpen={args.defaultOpen}
      invertedArrow={args.invertedArrow}
    >
      <div className="w-[300px] bg-white p-mili">
        <h1 className="text-h1">Example content</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ex
          purus, aliquet eu nisi sed, luctus convallis augue. Quisque convallis
          arcu vel lacus lobortis consectetur. In aliquam orci vel nunc sodales,
          a vestibulum leo gravida. Vivamus congue, felis nec lobortis laoreet,
          purus nisi convallis metus, quis fermentum lectus erat ut diam. Etiam
          fermentum mi eget massa rhoncus lacinia. Sed eget leo risus. Phasellus
          at semper ligula. Fusce bibendum a tellus sed sagittis. Suspendisse
          sit amet sodales dolor. In in neque in eros lobortis laoreet commodo
          ac turpis. Vivamus cursus mi non fermentum mollis.
        </p>
      </div>
    </Accordion.Root>
  ),
};

export const Floating: StoryObj<typeof Accordion.Root> = {
  args: {
    floating: true,
    defaultOpen: true,
    invertedArrow: false,
  },
  render: args => (
    <Accordion.Face defaultOpen={args.defaultOpen}>
      <Accordion.Trigger
        floating={args.floating}
        invertedArrow={args.invertedArrow}
      />
      <Accordion.Content>
        <div className="w-[300px]">
          <h1 className="text-h1">Example content</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            ex purus, aliquet eu nisi sed, luctus convallis augue. Quisque
            convallis arcu vel lacus lobortis consectetur. In aliquam orci vel
            nunc sodales, a vestibulum leo gravida. Vivamus congue, felis nec
            lobortis laoreet, purus nisi convallis metus, quis fermentum lectus
            erat ut diam. Etiam fermentum mi eget massa rhoncus lacinia. Sed
            eget leo risus. Phasellus at semper ligula. Fusce bibendum a tellus
            sed sagittis. Suspendisse sit amet sodales dolor. In in neque in
            eros lobortis laoreet commodo ac turpis. Vivamus cursus mi non
            fermentum mollis.
          </p>
        </div>
      </Accordion.Content>
    </Accordion.Face>
  ),
};
