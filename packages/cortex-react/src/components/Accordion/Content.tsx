import clsx from 'clsx';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { useAccordionContext } from './context';
import { AccordionProps } from './types';

export const AccordionContent = ({
  children,
  direction = 'horizontal',
}: Pick<AccordionProps, 'children' | 'direction'>) => {
  const container = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<string | undefined>(undefined);
  const [height, setHeight] = useState<string | undefined>(undefined);
  const { open } = useAccordionContext();

  useLayoutEffect(() => {
    const getChildrenDimensions = () => {
      if (!container.current) return;
      const childrenArray = Array.from(
        container.current.children || []
      ) as HTMLElement[];
      if (direction === 'horizontal') {
        const widthSize = childrenArray.reduce(
          (prev, curr) => prev + curr.clientWidth,
          0
        );
        setWidth(`${widthSize}px`);
      } else {
        const heightSize = childrenArray.reduce(
          (prev, curr) => prev + curr.clientHeight,
          0
        );
        setHeight(`${heightSize}px`);
      }
    };

    getChildrenDimensions();

    const observer = new ResizeObserver(() => {
      getChildrenDimensions();
    });

    const childrenArray = Array.from(container.current?.children || []);
    childrenArray.forEach(el => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [direction]);

  return (
    <div
      className={clsx(
        `overflow-hidden ease-in-out duration-200`,
        { 'transition-[width]': direction === 'horizontal' },
        { 'w-0': direction === 'horizontal' && !open },
        { 'transition-[height]': direction === 'vertical' },
        { 'h-0': direction === 'vertical' && !open }
      )}
      style={{
        width: direction === 'horizontal' && open ? width : undefined,
        height: direction === 'vertical' && open ? height : undefined,
      }}
      ref={container}
      data-testid="accordion-container"
    >
      {children}
    </div>
  );
};
