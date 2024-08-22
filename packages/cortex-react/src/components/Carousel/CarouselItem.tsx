import React from 'react';
import { ImageCarousel } from './Carousel';

export interface CarouselItemProps {
  item: ImageCarousel;
}

export const CarouselItem = ({ item }: CarouselItemProps) => {
  return (
    <>
      <img
        className={'w-full h-[360px] object-fill rounded-mili'}
        src={item.src}
        alt={item.alt}
      />
      {item?.title ? (
        <p
          className={
            'z-absolute absolute top-[50%] transform -translate-y-[50%] left-[10%] text-white text-h2 font-bold max-w-[40%]'
          }
        >
          Conheça o novo portal Carrera e todos os novos recursos disponíveis
          para tornar seu uso mais prático e intuitivo.
        </p>
      ) : (
        <></>
      )}
    </>
  );
};
