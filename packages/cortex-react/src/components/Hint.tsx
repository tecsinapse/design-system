import { hint, HintVariants } from '@tecsinapse/cortex-core';
import React, { forwardRef, HTMLProps } from 'react';

export interface HintProps {
  children: React.ReactNode;
  variants?: HintVariants;
}

/** Hint component, commonly used for hint string. It can also be used with custom components in children. */
export const Hint = forwardRef<
  HTMLDivElement,
  HintProps & Omit<HTMLProps<HTMLDivElement>, 'className'>
>((props: HintProps, ref) => {
  const { children, variants } = props;
  return (
    <div className={hint(variants)} ref={ref}>
      {children ?? <></>}
    </div>
  );
});
