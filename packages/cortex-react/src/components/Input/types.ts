import { InputBaseVariants } from '@tecsinapse/cortex-core';
import { MutableRefObject } from 'react';

export interface InputPropsBase {
  variants?: InputBaseVariants;
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
  bounceTimeout?: number;
}
export interface InputMaskProps extends InputProps {
  /** ref to get input raw value */
  unmaskedRef?: MutableRefObject<string>;
}

export interface InputMaskExpressionProps extends InputMaskProps {
  /** Mask based on https://imask.js.org/ */
  mask: any;
}
