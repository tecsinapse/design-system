import React from 'react';
import { StepNodeVariants } from '../../styles/stepNodeVariants';

interface StepNodeProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  marked?: boolean;
  intent?: 'success' | 'warning' | 'error';
  isFirst?: boolean;
  isLast?: boolean;
  segmented?: boolean;
  selected?: boolean;
  children: React.ReactNode;
}

export const Node = ({
  marked = false,
  intent = 'success',
  isFirst = false,
  isLast = false,
  segmented = false,
  selected = false,
  children,
  onClick,
  ...rest
}: StepNodeProps) => {
  const { container, content, separator } = StepNodeVariants({
    intent,
    marked,
    isFirst,
    isLast,
    selected,
    disabled: rest.disabled,
  });

  return (
    <button className={container()} onClick={onClick} {...rest}>
      <div className={content()}>{children}</div>
      {segmented && <div className={separator()} />}
    </button>
  );
};
