import React, { useEffect, useState } from 'react';
import { ProgressBarInfinite } from './ProgressBarInfinite';
import { ProgressBarSegments } from './ProgressBarSegments';

export interface ProgressBarProps {
  segments?: number;
  valueMin?: number;
  valueMax?: number;
  valueCurrent?: number;
  intentProgress?:
    | 'default'
    | 'success'
    | 'warning'
    | 'info'
    | 'error'
    | 'uploading';
  type?: 'infinite' | 'default';
  animated?: boolean;
}

export const ProgressBar = ({
  segments: _segments = 1,
  valueMin = 0,
  valueMax = 100,
  valueCurrent = 50,
  intentProgress = 'default',
  type = 'default',
  animated = true,
}: ProgressBarProps) => {
  const [displayedValue, setDisplayedValue] = useState(0);
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (valueCurrent < displayedValue) {
        setShowAnimation(false);
      }
      if (animated && valueCurrent > displayedValue) setShowAnimation(true);

      setDisplayedValue(valueCurrent);
    }, 0);
    return () => clearTimeout(timeout);
  }, [valueCurrent]);

  const totalProgress =
    ((displayedValue - valueMin) / (valueMax - valueMin)) * 100;
  const segments = Math.max(1, _segments);

  return type === 'infinite' ? (
    <ProgressBarInfinite intentProgress={intentProgress} />
  ) : (
    <ProgressBarSegments
      segments={segments}
      totalProgress={totalProgress}
      intentProgress={intentProgress}
      showAnimation={showAnimation}
    />
  );
};
