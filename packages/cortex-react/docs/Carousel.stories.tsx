import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Carousel, ImageCarousel } from '../src';

export default {
  title: 'Cortex/Carousel',
  component: Carousel,
} as Meta<typeof Carousel>;

export const Default: StoryObj<typeof Carousel> = {
  args: {},
  render: () => {
    const items: ImageCarousel[] = Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      src: `https://picsum.photos/1000?idx=${i}`,
      title: `Lorem Ipsum ${i}`,
      alt: `image-${i}`,
    }));
    return <Carousel images={items} />;
  },
};
