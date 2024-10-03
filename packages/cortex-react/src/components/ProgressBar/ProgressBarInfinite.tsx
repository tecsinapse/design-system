import React from 'react';
import { progressBarInfiniteVariants } from '../../styles';

interface ProgressBarInfiniteProps {
  intentProgress?:
    | 'default'
    | 'success'
    | 'warning'
    | 'info'
    | 'error'
    | 'uploading';
}
const { container, bar, progress } = progressBarInfiniteVariants();

export const ProgressBarInfinite = ({
  intentProgress,
}: ProgressBarInfiniteProps) => {
  return (
    <div className={container()}>
      <div className={bar()}>
        <div className={progress({ status: intentProgress })} />
      </div>
    </div>
  );
};
