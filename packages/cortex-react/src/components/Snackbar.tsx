import React, { forwardRef } from 'react'
import { snackbar, SnackbarVariants } from '@tecsinapse/cortex-core'

interface SnackbarProps {
  variants?: SnackbarVariants
  children: JSX.Element
  show: boolean
}

export const Snackbar = forwardRef<HTMLDivElement, SnackbarProps>((props, ref) => {
  const { children, show, variants } = props
  return (
    <>
      {show ? (
        <div
          className={snackbar(variants)}
          ref={ref}
        >
          {children}
        </div>
      ) : (
        <></>
      )}
    </>
  )
})
