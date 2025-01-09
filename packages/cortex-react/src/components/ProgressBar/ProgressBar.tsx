import React from 'react';
import { Progress } from './Progress';

export interface ProgressBarProps {
  value?: number;
  intent?: 'default' | 'success' | 'warning' | 'info' | 'error';
  infinite?: boolean;
}

export const ProgressBar = ({
  value = 100,
  intent = 'default',
  infinite = false,
}: ProgressBarProps) => {
  return <Progress value={value} intent={intent} infinite={infinite} />;
};
