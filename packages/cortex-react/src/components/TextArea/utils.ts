import React from 'react';

export const getValidChildren = (children: React.ReactNode) => {
  return React.Children.toArray(children).filter(el =>
    React.isValidElement(el)
  ) as React.ReactElement[];
};
