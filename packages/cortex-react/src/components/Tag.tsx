import { tag, TagVariants } from '@tecsinapse/cortex-core';
import React, { forwardRef, HTMLProps } from 'react';
import { LiaTimesSolid } from 'react-icons/lia';

export interface TagProps {
  /**
   * all `tag` styles as object
   */
  variants?: TagVariants;
  /**
   * colors for the `tag`
   *
   * Useful when you don't want to provide the entire variants object.
   *
   * **NOTE**: The `variants` property will always take precedence.
   */
  intent?: TagVariants['intent'];
  /**
   * label
   */
  label: string;
  /**
   * dismiss handler
   * @returns void
   */
  onDismiss?: () => void;
}

const Close = ({
  onClick,
  className,
  ...rest
}: Omit<HTMLProps<HTMLButtonElement>, 'children' | 'type'>) => {
  return (
    <button
      {...rest}
      type="button"
      onClick={onClick}
      data-testid="tag-close-button"
    >
      <LiaTimesSolid className={className} />
    </button>
  );
};

const Label = ({
  children,
  className,
  ...rest
}: HTMLProps<HTMLParagraphElement>) => {
  return (
    <p className={className} {...rest}>
      {children}
    </p>
  );
};

const Face = forwardRef<
  HTMLDivElement,
  Pick<TagProps, 'variants' | 'intent'> & HTMLProps<HTMLDivElement>
>((props, ref) => {
  const { variants, className, intent, children, style, ...rest } = props;
  return (
    <div
      {...rest}
      className={tag({
        intent,
        ...variants,
        className,
      })}
      style={style}
      ref={ref}
    >
      {children}
    </div>
  );
});

/** Tag component */
const Root = forwardRef<HTMLDivElement, TagProps & HTMLProps<HTMLDivElement>>(
  (props, ref) => {
    const { label, variants, intent, className, onDismiss, ...rest } = props;

    return (
      <Face
        {...rest}
        variants={variants}
        intent={intent}
        className={className}
        ref={ref}
      >
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
