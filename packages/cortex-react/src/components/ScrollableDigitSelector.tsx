import React, { useEffect, useMemo, useRef } from 'react';
import clsx from 'clsx';

interface ScrollableDigitSelectorProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
}

const formatValue = (val: number) => {
  return val.toString().padStart(2, '0');
};

export const ScrollableDigitSelector = ({
  value,
  onChange,
  min,
  max,
  step = 1,
}: ScrollableDigitSelectorProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const values = useMemo(() => {
    const vals: number[] = [];
    for (let i = min; i <= max; i += step) {
      vals.push(i);
    }
    return vals;
  }, [min, max, step]);

  const scrollToValue = (targetValue: number) => {
    if (containerRef.current) {
      const index = values.indexOf(targetValue);
      if (index !== -1) {
        const itemHeight = 27;
        const scrollTop = index * itemHeight;
        containerRef.current.scrollTop = scrollTop;
        containerRef.current.scrollTo({ top: scrollTop, behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    scrollToValue(value);
  }, []);

  return (
    <div
      className="flex flex-col items-center gap-y-micro p-micro overflow-auto"
      ref={containerRef}
    >
      {values.map(val => (
        <div key={val}>
          <div onClick={() => onChange(val)} className={'flex justify-center'}>
            <span
              className={clsx(
                'p-micro rounded-micro border-1 border-transparent hover:bg-primary-light hover:border-primary cursor-pointer',
                value === val && 'bg-primary-medium text-light'
              )}
            >
              {formatValue(val)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
