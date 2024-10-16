import React from 'react';
import { progressBarFilled } from '../../styles';

interface LinearProgressProps {
  value: number;
  intent?: 'default' | 'success' | 'warning' | 'info' | 'error';
}

export const LinearProgress = ({
  value,
  intent = 'default',
}: LinearProgressProps) => {
  return (
    <div
      className="h-[0.5rem] bg-secondary-light rounded-pill overflow-hidden"
      data-testid="linear-progress"
    >
      <div
        style={{
          width: `${value}%`,
          transition: 'width 0.5s ease',
        }}
        data-testid="progress-filled"
        className={progressBarFilled({ intent })}
      />
    </div>
  );
};
