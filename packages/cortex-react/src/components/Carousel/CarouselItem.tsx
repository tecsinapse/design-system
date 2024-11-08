import React from 'react';
import { ImageCarousel } from './Carousel';
import clsx from 'clsx';
import { Button } from '../Button';

export interface CarouselItemProps {
  item: ImageCarousel;
}

export const CarouselItem = ({ item }: CarouselItemProps) => {
  const stylesTitle = {
    color: item.title.color ?? 'black',
    fontSize: item.title?.size ?? '1rem',
  };
  const stylesSubTitle = {
    color: item.subtitle.color ?? 'white',
    fontSize: item.subtitle?.size ?? '1rem',
  };

  return (
    <>
      <img
        className={'w-full h-[360px] object-cover rounded-mili'}
        src={item.src}
        alt={item.alt}
      />
      <div
        className={
          'z-absolute absolute top-[50%] transform -translate-y-[50%] left-[10%] mx-deca max-w-[60%]'
        }
      >
        <p className={clsx('text-h2 font-bold')} style={stylesTitle}>
          {item.title.text}
        </p>
        <p
          className={'text-white text-h2 font-bold hidden lg:flex'}
          style={stylesSubTitle}
        >
          {item.subtitle.text}
        </p>
      </div>
      {item.button ? (
        <a
          href={item.button.link}
          target={item.button.target ?? '_self'}
          rel="noopener noreferrer"
        >
          <Button
            data-testid={'button-link-carousel'}
            variants={{
              className: 'z-absolute absolute bottom-deca left-[10%]',
            }}
          >
            {item.button.title}
          </Button>
        </a>
      ) : (
        <></>
      )}
    </>
  );
};
