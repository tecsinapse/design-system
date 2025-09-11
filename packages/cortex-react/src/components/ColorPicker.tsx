import clsx from 'clsx';
import React, {
  forwardRef,
  type HTMLAttributes,
  type InputHTMLAttributes,
} from 'react';

export interface ColorPickerProps
  extends InputHTMLAttributes<HTMLInputElement> {}

const Box = forwardRef<HTMLInputElement, ColorPickerProps>((props, ref) => {
  const { id, className, ...rest } = props;
  return (
    <div className={`w-tera h-kilo border overflow-hidden relative ${className ?? ""}`}>
      <input
        {...rest}
        id={id}
        type="color"
        className="bg-transparent cursor-pointer disabled:opacity-50 disabled:cursor-default absolute -top-1.5 -right-1 w-peta h-giga"
        ref={ref}
      />
    </div>
  );
});

const Face = ({ children }) => {
  return (
    <div className="rounded-mili p-mili shadow-default bg-white flex flex-row items-center gap-2">
      {children}
    </div>
  );
};

const Label = ({
  children,
  id,
  className,
  ...rest
}: HTMLAttributes<HTMLLabelElement>) => {
  return (
    <label {...rest} htmlFor={id} className={clsx('text-base', className)}>
      {children}
    </label>
  );
};

const Root = forwardRef<HTMLInputElement, ColorPickerProps>((props, ref) => {
  const { id, value, ...rest } = props;

  return (
    <Face>
      <Box {...rest} ref={ref} id={id} value={value} />
      {value ? <Label id={id}>{value}</Label> : null}
    </Face>
  );
});

export const ColorPicker = {
  Box,
  Face,
  Label,
  Root,
};
