import React from 'react';
import { TFooter } from './styled';

export const TFoot: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({
  children,
  ...rest
}) => {
  return <TFooter {...rest}>{children}</TFooter>;
};

export default TFoot;
