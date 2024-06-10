import React, { forwardRef, InputHTMLAttributes } from 'react'
import { modal, overlay } from '@tecsinapse/cortex-core'

interface ModalProps {
  open: boolean
  onClose: () => void
  children: JSX.Element
}

export const Modal = forwardRef<HTMLDivElement, ModalProps & InputHTMLAttributes<HTMLInputElement>>((props, ref) => {
  const { open, onClose, children, className } = props
  return (
    <div
      ref={ref}
      {...props}
    >
      <div
        className={overlay({ show: open })}
        onClick={onClose}
      ></div>
      <dialog className={modal({ open, className })}>{children}</dialog>
    </div>
  )
})
