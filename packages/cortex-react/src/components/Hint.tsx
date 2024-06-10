import React, { forwardRef, HTMLProps } from 'react'
import { hint, HintVariants } from '@tecsinapse/cortex-core'

interface HintProps {
  children?: never
  description: string
  variants?: HintVariants
}

interface HintPropsWithChildrenProps {
  children: JSX.Element
  description?: never
  variants?: HintVariants
}

type HintPropsUnion = HintProps | HintPropsWithChildrenProps

export const Hint = forwardRef<HTMLDivElement, HintPropsUnion & Omit<HTMLProps<HTMLDivElement>, 'className'>>(
  (props, ref) => {
    const { description, children, variants } = props
    return (
      <div
        className={hint(variants)}
        ref={ref}
      >
        {description ? <p>{description}</p> : <></>}
        {children}
      </div>
    )
  }
)
