import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Popover } from '../components';

describe('Popover', () => {
  it('Should show content on hover', async () => {
    render(
      <Popover.Root>
        <Popover.Trigger trigger="hover">
          <button data-testid="trigger">Trigger</button>
        </Popover.Trigger>
        <Popover.Content>
          <div data-testid="popover-content">Popover Content</div>
        </Popover.Content>
      </Popover.Root>
    );

    const trigger = screen.getByTestId('trigger');

    fireEvent.mouseEnter(trigger);
    const popover = await screen.findByTestId('popover-content');
    expect(popover).toBeInTheDocument();

    fireEvent.mouseLeave(trigger);
    expect(screen.queryByTestId('popover-content')).not.toBeInTheDocument();
  });

  it('Should show content on click', async () => {
    render(
      <Popover.Root>
        <Popover.Trigger trigger="click">
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
      <Popover.Root>
        <Popover.Trigger trigger="click">
          <button data-testid="trigger">Trigger</button>
        </Popover.Trigger>
        <Popover.Content placement="top">
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
      <Popover.Root>
        <Popover.Trigger trigger="click">
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
      <Popover.Root>
        <Popover.Trigger trigger="click">
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

  it('Should handle different placement values', async () => {
    render(
      <div>
        <Popover.Root>
          <Popover.Trigger trigger="click">
            <button data-testid="top-trigger">Top Trigger</button>
          </Popover.Trigger>
          <Popover.Content placement="top">
            <div data-testid="top-popover-content">Top Popover Content</div>
          </Popover.Content>
        </Popover.Root>
        <Popover.Root>
          <Popover.Trigger trigger="click">
            <button data-testid="bottom-trigger">Bottom Trigger</button>
          </Popover.Trigger>
          <Popover.Content placement="bottom">
            <div data-testid="bottom-popover-content">
              Bottom Popover Content
            </div>
          </Popover.Content>
        </Popover.Root>
        <Popover.Root>
          <Popover.Trigger trigger="click">
            <button data-testid="left-trigger">Left Trigger</button>
          </Popover.Trigger>
          <Popover.Content placement="left">
            <div data-testid="left-popover-content">Left Popover Content</div>
          </Popover.Content>
        </Popover.Root>
        <Popover.Root>
          <Popover.Trigger trigger="click">
            <button data-testid="right-trigger">Right Trigger</button>
          </Popover.Trigger>
          <Popover.Content placement="right">
            <div data-testid="right-popover-content">Right Popover Content</div>
          </Popover.Content>
        </Popover.Root>
      </div>
    );

    const topTrigger = screen.getByTestId('top-trigger');
    const bottomTrigger = screen.getByTestId('bottom-trigger');
    const leftTrigger = screen.getByTestId('left-trigger');
    const rightTrigger = screen.getByTestId('right-trigger');

    fireEvent.click(topTrigger);
    const topPopover = await screen.findByTestId('top-popover-content');
    expect(topPopover).toBeInTheDocument();

    fireEvent.click(bottomTrigger);
    const bottomPopover = await screen.findByTestId('bottom-popover-content');
    expect(bottomPopover).toBeInTheDocument();

    fireEvent.click(leftTrigger);
    const leftPopover = await screen.findByTestId('left-popover-content');
    expect(leftPopover).toBeInTheDocument();

    fireEvent.click(rightTrigger);
    const rightPopover = await screen.findByTestId('right-popover-content');
    expect(rightPopover).toBeInTheDocument();
  });
});
