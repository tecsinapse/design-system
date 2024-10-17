import React from 'react';
import { ProgressVariants } from '../../styles';

interface ProgressProps {
  value: number;
  intent?: 'default' | 'success' | 'warning' | 'info' | 'error';
  infinite: boolean;
}
const { container, bar, progress } = ProgressVariants();

export const Progress = ({
  value,
  intent = 'default',
  infinite,
}: ProgressProps) => {
  return (
    <div className={container()} data-testid="linear-progress">
      <div className={bar()}>
        <div
          style={{
            width: !infinite ? `${value}%` : undefined,
            transition: !infinite ? 'width 0.5s ease' : undefined,
          }}
          data-testid="progress-filled"
          className={progress({ intent, infinite })}
        />
      </div>
    </div>
  );
};
