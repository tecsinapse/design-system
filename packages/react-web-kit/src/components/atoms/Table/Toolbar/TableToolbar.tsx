import React from 'react';
import { TableToolbarStyled } from './styled';
import { Text } from '@tecsinapse/react-core';

export interface TableToolbarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  rightIcons?: React.ReactNode;
  footer?: React.ReactNode;
  title: string;
}

const TableToolbar: React.FC<TableToolbarProps> = ({
  rightIcons,
  title,
  footer,
  ...rest
}) => {
  return (
    <>
      <TableToolbarStyled {...rest}>
        <Text typography="h3" fontWeight="bold">
          {title}
        </Text>
        {rightIcons}
      </TableToolbarStyled>
      {footer}
    </>
  );
};

export default TableToolbar;
