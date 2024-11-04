import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Stepper } from '../src';
import {
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
  FaTruck,
  FaMoneyBillWave,
} from 'react-icons/fa';

export default {
  title: 'Cortex/Stepper',
  component: Stepper.Root,
} as Meta<typeof Stepper.Root>;

const steps = [
  {
    label: 'Abertura',
    marked: true,
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

export const Default: StoryObj<typeof Stepper.Root> = {
  args: {},
  render: () => (
    <div className="h-[300px] w-[1000px] px-4 mx-auto">
      <Stepper.Root segmented>
        {steps.map(
          ({ label, marked, intent, icon, onClick, disabled }, index) => (
            <Stepper.Node
              key={index}
              marked={marked}
              intent={intent}
              onClick={onClick}
              disabled={disabled}
            >
              <div className="flex items-center space-x-2">
                {icon}
                <span>{label}</span>
              </div>
            </Stepper.Node>
          )
        )}
      </Stepper.Root>
    </div>
  ),
};
