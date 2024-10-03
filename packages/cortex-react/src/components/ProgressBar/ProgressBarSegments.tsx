import React, { useCallback } from 'react';
import { progressBarFilled } from '../../styles';

interface ProgressBarSegmentsProps {
  segments: number;
  totalProgress: number;
  intentProgress?:
    | 'default'
    | 'success'
    | 'warning'
    | 'info'
    | 'error'
    | 'uploading';
  showAnimation: boolean;
}

export const ProgressBarSegments = ({
  segments,
  totalProgress,
  intentProgress,
  showAnimation,
}: ProgressBarSegmentsProps) => {
  const lengthSeg = 100 / segments;
  const items = [...Array(segments).keys()];

  const progressStyle = useCallback(
    (width: number, index: number) => {
      return {
        width: `${width}%`,
        transitionDelay: `${showAnimation ? `${index * 1000}ms` : `0ms`}`,
      };
    },
    [showAnimation]
  );

  return (
    <div className="flex gap-x-nano flex-row" data-testid="progress-bar">
      {items.map((_, index) => {
        const max = lengthSeg * (index + 1);
        const min = lengthSeg * index;
        const minmax = (totalProgress - min) / (max - min);
        const width = (minmax > 1 ? 1 : minmax < 0 ? 0 : minmax) * 100;

        return (
          <div
            key={index}
            className={
              'h-[0.5rem] bg-secondary-light flex flex-1 first:rounded-l-pill last:rounded-r-pill'
            }
          >
            <div
              style={progressStyle(width, index)}
              data-testid="div-segment-filled"
              className={progressBarFilled({ intentProgress, showAnimation })}
            />
          </div>
        );
      })}
    </div>
  );
};
