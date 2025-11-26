import { snackbar, SnackbarVariants } from '@tecsinapse/cortex-core';
import React, { ReactNode } from 'react';

interface SnackbarProps {
  variants?: SnackbarVariants;
  /** child element */
  children?: ReactNode;
  show: boolean;
  /** React ref */
  ref?: React.Ref<HTMLDivElement>;
}

export const BaseSnackbar = (props: SnackbarProps) => {
  const { children, show, variants, ref } = props;
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
};
