import React, { ReactNode } from 'react';

export interface DefaultProps extends React.HTMLAttributes<HTMLDivElement> {
  /** child element */
  children?: ReactNode;
}
