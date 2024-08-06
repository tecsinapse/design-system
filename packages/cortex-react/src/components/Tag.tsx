import { tag, TagVariants } from '@tecsinapse/cortex-core';
import React, { forwardRef, HTMLProps } from 'react';

interface TagProps {
  variants?: TagVariants;
  label: string;
}

/** Tag component */
export const Tag = forwardRef<
  HTMLDivElement,
  TagProps & HTMLProps<HTMLDivElement>
>((props, ref) => {
  const { label, variants } = props;
  return (
    <div className={tag(variants)} ref={ref}>
      <p>{label}</p>
    </div>
  );
});
