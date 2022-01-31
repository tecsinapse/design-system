import React from 'react';

export const TBody: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({
  children,
  ...rest
}) => {
  return <tbody {...rest}>{children}</tbody>;
};

export default TBody;
