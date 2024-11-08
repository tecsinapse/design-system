import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Stepper } from '../components';

describe('Stepper Component', () => {
  const steps = [
    {
      label: 'Abertura',
      marked: true,
      intent: 'success' as const,
      onClick: jest.fn(),
    },
    {
      label: 'Aprovação Adm. Vendas',
      marked: true,
      intent: 'error' as const,
      onClick: jest.fn(),
      disabled: true,
    },
    { label: 'Faturamento', intent: 'warning' as const, onClick: jest.fn() },
    {
      label: 'Liberado para entrega',
      intent: 'success' as const,
      onClick: jest.fn(),
    },
    {
      label: 'Recebimento comissão VD',
      intent: 'warning' as const,
      onClick: jest.fn(),
    },
  ];

  test('renders all steps correctly', () => {
    render(
      <Stepper.Root>
        {steps.map((step, index) => (
          <Stepper.Node
            key={index}
            marked={step.marked}
            intent={step.intent}
            onClick={step.onClick}
            disabled={step.disabled}
          >
            {step.label}
          </Stepper.Node>
        ))}
      </Stepper.Root>
    );

    steps.forEach(step => {
      expect(screen.getByText(step.label)).toBeInTheDocument();
    });
  });

  test('calls onClick when step is clicked', () => {
    render(
      <Stepper.Root>
        {steps.map((step, index) => (
          <Stepper.Node
            key={index}
            marked={step.marked}
            intent={step.intent}
            onClick={step.onClick}
            disabled={step.disabled}
          >
            {step.label}
          </Stepper.Node>
        ))}
      </Stepper.Root>
    );

    fireEvent.click(screen.getByText('Abertura'));
    expect(steps[0].onClick).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByText('Faturamento'));
    expect(steps[2].onClick).toHaveBeenCalledTimes(1);
  });

  test('does not call onClick for disabled steps', () => {
    render(
      <Stepper.Root>
        {steps.map((step, index) => (
          <Stepper.Node
            key={index}
            marked={step.marked}
            intent={step.intent}
            onClick={step.onClick}
            disabled={step.disabled}
          >
            {step.label}
          </Stepper.Node>
        ))}
      </Stepper.Root>
    );

    fireEvent.click(screen.getByText('Aprovação Adm. Vendas'));
    expect(steps[1].onClick).toHaveBeenCalledTimes(0);
  });

  test('handles step selection state', () => {
    const { rerender } = render(
      <Stepper.Root>
        {steps.map((step, index) => (
          <Stepper.Node
            key={index}
            marked={step.marked}
            intent={step.intent}
            onClick={step.onClick}
            disabled={step.disabled}
          >
            {step.label}
          </Stepper.Node>
        ))}
      </Stepper.Root>
    );

    fireEvent.click(screen.getByText('Abertura'));
    rerender(
      <Stepper.Root>
        {steps.map((step, index) => (
          <Stepper.Node
            key={index}
            marked={step.marked}
            intent={step.intent}
            onClick={step.onClick}
            disabled={step.disabled}
            selected={index === 0}
          >
            {step.label}
          </Stepper.Node>
        ))}
      </Stepper.Root>
    );

    expect(screen.getByText('Abertura')).toHaveClass('text-primary-medium');
  });
});
