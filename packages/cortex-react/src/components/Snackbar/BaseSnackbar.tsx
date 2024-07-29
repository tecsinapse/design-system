import { snackbar, SnackbarVariants } from '@tecsinapse/cortex-core';
import React, { forwardRef, ReactNode } from 'react';

interface SnackbarProps {
  variants?: SnackbarVariants;
  /** child element */
  children?: ReactNode;
  show: boolean;
}

export const BaseSnackbar = forwardRef<HTMLDivElement, SnackbarProps>(
  (props, ref) => {
    const { children, show, variants } = props;
    return (
      <>
        {show ? (
          <div className={snackbar(variants)} ref={ref} data-testid="snackbar">
            {children}
          </div>
        ) : (
          <></>
        )}
      </>
    );
  }
);
