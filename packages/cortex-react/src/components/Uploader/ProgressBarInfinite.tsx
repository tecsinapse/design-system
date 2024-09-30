import React from 'react';
import { progressBarVariants } from '../../styles';

interface ProgressBarProps {
  status: 'uploading' | 'success' | 'error';
}
const { container, bar, progress } = progressBarVariants();

export const ProgressBarInfinite = ({ status }: ProgressBarProps) => {
  return (
    <div className={container()}>
      <div className={bar()}>
        <div className={progress({ status })} />
      </div>
    </div>
  );
};
