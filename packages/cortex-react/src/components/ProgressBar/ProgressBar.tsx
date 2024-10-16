import React from 'react';
import { ProgressBarInfinite } from './ProgressBarInfinite';
import { LinearProgress } from './LinearProgress';

export interface ProgressBarProps {
  value: number;
  intent?: 'default' | 'success' | 'warning' | 'info' | 'error';
  type?: 'infinite' | 'default';
}

export const ProgressBar = ({
  value = 50,
  intent = 'default',
  type = 'default',
}: ProgressBarProps) => {
  return type === 'infinite' ? (
    <ProgressBarInfinite intentProgress={intent} />
  ) : (
    <LinearProgress value={value} intent={intent} />
  );
};
