import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Popover from '../components/Popover';

describe('Popover', () => {
  it('Should show content on hover', async () => {
    render(
      <Popover
        content={<div data-testid="popover-content">Popover Content</div>}
        trigger="hover"
      >
        <button data-testid="trigger">Trigger</button>
      </Popover>
    );

    const trigger = screen.getByTestId('trigger');

    fireEvent.mouseEnter(trigger);
    const popover = await screen.getByTestId('popover-content');

    expect(popover).toBeInTheDocument();

    fireEvent.mouseLeave(trigger);
    expect(screen.queryByTestId('popover-content')).not.toBeInTheDocument();
  });

  it('Should show content on click', async () => {
    render(
      <Popover
        content={<div data-testid="popover-content">Popover Content</div>}
        trigger="click"
      >
        <button data-testid="trigger">Trigger</button>
      </Popover>
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
      <Popover
        content={<div data-testid="popover-content">Popover Content</div>}
        trigger="click"
        placement="top"
      >
        <button data-testid="trigger">Trigger</button>
      </Popover>
    );

    const trigger = screen.getByTestId('trigger');

    fireEvent.click(trigger);
    const popover = await screen.findByTestId('popover-content');
    expect(popover).toBeInTheDocument();
  });

  it('Should render children correctly', () => {
    render(
      <Popover
        content={<div data-testid="popover-content">Popover Content</div>}
        trigger="click"
      >
        <button data-testid="trigger">Popover Trigger</button>
      </Popover>
    );

    const trigger = screen.getByTestId('trigger');
    expect(trigger).toHaveTextContent('Popover Trigger');
  });

  it('Should handle closing when clicking trigger again', async () => {
    render(
      <Popover
        content={<div data-testid="popover-content">Popover Content</div>}
        trigger="click"
      >
        <button data-testid="trigger">Trigger</button>
      </Popover>
    );

    const trigger = screen.getByTestId('trigger');

    fireEvent.click(trigger);
    let popover = await screen.findByTestId('popover-content');
    expect(popover).toBeInTheDocument();

    fireEvent.click(trigger);
    expect(screen.queryByTestId('popover-content')).not.toBeInTheDocument();
  });

  it('Should handle different placement values', async () => {
    render(
      <div>
        <Popover
          content={<div data-testid="popover-content">Top Popover Content</div>}
          trigger="click"
          placement="top"
        >
          <button data-testid="trigger">Top Trigger</button>
        </Popover>
        <Popover
          content={
            <div data-testid="popover-content">Bottom Popover Content</div>
          }
          trigger="click"
          placement="bottom"
        >
          <button data-testid="trigger">Bottom Trigger</button>
        </Popover>
        <Popover
          content={
            <div data-testid="popover-content">Left Popover Content</div>
          }
          trigger="click"
          placement="left"
        >
          <button data-testid="trigger">Left Trigger</button>
        </Popover>
        <Popover
          content={
            <div data-testid="popover-content">Right Popover Content</div>
          }
          trigger="click"
          placement="right"
        >
          <button data-testid="trigger">Right Trigger</button>
        </Popover>
      </div>
    );

    const topTrigger = screen.getByText('Top Trigger');
    const bottomTrigger = screen.getByText('Bottom Trigger');
    const leftTrigger = screen.getByText('Left Trigger');
    const rightTrigger = screen.getByText('Right Trigger');

    fireEvent.click(topTrigger);
    let topPopover = await screen.findByText('Top Popover Content');
    expect(topPopover).toBeInTheDocument();

    fireEvent.click(bottomTrigger);
    let bottomPopover = await screen.findByText('Bottom Popover Content');
    expect(bottomPopover).toBeInTheDocument();

    fireEvent.click(leftTrigger);
    let leftPopover = await screen.findByText('Left Popover Content');
    expect(leftPopover).toBeInTheDocument();

    fireEvent.click(rightTrigger);
    let rightPopover = await screen.findByText('Right Popover Content');
    expect(rightPopover).toBeInTheDocument();
  });
});
