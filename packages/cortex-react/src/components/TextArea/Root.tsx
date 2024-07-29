import React from 'react';
import { TextAreaBox } from './Box';
import { TextAreaFace } from './Face';
import { TextAreaProps } from './types';

/** TextArea component */
export const TextAreaRoot = React.forwardRef<
  HTMLTextAreaElement,
  TextAreaProps
>(({ variants, className, ...rest }: TextAreaProps, ref) => {
  return (
    <TextAreaFace variants={variants} className={className}>
      <TextAreaBox ref={ref} {...rest} />
    </TextAreaFace>
  );
});
