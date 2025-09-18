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
      src: `https://picsum.photos/1000?idx=${i}`,
      alt: `image-${i}`,
      title: {
        text: `Title Lorem Ipsum ${i}`,
        size: '40px',
        color: '#000',
      },
      subtitle: {
        text: `Subtitle Lorem Ipsum ${i}`,
        size: '20px',
        color: '#fff',
      },
      button: {
        title: 'Acessar tecsinapse',
        link: 'https://tecsinapse.com.br/',
        target: '_blank',
      },
    }));
    return <Carousel images={items} autoScroll/>;
  },
};
