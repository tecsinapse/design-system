import React from 'react';

const TBody: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({
  children,
  ...rest
}) => {
  return <tbody {...rest}>{children}</tbody>;
};

export default TBody;
