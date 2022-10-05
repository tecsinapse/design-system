import React from 'react';
import { TFooter } from './styled';

const TFoot: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({
  children,
  ...rest
}) => {
  return <TFooter {...rest}>{children}</TFooter>;
};

export default TFoot;
