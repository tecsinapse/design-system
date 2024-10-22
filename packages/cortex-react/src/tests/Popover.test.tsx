import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Popover } from '../components';

const PopoverButton = () => {
  return (
    <div className="relative group">
      <div className="bg-blue-500 text-white font-bold py-2 px-4 rounded cursor-pointer">
        Clique aqui
      </div>
    </div>
  );
};

describe('Popover', () => {
  it('Should show content on hover', async () => {
    render(
      <Popover.Root trigger="hover" placement="bottom">
        <Popover.Trigger>
          <button data-testid="trigger">Trigger</button>
        </Popover.Trigger>
        <Popover.Content>
          <div data-testid="popover-content">Popover Content</div>
        </Popover.Content>
      </Popover.Root>
    );

    const trigger = screen.getByTestId('trigger');

    userEvent.hover(trigger);
    const popover = await screen.findByTestId('popover-content');
    expect(popover).toBeInTheDocument();

    userEvent.unhover(trigger);
    expect(
      await screen.findByTestId('popover-content')
    ).not.toBeInTheDocument();
  });

  it('Should show content on click', async () => {
    render(
      <Popover.Root trigger="click" placement="bottom">
        <Popover.Trigger>
          <button data-testid="trigger">Trigger</button>
        </Popover.Trigger>
        <Popover.Content>
          <div data-testid="popover-content">Popover Content</div>
        </Popover.Content>
      </Popover.Root>
    );

    const trigger = screen.getByTestId('trigger');

    fireEvent.click(trigger);
    const popover = await screen.findByTestId('popover-content');
    expect(popover).toBeInTheDocument();

    fireEvent.click(trigger);
    expect(screen.queryByTestId('popover-content')).not.toBeInTheDocument();
  });

  it('Should respect placement prop', async () => {
    render(
      <Popover.Root trigger="click" placement="top">
        <Popover.Trigger>
          <button data-testid="trigger">Trigger</button>
        </Popover.Trigger>
        <Popover.Content>
          <div data-testid="popover-content">Popover Content</div>
        </Popover.Content>
      </Popover.Root>
    );

    const trigger = screen.getByTestId('trigger');

    fireEvent.click(trigger);
    const popover = await screen.findByTestId('popover-content');
    expect(popover).toBeInTheDocument();
  });

  it('Should render children correctly', () => {
    render(
      <Popover.Root trigger="click" placement="bottom">
        <Popover.Trigger>
          <button data-testid="trigger">Popover Trigger</button>
        </Popover.Trigger>
        <Popover.Content>
          <div data-testid="popover-content">Popover Content</div>
        </Popover.Content>
      </Popover.Root>
    );

    const trigger = screen.getByTestId('trigger');
    expect(trigger).toHaveTextContent('Popover Trigger');
  });

  it('Should handle closing when clicking trigger again', async () => {
    render(
      <Popover.Root trigger="click" placement="bottom">
        <Popover.Trigger>
          <button data-testid="trigger">Trigger</button>
        </Popover.Trigger>
        <Popover.Content>
          <div data-testid="popover-content">Popover Content</div>
        </Popover.Content>
      </Popover.Root>
    );

    const trigger = screen.getByTestId('trigger');

    fireEvent.click(trigger);
    const popover = await screen.findByTestId('popover-content');
    expect(popover).toBeInTheDocument();

    fireEvent.click(trigger);
    expect(screen.queryByTestId('popover-content')).not.toBeInTheDocument();
  });

  it('Should handle placement "top"', async () => {
    render(
      <Popover.Root trigger="click" placement="top">
        <Popover.Trigger>
          <button data-testid="top-trigger">Top Trigger</button>
        </Popover.Trigger>
        <Popover.Content>
          <div data-testid="top-popover-content">Top Popover Content</div>
        </Popover.Content>
      </Popover.Root>
    );

    const topTrigger = screen.getByTestId('top-trigger');
    fireEvent.click(topTrigger);
    const topPopover = await screen.findByTestId('top-popover-content');
    expect(topPopover).toBeInTheDocument();
  });

  it('Should handle placement "bottom"', async () => {
    render(
      <Popover.Root trigger="click" placement="bottom">
        <Popover.Trigger>
          <button data-testid="bottom-trigger">Bottom Trigger</button>
        </Popover.Trigger>
        <Popover.Content>
          <div data-testid="bottom-popover-content">Bottom Popover Content</div>
        </Popover.Content>
      </Popover.Root>
    );

    const bottomTrigger = screen.getByTestId('bottom-trigger');
    fireEvent.click(bottomTrigger);
    const bottomPopover = await screen.findByTestId('bottom-popover-content');
    expect(bottomPopover).toBeInTheDocument();
  });

  it('Should handle placement "left"', async () => {
    render(
      <Popover.Root trigger="click" placement="left">
        <Popover.Trigger>
          <button data-testid="left-trigger">Left Trigger</button>
        </Popover.Trigger>
        <Popover.Content>
          <div data-testid="left-popover-content">Left Popover Content</div>
        </Popover.Content>
      </Popover.Root>
    );

    const leftTrigger = screen.getByTestId('left-trigger');
    fireEvent.click(leftTrigger);
    const leftPopover = await screen.findByTestId('left-popover-content');
    expect(leftPopover).toBeInTheDocument();
  });

  it('Should handle placement "right"', async () => {
    render(
      <Popover.Root trigger="click" placement="right">
        <Popover.Trigger>
          <button data-testid="right-trigger">Right Trigger</button>
        </Popover.Trigger>
        <Popover.Content>
          <div data-testid="right-popover-content">Right Popover Content</div>
        </Popover.Content>
      </Popover.Root>
    );

    const rightTrigger = screen.getByTestId('right-trigger');
    fireEvent.click(rightTrigger);
    const rightPopover = await screen.findByTestId('right-popover-content');
    expect(rightPopover).toBeInTheDocument();
  });

  it('Should show popover with PopoverButton on hover', async () => {
    render(
      <Popover.Root trigger="hover" placement="bottom">
        <Popover.Trigger>
          <PopoverButton />
        </Popover.Trigger>
        <Popover.Content>
          <div data-testid="popover-content">Popover Content</div>
        </Popover.Content>
      </Popover.Root>
    );

    const trigger = screen.getByText('Clique aqui');

    userEvent.hover(trigger);
    const popover = await screen.findByTestId('popover-content');
    expect(popover).toBeInTheDocument();

    userEvent.unhover(trigger);
    expect(
      await screen.findByTestId('popover-content')
    ).not.toBeInTheDocument();
  });

  it('Should show popover with PopoverButton on click', async () => {
    render(
      <Popover.Root trigger="click" placement="bottom">
        <Popover.Trigger>
          <PopoverButton />
        </Popover.Trigger>
        <Popover.Content>
          <div data-testid="popover-content">Popover Content</div>
        </Popover.Content>
      </Popover.Root>
    );

    const trigger = screen.getByText('Clique aqui');

    fireEvent.click(trigger);
    const popover = await screen.findByTestId('popover-content');
    expect(popover).toBeInTheDocument();

    fireEvent.click(trigger);
    expect(screen.queryByTestId('popover-content')).not.toBeInTheDocument();
  });
});
