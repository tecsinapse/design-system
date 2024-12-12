import React from 'react';
import { StepNodeVariants } from '../../styles/stepNodeVariants';

export interface StepNodeProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  marked?: boolean;
  intent?: 'success' | 'warning' | 'error';
  isFirst?: boolean;
  isLast?: boolean;
  segmented?: boolean;
  selected?: boolean;
  interactive?: boolean;
  /** child element */
  children?: React.ReactNode;
}

export const Node = ({
  marked = false,
  intent = 'success',
  isFirst = false,
  isLast = false,
  segmented = false,
  selected = false,
  interactive = true,
  children,
  className,
  ...rest
}: StepNodeProps) => {
  const { container, content, separator } = StepNodeVariants({
    intent,
    marked,
    isFirst,
    isLast,
    selected: selected && interactive,
    disabled: rest.disabled,
    interactive,
  });

  return (
    <button type="button" className={container({ className })} {...rest}>
      {children ? <div className={content()}>{children}</div> : <></>}
      {segmented ? <div className={separator()} /> : <></>}
    </button>
  );
};
