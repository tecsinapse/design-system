import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import {
  FaArrowAltCircleRight,
  FaCheckCircle,
  FaExclamationTriangle,
  FaMoneyBillWave,
  FaTimesCircle,
  FaTruck,
} from 'react-icons/fa';
import { Stepper } from '../src';

export default {
  title: 'Cortex/Stepper',
  component: Stepper.Root,
  subcomponents: {
    Node: Stepper.Node,
  },
} as Meta<typeof Stepper.Root>;

export const Default: StoryObj<typeof Stepper.Root> = {
  args: { segmented: true },
  render: args => {
    const steps = [
      {
        label: 'Abertura',
        marked: true,
        selected: true,
        intent: 'success' as const,
        icon: <FaCheckCircle className="text-success-medium" />,
        onClick: () => console.log('Abertura clicada!'),
      },
      {
        label: 'Aprovação Adm. Vendas',
        marked: true,
        intent: 'error' as const,
        icon: <FaTimesCircle className="text-error-medium" />,
        onClick: () => console.log('Aprovação clicada!'),
        disabled: true,
      },
      {
        label: 'Faturamento',
        intent: 'warning' as const,
        icon: <FaExclamationTriangle />,
        onClick: () => console.log('Faturamento clicado!'),
      },
      {
        label: 'Liberado para entrega',
        intent: 'success' as const,
        icon: <FaTruck />,
        onClick: () => console.log('Liberado para entrega clicado!'),
      },
      {
        label: 'Recebimento comissão VD',
        intent: 'warning' as const,
        icon: <FaMoneyBillWave />,
        onClick: () => console.log('Recebimento comissão clicado!'),
      },
    ];

    return (
      <div className="h-[300px] w-[1000px] px-4 mx-auto">
        <Stepper.Root segmented={args.segmented} interactive>
          {steps.map((props, index) => (
            <Stepper.Node
              key={index}
              marked={props.marked}
              intent={props.intent}
              onClick={props.onClick}
              disabled={props.disabled}
              selected={props.selected}
            >
              <div className="flex items-center space-x-2">
                {props.icon}
                <span>{props.label}</span>
              </div>
            </Stepper.Node>
          ))}
        </Stepper.Root>
      </div>
    );
  },
};

export const Node: StoryObj<typeof Stepper.Node> = {
  args: {
    marked: false,
    intent: 'warning',
    disabled: false,
    selected: false,
    segmented: false,
  },
  render: args => (
    <div className="h-[300px] w-[1000px] px-4 mx-auto flex justify-center items-center">
      <Stepper.Node
        marked={args.marked}
        intent={args.intent}
        onClick={() => console.log('Click')}
        disabled={args.disabled}
        selected={args.selected}
        segmented={args.segmented}
      >
        <div className="flex items-center space-x-2">
          <FaArrowAltCircleRight />
          <span>Stepper Node</span>
        </div>
      </Stepper.Node>
    </div>
  ),
};
