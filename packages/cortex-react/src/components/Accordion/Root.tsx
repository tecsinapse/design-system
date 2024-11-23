import React from 'react';
import { AccordionContent } from './Content';
import { AccordionFace } from './Face';
import { AccordionTrigger } from './Trigger';
import { AccordionProps } from './types';

export const AccordionRoot = ({
  children,
  defaultOpen,
  label,
  floating,
  onOpen,
  invertedArrow,
  onClose,
  direction = 'horizontal',
}: AccordionProps) => {
  return (
    <AccordionFace defaultOpen={defaultOpen} direction={direction}>
      <AccordionTrigger
        label={label}
        floating={floating}
        onOpen={onOpen}
        onClose={onClose}
        invertedArrow={invertedArrow}
        direction={direction}
      />
      <AccordionContent direction={direction}>{children}</AccordionContent>
    </AccordionFace>
  );
};
