import { badge, BadgeVariants, containerBadge } from '@tecsinapse/cortex-core';
import * as React from 'react';
import { forwardRef, HTMLProps } from 'react';

export interface BadgeProps {
  value: string | number;
  variants?: BadgeVariants;
}

export interface BadgeAnchorProps extends BadgeProps {
  /** child element */
  children: React.ReactNode;
}

/** Badge component */
export const Badge = forwardRef<
  HTMLDivElement,
  BadgeProps & Omit<HTMLProps<HTMLDivElement>, 'className'>
>((props: BadgeProps, ref) => {
  const { value, variants, ...rest } = props;
  return (
    <div
      ref={ref}
      className={badge({
        className: `relative ${variants?.className}`,
        intent: variants?.intent,
      })}
      {...rest}
    >
      {value}
    </div>
  );
});

export const BadgeAnchor = forwardRef<
  HTMLDivElement,
  BadgeAnchorProps & Omit<HTMLProps<HTMLDivElement>, 'className'>
>((props: BadgeAnchorProps, ref) => {
  const { value, variants, children, ...rest } = props;
  return (
    <div className={containerBadge()}>
      {children}
      <div ref={ref} className={badge(variants)} {...rest}>
        {value}
      </div>
    </div>
  );
});
