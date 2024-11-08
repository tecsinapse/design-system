import React from 'react';
import { Button } from '../Button';
import { useSpringCarousel } from 'react-spring-carousel';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { CarouselItem } from './CarouselItem';

type TextCarousel = {
  text: string;
  /** fontColor (in hex) */
  color: string;
  /** fontSize (in px) */
  size?: string;
};

type ButtonCarousel = {
  title?: string;
  link?: string;
  target?: '_blank' | '_self';
};

export type ImageCarousel = {
  src: string;
  alt: string;
  title: TextCarousel;
  subtitle: TextCarousel;
  button?: ButtonCarousel;
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
                'z-absolute absolute left-deca top-[50%]  transform -translate-y-[50%] p-centi hidden lg:flex',
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
                'z-absolute absolute right-deca top-[50%] transform -translate-y-[50%] p-centi hidden lg:flex',
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
