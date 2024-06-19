import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Avatar } from '../components/Avatar';

test('renders Avatar without src image', () => {
  render(<Avatar name="Usuario Teste" />);

  const textElement = screen.getByTestId('avatar-p');
  const imageElement = screen.queryByTestId('avatar-img');

  expect(textElement).toBeInTheDocument();
  expect(imageElement).toBeNull();
});

test('renders Avatar with existing src image', () => {
  render(
    <Avatar
      name="Usuario Teste"
      src={
        'https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png'
      }
    />
  );

  const textElement = screen.queryByTestId('avatar-p');
  const imageElement = screen.getByTestId('avatar-img');

  expect(imageElement).toBeInTheDocument();
  expect(textElement).toBeNull();
});

test('renders Avatar with error on src image', async () => {
  render(<Avatar name="Usuario Teste" src={'https://notfoundpng.com.br'} />);

  let imageElement: HTMLElement | null = screen.getByTestId('avatar-img');

  fireEvent.error(imageElement);

  imageElement = screen.queryByTestId('avatar-img');
  const textElement = screen.getByTestId('avatar-p');

  expect(textElement).toBeInTheDocument();
  expect(imageElement).toBeNull();
});
