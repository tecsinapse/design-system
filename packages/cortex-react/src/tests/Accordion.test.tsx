import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Accordion } from '../components';

describe('Accordion', () => {
  beforeAll(() => {
    global.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  });

  it('Should render a closed accordion', async () => {
    render(
      <Accordion.Root label="Default">
        <span data-testid="content">Example content</span>
      </Accordion.Root>
    );

    const element = screen.getByTestId('accordion-container');

    expect(element).toHaveClass('w-0');
  });

  it('Should render a open accordion', async () => {
    render(
      <Accordion.Root label="Default" defaultOpen>
        <span data-testid="content">Example content</span>
      </Accordion.Root>
    );

    const element = screen.getByTestId('accordion-container');

    expect(element).not.toHaveClass('w-0');
  });

  it('Should render a open accordion vertical', async () => {
    render(
      <Accordion.Root label="Default" defaultOpen direction="vertical">
        <span data-testid="content">Example content</span>
      </Accordion.Root>
    );

    const element = screen.getByTestId('accordion-container');

    expect(element).not.toHaveClass('w-0');
  });

  it('Should render a error when label is not provided on non floating accordion', async () => {
    try {
      render(
        <Accordion.Root>
          <span data-testid="content">Example content</span>
        </Accordion.Root>
      );
    } catch (e) {
      expect((e as Error).message).toBe(
        'A label must be specified if the trigger is not floating variant'
      );
    }
  });

  it('Should not render label on floating accordion', async () => {
    render(
      <Accordion.Root label="Floating" floating>
        <span data-testid="content">Example content</span>
      </Accordion.Root>
    );
    const element = screen.queryByText('Floating');
    expect(element).not.toBeInTheDocument();
  });

  it('Should open and close', async () => {
    render(
      <Accordion.Root label="Default">
        <span data-testid="content">Example content</span>
      </Accordion.Root>
    );
    const label = screen.getByText('Default');
    const container = screen.getByTestId('accordion-container');

    expect(container).toHaveClass('w-0');

    fireEvent.click(label);

    expect(container).not.toHaveClass('w-0');

    fireEvent.click(label);

    expect(container).toHaveClass('w-0');
  });

  it('Should open', async () => {
    render(
      <Accordion.Root label="Default">
        <span data-testid="content">Example content</span>
      </Accordion.Root>
    );
    const label = screen.getByText('Default');
    const container = screen.getByTestId('accordion-container');

    expect(container).toHaveClass('w-0');

    fireEvent.click(label);

    expect(container).not.toHaveClass('w-0');
  });

  it('Should close', async () => {
    render(
      <Accordion.Root label="Default" defaultOpen>
        <span data-testid="content">Example content</span>
      </Accordion.Root>
    );
    const label = screen.getByText('Default');
    const container = screen.getByTestId('accordion-container');

    expect(container).not.toHaveClass('w-0');

    fireEvent.click(label);

    expect(container).toHaveClass('w-0');
  });
});
