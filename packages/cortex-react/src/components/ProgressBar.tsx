import clsx from 'clsx';
import React, { useCallback, useEffect, useState } from 'react';
import { progressBarFilled } from '../styles';

interface ProgressBarProps {
  /** Number of segments. Defaults to 1. Set to 1 when 0 or less */
  segments?: number;
  /** Minimum possible value (0% of the bar). Defaults to 0 */
  valueMin?: number;
  /** Maximum possible value (100% of the bar). Defaults to 100 */
  valueMax?: number;
  /** Current value */
  valueCurrent: number;
  /** Filled partition color. Defaults to 'primary' */
  intentProgress?: 'default' | 'success' | 'warning' | 'info' | 'error';
  /** show Animation */
  animated?: boolean;
}

export const ProgressBar = ({
  segments: _segments = 1,
  valueMin = 0,
  valueMax = 100,
  valueCurrent = 50,
  intentProgress = 'default',
  animated = true,
}: ProgressBarProps) => {
  const [displayedValue, setDisplayedValue] = useState(0);
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    // Set the displayed value to the valueCurrent after the first render
    const timeout = setTimeout(() => {
      if (valueCurrent < displayedValue) {
        setShowAnimation(false);
      }
      if (animated && valueCurrent > displayedValue) setShowAnimation(true);
      setDisplayedValue(valueCurrent);
    }, 0);
    return () => clearTimeout(timeout);
  }, [valueCurrent]);
  const progressStyle = useCallback(
    (width: number, index: number) => {
      return {
        width: `${width}%`,
        transitionDelay: `${showAnimation ? `${index * 1000}ms` : `0ms`}`,
      };
    },
    [showAnimation]
  );

  const totalProgress =
    ((displayedValue - valueMin) / (valueMax - valueMin)) * 100;
  const segments = Math.max(1, _segments);
  const lengthSeg = 100 / Math.max(segments);

  const items = [...Array(segments).keys()];
  return (
    <div className={'flex gap-x-nano flex-row'}>
      {items.map((_, index) => {
        const max = lengthSeg * (index + 1);
        const min = lengthSeg * index;
        const minmax = (totalProgress - min) / (max - min);
        const width = (minmax > 1 ? 1 : minmax < 0 ? 0 : minmax) * 100;

        return (
          <div
            key={index}
            className={clsx(
              'h-[0.5rem] bg-secondary-light flex flex-1 first:rounded-l-pill last:rounded-r-pill'
            )}
          >
            <div
              style={progressStyle(width, index)}
              className={progressBarFilled({
                intentProgress,
                showAnimation: showAnimation,
              })}
            />
          </div>
        );
      })}
    </div>
  );
};
