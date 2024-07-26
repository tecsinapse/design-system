import { divider } from '@tecsinapse/cortex-core';
import React, { HTMLAttributes } from 'react';

interface DividerProps extends HTMLAttributes<HTMLHRElement> {}

/** Divider component */
export const Divider = ({ className, ...rest }: DividerProps) => {
  return <hr {...rest} className={divider({ className })} />;
};
