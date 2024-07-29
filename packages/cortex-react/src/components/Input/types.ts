import { InputBaseVariants } from '@tecsinapse/cortex-core';
import { MutableRefObject } from 'react';

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
  /** child element */
  children: React.ReactNode;
  className?: string;
}

export interface InputRightProps extends React.HTMLAttributes<HTMLDivElement> {
  /** child element */
  children: React.ReactNode;
  className?: string;
}
export interface InputSearchProps extends InputProps {
  /** Time in seconds to call controlled onChange */
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
