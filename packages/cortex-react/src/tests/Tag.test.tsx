import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Tag } from '../components';

describe('Tag', () => {
  it('renders root component', () => {
    render(<Tag.Root label="tag label" />);

    const tagElement = screen.getByText('tag label');

    expect(tagElement).toBeInTheDocument();
  });

  it('renders dismissable root component', () => {
    render(<Tag.Root label="tag label" onDismiss={() => {}} />);

    const dismiss = screen.getByTestId('tag-close-button');

    expect(dismiss).toBeInTheDocument();
  });

  it('renders compound component', () => {
    render(
      <Tag.Face>
        <Tag.Label>tag label</Tag.Label>
      </Tag.Face>
    );

    const tagElement = screen.getByText('tag label');

    expect(tagElement).toBeInTheDocument();
  });

  it('renders compound component w/ dismiss', () => {
    render(
      <Tag.Face>
        <Tag.Label>tag label</Tag.Label>
        <Tag.Close onClick={() => {}} />
      </Tag.Face>
    );

    const dismiss = screen.getByTestId('tag-close-button');

    expect(dismiss).toBeInTheDocument();
  });
});
