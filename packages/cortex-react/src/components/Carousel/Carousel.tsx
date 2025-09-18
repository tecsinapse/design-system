import React, { useCallback, useEffect } from 'react';
import { Button } from '../Button';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { CarouselItem } from './CarouselItem';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

type TextCarousel = {
  text: string;
  color: string;
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
  autoScroll?: boolean;
}

export const Carousel = ({ images, autoScroll }: CarouselProps) => {
  const plugins = autoScroll ? [Autoplay()] : [];
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, plugins);

  const itemsCarousel = images.map((imageProp, i) => ({
    id: `${imageProp.alt}-${i}`,
    renderItem: <CarouselItem item={imageProp} />,
  }));

  const slideToPrevItem = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const slideToNextItem = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    emblaApi?.reInit();
  }, [emblaApi, images.length]);

  return (
    <div className="overflow-hidden w-full relative" ref={emblaRef}>
      <div className="flex">
        {images.map((image, i) => (
          <div className="min-w-full flex-shrink-0 relative" key={`${image.alt}-${i}`}>
            <CarouselItem item={image} />
          </div>
        ))}
      </div>

      {itemsCarousel.length > 1 && (
        <>
          <Button
            type={'button'}
            data-testid={'button-carousel-prev'}
            className="z-absolute absolute left-deca top-[50%] transform -translate-y-[50%] p-centi flex"
            size="square"
            onClick={slideToPrevItem}
          >
            <IoIosArrowBack />
          </Button>
          <Button
            type={'button'}
            data-testid={'button-carousel-next'}
            size="square"
            className="z-absolute absolute right-deca top-[50%] transform -translate-y-[50%] p-centi flex"
            onClick={slideToNextItem}
          >
            <IoIosArrowForward />
          </Button>
        </>
      )}
    </div>
  );
};

export default Carousel;
