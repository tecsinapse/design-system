import { hint, HintVariants } from '@tecsinapse/cortex-core';
import React, { HTMLProps } from 'react';

export interface HintProps extends Omit<HTMLProps<HTMLDivElement>, 'className'> {
  /** child element */
  children: React.ReactNode;
  variants?: HintVariants;
  /** React ref */
  ref?: React.Ref<HTMLDivElement>;
}

/** Hint component, commonly used for hint string. It can also be used with custom components in children. */
export const Hint = (props: HintProps) => {
  const { children, variants, ref, ...rest } = props;
  return (
    <div className={hint(variants)} ref={ref} {...rest}>
      {children ?? <></>}
    </div>
  );
};
