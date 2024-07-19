import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Tooltip from '../components/Tooltip';

const TooltipButton = () => {
  return (
    <div className="relative group">
      <div className="bg-blue-500 text-white font-bold py-2 px-4 rounded cursor-pointer">
        Clique aqui
      </div>
    </div>
  );
};

describe('Tooltip', () => {
  it('Should show tooltip on hover', async () => {
    render(
      <Tooltip text="Tooltip Content" trigger="hover">
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
      <Tooltip text="Tooltip Content" trigger="click">
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
      <Tooltip text="Tooltip Content" trigger="click" placement="top">
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
      <Tooltip text="Tooltip Content" trigger="click">
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

  it('Should handle placement "top"', async () => {
    render(
      <Tooltip text="Top Tooltip Content" trigger="click" placement="top">
        <button data-testid="top-trigger">Top Trigger</button>
      </Tooltip>
    );

    const topTrigger = screen.getByText('Top Trigger');

    fireEvent.click(topTrigger);
    let topTooltip = await screen.findByText('Top Tooltip Content');
    expect(topTooltip).toBeInTheDocument();
  });

  it('Should handle placement "bottom"', async () => {
    render(
      <Tooltip text="Bottom Tooltip Content" trigger="click" placement="bottom">
        <button data-testid="bottom-trigger">Bottom Trigger</button>
      </Tooltip>
    );

    const bottomTrigger = screen.getByText('Bottom Trigger');

    fireEvent.click(bottomTrigger);
    let bottomTooltip = await screen.findByText('Bottom Tooltip Content');
    expect(bottomTooltip).toBeInTheDocument();
  });

  it('Should handle placement "left"', async () => {
    render(
      <Tooltip text="Left Tooltip Content" trigger="click" placement="left">
        <button data-testid="left-trigger">Left Trigger</button>
      </Tooltip>
    );

    const leftTrigger = screen.getByText('Left Trigger');

    fireEvent.click(leftTrigger);
    let leftTooltip = await screen.findByText('Left Tooltip Content');
    expect(leftTooltip).toBeInTheDocument();
  });

  it('Should handle placement "right"', async () => {
    render(
      <Tooltip text="Right Tooltip Content" trigger="click" placement="right">
        <button data-testid="right-trigger">Right Trigger</button>
      </Tooltip>
    );

    const rightTrigger = screen.getByText('Right Trigger');

    fireEvent.click(rightTrigger);
    let rightTooltip = await screen.findByText('Right Tooltip Content');
    expect(rightTooltip).toBeInTheDocument();
  });

  it('Should show tooltip with TooltipButton on hover', async () => {
    render(
      <Tooltip text="Tooltip Content" trigger="hover">
        <TooltipButton />
      </Tooltip>
    );

    const trigger = screen.getByText('Clique aqui');

    fireEvent.mouseEnter(trigger);
    const tooltip = await screen.findByText('Tooltip Content');
    expect(tooltip).toBeInTheDocument();

    fireEvent.mouseLeave(trigger);
    expect(screen.queryByText('Tooltip Content')).not.toBeInTheDocument();
  });

  it('Should show tooltip with TooltipButton on click', async () => {
    render(
      <Tooltip text="Tooltip Content" trigger="click">
        <TooltipButton />
      </Tooltip>
    );

    const trigger = screen.getByText('Clique aqui');

    fireEvent.click(trigger);
    const tooltip = await screen.findByText('Tooltip Content');
    expect(tooltip).toBeInTheDocument();

    fireEvent.click(trigger);
    expect(screen.queryByText('Tooltip Content')).not.toBeInTheDocument();
  });
});
