import React from 'react';

export function cloneWithProps(
  children: React.ReactElement,
  props: React.HTMLAttributes<HTMLDivElement>
) {
  return React.cloneElement(<div>{children}</div>, props);
}
