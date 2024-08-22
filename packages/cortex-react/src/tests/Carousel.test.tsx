import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Carousel, ImageCarousel } from '../components';

describe('Carousel component', () => {
  const mockImages: ImageCarousel[] = Array.from({ length: 10 }).map(
    (_, i) => ({
      id: i,
      src: `https://picsum.photos/100?idx=${i}`,
      title: `Title example ${i}`,
      alt: `image-${i}`,
    })
  );

  it('Should render image', () => {
    const { getAllByAltText } = render(<Carousel images={mockImages} />);

    const firstImage = getAllByAltText(mockImages[0].alt)[0];
    expect(firstImage).toBeInTheDocument();
  });

  it('Should render image with title', () => {
    const { getAllByText } = render(<Carousel images={mockImages} />);

    const firstImage = getAllByText(String(mockImages[0].title))[0];
    expect(firstImage).toBeInTheDocument();
  });

  it('Should render buttons navigate', () => {
    render(<Carousel images={mockImages} />);

    expect(screen.queryByTestId('button-carousel-prev')).toBeInTheDocument();
    expect(screen.queryByTestId('button-carousel-next')).toBeInTheDocument();
  });

  it('Should not render buttons navigate', () => {
    const onlyOneImage: ImageCarousel[] = [mockImages[0]];
    render(<Carousel images={onlyOneImage} />);

    const buttonPrev = screen.queryByTestId('button-carousel-prev');
    const buttonNext = screen.queryByTestId('button-carousel-next');

    expect(buttonPrev).not.toBeInTheDocument();
    expect(buttonNext).not.toBeInTheDocument();
  });

  it('Should navigate to the next and previous items when the buttons are clicked', () => {
    const { getAllByAltText, getByTestId } = render(
      <Carousel images={mockImages} />
    );

    const firstImage = getAllByAltText('image-0')[0];
    expect(firstImage).toBeInTheDocument();

    const nextButton = getByTestId('button-carousel-next');
    fireEvent.click(nextButton);

    const secondImage = getAllByAltText('image-1')[0];
    expect(secondImage).toBeInTheDocument();

    const prevButton = getByTestId('button-carousel-prev');
    fireEvent.click(prevButton);

    expect(firstImage).toBeInTheDocument();
  });
});
