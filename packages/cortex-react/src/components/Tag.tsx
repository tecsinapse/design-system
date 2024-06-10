import React, { forwardRef, HTMLProps } from 'react'
import { tag, TagVariants } from '@tecsinapse/cortex-core'

interface TagProps {
  variants?: TagVariants
  label: string
}

export const Tag = forwardRef<HTMLDivElement, TagProps & HTMLProps<HTMLDivElement>>((props, ref) => {
  const { label, variants } = props
  return (
    <div
      className={tag(variants)}
      ref={ref}
    >
      <p>{label}</p>
    </div>
  )
})
