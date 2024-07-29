import { InputBaseVariants } from '@tecsinapse/cortex-core';

export type DivBaseProps = React.HTMLAttributes<HTMLDivElement>;

export interface TextAreaElementsProps extends DivBaseProps {
  /** child element */
  children: React.ReactNode;
  className?: string;
}

export interface TextAreaPropsBase {
  variants?: InputBaseVariants;
  label?: string;
  rows?: number;
}

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    TextAreaPropsBase {}

export interface TextAreaFaceProps
  extends DivBaseProps,
    Pick<TextAreaPropsBase, 'variants'> {}
