import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React, { createRef } from 'react';
import { Tooltip } from '../components';
import { PortalProvider } from '../provider';

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
  it('Should show tooltip on hover with no delay', async () => {
    render(
      <Tooltip text="Tooltip Content" trigger="hover" delay={0}>
        <button data-testid="trigger">Hover me</button>
      </Tooltip>
    );

    const trigger = screen.getByTestId('trigger');

    await userEvent.hover(trigger);

    const tooltip = await screen.findByText('Tooltip Content');
    expect(tooltip).toBeInTheDocument();

    await userEvent.unhover(trigger);

    // We should await same action again
    expect(screen.queryByText('Tooltip Content')).not.toBeInTheDocument();
  });

  it('Should show tooltip on hover with delay', async () => {
    render(
      <Tooltip text="Tooltip Content" trigger="hover">
        <button data-testid="trigger">Hover me</button>
      </Tooltip>
    );

    const trigger = screen.getByTestId('trigger');

    await userEvent.hover(trigger);

    const tooltip = await screen.findByText('Tooltip Content');

    expect(tooltip).toBeInTheDocument();

    await userEvent.unhover(trigger);

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
    const tooltip = await screen.findByText('Tooltip Content');
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
    const topTooltip = await screen.findByText('Top Tooltip Content');
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
    const bottomTooltip = await screen.findByText('Bottom Tooltip Content');
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
    const leftTooltip = await screen.findByText('Left Tooltip Content');
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
    const rightTooltip = await screen.findByText('Right Tooltip Content');
    expect(rightTooltip).toBeInTheDocument();
  });

  it('Should show tooltip with TooltipButton on hover no delay', async () => {
    render(
      <Tooltip text="Tooltip Content" trigger="hover" delay={0}>
        <TooltipButton />
      </Tooltip>
    );

    const trigger = screen.getByText('Clique aqui');

    await userEvent.hover(trigger);
    const tooltip = await screen.findByText('Tooltip Content');
    expect(tooltip).toBeInTheDocument();

    await userEvent.unhover(trigger);

    expect(screen.queryByText('Tooltip Content')).not.toBeInTheDocument();
  });

  it('Should show tooltip with TooltipButton on hover delay', async () => {
    render(
      <Tooltip text="Tooltip Content" trigger="hover">
        <TooltipButton />
      </Tooltip>
    );

    const trigger = screen.getByText('Clique aqui');

    await userEvent.hover(trigger);
    const tooltip = await screen.findByText('Tooltip Content');
    expect(tooltip).toBeInTheDocument();

    await userEvent.unhover(trigger);

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

  describe('root prop / PortalProvider integration', () => {
    const getTooltipContainer = (): HTMLElement | null => {
      const tooltip = screen.queryByText('RootProp Tooltip');
      return tooltip?.closest('[data-floating-ui-portal]')?.parentElement ?? null;
    };

    it('Should portal into the root prop when provided', async () => {
      const container = document.createElement('div');
      document.body.appendChild(container);

      render(
        <Tooltip text="RootProp Tooltip" trigger="click" root={container}>
          <button>trigger</button>
        </Tooltip>
      );
      fireEvent.click(screen.getByText('trigger'));

      await screen.findByText('RootProp Tooltip');
      expect(getTooltipContainer()).toBe(container);

      document.body.removeChild(container);
    });

    it('Should fall back to the closest PortalProvider root when root is omitted', async () => {
      const container = document.createElement('div');
      document.body.appendChild(container);

      render(
        <PortalProvider root={container}>
          <Tooltip text="RootProp Tooltip" trigger="click">
            <button>trigger</button>
          </Tooltip>
        </PortalProvider>
      );
      fireEvent.click(screen.getByText('trigger'));

      await screen.findByText('RootProp Tooltip');
      expect(getTooltipContainer()).toBe(container);

      document.body.removeChild(container);
    });

    it('Should escape the PortalProvider when root={null}', async () => {
      const providerContainer = document.createElement('div');
      document.body.appendChild(providerContainer);

      render(
        <PortalProvider root={providerContainer}>
          <Tooltip text="RootProp Tooltip" trigger="click" root={null}>
            <button>trigger</button>
          </Tooltip>
        </PortalProvider>
      );
      fireEvent.click(screen.getByText('trigger'));

      await screen.findByText('RootProp Tooltip');
      expect(getTooltipContainer()).toBe(document.body);
      expect(getTooltipContainer()).not.toBe(providerContainer);

      document.body.removeChild(providerContainer);
    });

    it('Should accept a RefObject in the root prop', async () => {
      const container = document.createElement('div');
      document.body.appendChild(container);
      const ref = createRef<HTMLDivElement>();
      ref.current = container;

      render(
        <Tooltip text="RootProp Tooltip" trigger="click" root={ref}>
          <button>trigger</button>
        </Tooltip>
      );
      fireEvent.click(screen.getByText('trigger'));

      await screen.findByText('RootProp Tooltip');
      expect(getTooltipContainer()).toBe(container);

      document.body.removeChild(container);
    });
  });
});
