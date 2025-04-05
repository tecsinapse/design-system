import { tag, TagVariants } from '@tecsinapse/cortex-core';
import React, { forwardRef, HTMLProps } from 'react';
import { LiaTimesSolid } from 'react-icons/lia';

interface TagProps {
  /**
   * Component variants
   */
  variants?: TagVariants;
  /**
   * Label
   */
  label: string;
  /**
   * Dismiss callback
   * @returns void
   */
  onDismiss?: () => void;
}

const Close = ({ onClick, className }: HTMLProps<HTMLButtonElement>) => {
  return (
    <button onClick={onClick} data-testid="tag-close-button">
      <LiaTimesSolid className={className} />
    </button>
  );
};

const Label = ({ children, className }: HTMLProps<HTMLParagraphElement>) => {
  return <p className={className}>{children}</p>;
};

const Face = forwardRef<
  HTMLDivElement,
  Pick<TagProps, 'variants'> & HTMLProps<HTMLDivElement>
>((props, ref) => {
  const { variants, className, children } = props;
  return (
    <div
      {...props}
      className={tag({
        ...variants,
        className,
      })}
      ref={ref}
    >
      {children}
    </div>
  );
});

/** Tag component */
const Root = forwardRef<HTMLDivElement, TagProps & HTMLProps<HTMLDivElement>>(
  (props, ref) => {
    const { label, variants, className, onDismiss } = props;

    return (
      <Face variants={variants} className={className} ref={ref} {...props}>
        <Label>{label}</Label>
        {onDismiss ? <Close onClick={onDismiss} /> : null}
      </Face>
    );
  }
);

export const Tag = {
  Root,
  Close,
  Label,
  Face,
};
