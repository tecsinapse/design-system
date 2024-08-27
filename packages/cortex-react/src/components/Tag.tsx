import { tag, TagVariants } from '@tecsinapse/cortex-core';
import React, { forwardRef, HTMLProps } from 'react';

interface TagProps {
  variants?: TagVariants;
  label?: string;
  children?: React.ReactNode;
}

/** Tag component */
export const Tag = forwardRef<
  HTMLDivElement,
  TagProps & HTMLProps<HTMLDivElement>
>((props, ref) => {
  const { label, variants, children } = props;
  return (
    <div className={tag(variants)} ref={ref}>
      {label ? <p>{label}</p> : <></>}
      {children}
    </div>
  );
});
