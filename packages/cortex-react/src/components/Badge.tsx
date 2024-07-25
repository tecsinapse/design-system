import { badge, BadgeVariants, containerBadge } from '@tecsinapse/cortex-core';
import React, { forwardRef, HTMLProps } from 'react';

interface BadgeProps {
  /** accept string or number values */
  value: string | number;
  variants?: BadgeVariants;
}

interface BadgeAnchorProps extends BadgeProps {
  children: JSX.Element;
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
>(
  (
    props: BadgeAnchorProps & Omit<HTMLProps<HTMLDivElement>, 'className'>,
    ref
  ) => {
    const { value, variants, children, ...rest } = props;
    return (
      <div className={containerBadge()}>
        {children}
        <div ref={ref} className={badge(variants)} {...rest}>
          {value}
        </div>
      </div>
    );
  }
);
