import React from 'react';

export function cloneWithProps(children: React.ReactElement, props: any) {
  return React.cloneElement(<div>{children}</div>, props);
}
