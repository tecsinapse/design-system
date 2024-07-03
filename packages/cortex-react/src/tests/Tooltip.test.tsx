import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Tooltip from '../components/Tooltip';

describe('Tooltip', () => {
  it('Should show tooltip on hover', async () => {
    render(
      <Tooltip tooltipText="Tooltip Content" trigger="hover">
        <button data-testid="trigger">Hover me</button>
      </Tooltip>
    );

    const trigger = screen.getByTestId('trigger');

    fireEvent.mouseEnter(trigger);
    const tooltip = await screen.findByText('Tooltip Content');

    expect(tooltip).toBeInTheDocument();

    fireEvent.mouseLeave(trigger);
    expect(screen.queryByText('Tooltip Content')).not.toBeInTheDocument();
  });

  it('Should show tooltip on click', async () => {
    render(
      <Tooltip tooltipText="Tooltip Content" trigger="click">
        <button data-testid="trigger">Click me</button>
      </Tooltip>
    );

    const trigger = screen.getByTestId('trigger');

    fireEvent.click(trigger);
    const tooltip = await screen.findByText('Tooltip Content');
    expect(tooltip).toBeInTheDocument();

    fireEvent.click(trigger);
    expect(screen.queryByText('Tooltip Content')).not.toBeInTheDocument();
  });

  it('Should respect placement prop', async () => {
    render(
      <Tooltip tooltipText="Tooltip Content" trigger="click" placement="top">
        <button data-testid="trigger">Click me</button>
      </Tooltip>
    );

    const trigger = screen.getByTestId('trigger');

    fireEvent.click(trigger);
    const tooltip = await screen.findByText('Tooltip Content');
    expect(tooltip).toBeInTheDocument();
  });

  it('Should handle closing when clicking trigger again', async () => {
    render(
      <Tooltip tooltipText="Tooltip Content" trigger="click">
        <button data-testid="trigger">Click me</button>
      </Tooltip>
    );

    const trigger = screen.getByTestId('trigger');

    fireEvent.click(trigger);
    let tooltip = await screen.findByText('Tooltip Content');
    expect(tooltip).toBeInTheDocument();

    fireEvent.click(trigger);
    expect(screen.queryByText('Tooltip Content')).not.toBeInTheDocument();
  });

  it('Should handle different placement values', async () => {
    render(
      <div>
        <Tooltip
          tooltipText="Top Tooltip Content"
          trigger="click"
          placement="top"
        >
          <button data-testid="top-trigger">Top Trigger</button>
        </Tooltip>
        <Tooltip
          tooltipText="Bottom Tooltip Content"
          trigger="click"
          placement="bottom"
        >
          <button data-testid="bottom-trigger">Bottom Trigger</button>
        </Tooltip>
        <Tooltip
          tooltipText="Left Tooltip Content"
          trigger="click"
          placement="left"
        >
          <button data-testid="left-trigger">Left Trigger</button>
        </Tooltip>
        <Tooltip
          tooltipText="Right Tooltip Content"
          trigger="click"
          placement="right"
        >
          <button data-testid="right-trigger">Right Trigger</button>
        </Tooltip>
      </div>
    );

    const topTrigger = screen.getByText('Top Trigger');
    const bottomTrigger = screen.getByText('Bottom Trigger');
    const leftTrigger = screen.getByText('Left Trigger');
    const rightTrigger = screen.getByText('Right Trigger');

    fireEvent.click(topTrigger);
    let topTooltip = await screen.findByText('Top Tooltip Content');
    expect(topTooltip).toBeInTheDocument();

    fireEvent.click(bottomTrigger);
    let bottomTooltip = await screen.findByText('Bottom Tooltip Content');
    expect(bottomTooltip).toBeInTheDocument();

    fireEvent.click(leftTrigger);
    let leftTooltip = await screen.findByText('Left Tooltip Content');
    expect(leftTooltip).toBeInTheDocument();

    fireEvent.click(rightTrigger);
    let rightTooltip = await screen.findByText('Right Tooltip Content');
    expect(rightTooltip).toBeInTheDocument();
  });
});
