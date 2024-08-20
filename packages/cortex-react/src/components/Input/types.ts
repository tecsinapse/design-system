import { InputBaseVariants } from '@tecsinapse/cortex-core';
import { CurrencyOptions } from '../../hooks';

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

export type MaskType = string | RegExp | Array<RegExp>;

export interface InputMaskProps extends Omit<InputProps, 'onChange' | 'value'> {
  value?: string | number;
  onChange?: (value: any) => void;
  /**
   To use mask for strings you have to pass a MaskType[] or ((value: string) => MaskType[])
   A MaskType can be a string, RegExp, or Array<RegExp>.
   In case we have a string, '9' represents digits, 'a' represents alphabet characters, and any other character represents fixed characters in the mask.
   For example a phone mask can be represented as ['(99) \\99999-9999'], or ['(99) ', '/[9]/', '9999-9999'], or ['(', /[0-9]/, /[0-9]/, ') ', '/[9]/', '9999-9999'] and many others.
   To use mask for numbers you have to pass a CurrencyOptions object
   A CurrencyOptions object contains symbol, separator, decimal, precision. For example {symbol: 'R$ ', separator: '.', decimal: ',', precision: 2,}.
   **/
  mask?: (MaskType[] | ((value: string) => MaskType[])) | CurrencyOptions;
}
