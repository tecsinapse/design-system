import React, { forwardRef, HTMLProps } from 'react'
import { card } from '@tecsinapse/cortex-core'

interface CardProps {
  children: JSX.Element
}
export const Card = forwardRef<HTMLDivElement, CardProps & HTMLProps<HTMLDivElement>>((props, ref) => {
  const { children, className, ...rest } = props
  return (
    <div
      className={card({ className })}
      ref={ref}
      {...rest}
    >
      {children}
    </div>
  )
})
