import React, { forwardRef, HTMLProps } from 'react';
import { badge, BadgeVariants, containerBadge } from '@tecsinapse/cortex-core';

interface BadgeProps {
  value: string | number;
  variants?: BadgeVariants;
}

interface BadgeAnchorProps extends BadgeProps {
  children: JSX.Element;
}

export const Badge = forwardRef<
  HTMLDivElement,
  BadgeProps & Omit<HTMLProps<HTMLDivElement>, 'className'>
>((props, ref) => {
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
>((props, ref) => {
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
