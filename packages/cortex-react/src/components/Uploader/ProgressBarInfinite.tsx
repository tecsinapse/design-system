import React from 'react';
import { progressBarVariants } from '../../styles';

interface ProgressBarProps {
  isLoading: 'loading' | 'success' | 'error';
}
const { container, bar, progress } = progressBarVariants();

export const ProgressBarInfinite = ({ isLoading }: ProgressBarProps) => {
  return (
    <div className={container()}>
      <div className={bar()}>
        <div className={progress({ isLoading })} />
      </div>
    </div>
  );
};
