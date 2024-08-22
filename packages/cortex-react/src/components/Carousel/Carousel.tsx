import React from 'react';
import { Button } from '../Button';
import { useSpringCarousel } from 'react-spring-carousel';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { CarouselItem } from './CarouselItem';

export type ImageCarousel = {
  src: string;
  alt: string;
  title?: string;
};

export interface CarouselProps {
  images: ImageCarousel[];
}

export const Carousel = ({ images }: CarouselProps) => {
  const itemsCarousel = images.map((imageProp, i) => ({
    id: `${imageProp.alt}-${i}`,
    renderItem: <CarouselItem item={imageProp} />,
  }));

  const { carouselFragment, slideToNextItem, slideToPrevItem } =
    useSpringCarousel({
      withLoop: true,
      items: itemsCarousel,
    });

  return (
    <div className={'overflow-hidden w-fit relative'}>
      {itemsCarousel.length > 1 ? (
        <>
          <Button
            data-testid={'button-carousel-prev'}
            variants={{
              size: 'square',
              className:
                'z-absolute absolute left-deca top-[50%]  transform -translate-y-[50%] p-centi',
            }}
            onClick={slideToPrevItem}
          >
            <IoIosArrowBack />
          </Button>
          <Button
            data-testid={'button-carousel-next'}
            variants={{
              size: 'square',
              className:
                'z-absolute absolute right-deca top-[50%] transform -translate-y-[50%] p-centi',
            }}
            onClick={slideToNextItem}
          >
            <IoIosArrowForward />
          </Button>
        </>
      ) : (
        <></>
      )}
      {carouselFragment}
    </div>
  );
};
