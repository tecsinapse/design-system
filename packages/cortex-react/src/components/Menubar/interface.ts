import React, { ReactNode } from 'react';

export interface DefaultProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}
