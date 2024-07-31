import { InputBaseVariants } from '@tecsinapse/cortex-core';

export interface InputPropsBase {
  variants?: InputBaseVariants;
  /** Also used as placeholder when it's empty */
  label?: string;
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    InputPropsBase {}

export interface InputFaceProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Pick<InputPropsBase, 'variants'> {}

export interface InputLeftProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export interface InputRightProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}
export interface InputSearchProps extends InputProps {
  /** Time in seconds to call controlled onChange */
  bounceTimeout?: number;
}

export type InputMaskEvent = {
  value: string;
  unmaskedValue: string;
};

export interface Mask extends Record<string, any> {
  mask: any;
}

export interface InputMaskProps extends Omit<InputProps, 'onChange'> {
  /** Get value and unmaskedValue */
  onChange?: (e: InputMaskEvent) => void;
  /** Mask based on https://imask.js.org/ */
  mask: Mask;
}

export interface InputMaskExpressionProps extends InputMaskProps {
  /** Mask based on https://imask.js.org/ */
  mask: Mask;
}
